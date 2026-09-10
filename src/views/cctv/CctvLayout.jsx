import React from 'react';
import { useApp } from '../../context/AppContext';
import { CctvCommandHub } from './CctvCommandHub';
import { LiveCctvGrid } from './LiveCctvGrid';
import { IncidentEvidenceVault } from './IncidentEvidenceVault';
import { CameraFleetTelemetry } from './CameraFleetTelemetry';
import { AiRuleEngineSettings } from './AiRuleEngineSettings';
import { LiveCameraSurveillance } from './LiveCameraSurveillance';

export const CctvLayout = () => {
  const { activeTab, setTab, aiCameraAlerts } = useApp();

  const navItems = [
    { id: 'cctv-command-hub', label: 'Command Hub Overview', icon: 'hub' },
    { id: 'live-camera-surveillance', label: 'Live Mobile / USB Camera', icon: 'photo_camera_front', badge: 'LIVE AI' },
    { id: 'live-cctv-stream-ai-detection-grid', label: 'Live Stream & AI Grid', icon: 'grid_view' },
    { id: 'incident-playback-evidence-vault', label: 'Evidence Vault', icon: 'video_library', badge: aiCameraAlerts.length },
    { id: 'camera-fleet-pole-telemetry', label: 'Camera Telemetry & PTZ', icon: 'settings_input_antenna' },
    { id: 'ai-rule-engine-automation', label: 'AI Rules & Triggers', icon: 'tune' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row pb-20">
      <aside className="w-full md:w-64 bg-surface-container-lowest border-r border-outline-variant/30 shrink-0 p-4 space-y-4">
        <div className="px-2 py-1 flex items-center justify-between">
          <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">CCTV Ops Enclave</span>
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
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

        {/* IoT Gateway status */}
        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-outline uppercase text-[10px] font-bold">IoT Optical Gateway</span>
            <span className="text-secondary font-bold text-[11px]">Online</span>
          </div>
          <p className="text-[11px] text-on-surface-variant">Airtel Optical Backbone • Dual SIM</p>
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {activeTab === 'live-camera-surveillance' ? (
          <LiveCameraSurveillance />
        ) : activeTab === 'live-cctv-stream-ai-detection-grid' ? (
          <LiveCctvGrid />
        ) : activeTab === 'incident-playback-evidence-vault' ? (
          <IncidentEvidenceVault />
        ) : activeTab === 'camera-fleet-pole-telemetry' ? (
          <CameraFleetTelemetry />
        ) : activeTab === 'ai-rule-engine-automation' ? (
          <AiRuleEngineSettings />
        ) : (
          <CctvCommandHub />
        )}
      </main>
    </div>
  );
};
