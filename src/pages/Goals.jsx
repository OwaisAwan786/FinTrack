import React, { useState } from 'react';
import { useFinTrack } from '../context/FinTrackContext';
import { generateInsights } from '../utils/aiLogic';
import { Target, Calendar, Calculator, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/format';

const Goals = () => {
    const { goals, addGoal, savingsPocket } = useFinTrack();

    const [newGoal, setNewGoal] = useState({
        name: '',
        target: '',
        months: ''
    });

    const [plan, setPlan] = useState(null);

    const calculatePlan = () => {
        if (!newGoal.target || !newGoal.months) return;
        const target = parseFloat(newGoal.target);
        const months = parseInt(newGoal.months);

        if (months <= 0) return;

        const monthlyNeed = target / months;
        setPlan({
            monthlyNeed,
            target,
            months
        });
    };

    const handleCreateGoal = () => {
        if (!newGoal.name || !plan) return;
        addGoal({
            name: newGoal.name,
            target: plan.target,
            months: plan.months,
            color: '#8B5CF6' // Default purple
        });
        setNewGoal({ name: '', target: '', months: '' });
        setPlan(null);
    };

    return (
        <div className="flex flex-col gap-8 pb-10">
            <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Goal Planner
                </h2>
                <p className="text-gray-400 mt-1">Turn your dreams into reality with a solid financial plan.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Input Form */}
                <div className="card">
                    <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                        <Target className="text-primary-color" />
                        Create New Goal
                    </h3>

                    <div className="flex flex-col gap-5">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Goal Name</label>
                            <input
                                type="text"
                                placeholder="e.g. New iPhone 16"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none"
                                value={newGoal.name}
                                onChange={e => setNewGoal({ ...newGoal, name: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Target Amount (PKR)</label>
                                <input
                                    type="number"
                                    placeholder="300000"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 transition-all outline-none"
                                    value={newGoal.target}
                                    onChange={e => setNewGoal({ ...newGoal, target: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Timeline (Months)</label>
                                <input
                                    type="number"
                                    placeholder="6"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 transition-all outline-none"
                                    value={newGoal.months}
                                    onChange={e => setNewGoal({ ...newGoal, months: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            onClick={calculatePlan}
                            className="btn btn-secondary justify-center w-full mt-2"
                        >
                            <Calculator size={18} />
                            Calculate Plan
                        </button>
                    </div>
                </div>

                {/* Right: Plan Preview & active goals */}
                <div className="flex flex-col gap-6">
                    {plan && (
                        <div className="glass-panel p-6 border border-emerald-500/30 bg-emerald-900/10 animate-fade-in relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Sparkles size={64} className="text-emerald-400" />
                            </div>

                            <h4 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
                                <Sparkles size={18} /> Plan Preview
                            </h4>

                            <div className="space-y-3 relative z-10">
                                <p className="text-gray-300">
                                    To save <strong className="text-white">{formatCurrency(plan.target)}</strong> in <strong className="text-white">{plan.months} months</strong>:
                                </p>

                                <div className="text-3xl font-bold text-white my-2">
                                    {formatCurrency(plan.monthlyNeed)} <span className="text-sm text-gray-400 font-normal">/ month</span>
                                </div>

                                <div className="p-3 rounded-lg bg-black/20 text-sm text-gray-400 border border-white/5">
                                    Your current "Savings Pocket" balance is <span className="text-indigo-400">{formatCurrency(savingsPocket)}</span>.
                                    {savingsPocket > plan.monthlyNeed
                                        ? " You're already covered for the first month! 🎉"
                                        : " Start auto-saving on transactions to reach this faster!"}
                                </div>

                                <button
                                    onClick={handleCreateGoal}
                                    className="btn btn-primary w-full justify-center mt-2 shadow-lg shadow-emerald-500/20"
                                >
                                    Confirm Goal
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Smart Goal Advice - NEW */}
                    <div className="card border border-indigo-500/30 bg-indigo-900/10 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300">
                                <Sparkles size={18} />
                            </div>
                            <h4 className="font-bold text-white">Smart Savings Advice</h4>
                        </div>

                        {/* Dynamic Advice based on worst spending habit */}
                        {generateInsights(useFinTrack().transactions, useFinTrack().budget, useFinTrack().savingsPocket).insights
                            .filter(i => i.type === 'warning' || i.type === 'danger')
                            .slice(0, 1)
                            .map((insight, idx) => (
                                <div key={idx}>
                                    <p className="text-sm text-gray-300 mb-2">
                                        To reach your goals faster, we analyzed your spending:
                                    </p>
                                    <div className="p-3 bg-slate-900/50 rounded-lg border border-red-500/20 flex gap-3 items-start">
                                        <div className="text-red-400 mt-1">
                                            <Target size={16} />
                                        </div>
                                        <div>
                                            <p className="text-red-300 font-bold text-sm">{insight.title}</p>
                                            <p className="text-xs text-gray-400 mt-1">{insight.message}</p>
                                            <p className="text-xs text-indigo-400 mt-2 font-medium">
                                                💡 Tip: Reducing this by just 10% could save you PKR 2,000/month!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        {generateInsights(useFinTrack().transactions, useFinTrack().budget, useFinTrack().savingsPocket).insights
                            .filter(i => i.type === 'warning' || i.type === 'danger').length === 0 && (
                                <p className="text-sm text-gray-400">
                                    Your spending looks good! Keep using the "Auto-Save" feature to hit your targets steadily.
                                </p>
                            )}
                    </div>

                    {/* Active Goals List */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-gray-400 uppercase text-xs tracking-wider">Active Goals</h4>
                        {goals.map(goal => (
                            <div key={goal.id} className="card p-5 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h5 className="font-bold text-lg">{goal.name}</h5>
                                        <p className="text-xs text-gray-500">Target: {formatCurrency(goal.target)}</p>
                                    </div>
                                    <div className="bg-slate-800 p-2 rounded-lg">
                                        <Target size={20} className="text-indigo-400" />
                                    </div>
                                </div>

                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                                    <div
                                        className="h-full bg-indigo-500 rounded-full"
                                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>{formatCurrency(goal.current)} Saved</span>
                                    <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Goals;
