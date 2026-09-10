import React from 'react';
import { useApp } from '../../context/AppContext';
import { ApexOversight } from './ApexOversight';
import { InterZoneLeaderboard } from './InterZoneLeaderboard';
import { WasteDiversion } from './WasteDiversion';
import { CentralSlaGrievances } from './CentralSlaGrievances';
import { CriticalInterventions } from './CriticalInterventions';
import { DirectivesGazettes } from './DirectivesGazettes';

export const CentralAdminLayout = () => {
  const { activeTab, setTab } = useApp();

  const navItems = [
    { id: 'apex-inter-zone-oversight', label: 'Apex Oversight Hub', icon: 'corporate_fare' },
    { id: 'inter-zone-leaderboard', label: 'Inter-Zone Leaderboard', icon: 'leaderboard' },
    { id: 'waste-diversion', label: 'Waste Diversion & Circular Econ', icon: 'recycling' },
    { id: 'grievances-sla', label: 'City-Scale SLA Audit', icon: 'analytics' },
    { id: 'critical-interventions', label: 'Critical Interventions (Crisis)', icon: 'emergency_home' },
    { id: 'directives-gazettes', label: 'Directives & Gazette Publisher', icon: 'newspaper' },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row pb-20">
      <aside className="w-full md:w-64 bg-surface-container-low border-r border-outline-variant/30 shrink-0 p-4 space-y-4">
        <div className="px-2 py-1 text-[11px] font-bold text-outline uppercase tracking-wider">
          Metropolitan Central Apex
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
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {activeTab === 'inter-zone-leaderboard' ? (
          <InterZoneLeaderboard />
        ) : activeTab === 'waste-diversion' ? (
          <WasteDiversion />
        ) : activeTab === 'grievances-sla' ? (
          <CentralSlaGrievances />
        ) : activeTab === 'critical-interventions' ? (
          <CriticalInterventions />
        ) : activeTab === 'directives-gazettes' ? (
          <DirectivesGazettes />
        ) : (
          <ApexOversight />
        )}
      </main>
    </div>
  );
};
