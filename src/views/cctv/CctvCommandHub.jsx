import React from 'react';
import { useApp } from '../../context/AppContext';
import { InteractiveMap } from '../../components/common/InteractiveMap';

export const CctvCommandHub = () => {
  const { cameraFleet, aiCameraAlerts, showToast } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              CCTV Operations Enclave
            </span>
            <span className="text-xs text-outline font-medium">128 / 128 Nodes Online</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">SwachhMitra AI Vision Command Room</h2>
          <p className="text-xs text-on-surface-variant">
            Metropolitan edge camera telemetry, thermal anomaly indicators, and automated violation dispatches
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast("Emergency sanitary broadcast transmitted across all optical speakers.", "error")}
          className="px-4 py-2.5 rounded-full bg-error text-on-error text-xs font-bold shadow-md hover:opacity-90 flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">campaign</span>
          <span>Emergency Broadcast</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs font-bold text-outline uppercase">Active Cameras</span>
          <div className="text-3xl font-black text-primary mt-1">128 Live</div>
          <span className="text-xs text-emerald-700 font-semibold">0 Offline across sector</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs font-bold text-outline uppercase">Detections Today</span>
          <div className="text-3xl font-black text-amber-700 mt-1">{aiCameraAlerts.length * 11} Spots</div>
          <span className="text-xs text-outline font-medium">28 auto-dispatched</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs font-bold text-outline uppercase">AI Accuracy</span>
          <div className="text-3xl font-black text-emerald-700 mt-1">96.4%</div>
          <span className="text-xs text-emerald-600 font-semibold">FP16 Neural Model</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <span className="text-xs font-bold text-outline uppercase">Stream Latency</span>
          <div className="text-3xl font-black text-secondary mt-1">42 ms</div>
          <span className="text-xs text-secondary font-semibold">Optical Ring Backbone</span>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-on-surface">CCTV Camera Geographic Distribution & Optical Line-of-Sight</h3>
        <InteractiveMap height="400px" />
      </div>
    </div>
  );
};
