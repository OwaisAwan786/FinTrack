import React from 'react';

const StatsWidget = ({ title, amount, icon: Icon, trend, trendUp }) => {
    return (
        <div className="card relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon size={64} />
            </div>
            <div className="relative z-10">
                <p className="text-gray-400 font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-white tracking-wide">{amount}</h3>
                {trend && (
                    <div className={`flex items-center gap-1 mt-2 text-sm ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
                        <span>{trend}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsWidget;
