import React from 'react';
import { useApp } from '../../context/AppContext';
import { WardGisAiDispatch } from './WardGisAiDispatch';
import { PublicComplaintsDispatch } from './PublicComplaintsDispatch';
import { WorkerRosterAssign } from './WorkerRosterAssign';
import { BlackspotHeatmap } from './BlackspotHeatmap';
import { AiCameraTickets } from './AiCameraTickets';
import { LocalityGisRadar } from './LocalityGisRadar';

export const LocalAdminLayout = () => {
  const { activeTab, setTab, tickets, aiCameraAlerts } = useApp();
  const pendingCount = tickets.filter(t => t.status === 'pending').length;
  const aiViolationsCount = Array.isArray(aiCameraAlerts) ? aiCameraAlerts.length : 0;

  const navItems = [
    { id: 'ward-gis-dispatch', label: 'Ward GIS & AI Dispatch', icon: 'map' },
    { id: 'public-complaints-dispatch', label: 'Public Complaints Triage', icon: 'assignment_turned_in', badge: pendingCount > 0 ? pendingCount : null },
    { id: 'ai-camera-tickets', label: 'AI Camera Tickets', icon: 'videocam', badge: aiViolationsCount > 0 ? aiViolationsCount : null },
    { id: 'worker-roster-assign', label: 'Worker Roster & Assign', icon: 'groups' },
    { id: 'blackspot-heatmap', label: 'Blackspot Heatmap', icon: 'local_fire_department' },
    { id: 'locality-gis-radar', label: 'Locality GIS Radar', icon: 'radar' },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row pb-20">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-surface-container-low border-r border-outline-variant/30 shrink-0 p-4 space-y-4">
        <div className="px-2 py-1 text-[11px] font-bold text-outline uppercase tracking-wider">
          Ward 14 Beat Operations
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${isActive ? 'bg-primary text-on-primary shadow-sm font-bold' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-white text-primary' : 'bg-primary/10 text-primary'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mini Resolution Meter */}
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-outline">Beat SLA Compliance</span>
            <span className="font-bold text-primary">94.2%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '94.2%' }}></div>
          </div>
          <div className="text-[10px] text-outline">Target: &gt; 90% in Zone 3</div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {activeTab === 'public-complaints-dispatch' ? (
          <PublicComplaintsDispatch />
        ) : activeTab === 'ai-camera-tickets' ? (
          <AiCameraTickets />
        ) : activeTab === 'worker-roster-assign' ? (
          <WorkerRosterAssign />
        ) : activeTab === 'blackspot-heatmap' ? (
          <BlackspotHeatmap />
        ) : activeTab === 'locality-gis-radar' ? (
          <LocalityGisRadar />
        ) : (
          <WardGisAiDispatch />
        )}
      </main>
    </div>
  );
};
