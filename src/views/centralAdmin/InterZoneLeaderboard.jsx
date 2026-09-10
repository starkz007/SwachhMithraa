import React from 'react';
import { useApp } from '../../context/AppContext';

export const InterZoneLeaderboard = () => {
  const { leaderboard, showToast } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-amber-600">workspace_premium</span>
              Swachh Survekshan Monthly League
            </span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Inter-Zone Cleanliness Leaderboard</h2>
          <p className="text-xs text-on-surface-variant">
            Competitive scoring based on citizen satisfaction, zero-blackspot maintenance, and source segregation
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast("Monthly Swachh Trophy notification dispatched to Zone 1 Council.", "success")}
          className="px-4 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-deep shadow-md flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">military_tech</span>
          <span>Award Monthly Clean Trophy</span>
        </button>
      </div>

      <div className="rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-outline-variant/20 text-[10px] font-bold uppercase tracking-wider text-outline">
            <tr>
              <th className="py-4 px-5">Rank</th>
              <th className="py-4 px-5">Municipal Zone</th>
              <th className="py-4 px-5">Jurisdiction Wards</th>
              <th className="py-4 px-5">Door-to-Door Coverage</th>
              <th className="py-4 px-5">Avg SLA Time</th>
              <th className="py-4 px-5">Survekshan Score</th>
              <th className="py-4 px-5 text-right">Recognition</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {leaderboard.map((z) => (
              <tr key={z.rank} className="hover:bg-surface-container-low transition-colors">
                <td className="py-4 px-5">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                    z.rank === 1 ? 'bg-amber-400 text-amber-950 shadow-sm' :
                    z.rank === 2 ? 'bg-slate-300 text-slate-900' :
                    z.rank === 3 ? 'bg-amber-700 text-white' : 'bg-surface-container text-outline'
                  }`}>
                    {z.rank}
                  </span>
                </td>
                <td className="py-4 px-5 font-bold text-sm text-on-surface">{z.zone}</td>
                <td className="py-4 px-5 text-on-surface-variant font-medium">{z.wards} Wards</td>
                <td className="py-4 px-5 font-mono font-bold text-emerald-700">{z.coverage}</td>
                <td className="py-4 px-5 text-primary font-bold">{z.avgSlaMins} mins</td>
                <td className="py-4 px-5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-black text-base text-on-surface">{z.score}</span>
                    <span className="text-[10px] text-outline">/ 1000</span>
                  </div>
                </td>
                <td className="py-4 px-5 text-right">
                  <span className="px-3 py-1 rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant text-[11px] font-bold">
                    {z.badge}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
