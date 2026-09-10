import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const CameraFleetTelemetry = () => {
  const { cameraFleet, showToast } = useApp();
  const [selectedCam, setSelectedCam] = useState(cameraFleet[0]);
  const [ptzZoom, setPtzZoom] = useState(1);

  const handlePtzMove = (direction) => {
    showToast(`PTZ Motor Pan/Tilt adjusted [${direction}] for ${selectedCam.id}`, 'info');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-on-surface">Camera Fleet Pole Telemetry & PTZ Control</h2>
          <p className="text-xs text-on-surface-variant">
            Live pan-tilt-zoom optical control, solar charge, and cellular transmission telemetry
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* PTZ Visual Feed & Controls */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-3xl bg-black overflow-hidden border border-outline-variant/40 shadow-xl" style={{ height: '380px' }}>
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80"
              alt="Live PTZ"
              className="w-full h-full object-cover transition-transform duration-300"
              style={{ transform: `scale(${ptzZoom})` }}
            />

            <div className="absolute top-3 left-4 px-3 py-1 rounded-md bg-black/70 text-white font-mono text-xs">
              LIVE PTZ: {selectedCam.id} ({selectedCam.location})
            </div>

            <div className="absolute top-3 right-4 px-3 py-1 rounded-md bg-black/70 text-cyan-300 font-mono text-xs">
              ZOOM: {ptzZoom}x OPTICAL
            </div>

            {/* Virtual Directional Pad */}
            <div className="absolute bottom-4 right-4 p-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={() => handlePtzMove('UP')}
                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/40 flex items-center justify-center text-white"
              >
                ▲
              </button>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handlePtzMove('LEFT')}
                  className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/40 flex items-center justify-center text-white"
                >
                  ◀
                </button>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/30 flex items-center justify-center text-cyan-300 text-xs font-bold">
                  PTZ
                </div>
                <button
                  type="button"
                  onClick={() => handlePtzMove('RIGHT')}
                  className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/40 flex items-center justify-center text-white"
                >
                  ▶
                </button>
              </div>
              <button
                type="button"
                onClick={() => handlePtzMove('DOWN')}
                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/40 flex items-center justify-center text-white"
              >
                ▼
              </button>
            </div>
          </div>

          {/* Zoom Slider */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between gap-4 text-xs">
            <span className="font-bold text-on-surface">Optical Zoom Magnification:</span>
            <input
              type="range"
              min="1"
              max="4"
              step="0.5"
              value={ptzZoom}
              onChange={(e) => setPtzZoom(Number(e.target.value))}
              className="flex-1 accent-primary"
            />
            <span className="font-black text-primary font-mono">{ptzZoom}x</span>
          </div>
        </div>

        {/* Selected Camera Details */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
            <div className="font-bold text-sm text-on-surface">Pole Sensor Diagnostics</div>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-outline">Solar Output:</span>
                <span className="font-bold text-emerald-700">142 W (Clear Sky)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">LiFePO4 Storage:</span>
                <span className="font-bold text-primary">{selectedCam.batteryHealth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">4G LTE Cellular Link:</span>
                <span className="font-bold text-secondary">Airtel Dual-SIM (44 Mbps)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Edge AI TPU Latency:</span>
                <span className="font-bold text-on-surface">18 ms inference</span>
              </div>
            </div>
          </div>

          {/* Selector list */}
          <div className="p-4 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-2">
            <div className="text-xs font-bold text-outline uppercase tracking-wider">Select Pole Node</div>
            <div className="space-y-1">
              {cameraFleet.map(cam => (
                <button
                  key={cam.id}
                  type="button"
                  onClick={() => setSelectedCam(cam)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex flex-col gap-0.5 ${selectedCam.id === cam.id ? 'bg-primary text-on-primary font-bold' : 'hover:bg-surface-container-low text-on-surface'}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{cam.id}</span>
                    <span className="text-[10px] font-mono opacity-80">{cam.fps} FPS</span>
                  </div>
                  <div className="text-[11px] font-normal opacity-90 truncate">{cam.location}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
