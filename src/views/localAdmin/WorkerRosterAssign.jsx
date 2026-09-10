import React from 'react';
import { useApp } from '../../context/AppContext';

export const WorkerRosterAssign = () => {
  const { workers, toggleWorkerDuty, showToast } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-on-surface">Sanitation Workforce Roster & Beat Allocation</h2>
          <p className="text-xs text-on-surface-variant">
            Manage attendance, toggle shift states, and rebalance daily beat sectors
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast("Added 2 seasonal sweepers to Beat #4 roster.", "success")}
          className="px-4 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-deep shadow-md flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">person_add</span>
          <span>Enroll New Beat Staff</span>
        </button>
      </div>

      <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-container-low border-b border-outline-variant/20 text-on-surface-variant uppercase text-[10px] font-bold tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Staff Member</th>
              <th className="py-3.5 px-4">Role & Cadre</th>
              <th className="py-3.5 px-4">Assigned Beat Sector</th>
              <th className="py-3.5 px-4">Duty Status</th>
              <th className="py-3.5 px-4">Performance</th>
              <th className="py-3.5 px-4 text-right">Duty Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {workers.map((w) => {
              const isOnDuty = w.dutyStatus === 'on_duty';

              return (
                <tr key={w.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-xs">
                        {w.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-on-surface">{w.name}</div>
                        <div className="text-[11px] text-outline font-mono">{w.id} • {w.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-on-surface font-medium">{w.role}</td>
                  <td className="py-3.5 px-4 text-on-surface-variant font-medium">{w.beat}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${isOnDuty ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {isOnDuty ? 'ON DUTY (Active)' : 'OFF DUTY'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-amber-600 font-bold">⭐ {w.rating}</span>
                    <span className="text-outline text-[11px] ml-1">({w.tasksCompletedToday} tasks)</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleWorkerDuty(w.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isOnDuty ? 'bg-rose-100 hover:bg-rose-200 text-rose-800' : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'}`}
                    >
                      {isOnDuty ? 'Mark Off-Duty' : 'Clock In Duty'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
