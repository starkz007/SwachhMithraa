import React from 'react';
import { useApp } from '../../context/AppContext';
import { ZonalTelemetry } from './ZonalTelemetry';
import { WasteReports } from './WasteReports';
import { InterWardEscalations } from './InterWardEscalations';
import { ZonalGisExplorer } from './ZonalGisExplorer';
import { CameraInfraHealth } from './CameraInfraHealth';

export const ZonalAdminLayout = () => {
  const { activeTab, setTab } = useApp();

  const navItems = [
    { id: 'command-locality-telemetry', label: 'Zonal Command Telemetry', icon: 'speed' },
    { id: 'waste-collection-reports', label: 'Waste Segregation Reports', icon: 'bar_chart' },
    { id: 'inter-ward-escalations', label: 'Inter-Ward Escalations', icon: 'notification_important', badge: '2' },
    { id: 'locality-ward-gis-explorer', label: 'Locality Ward GIS Explorer', icon: 'travel_explore' },
    { id: 'ai-camera-infra-health', label: 'Camera Infrastructure Health', icon: 'solar_power' },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row pb-20">
      <aside className="w-full md:w-64 bg-surface-container-low border-r border-outline-variant/30 shrink-0 p-4 space-y-4">
        <div className="px-2 py-1 text-[11px] font-bold text-outline uppercase tracking-wider">
          Zone 3 Command Hub
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
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-white text-primary' : 'bg-rose-100 text-rose-800'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {activeTab === 'waste-collection-reports' ? (
          <WasteReports />
        ) : activeTab === 'inter-ward-escalations' ? (
          <InterWardEscalations />
        ) : activeTab === 'locality-ward-gis-explorer' ? (
          <ZonalGisExplorer />
        ) : activeTab === 'ai-camera-infra-health' ? (
          <CameraInfraHealth />
        ) : (
          <ZonalTelemetry />
        )}
      </main>
    </div>
  );
};
