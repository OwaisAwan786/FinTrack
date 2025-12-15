import { formatCurrency } from './format';

export const generateInsights = (transactions, budget, savingsPocket) => {
    const insights = [];

    // 1. Calculate Metrics
    const totalSpent = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

    const categoryTotals = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

    // 2. Health Score (Simple 0-100 based on budget adherence)
    let healthScore = 100;
    if (totalSpent > budget) {
        healthScore = Math.max(0, 100 - ((totalSpent - budget) / budget * 100)); // Penalize overspending
    } else {
        // Reward for saving: If spent < 80% of budget, score stays high
        const ratio = totalSpent / budget;
        if (ratio > 0.8) healthScore -= 10;
        if (ratio > 0.9) healthScore -= 10;
    }
    healthScore = Math.round(healthScore);

    // 3. Rule-Based Insights

    // Rule: High Category Spending (> 30% of total)
    Object.entries(categoryTotals).forEach(([category, amount]) => {
        if (amount > totalSpent * 0.3 && totalSpent > 0) {
            insights.push({
                id: `high-spend-${category}`,
                type: 'warning',
                title: `High Spending in ${category}`,
                message: `You've spent ${formatCurrency(amount)} on ${category}, which is ${Math.round(amount / totalSpent * 100)}% of your total expenses. Consider cutting back here to boost your savings.`,
                action: 'Set a limit'
            });
        }
    });

    // Rule: Budget Alert
    if (totalSpent > budget * 0.9) {
        insights.push({
            id: 'budget-critical',
            type: 'danger',
            title: 'Critical Budget Alert',
            message: `You have used ${Math.round(totalSpent / budget * 100)}% of your monthly budget. Stop non-essential spending immediately!`,
            action: 'Review Expenses'
        });
    } else if (totalSpent > budget * 0.75) {
        insights.push({
            id: 'budget-warning',
            type: 'warning',
            title: 'Budget Watch',
            message: `You have used ${Math.round(totalSpent / budget * 100)}% of your budget. Keep an eye on discretionary spending.`,
            action: 'Check Budget'
        });
    }

    // Rule: Savings Opportunities / Interpretation of "Where to save"
    if (savingsPocket > 50000) {
        insights.push({
            id: 'invest-opp',
            type: 'success',
            title: 'Investment Opportunity',
            message: `Great job! Your Savings Pocket has ${formatCurrency(savingsPocket)}. You should move at least PKR 50,000 into a Mutual Fund or High-Yield Savings Account to earn ~15% interest.`,
            action: 'View Options'
        });
    } else if (savingsPocket > 10000) {
        insights.push({
            id: 'saving-good',
            type: 'info',
            title: 'Emergency Fund Building',
            message: `You have ${formatCurrency(savingsPocket)} saved. Keep going until you reach PKR 50,000 to cover 3 months of expenses.`,
            action: 'Set Goal'
        });
    }

    // General Tip
    const tips = [
        "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
        "Automating your savings effectively 'pays you first'.",
        "Review your subscriptions. Cancel any you haven't used in 3 months.",
        "Cooking at home can save you up to PKR 15,000 per month compared to daily takeout."
    ];
    insights.push({
        id: 'daily-tip',
        type: 'tip',
        title: 'Smart Money Tip',
        message: tips[Math.floor(Math.random() * tips.length)],
        action: 'Learn More'
    });

    return { insights, healthScore };
};
