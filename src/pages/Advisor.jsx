import React, { useMemo } from 'react';
import { useFinTrack } from '../context/FinTrackContext';
import { generateInsights } from '../utils/aiLogic';
import { Bot, TrendingUp, AlertTriangle, ShieldCheck, Lightbulb } from 'lucide-react';

const Advisor = () => {
    const { transactions, budget, savingsPocket } = useFinTrack();

    // Memoize to regenerate only when data changes
    const { insights, healthScore } = useMemo(() =>
        generateInsights(transactions, budget, savingsPocket),
        [transactions, budget, savingsPocket]
    );

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
