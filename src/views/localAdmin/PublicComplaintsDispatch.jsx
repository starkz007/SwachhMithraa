import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PublicComplaintsDispatch = () => {
  const { tickets, workers, dispatchWorker, showToast } = useApp();
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all'); // 'all' | 'citizen' | 'ai_camera'
  const [selectedTicket, setSelectedTicket] = useState(null);

  const filteredTickets = tickets.filter(t => {
    // 1. Status Filter
    const matchesStatus = statusFilter === 'all' ? true : t.status === statusFilter;

    // 2. Source Channel Filter
    const isAi = t.isAiDetection || t.source === 'ai_camera' || t.category?.includes('AI CCTV');
    const matchesSource = sourceFilter === 'all'
      ? true
      : sourceFilter === 'ai_camera'
      ? isAi
      : !isAi;

    return matchesStatus && matchesSource;
  });

  const aiCount = tickets.filter(t => t.isAiDetection || t.source === 'ai_camera' || t.category?.includes('AI CCTV')).length;
  const citizenCount = tickets.length - aiCount;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
              Municipal Triage Desk
            </span>
            <span className="text-xs text-outline font-medium">Ward 14 (Indiranagar) Command</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Public Complaints Triage & Dispatch Desk</h2>
          <p className="text-xs text-on-surface-variant">
            Triage complaints across both <strong>Citizen Grievances</strong> and <strong>AI Surveillance Cameras</strong>.
          </p>
        </div>

        {/* Source Channel Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-xl border border-outline-variant/30 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSourceFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                sourceFilter === 'all' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span>All Sources</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">{tickets.length}</span>
            </button>
            <button
              type="button"
              onClick={() => setSourceFilter('citizen')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                sourceFilter === 'citizen' ? 'bg-blue-700 text-white shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-sm">person</span>
              <span>Citizen ({citizenCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setSourceFilter('ai_camera')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                sourceFilter === 'ai_camera' ? 'bg-purple-700 text-white shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-sm">videocam</span>
              <span>AI Cameras ({aiCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Status Filter Sub-Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-outline">
          <span>Filter Status:</span>
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
            {['all', 'pending', 'in_progress', 'resolved'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                  statusFilter === s ? 'bg-surface-container-highest text-on-surface font-bold shadow-xs' : 'text-on-surface-variant'
                }`}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-outline font-mono">
          Showing <strong>{filteredTickets.length}</strong> of {tickets.length} total records
        </div>
      </div>

      {/* Complaints Table */}
      <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low border-b border-outline-variant/20 text-on-surface-variant uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Ticket ID</th>
                <th className="py-3.5 px-4">Channel / Source</th>
                <th className="py-3.5 px-4">Issue Description</th>
                <th className="py-3.5 px-4">Location / Beat</th>
                <th className="py-3.5 px-4">SLA Deadline</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Assigned To</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-outline">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50 block">inbox</span>
                    <span>No complaints found matching selected filters.</span>
                  </td>
                </tr>
              ) : (
                filteredTickets.map((t) => {
                  const isAi = t.isAiDetection || t.source === 'ai_camera' || t.category?.includes('AI CCTV');
                  return (
                    <tr key={t.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-primary">{t.id}</td>
                      
                      {/* Source Channel Badge */}
                      <td className="py-3.5 px-4">
                        {isAi ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 font-bold text-[10px] shadow-xs">
                            <span className="material-symbols-outlined text-xs text-purple-700">videocam</span>
                            <span>AI Camera #1402</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-semibold text-[10px]">
                            <span className="material-symbols-outlined text-xs text-blue-600">person</span>
                            <span>Citizen App</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-on-surface">{t.title}</div>
                        <div className="text-[11px] text-outline">{t.category}</div>
                      </td>
                      <td className="py-3.5 px-4 text-on-surface-variant">
                        <div>{t.location}</div>
                        <div className="text-[10px] text-outline">{t.beat}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-rose-700">{t.slaRemaining}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          t.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                          t.status === 'in_progress' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {t.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {t.assignedWorker ? (
                          <span className="font-bold text-on-surface">{t.assignedWorker.name}</span>
                        ) : (
                          <span className="text-outline italic">Unassigned</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {t.status === 'pending' ? (
                          <button
                            type="button"
                            onClick={() => setSelectedTicket(t)}
                            className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-[11px] font-bold hover:bg-primary-deep shadow-xs"
                          >
                            Dispatch Crew
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => showToast(`Ticket ${t.id} audit details loaded.`, 'info')}
                            className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-[11px] font-semibold"
                          >
                            Audit
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch Crew Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-primary">{selectedTicket.id}</span>
                  {selectedTicket.isAiDetection && (
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 text-[10px] font-bold">
                      AI OPTICAL CAMERA
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-on-surface">Assign Staff to Grievance</h4>
              </div>
              <button type="button" onClick={() => setSelectedTicket(null)} className="p-1 rounded-full text-outline hover:text-on-surface">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* Evidence Image Preview */}
            {selectedTicket.beforePhoto && (
              <div className="rounded-2xl overflow-hidden border border-outline-variant/40 h-36 bg-black relative">
                <img src={selectedTicket.beforePhoto} alt="Evidence" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-2 px-2 py-0.5 rounded bg-black/70 text-white font-mono text-[9px]">
                  {selectedTicket.isAiDetection ? 'SHA-256 Optical Tamper Seal' : 'Citizen Mobile Upload'}
                </span>
              </div>
            )}

            <div className="p-3 rounded-2xl bg-surface-container-low text-xs space-y-1 text-on-surface-variant">
              <div>Title: <strong className="text-on-surface">{selectedTicket.title}</strong></div>
              <div>Reported By: <strong>{selectedTicket.reportedBy}</strong></div>
              <div>Location: <strong>{selectedTicket.location}</strong></div>
            </div>

            {/* Available Sanitary Workers */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface">Select On-Duty Beat Worker:</label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {workers.map(w => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => {
                      dispatchWorker(selectedTicket.id, w.id);
                      setSelectedTicket(null);
                    }}
                    className="w-full p-2.5 rounded-xl border border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {w.name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-on-surface">{w.name}</div>
                        <div className="text-[10px] text-outline">{w.beat} • {w.shift}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {w.duty === 'on_duty' ? 'On Duty' : 'Standby'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedTicket(null)}
              className="w-full py-2.5 rounded-xl border border-outline-variant/40 text-on-surface-variant text-xs font-bold hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
