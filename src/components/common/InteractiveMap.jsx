import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const InteractiveMap = ({ mode = "full", height = "500px", onMarkerClick = null }) => {
  const { smartBins, blackspots, cameraFleet, tickets } = useApp();
  const [activeLayers, setActiveLayers] = useState({
    trucks: true,
    bins: true,
    cameras: true,
    blackspots: true,
    complaints: true
  });

  const [selectedItem, setSelectedItem] = useState(null);

  // Moving Garbage Truck simulation
  const [truckPos, setTruckPos] = useState({ x: 320, y: 180, angle: 45, step: 0 });

  const routePoints = [
    { x: 180, y: 120, label: "Depot #4 Start" },
    { x: 260, y: 150, label: "12th Cross Park" },
    { x: 380, y: 190, label: "100ft Road Junction" },
    { x: 520, y: 240, label: "CMH Road Metro" },
    { x: 620, y: 310, label: "80ft Road Market" },
    { x: 490, y: 390, label: "Defence Colony Gate" },
    { x: 310, y: 340, label: "BDA Complex Transfer" },
    { x: 180, y: 220, label: "Return Loop" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTruckPos(prev => {
        const nextStep = (prev.step + 1) % routePoints.length;
        const target = routePoints[nextStep];
        return {
          x: target.x,
          y: target.y,
          angle: (prev.angle + 30) % 360,
          step: nextStep
        };
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleLayer = (layer) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-outline-variant/30 shadow-md bg-[#0e1726] text-white select-none" style={{ height }}>
      {/* Top Map Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Layer Toggles */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 pointer-events-auto shadow-lg">
          <button
            type="button"
            onClick={() => toggleLayer('trucks')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-colors ${activeLayers.trucks ? 'bg-secondary text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-sm">local_shipping</span>
            <span>Live Tippers (1 Active)</span>
          </button>

          <button
            type="button"
            onClick={() => toggleLayer('bins')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-colors ${activeLayers.bins ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            <span>IoT Bins ({smartBins.length})</span>
          </button>

          <button
            type="button"
            onClick={() => toggleLayer('cameras')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-colors ${activeLayers.cameras ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-sm">videocam</span>
            <span>AI CCTV ({cameraFleet.length})</span>
          </button>

          <button
            type="button"
            onClick={() => toggleLayer('blackspots')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-colors ${activeLayers.blackspots ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-sm">local_fire_department</span>
            <span>Blackspots ({blackspots.length})</span>
          </button>
        </div>

        {/* Live GPS Telemetry Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-cyan-300 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>GIS RADAR: WARD-14 LIVE (12.9716° N, 77.6412° E)</span>
        </div>
      </div>

      {/* SVG Canvas Map Surface */}
      <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#006970" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#006970" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="blackspotHeat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#ef4444" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Background Grid & Ambient Landmass */}
        <rect width="100%" height="100%" fill="#0b1320" />
        <rect width="100%" height="100%" fill="url(#gridPattern)" />

        {/* Ward Boundary Polygon */}
        <polygon 
          points="100,80 340,60 720,110 760,420 540,460 210,440 90,320" 
          fill="#002e87" 
          fillOpacity="0.07" 
          stroke="#006970" 
          strokeWidth="2" 
          strokeDasharray="6,4"
        />

        {/* Ward Roads Network */}
        <g stroke="rgba(255,255,255,0.18)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* 100ft Road */}
          <path d="M 120,90 Q 350,140 700,260" stroke="#334155" strokeWidth="10" />
          <path d="M 120,90 Q 350,140 700,260" stroke="#94a3b8" strokeWidth="2" strokeDasharray="8,6" />
          
          {/* CMH Road */}
          <path d="M 280,70 L 480,450" stroke="#334155" strokeWidth="8" />
          
          {/* 80ft Road & Cross Streets */}
          <path d="M 150,300 L 680,210" stroke="#1e293b" strokeWidth="6" />
          <path d="M 380,180 L 650,390" stroke="#1e293b" strokeWidth="6" />
          <path d="M 220,150 L 260,380" stroke="#1e293b" strokeWidth="5" />
        </g>

        {/* Metro Viaduct Line */}
        <path d="M 100,160 L 740,320" stroke="#38bdf8" strokeWidth="3" strokeDasharray="10,6" fill="none" opacity="0.6" />

        {/* Landmark Labels */}
        <text x="140" y="105" fill="#64748b" fontSize="11" fontWeight="bold">100 FT ROAD NORTH</text>
        <text x="520" y="270" fill="#64748b" fontSize="11" fontWeight="bold">CMH METRO HUB</text>
        <text x="280" y="360" fill="#64748b" fontSize="11" fontWeight="bold">12TH MAIN COMMERCIAL</text>
        <text x="490" y="420" fill="#64748b" fontSize="11" fontWeight="bold">DEFENCE COLONY</text>

        {/* Planned Truck Route Path */}
        {activeLayers.trucks && (
          <g>
            <polyline
              points={routePoints.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
              strokeDasharray="4,4"
              opacity="0.7"
            />
          </g>
        )}

        {/* Blackspot Heat Circles */}
        {activeLayers.blackspots && blackspots.map((b, i) => {
          const coords = [
            { x: 260, y: 150 },
            { x: 500, y: 250 },
            { x: 420, y: 340 }
          ][i % 3];
          return (
            <g 
              key={b.id} 
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setSelectedItem({ type: 'Blackspot', ...b })}
            >
              <circle cx={coords.x} cy={coords.y} r="36" fill="url(#blackspotHeat)" className="animate-pulse" />
              <circle cx={coords.x} cy={coords.y} r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              <text x={coords.x + 12} y={coords.y + 4} fill="#fca5a5" fontSize="10" fontWeight="bold">
                {b.name}
              </text>
            </g>
          );
        })}

        {/* Smart IoT Bins */}
        {activeLayers.bins && smartBins.map((bin, idx) => {
          const coords = [
            { x: 280, y: 170 },
            { x: 480, y: 220 },
            { x: 610, y: 290 },
            { x: 360, y: 380 }
          ][idx % 4];

          const color = bin.fillPercent > 80 ? '#ef4444' : bin.fillPercent > 50 ? '#f59e0b' : '#10b981';

          return (
            <g 
              key={bin.id} 
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => setSelectedItem({ type: 'Smart Bin', ...bin })}
            >
              <circle cx={coords.x} cy={coords.y} r="10" fill="#1e293b" stroke={color} strokeWidth="2" />
              <circle cx={coords.x} cy={coords.y} r="5" fill={color} />
              <text x={coords.x - 12} y={coords.y - 12} fill="#ffffff" fontSize="9" fontWeight="bold">
                {bin.fillPercent}%
              </text>
            </g>
          );
        })}

        {/* AI CCTV Pole Cameras */}
        {activeLayers.cameras && cameraFleet.map((cam, idx) => {
          const coords = [
            { x: 190, y: 130 },
            { x: 370, y: 190 },
            { x: 530, y: 260 },
            { x: 320, y: 330 }
          ][idx % 4];

          return (
            <g 
              key={cam.id} 
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => setSelectedItem({ type: 'CCTV Camera', ...cam })}
            >
              <circle cx={coords.x} cy={coords.y} r="12" fill="#0284c7" fillOpacity="0.3" className="animate-ping-slow" />
              <circle cx={coords.x} cy={coords.y} r="8" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
              <text x={coords.x + 12} y={coords.y + 3} fill="#7dd3fc" fontSize="9" fontWeight="bold">
                {cam.id}
              </text>
            </g>
          );
        })}

        {/* Moving Tipper Auto Truck Icon */}
        {activeLayers.trucks && (
          <g 
            transform={`translate(${truckPos.x}, ${truckPos.y})`} 
            className="cursor-pointer transition-all duration-1000 ease-out"
            onClick={() => setSelectedItem({
              type: "Live Tipper Vehicle",
              id: "Tipper Auto #04 (KA-04-G-8812)",
              driver: "Ramesh Babu (+91 98450 77123)",
              speed: "24 km/h",
              status: "On Schedule • Beat 4",
              eta: "08:45 AM (Indiranagar 12th Main)",
              wasteCollected: "1.4 MT Segregated Wet & Dry"
            })}
          >
            {/* Pulsing radar halo */}
            <circle cx="0" cy="0" r="22" fill="#06b6d4" fillOpacity="0.25" className="animate-ping" />
            <circle cx="0" cy="0" r="14" fill="#006970" stroke="#22d3ee" strokeWidth="2.5" />
            
            {/* Truck symbol */}
            <text x="-7" y="5" fill="#ffffff" fontSize="14" fontFamily="Material Symbols Outlined">
              local_shipping
            </text>
            
            <text x="18" y="4" fill="#22d3ee" fontSize="11" fontWeight="bold">
              Tipper #04 (Live)
            </text>
          </g>
        )}
      </svg>

      {/* Selected Item Detail Popover */}
      {selectedItem && (
        <div className="absolute bottom-4 left-4 z-30 max-w-sm p-4 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-xl border border-primary/20 text-on-surface shadow-2xl animate-fade-in">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">
                {selectedItem.type === 'Live Tipper Vehicle' ? 'local_shipping' : selectedItem.type === 'Smart Bin' ? 'delete' : selectedItem.type === 'CCTV Camera' ? 'videocam' : 'local_fire_department'}
              </span>
              <div>
                <div className="font-bold text-sm text-on-surface">{selectedItem.id || selectedItem.name}</div>
                <div className="text-[10px] text-outline uppercase font-semibold">{selectedItem.type}</div>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setSelectedItem(null)} 
              className="text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          <div className="space-y-1.5 text-xs">
            {selectedItem.driver && (
              <div><strong className="text-on-surface-variant">Driver:</strong> {selectedItem.driver}</div>
            )}
            {selectedItem.eta && (
              <div className="text-primary font-semibold"><strong>Pickup ETA:</strong> {selectedItem.eta}</div>
            )}
            {selectedItem.fillPercent !== undefined && (
              <div>
                <strong className="text-on-surface-variant">Fill Level:</strong> {selectedItem.fillPercent}% ({selectedItem.type})
              </div>
            )}
            {selectedItem.dumpVolume && (
              <div><strong className="text-on-surface-variant">Weekly Dump:</strong> {selectedItem.dumpVolume}</div>
            )}
            {selectedItem.batteryHealth && (
              <div><strong className="text-on-surface-variant">Solar Battery:</strong> {selectedItem.solarCharge} ({selectedItem.resolution})</div>
            )}
          </div>
        </div>
      )}

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-gray-300">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400"></span> Tipper Auto</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Bins &lt; 50%</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Bins 50-80%</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> Bins &gt; 80% / Blackspots</span>
      </div>
    </div>
  );
};
