import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AiCameraTickets = () => {
  const { aiCameraAlerts, issueChallan, showToast } = useApp();
  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">smart_toy</span>
              Edge AI Automated Vision
            </span>
            <span className="text-xs text-outline font-medium">Indian Penal & Municipal Code 431</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">AI Camera Violation Tickets & Penalties</h2>
          <p className="text-xs text-on-surface-variant">
            Automated visual detection of illegal dumping, open burning, and overflowing civic infrastructure
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast("Auto-issued challans for all verified high-confidence violations.", "success")}
          className="px-4 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-deep shadow-md flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">receipt_long</span>
          <span>Batch Issue Verified Challans</span>
        </button>
      </div>

      {/* Camera Violation Feed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {aiCameraAlerts.map((rawAlert) => {
          const alert = {
            ...rawAlert,
            bbox: rawAlert.bbox || { x: 25, y: 30, w: 45, h: 40 },
            violationType: rawAlert.violationType || rawAlert.violation || 'Sanitation Violation',
            cameraNode: rawAlert.cameraNode || rawAlert.nodeId || 'CAM-EDGE-01',
            vehiclePlate: rawAlert.vehiclePlate || rawAlert.plateNumber || 'KA-04-E-1029',
            offenderType: rawAlert.offenderType || rawAlert.ownerName || 'Commercial Vehicle / Citizen',
            fineAmount: rawAlert.fineAmount || rawAlert.fine || 500,
            confidence: rawAlert.confidence || 92,
            timestamp: rawAlert.timestamp || 'Just now',
            videoClipUrl: rawAlert.videoClipUrl || rawAlert.videoUrl || 'https://images.unsplash.com/photo-1618060932014-4deda4932554?w=800&auto=format&fit=crop&q=80'
          };

          return (
            <div
              key={alert.id}
              className="rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Evidence Snapshot with AI Bounding Box */}
                <div className="relative h-44 bg-black overflow-hidden group">
                  <img
                    src={alert.videoClipUrl}
                    alt="Camera Evidence"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Simulated AI Bounding Box */}
                  <div
                    className="absolute border-2 border-rose-500 bg-rose-500/20 rounded-md pointer-events-none"
                    style={{
                      left: `${alert.bbox.x}%`,
                      top: `${alert.bbox.y}%`,
                      width: `${alert.bbox.w}%`,
                      height: `${alert.bbox.h}%`
                    }}
                  >
                    <span className="absolute -top-5 left-0 px-1.5 py-0.5 rounded bg-rose-600 text-white font-mono text-[9px] font-bold">
                      {alert.violationType} ({alert.confidence}%)
                    </span>
                  </div>

                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white font-mono text-[10px]">
                    {alert.cameraNode}
                  </span>

                  <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                    {alert.timestamp}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-primary">{alert.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${alert.status === 'Challan Issued' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {alert.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-on-surface">{alert.violationType}</h4>
                  {alert.location && (
                    <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-primary">location_on</span>
                      <span>{alert.location}</span>
                    </p>
                  )}

                  <div className="space-y-1 text-on-surface-variant bg-surface-container-low p-2.5 rounded-xl">
                    <div>Offender: <strong>{alert.offenderType}</strong></div>
                    <div>Plate: <strong className="font-mono">{alert.vehiclePlate}</strong></div>
                    <div>Fine Amount: <strong className="text-rose-700">₹{alert.fineAmount}</strong></div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 pt-0">
                {alert.status !== 'Challan Issued' ? (
                  <button
                    type="button"
                    onClick={() => issueChallan(alert.id)}
                    className="w-full py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">gavel</span>
                    <span>Issue Official Municipal Challan (₹{alert.fineAmount})</span>
                  </button>
                ) : (
                  <div className="w-full py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-bold text-xs flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span>Challan Dispatched & VAHAN Notified</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
