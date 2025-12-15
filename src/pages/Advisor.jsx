import React, { useState, useEffect } from 'react';
import { useFinTrack } from '../context/FinTrackContext';
import { Bot, TrendingUp, AlertTriangle, ShieldCheck, Lightbulb, Loader } from 'lucide-react';

const Advisor = () => {
    const { transactions, budget, savingsPocket } = useFinTrack();
    const [insightsData, setInsightsData] = useState({ insights: [], healthScore: 0 });
    const [loading, setLoading] = useState(true);

    // Fetch insights from Backend
    useEffect(() => {
        // Debounce or just fetch anytime dependencies change (for simplicity in this demo)
        // In reality, we might want to manually refresh or only fetch on mount if expensive.
        // For now, let's fetch when transactions change to keep it "live"
        const fetchInsights = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/advisor/insights');
                const data = await res.json();
                setInsightsData(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch insights", err);
                setLoading(false);
            }
        };

        if (transactions.length > 0) {
            fetchInsights();
        }
    }, [transactions, budget, savingsPocket]);

    const { insights, healthScore } = insightsData;

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-emerald-400';
        if (score >= 50) return 'text-amber-400';
        return 'text-red-400';
    };

    const getIcon = (type) => {
        switch (type) {
            case 'warning': return AlertTriangle;
            case 'danger': return AlertTriangle;
            case 'success': return TrendingUp;
            case 'tip': return Lightbulb;
            default: return ShieldCheck;
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-20">
                <Loader className="animate-spin text-indigo-500" size={48} />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8 pb-10">
            <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    AI Financial Advisor
                </h2>
                <p className="text-gray-400 mt-1">Personalized insights to help you save smarter and grow your wealth.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Health Score */}
                <div className="card text-center flex flex-col items-center justify-center p-10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                    <Bot size={56} className="text-indigo-400 mb-6" />
                    <h3 className="text-xl font-medium text-gray-300 mb-2">Financial Health Score</h3>
                    <div className={`text-6xl font-black mb-4 ${getScoreColor(healthScore)}`}>
                        {healthScore}
                    </div>
                    <p className="text-sm text-gray-400 max-w-xs">
                        Based on your budget adherence, savings rate, and spending variety.
                    </p>
                </div>

                {/* Right Column: Insights Feed */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <SparklesIcon /> Latest Insights
                    </h3>

                    {insights.length === 0 && (
                        <div className="p-10 text-center text-gray-500 bg-slate-900/30 rounded-xl">
                            No insights available yet. Add more transactions to generate analysis.
                        </div>
                    )}

                    {insights.map((insight) => {
                        const Icon = getIcon(insight.type);
                        return (
                            <div key={insight.id} className={`glass-panel p-6 border-l-4 transition-transform hover:scale-[1.01] ${insight.type === 'danger' ? 'border-red-500 bg-red-900/10' :
                                insight.type === 'warning' ? 'border-amber-500 bg-amber-900/10' :
                                    insight.type === 'success' ? 'border-emerald-500 bg-emerald-900/10' :
                                        'border-indigo-500 bg-indigo-900/10'
                                }`}>
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-full bg-slate-900/50 ${insight.type === 'danger' ? 'text-red-400' :
                                        insight.type === 'warning' ? 'text-amber-400' :
                                            insight.type === 'success' ? 'text-emerald-400' :
                                                'text-indigo-400'
                                        }`}>
                                        <Icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-bold text-lg mb-1 ${insight.type === 'danger' ? 'text-red-400' :
                                            insight.type === 'warning' ? 'text-amber-300' :
                                                insight.type === 'success' ? 'text-emerald-300' :
                                                    'text-indigo-300'
                                            }`}>{insight.title}</h4>
                                        <p className="text-gray-300 leading-relaxed text-sm">
                                            {insight.message}
                                        </p>
                                        {insight.recommendation && (
                                            <div className="mt-3 pt-3 border-t border-slate-700/50 text-xs font-semibold text-gray-400 flex items-center gap-2">
                                                <Lightbulb size={14} className="text-yellow-500" />
                                                TO IMPROVE: <span className="text-gray-200">{insight.recommendation}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const SparklesIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
)

export default Advisor;
