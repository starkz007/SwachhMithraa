import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InteractiveMap } from '../../components/common/InteractiveMap';

export const WardGisAiDispatch = () => {
  const { tickets, workers, dispatchWorker, showToast } = useApp();
  const [selectedPendingTicket, setSelectedPendingTicket] = useState(null);
  const pendingTickets = tickets.filter(t => t.status === 'pending');
  const onDutyWorkers = workers.filter(w => w.dutyStatus === 'on_duty');

  const handleAutoDispatchAll = () => {
    let count = 0;
    pendingTickets.forEach((ticket, idx) => {
      const worker = onDutyWorkers[idx % onDutyWorkers.length] || workers[0];
      dispatchWorker(ticket.id, worker.id);
      count++;
    });
    showToast(`AI Engine auto-dispatched ${count} pending complaints to nearest active beat crews!`, 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Level Admin Bar */}
      <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-13 h-13 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-md shrink-0">
            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-on-surface">Suresh M. Gowda</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold font-mono">
                ADM-2041-W14
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                Tier-1 Ward Administrator
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Ward 14 • Indiranagar Colony Beat #04 | Total Coverage: 3.2 km² (Approx 14,800 Citizens)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleAutoDispatchAll}
            className="px-4 py-2.5 rounded-full bg-primary hover:bg-primary-deep text-on-primary text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-base">smart_toy</span>
            <span>Trigger AI Auto-Dispatch ({pendingTickets.length})</span>
          </button>

          <button
            type="button"
            onClick={() => showToast("Ward telemetry refreshed: 128 nodes, 4 vehicles, 12 staff in sync.", "info")}
            className="px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">sync</span>
            <span>Sync Telemetry</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] font-bold text-outline uppercase">Pending Complaints</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{pendingTickets.length}</div>
          <span className="text-[10px] text-outline">Action Required</span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] font-bold text-outline uppercase">Active Field Staff</span>
          <div className="text-2xl font-black text-on-surface mt-1">{onDutyWorkers.length}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">All Beats Covered</span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] font-bold text-outline uppercase">AI Camera Alerts</span>
          <div className="text-2xl font-black text-rose-600 mt-1">3</div>
          <span className="text-[10px] text-rose-700 font-semibold">Dumping Flagged</span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] font-bold text-outline uppercase">Clean Hotspots</span>
          <div className="text-2xl font-black text-primary mt-1">5</div>
          <span className="text-[10px] text-primary font-semibold">Zero Garbage Verified</span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs col-span-2 md:col-span-1">
          <span className="text-[11px] font-bold text-outline uppercase">Avg Dispatch SLA</span>
          <div className="text-2xl font-black text-secondary mt-1">24m</div>
          <span className="text-[10px] text-secondary font-semibold">Under 30m Target</span>
        </div>
      </div>

      {/* GIS Radar Map */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">radar</span>
            <span>Real-Time Ward GIS Radar & Operational Fleet</span>
          </h3>
          <span className="text-xs text-outline">Live GPS feed updating every 4s</span>
        </div>
        <InteractiveMap height="420px" />
      </div>

      {/* Pending Triage Queue */}
      <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-on-surface">Unassigned Grievances Dispatch Queue</h3>
            <p className="text-xs text-on-surface-variant">Click any ticket to manually assign to a sanitary worker</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            {pendingTickets.length} Unassigned
          </span>
        </div>

        {pendingTickets.length === 0 ? (
          <div className="text-center py-8 text-xs text-outline font-semibold">
            All complaints have been dispatched to field crews!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingTickets.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-primary">{t.id}</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                      {t.priority} Priority
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-on-surface">{t.title}</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">{t.location}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                  <span className="text-[11px] text-outline">SLA: {t.slaRemaining}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPendingTicket(t)}
                    className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-deep shadow-xs flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">hail</span>
                    <span>Assign Worker</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assign Modal */}
      {selectedPendingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div>
                <span className="text-xs font-mono font-bold text-primary">{selectedPendingTicket.id}</span>
                <h4 className="text-sm font-bold text-on-surface">Dispatch Field Worker</h4>
              </div>
              <button type="button" onClick={() => setSelectedPendingTicket(null)} className="p-1 rounded-full text-outline hover:text-on-surface">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-on-surface">Select On-Duty Sanitary Crew:</div>
              {onDutyWorkers.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => {
                    dispatchWorker(selectedPendingTicket.id, w.id);
                    setSelectedPendingTicket(null);
                  }}
                  className="w-full p-3 rounded-xl bg-surface-container-low hover:bg-primary/10 border border-outline-variant/30 hover:border-primary text-left flex items-center justify-between transition-colors group"
                >
                  <div>
                    <div className="font-bold text-xs text-on-surface group-hover:text-primary">{w.name}</div>
                    <div className="text-[11px] text-outline">{w.role} • {w.beat}</div>
                  </div>
                  <span className="material-symbols-outlined text-lg text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    send
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
