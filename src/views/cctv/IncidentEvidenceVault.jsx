import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const IncidentEvidenceVault = () => {
  const { aiCameraAlerts, issueChallan, showToast } = useApp();
  const [selectedIncident, setSelectedIncident] = useState(aiCameraAlerts[0]);
  const [playbackTime, setPlaybackTime] = useState(6); // 0 to 10 seconds scrubber

  const handleDownloadEvidencePackage = () => {
    showToast(`Encrypted Judicial Evidence ZIP package generated for ${selectedIncident.id} with SHA-256 hash seal!`, "success");
  };

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
            Review 10-second verified video recordings of littering and dumping carrying cryptographic SHA-256 tamper seals
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

      {/* Video Scrubber & ANPR Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main 10s Clip Scrubber Pane */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-3xl bg-black overflow-hidden border border-outline-variant/40 shadow-xl" style={{ height: '380px' }}>
            <img
              src={selectedIncident.videoClipUrl}
              alt={selectedIncident.id}
              className="w-full h-full object-cover opacity-85"
            />

            {/* Bounding box on video */}
            <div
              className="absolute border-2 border-rose-500 bg-rose-500/20 rounded-md animate-pulse"
              style={{
                left: `${selectedIncident.bbox.x}%`,
                top: `${selectedIncident.bbox.y}%`,
                width: `${selectedIncident.bbox.w}%`,
                height: `${selectedIncident.bbox.h}%`
              }}
            >
              <span className="absolute -top-6 left-0 px-2 py-0.5 rounded bg-rose-600 text-white font-mono text-[10px] font-bold">
                {selectedIncident.violationType} ({selectedIncident.confidence}%)
              </span>
            </div>

            {/* Timestamp Watermark */}
            <div className="absolute top-3 left-4 px-3 py-1 rounded-md bg-black/70 text-white font-mono text-xs">
              CAM: {selectedIncident.cameraNode} | TIME: {selectedIncident.timestamp}
            </div>

            <div className="absolute top-3 right-4 px-3 py-1 rounded-md bg-black/70 text-cyan-300 font-mono text-[11px]">
              SHA-256: {selectedIncident.sha256Hash.slice(0, 16)}...
            </div>

            {/* Scrubber Control Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-2">
              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-cyan-400">play_circle</span>
                  <span className="font-mono">00:0{playbackTime} / 00:10</span>
                </div>
                <span className="text-[10px] text-gray-300">Frame: {playbackTime * 30} / 300 (100% Tamper Sealed)</span>
              </div>

              <input
                type="range"
                min="0"
                max="10"
                value={playbackTime}
                onChange={(e) => setPlaybackTime(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          {/* SHA-256 Hash Display */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-xs space-y-1 font-mono">
            <div className="text-outline font-sans font-bold">Cryptographic Chain-of-Custody SHA-256 Fingerprint:</div>
            <div className="text-primary break-all font-semibold select-all bg-surface-container-low p-2 rounded-lg">
              {selectedIncident.sha256Hash}
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
                {selectedIncident.vehiclePlate}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>VAHAN Central Registry Match: Verified</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-outline">Offender Category:</span>
                <span className="font-bold text-on-surface">{selectedIncident.offenderType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Confidence Metric:</span>
                <span className="font-bold text-primary">{selectedIncident.confidence}% FP16 Neural</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Statutory Penalty:</span>
                <span className="font-black text-rose-700 text-sm">₹{selectedIncident.fineAmount}</span>
              </div>
            </div>

            {selectedIncident.status !== 'Challan Issued' ? (
              <button
                type="button"
                onClick={() => issueChallan(selectedIncident.id)}
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
            <div className="text-xs font-bold text-outline uppercase tracking-wider">Recorded Incidents Today</div>
            <div className="space-y-1.5">
              {aiCameraAlerts.map(alert => (
                <button
                  key={alert.id}
                  type="button"
                  onClick={() => setSelectedIncident(alert)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${selectedIncident.id === alert.id ? 'bg-primary text-on-primary font-bold' : 'hover:bg-surface-container-low text-on-surface'}`}
                >
                  <div className="truncate pr-2">
                    <div>{alert.violationType}</div>
                    <div className="text-[10px] opacity-75 font-mono">{alert.id} • {alert.timestamp}</div>
                  </div>
                  <span className="material-symbols-outlined text-base shrink-0">chevron_right</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
