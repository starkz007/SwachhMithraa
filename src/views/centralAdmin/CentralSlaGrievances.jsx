import React from 'react';
import { useApp } from '../../context/AppContext';

export const CentralSlaGrievances = () => {
  const { tickets } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-on-surface">City-Scale SLA Grievance Audit & Analytics</h2>
          <p className="text-xs text-on-surface-variant">
            Ministerial and Commissioner oversight dashboard on citizen grievance resolutions
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-emerald-700">96.8% In-SLA Rate</div>
          <div className="text-xs text-outline">Mandatory Target: 95%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-xs space-y-1">
          <span className="text-outline">Total Filed This Month</span>
          <div className="text-2xl font-black text-on-surface">1,482</div>
          <span className="text-emerald-700 font-semibold">1,435 Resolved</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-xs space-y-1">
          <span className="text-outline">Average First-Response</span>
          <div className="text-2xl font-black text-primary">14 mins</div>
          <span className="text-outline">Automated SMS acknowledgment</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-xs space-y-1">
          <span className="text-outline">Average Field Resolution</span>
          <div className="text-2xl font-black text-secondary">3h 40m</div>
          <span className="text-emerald-700 font-semibold">Well under 24h SLA</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-xs space-y-1">
          <span className="text-outline">Citizen Satisfaction Score</span>
          <div className="text-2xl font-black text-amber-500">4.8 / 5.0</div>
          <span className="text-outline">Based on 980+ ratings</span>
        </div>
      </div>

      {/* Recent High Priority Grievances */}
      <div className="rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm p-5 space-y-3">
        <h3 className="text-sm font-bold text-on-surface">Live Municipal Feed</h3>
        <div className="space-y-2 text-xs">
          {tickets.map(t => (
            <div key={t.id} className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-primary mr-2">{t.id}</span>
                <span className="font-bold text-on-surface">{t.title}</span>
                <span className="text-outline ml-2">({t.location})</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${t.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {t.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
