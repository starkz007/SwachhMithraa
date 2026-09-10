import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const InterWardEscalations = () => {
  const { showToast } = useApp();
  const [escalations, setEscalations] = useState([
    { id: "ESC-Z3-01", ward: "Ward 18 (Jeevanbheemanagar)", breachType: "SLA Breach > 4h (Clogged Main Culvert)", severity: "Critical Red", assignedTo: "Local Admin W18", status: "Open Escalation", timeElapsed: "4h 22m" },
    { id: "ESC-Z3-02", ward: "Ward 15 (Domlur)", breachType: "Compactor Truck Breakdown on Ring Road", severity: "High Amber", assignedTo: "Zonal Mechanical Fleet", status: "En Route Repair", timeElapsed: "1h 45m" },
    { id: "ESC-Z3-03", ward: "Ward 12 (Ulsoor)", breachType: "Festival Garland & Floral Dump near Lake", severity: "High Amber", assignedTo: "Special Lake Squad", status: "Resolved", timeElapsed: "Closed" }
  ]);

  const handleResolve = (id) => {
    setEscalations(prev => prev.map(e => e.id === id ? { ...e, status: 'Resolved' } : e));
    showToast(`Escalation ${id} resolved via inter-ward emergency reserve crew deployment!`, 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
              Zonal Tier-2 SLA Monitoring
            </span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Inter-Ward Escalations & Emergency Rebalancing</h2>
          <p className="text-xs text-on-surface-variant">
            Triaging grievances that exceed local ward SLA limits or require mechanized reinforcements
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast("Zonal Rapid Action Sanitary Team put on active alert.", "info")}
          className="px-4 py-2.5 rounded-full bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">emergency_share</span>
          <span>Deploy Rapid Action Reserve</span>
        </button>
      </div>

      <div className="space-y-4">
        {escalations.map((esc) => {
          const isClosed = esc.status === 'Resolved';

          return (
            <div
              key={esc.id}
              className={`p-5 rounded-3xl border shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isClosed ? 'bg-surface-container-lowest border-outline-variant/30 opacity-75' : 'bg-surface-container-lowest border-rose-300 shadow-md'
              }`}
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-rose-700">{esc.id}</span>
                  <span className="text-outline">•</span>
                  <span className="font-bold text-on-surface">{esc.ward}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isClosed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {esc.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-on-surface">{esc.breachType}</h3>
                <div className="text-xs text-on-surface-variant flex items-center gap-2">
                  <span>Assigned Unit: <strong>{esc.assignedTo}</strong></span>
                  <span>•</span>
                  <span className="text-rose-700 font-semibold">Time Elapsed: {esc.timeElapsed}</span>
                </div>
              </div>

              <div className="shrink-0">
                {!isClosed ? (
                  <button
                    type="button"
                    onClick={() => handleResolve(esc.id)}
                    className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-deep text-on-primary text-xs font-bold shadow-md flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">swap_driving_apps</span>
                    <span>Reallocate 4 Crews & Resolve</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Resolved under Zonal Command</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
