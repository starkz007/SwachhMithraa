import React from 'react';
import { useApp } from '../../context/AppContext';

export const ApexOversight = () => {
  const { leaderboard, showToast } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-3xl bg-gradient-to-r from-primary-deep via-primary to-primary-container p-6 sm:p-8 text-on-primary shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>MoHUA / Swachh Bharat Urban Apex Command</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Metropolitan Sanitation & Apex Inter-Zone Oversight
          </h1>
          <p className="text-xs sm:text-sm text-gray-200">
            Real-time aggregate data stream across all 5 municipal zones, 126 wards, and 4,800+ sanitation workers
          </p>
        </div>
      </div>

      {/* City KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs font-bold text-outline uppercase">City Cleanliness Index</span>
          <div className="text-3xl font-black text-primary mt-1">894 <span className="text-xs text-outline font-normal">/ 1000</span></div>
          <span className="text-xs text-emerald-700 font-semibold">Tier-1 Swachh City Rating</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs font-bold text-outline uppercase">Total Daily Waste</span>
          <div className="text-3xl font-black text-on-surface mt-1">2,410 MT</div>
          <span className="text-xs text-secondary font-semibold">74.2% Landfill Diverted</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs font-bold text-outline uppercase">City-Wide SLA Compliance</span>
          <div className="text-3xl font-black text-emerald-700 mt-1">96.8%</div>
          <span className="text-xs text-emerald-600 font-semibold">Under 24h Closure Rate</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs font-bold text-outline uppercase">Edge CCTV Network</span>
          <div className="text-3xl font-black text-secondary mt-1">128 Nodes</div>
          <span className="text-xs text-secondary font-semibold">100% Uptime across Sectors</span>
        </div>
      </div>

      {/* Quick Summary of 5 Zones */}
      <div className="rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm p-6 space-y-4">
        <h3 className="text-base font-bold text-on-surface">5 Municipal Zones Status Brief</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {leaderboard.map((z) => (
            <div key={z.rank} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">Rank #{z.rank}</span>
                <span className="font-black text-on-surface">{z.score} pts</span>
              </div>
              <div className="font-bold text-sm text-on-surface truncate">{z.zone}</div>
              <div className="text-outline">Coverage: {z.coverage}</div>
              <div className="text-[11px] text-emerald-700 font-semibold">{z.badge}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
