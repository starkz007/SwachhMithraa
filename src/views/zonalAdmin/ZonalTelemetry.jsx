import React from 'react';
import { useApp } from '../../context/AppContext';

export const ZonalTelemetry = () => {
  const { zonalMetrics, showToast } = useApp();

  const wardsData = [
    { ward: "Ward 12 (Ulsoor)", coverage: "98.4%", activeStaff: 18, pendingTickets: 2, avgSla: "21 mins", status: "Optimal" },
    { ward: "Ward 14 (Indiranagar)", coverage: "97.8%", activeStaff: 24, pendingTickets: 4, avgSla: "24 mins", status: "Optimal" },
    { ward: "Ward 15 (Domlur)", coverage: "94.2%", activeStaff: 16, pendingTickets: 7, avgSla: "34 mins", status: "Warning" },
    { ward: "Ward 18 (Jeevanbheemanagar)", coverage: "91.0%", activeStaff: 14, pendingTickets: 11, avgSla: "48 mins", status: "Critical" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container text-xs font-bold uppercase tracking-wider">
              {zonalMetrics.zoneName}
            </span>
            <span className="text-xs text-outline font-medium">28 Contiguous Wards</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Zonal Command & Locality Telemetry</h2>
          <p className="text-xs text-on-surface-variant">
            Cross-ward real-time operational oversight, speed-of-resolution analytics, and equipment readiness
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast("Zonal sync ping transmitted to all 28 Ward Control Desks.", "success")}
          className="px-4 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-deep shadow-md flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">sensors</span>
          <span>Broadcast Zonal Diagnostic Ping</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs font-bold text-outline uppercase">Daily Waste Cleared</span>
          <div className="text-2xl font-black text-on-surface mt-1">{zonalMetrics.totalDailyTonnage} MT</div>
          <span className="text-xs text-secondary font-semibold">98.2% Cleared Today</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs font-bold text-outline uppercase">Source Segregation</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">{zonalMetrics.segregationRate}%</div>
          <span className="text-xs text-emerald-600 font-semibold">+4.2% MoM Gain</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs font-bold text-outline uppercase">Landfill Diversion</span>
          <div className="text-2xl font-black text-primary mt-1">{zonalMetrics.landfillDiversionPercent}%</div>
          <span className="text-xs text-primary font-semibold">Processed via Bio-CNG & RDF</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs font-bold text-outline uppercase">Swachh Ranking Score</span>
          <div className="text-2xl font-black text-amber-500 mt-1">{zonalMetrics.swachhSurvekshanScore} / 1000</div>
          <span className="text-xs text-on-surface font-semibold">Rank #{zonalMetrics.cityRank} in Metropolis</span>
        </div>
      </div>

      {/* Ward Telemetry Comparative Table */}
      <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="p-4 bg-surface-container-low border-b border-outline-variant/20 flex items-center justify-between">
          <h3 className="text-sm font-bold text-on-surface">Sector Ward Performance Benchmarks</h3>
          <span className="text-xs text-outline">Real-time GPS dispatch & SLA index</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="text-[10px] uppercase font-bold text-outline tracking-wider bg-surface-container-lowest border-b border-outline-variant/20">
            <tr>
              <th className="py-3 px-4">Ward Sector</th>
              <th className="py-3 px-4">Sanitation Coverage</th>
              <th className="py-3 px-4">Active Staff</th>
              <th className="py-3 px-4">Pending Tickets</th>
              <th className="py-3 px-4">Avg Resolution Speed</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Intervention</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {wardsData.map((w, i) => (
              <tr key={i} className="hover:bg-surface-container-low transition-colors">
                <td className="py-3.5 px-4 font-bold text-on-surface">{w.ward}</td>
                <td className="py-3.5 px-4 font-mono">{w.coverage}</td>
                <td className="py-3.5 px-4">{w.activeStaff} Crews On-Duty</td>
                <td className="py-3.5 px-4 font-bold">{w.pendingTickets}</td>
                <td className="py-3.5 px-4 font-semibold text-primary">{w.avgSla}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    w.status === 'Optimal' ? 'bg-emerald-100 text-emerald-800' :
                    w.status === 'Warning' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {w.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => showToast(`Resource reinforcement triggered for ${w.ward}.`, 'info')}
                    className="px-3 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-[11px] font-bold"
                  >
                    Rebalance Crews
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
