import React from 'react';
import { useApp } from '../../context/AppContext';

export const CameraInfraHealth = () => {
  const { cameraFleet, showToast } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
              Optical & Solar Telemetry
            </span>
            <span className="text-xs text-outline font-medium">Edge TPU Grid</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">AI Camera Fleet Pole Telemetry & Health</h2>
          <p className="text-xs text-on-surface-variant">
            Solar panel wattage, battery storage state-of-charge, dual 5G/optical uplink, and lens wiper diagnostics
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast("Optical self-cleaning cycle triggered for all sector cameras.", "success")}
          className="px-4 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-deep shadow-md flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">cleaning_bucket</span>
          <span>Trigger Optical Wipe Cycle</span>
        </button>
      </div>

      {/* Fleet Diagnostics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cameraFleet.map((cam) => (
          <div
            key={cam.id}
            className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-primary">{cam.id}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {cam.status}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-sm text-on-surface">{cam.location}</h4>
              <p className="text-[11px] text-outline font-mono mt-0.5">{cam.resolution} • {cam.fps} FPS</p>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-outline">Solar Charge:</span>
                  <span className="font-bold text-emerald-700">{cam.solarCharge}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: cam.solarCharge }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-outline">Battery Health:</span>
                  <span className="font-bold text-primary">{cam.batteryHealth}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: cam.batteryHealth }}></div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs">
              <span className="text-outline">PTZ Pan/Tilt:</span>
              <span className="font-bold text-on-surface">{cam.ptzAvailable ? '✅ Ready' : 'Fixed Lens'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
