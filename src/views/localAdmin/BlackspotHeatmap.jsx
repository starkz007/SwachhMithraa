import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InteractiveMap } from '../../components/common/InteractiveMap';

export const BlackspotHeatmap = () => {
  const { blackspots, showToast } = useApp();
  const [selectedSpot, setSelectedSpot] = useState(null);

  const handleScheduleDrive = (spot) => {
    showToast(`Special Cleanliness Drive scheduled for ${spot.name}! JCB & 6 sweepers assigned for tomorrow 06:00 AM.`, 'success');
    setSelectedSpot(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
              Chronic Vulnerability Radar
            </span>
            <span className="text-xs text-outline font-medium">3 Blackspots Active</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Chronic Waste Dump Blackspot Heatmap</h2>
          <p className="text-xs text-on-surface-variant">
            AI-modeled recurring dumping hotspots, severity indexes, and intensive mitigation drives
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast("Special anti-dumping night surveillance team dispatched.", "info")}
          className="px-4 py-2.5 rounded-full bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">nightlight</span>
          <span>Deploy Night Anti-Dumping Squad</span>
        </button>
      </div>

      {/* Heatmap Section */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-on-surface">Spatial Vulnerability Dispersion</h3>
        <InteractiveMap height="380px" />
      </div>

      {/* Blackspots List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blackspots.map((spot) => (
          <div
            key={spot.id}
            className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-rose-700">{spot.id}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                  {spot.severity}
                </span>
              </div>
              <h4 className="font-bold text-base text-on-surface">{spot.name}</h4>
              
              <div className="text-xs space-y-1 text-on-surface-variant">
                <div>Average Dump: <strong>{spot.dumpVolume}</strong></div>
                <div>Clearance Cadence: <strong>{spot.clearanceCadence}</strong></div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedSpot(spot)}
              className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-deep text-on-primary text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-base">event</span>
              <span>Schedule Cleanliness Drive</span>
            </button>
          </div>
        ))}
      </div>

      {/* Drive Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <h4 className="text-base font-bold text-on-surface">Schedule Special Cleanup Drive</h4>
              <button type="button" onClick={() => setSelectedSpot(null)} className="p-1 text-outline hover:text-on-surface">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div>
              <p className="text-on-surface font-semibold mb-2">Location: {selectedSpot.name}</p>
              <div className="space-y-2">
                <label className="block font-bold text-outline">Mobilize Resources:</label>
                <div className="p-3 rounded-xl bg-surface-container-low border space-y-1">
                  <div>🚜 1x Municipal Backhoe Loader (JCB)</div>
                  <div>🚛 2x 10-Tonne Tipper Dumpers</div>
                  <div>🧹 6x Sanitary Sweepers & Lime Spray Squad</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedSpot(null)}
                className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleScheduleDrive(selectedSpot)}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary font-bold shadow-md hover:bg-primary-deep"
              >
                Confirm & Dispatch Drive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
