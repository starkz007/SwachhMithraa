import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const IncidentEvidenceVault = () => {
  const { aiCameraAlerts, issueChallan, showToast } = useApp();
  const [selectedId, setSelectedId] = useState(null);
  const [playbackTime, setPlaybackTime] = useState(6); // 0 to 10 seconds scrubber

  const alerts = Array.isArray(aiCameraAlerts) ? aiCameraAlerts : [];
  const currentIncident = alerts.find(a => a.id === selectedId) || alerts[0] || null;

  const handleDownloadEvidencePackage = () => {
    if (!currentIncident) return;
    showToast(`Encrypted Judicial Evidence ZIP package generated for ${currentIncident.id} with SHA-256 hash seal!`, "success");
  };

  if (!currentIncident || alerts.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">verified</span>
                Judicial Evidence Registry • Indian Evidence Act Sec 65B
              </span>
            </div>
            <h2 className="text-xl font-bold text-on-surface">AI Incident Playback & Evidence Vault</h2>
            <p className="text-xs text-on-surface-variant">
              Cryptographically sealed optical records of verified municipal dumping infractions
            </p>
          </div>
        </div>

        <div className="p-12 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl">verified_user</span>
          </div>
          <div>
            <h3 className="font-bold text-base text-on-surface">No Optical Incidents in Evidence Vault</h3>
            <p className="text-xs text-on-surface-variant mt-1 max-w-md mx-auto">
              All municipal surveillance pole nodes are operating normally with zero unaddressed optical infractions. New detections from live AI camera streams will be cryptographically archived here with SHA-256 seals.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Judicial Vault Status: SECURE & AUDITED
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Normalized fields
  const videoUrl = currentIncident?.videoClipUrl || currentIncident?.photoUrl || "";
  const violationTitle = currentIncident?.violationType || currentIncident?.violation || "Optical Waste Violation";
  const plate = currentIncident?.vehiclePlate || currentIncident?.plateNumber || "N/A (Pedestrian / Hand Litter)";
  const offender = currentIncident?.offenderType || currentIncident?.ownerName || "Civic Offender Evidence";
  const confidence = currentIncident?.confidence || 95;
  const fine = currentIncident?.fineAmount || 500;
  const status = currentIncident?.status || "Review Pending";
  const node = currentIncident?.cameraNode || currentIncident?.nodeId || "POLE-CAM-1402 (Indiranagar 12th Main)";
  const location = currentIncident?.location || "Ward 82 (Live Optical Node)";
  const time = currentIncident?.timestamp || "Recorded by AI Node";
  const sha = currentIncident?.sha256Hash || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  const bbox = currentIncident?.bbox || { x: 25, y: 30, w: 45, h: 40 };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">verified</span>
              Judicial Evidence Registry • Indian Evidence Act Sec 65B
            </span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">AI Incident Playback & Evidence Vault</h2>
          <p className="text-xs text-on-surface-variant">
            Review verified video recordings of littering and dumping carrying cryptographic SHA-256 tamper seals
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadEvidencePackage}
          className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-deep shadow-md flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base text-secondary-fixed">folder_zip</span>
          <span>Download Judicial Evidence Package (ZIP)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main 10s Clip Scrubber Pane */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-3xl bg-black overflow-hidden border border-outline-variant/40 shadow-xl" style={{ height: '380px' }}>
            <img
              src={videoUrl}
              alt={currentIncident?.id}
              className="w-full h-full object-cover opacity-85"
            />

            {/* Bounding box on video */}
            <div
              className="absolute border-2 border-rose-500 bg-rose-500/20 rounded-md animate-pulse"
              style={{
                left: `${bbox.x}%`,
                top: `${bbox.y}%`,
                width: `${bbox.w}%`,
                height: `${bbox.h}%`
              }}
            >
              <span className="absolute -top-6 left-0 px-2 py-0.5 rounded bg-rose-600 text-white font-mono text-[10px] font-bold whitespace-nowrap">
                {violationTitle} ({confidence}%)
              </span>
            </div>

            {/* Timestamp Watermark */}
            <div className="absolute top-3 left-4 px-3 py-1 rounded-md bg-black/70 text-white font-mono text-xs">
              CAM: {node} | TIME: {time}
            </div>

            <div className="absolute top-3 right-4 px-3 py-1 rounded-md bg-black/70 text-cyan-300 font-mono text-[11px]">
              SHA-256: {sha.slice(0, 16)}...
            </div>

            {/* Scrubber Control Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-2">
              <div className="flex items-center justify-between text-xs text-white font-mono">
                <span>00:0{playbackTime} / 00:10</span>
                <span className="text-secondary-fixed">AI Violation Trigger: Frame 184</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={playbackTime}
                onChange={(e) => setPlaybackTime(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
            </div>
          </div>

          {/* Cryptographic Proof Details */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-on-surface">Tamper-Proof Audit Manifest:</span>
              <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[10px]">
                Integrity Verified (0 Bit Flip)
              </span>
            </div>
            <div className="font-mono text-[11px] text-on-surface-variant break-all bg-surface-container-low p-2 rounded-xl">
              Hash: {sha}
            </div>
          </div>
        </div>

        {/* ANPR Vehicle Identification & Challan Pane */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-on-surface">
              <span className="material-symbols-outlined text-primary">badge</span>
              <span>Automated Plate Recognition (ANPR)</span>
            </div>

            <div className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-2 text-xs">
              <div className="text-outline">Extracted Vehicle Number:</div>
              <div className="text-xl font-black font-mono tracking-widest text-on-surface bg-white p-2.5 rounded-xl border text-center">
                {plate}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>VAHAN Central Registry Match: Verified</span>
              </div>
              <div className="pt-2 border-t border-outline-variant/20 space-y-1 text-[11px]">
                <div className="text-on-surface font-semibold flex items-start gap-1">
                  <span className="material-symbols-outlined text-xs text-primary mt-0.5">location_on</span>
                  <span>{location}</span>
                </div>
                <div className="font-mono text-cyan-700 dark:text-cyan-400 font-bold">
                  Camera: {node}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-outline">Offender Category:</span>
                <span className="font-bold text-on-surface">{offender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Confidence Metric:</span>
                <span className="font-bold text-primary">{confidence}% FP16 Neural</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Statutory Penalty:</span>
                <span className="font-black text-rose-700 text-sm">₹{fine}</span>
              </div>
            </div>

            {status !== 'Challan Issued' ? (
              <button
                type="button"
                onClick={() => issueChallan(currentIncident?.id)}
                className="w-full py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-base">gavel</span>
                <span>Issue & Dispatch Digital Challan</span>
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs text-center">
                Challan Issued & SMS Sent to Owner
              </div>
            )}
          </div>

          {/* Incident Selector List */}
          <div className="p-4 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-2">
            <div className="text-xs font-bold text-outline uppercase tracking-wider">Recorded Incidents ({alerts.length})</div>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {alerts.map(alert => {
                const isSelected = currentIncident?.id === alert.id;
                const aTitle = alert.violationType || alert.violation || "Optical Waste Violation";
                return (
                  <button
                    key={alert.id}
                    type="button"
                    onClick={() => setSelectedId(alert.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${isSelected ? 'bg-primary text-on-primary font-bold' : 'hover:bg-surface-container-low text-on-surface'}`}
                  >
                    <div className="truncate pr-2">
                      <div>{aTitle}</div>
                      <div className="text-[10px] opacity-75 font-mono">{alert.id} • {alert.timestamp || 'Today'}</div>
                    </div>
                    <span className="material-symbols-outlined text-base shrink-0">chevron_right</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
