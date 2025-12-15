const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(amount);
};

const generateInsights = (transactions, budget, savingsPocket) => {
    const insights = [];

    // --- 1. Metrics Calculation ---
    const expenses = transactions.filter(t => t.type === 'expense');
    const totalSpent = expenses.reduce((acc, t) => acc + t.amount, 0);

    const categoryTotals = expenses.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {});

    // --- 2. Monthly Saving Score (Health Score) ---
    // Formula: 
    // Base 100
    // - Deduct points for high budget usage ( > 80%)
    // - Deduct points heavily for over budget
    // + Add bonus for savingsPocket growth (simulated here as just having savings)

    let healthScore = 100;
    const budgetUsageRatio = totalSpent / budget;

    if (budgetUsageRatio > 1.0) {
        // Over budget: drastic penalty
        healthScore -= 50 + ((budgetUsageRatio - 1.0) * 100);
    } else if (budgetUsageRatio > 0.9) {
        healthScore -= 20;
    } else if (budgetUsageRatio > 0.75) {
        healthScore -= 10;
    }

    // Savings bonus/penalty
    if (savingsPocket < 1000) {
        healthScore -= 5; // Low savings penalty
    } else if (savingsPocket > 10000) {
        healthScore += 5; // Good savings bonus
    }

    // Clamp score 0-100
    healthScore = Math.max(0, Math.min(100, Math.round(healthScore)));


    // --- 3. Spending Pattern Analysis & Savings Recommendations ---

    // Check for dominant categories
    Object.entries(categoryTotals).forEach(([category, amount]) => {
        const percentage = (amount / totalSpent) * 100;

        // Rule: If single category is > 30% of total spend
        if (percentage > 30 && totalSpent > 0) {
            insights.push({
                id: `high-spend-${category}`,
                type: 'warning',
                title: `Spending Alert: ${category}`,
                message: `You've spent ${formatCurrency(amount)} on ${category}. This is ${Math.round(percentage)}% of your total expenses.`,
                recommendation: `Try to cap ${category} spending to ${formatCurrency(totalSpent * 0.25)} next month.`
            });
        }
    });

    // Rule: Budget Warnings
    if (budgetUsageRatio > 1.0) {
        insights.push({
            id: 'budget-critical',
            type: 'danger',
            title: 'Budget Exceeded',
            message: `You have exceeded your monthly budget by ${formatCurrency(totalSpent - budget)}.`,
            recommendation: 'Stop all non-essential spending immediately.'
        });
    } else if (budgetUsageRatio > 0.85) {
        insights.push({
            id: 'budget-warning',
            type: 'warning',
            title: 'Approaching Budget Limit',
            message: `You have used ${Math.round(budgetUsageRatio * 100)}% of your budget.`,
            recommendation: 'Review your remaining planned expenses.'
        });
    }

    // --- 4. Predictive Suggestions (Basic Logic) ---
    // Simple projection: Average daily spend * days in month
    // Assuming we are partway through the month, we can project EOM total.
    // For this mock, let's assume current date is day 15 (simulated) or just use average per transaction.

    // Average spend per expense transaction
    const avgTransactionVal = expenses.length > 0 ? totalSpent / expenses.length : 0;
    const projectedSpend = totalSpent + (avgTransactionVal * 5); // Simple "Next 5 transactions" projection

    insights.push({
        id: 'prediction-1',
        type: 'info',
        title: 'Spending Projection',
        message: `Based on your average spending of ${formatCurrency(avgTransactionVal)} per transaction, you might spend another ${formatCurrency(avgTransactionVal * 5)} in the next few purchases.`,
        recommendation: `Keep transactions below ${formatCurrency(avgTransactionVal * 0.8)} to save money.`
    });

    // Savings Pocket Recommendations
    if (savingsPocket > 20000) {
        insights.push({
            id: 'invest-advice',
            type: 'success',
            title: 'High Savings Balance',
            message: `You have a healthy savings balance of ${formatCurrency(savingsPocket)}.`,
            recommendation: 'Consider investing 50% of this into a mutual fund or fixed deposit.'
        });
    }

    return {
        insights,
        healthScore,
        stats: {
            totalSpent,
            categoryTotals,
            budgetUsage: Math.round(budgetUsageRatio * 100)
        }
    };
};

module.exports = { generateInsights };
