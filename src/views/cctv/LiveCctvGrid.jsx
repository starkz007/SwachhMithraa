import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const LiveCctvGrid = () => {
  const { cameraFleet, aiCameraAlerts, showToast } = useApp();
  const [gridLayout, setGridLayout] = useState('2x2'); // '2x2' | '3x3'
  const [selectedCam, setSelectedCam] = useState(null);

  const streams = [
    {
      id: "POLE-CAM-1401",
      location: "100ft Road North Junction",
      image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80",
      alert: { label: "Commercial Waste Dumping (94.8%)", bbox: { x: 30, y: 40, w: 35, h: 40 }, color: "border-rose-500 bg-rose-500/20" }
    },
    {
      id: "POLE-CAM-1402",
      location: "12th Main Food Street Market",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
      alert: { label: "Overflowing Bin Spillover (89.4%)", bbox: { x: 25, y: 35, w: 40, h: 45 }, color: "border-amber-500 bg-amber-500/20" }
    },
    {
      id: "POLE-CAM-1407",
      location: "CMH Metro Station Plaza",
      image: "https://images.unsplash.com/photo-1618060932014-4deda4932554?w=800&auto=format&fit=crop&q=80",
      alert: { label: "Open Burning Thermal Ping (97.2%)", bbox: { x: 50, y: 35, w: 30, h: 35 }, color: "border-red-600 bg-red-600/30" }
    },
    {
      id: "POLE-CAM-1412",
      location: "Defence Colony 6th Cross",
      image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800&auto=format&fit=crop&q=80",
      alert: null // Clean street!
    },
    {
      id: "POLE-CAM-1415",
      location: "Old Airport Road Flyover Substation",
      image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80",
      alert: { label: "Debris Dumping (91.0%)", bbox: { x: 20, y: 45, w: 40, h: 40 }, color: "border-amber-500 bg-amber-500/20" }
    },
    {
      id: "POLE-CAM-1418",
      location: "Indiranagar BDA Complex Rear",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
      alert: null
    }
  ];

  const displayedStreams = gridLayout === '2x2' ? streams.slice(0, 4) : streams;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Edge TPU Neural Detection
            </span>
            <span className="text-xs text-outline font-medium">Ward 80 - 88 Focus Cluster</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Live CCTV Streams & Real-Time AI Detection Grid</h2>
          <p className="text-xs text-on-surface-variant">
            Multi-camera feed with automated waste pileup bounding boxes, thermal fire triggers, and ANPR recognition
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-surface-container-low p-1 rounded-full border border-outline-variant/30">
            <button
              type="button"
              onClick={() => setGridLayout('2x2')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${gridLayout === '2x2' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant'}`}
            >
              <span className="material-symbols-outlined text-sm">grid_view</span>
              <span>2x2 Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setGridLayout('3x3')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${gridLayout === '3x3' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant'}`}
            >
              <span className="material-symbols-outlined text-sm">apps</span>
              <span>3x3 Grid</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => showToast("Edge optical scan triggered. All 128 nodes returned 100% telemetry.", "success")}
            className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base text-secondary">radar</span>
            <span>Quick Scan</span>
          </button>
        </div>
      </div>

      {/* Grid of Streams */}
      <div className={`grid gap-4 ${gridLayout === '2x2' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
        {displayedStreams.map((stream) => (
          <div
            key={stream.id}
            className="rounded-3xl bg-black overflow-hidden border border-outline-variant/40 shadow-md relative group flex flex-col justify-between"
            style={{ minHeight: '260px' }}
          >
            {/* Live Camera Image */}
            <img
              src={stream.image}
              alt={stream.id}
              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
            />

            {/* AI Bounding Box Overlay */}
            {stream.alert && (
              <div
                className={`absolute border-2 rounded-md ${stream.alert.color}`}
                style={{
                  left: `${stream.alert.bbox.x}%`,
                  top: `${stream.alert.bbox.y}%`,
                  width: `${stream.alert.bbox.w}%`,
                  height: `${stream.alert.bbox.h}%`
                }}
              >
                <div className="absolute -top-6 left-0 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[10px] font-bold whitespace-nowrap">
                  {stream.alert.label}
                </div>
              </div>
            )}

            {/* Top Stream Header */}
            <div className="relative z-10 p-3 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span className="font-mono font-bold">{stream.id}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-mono">
                30 FPS • 4K
              </span>
            </div>

            {/* Bottom Stream Footer */}
            <div className="relative z-10 p-3 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-xs text-white">
              <div className="truncate pr-2">
                <div className="font-bold text-xs truncate">{stream.location}</div>
                <div className="text-[10px] text-gray-300">
                  {stream.alert ? '⚠️ AI Flagged Violation' : '🟢 Area Clean'}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCam(stream);
                  showToast(`Selected ${stream.id} for full optical inspection.`, 'info');
                }}
                className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-[11px] font-bold shrink-0 transition-colors"
              >
                Inspect & PTZ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
