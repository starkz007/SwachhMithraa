import React from 'react';
import { InteractiveMap } from '../../components/common/InteractiveMap';
import { useApp } from '../../context/AppContext';

export const LocalityGisRadar = () => {
  const { smartBins, workers } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
              IoT Optical & Sensor Telemetry
            </span>
            <span className="text-xs text-outline font-medium">Ward 14 Infrastructure</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Locality GIS Radar & Smart Asset Telemetry</h2>
          <p className="text-xs text-on-surface-variant">
            Live ultrasonic smart bin fill states, sweeper geofences, and fleet vector telemetry
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-bold text-primary">4 / 4 Smart Bins Synced</div>
            <div className="text-[11px] text-outline">Ultrasonic Battery: 94% Avg</div>
          </div>
        </div>
      </div>

      {/* Radar Map */}
      <InteractiveMap height="450px" />

      {/* Smart Bins Live Sensor Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-on-surface">Ultrasonic Sensor Bin Fill Telemetry</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {smartBins.map((bin) => {
            const isCritical = bin.fillPercent > 80;
            const isWarning = bin.fillPercent > 50 && bin.fillPercent <= 80;
            const color = isCritical ? 'text-rose-700 bg-rose-50 border-rose-200' : isWarning ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200';

            return (
              <div
                key={bin.id}
                className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">{bin.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${color}`}>
                    {bin.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-on-surface">{bin.location}</h4>
                  <p className="text-[11px] text-outline">{bin.type}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-outline">Fill Level</span>
                    <span className="font-black text-on-surface">{bin.fillPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isCritical ? 'bg-rose-600' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${bin.fillPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
