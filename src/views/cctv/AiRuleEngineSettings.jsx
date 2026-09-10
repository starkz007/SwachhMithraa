import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AiRuleEngineSettings = () => {
  const { showToast } = useApp();
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [minDumpingSeconds, setMinDumpingSeconds] = useState(3);
  const [autoChallanCommercial, setAutoChallanCommercial] = useState(true);
  const [thermalFireAlert, setThermalFireAlert] = useState(true);

  const handleSaveSettings = () => {
    showToast("AI Vision Rule Engine settings updated & pushed to all 128 Edge TPUs!", "success");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-on-surface">AI Rule Engine & Automation Settings</h2>
          <p className="text-xs text-on-surface-variant">
            Adjust neural network detection sensitivity thresholds, temporal persistence rules, and auto-dispatch triggers
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveSettings}
          className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-deep shadow-md flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">save</span>
          <span>Push to Edge TPUs</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        {/* Detection Sensitivity */}
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">tune</span>
            <span>Neural Inference Confidence Filter</span>
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between font-bold">
              <span>Minimum Confidence Threshold:</span>
              <span className="text-primary font-mono text-sm">{confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="95"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-[11px] text-outline">
              Detections below this threshold are dropped to avoid false alarms from moving bags or stray dogs.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-outline-variant/20">
            <div className="flex justify-between font-bold">
              <span>Temporal Dwell Time Threshold:</span>
              <span className="text-secondary font-mono text-sm">{minDumpingSeconds} Seconds</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={minDumpingSeconds}
              onChange={(e) => setMinDumpingSeconds(Number(e.target.value))}
              className="w-full accent-secondary"
            />
            <p className="text-[11px] text-outline">
              Requires continuous object abandonment for {minDumpingSeconds}s before flagging violation.
            </p>
          </div>
        </div>

        {/* Automation Triggers */}
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">smart_toy</span>
            <span>Automated Enforcement Rules</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 cursor-pointer">
              <input
                type="checkbox"
                checked={autoChallanCommercial}
                onChange={(e) => setAutoChallanCommercial(e.target.checked)}
                className="mt-0.5 rounded text-primary focus:ring-primary"
              />
              <div>
                <strong className="text-on-surface">Auto-Issue Challan for Commercial Vehicles (&gt;95% Conf)</strong>
                <p className="text-[11px] text-outline">Directly dispatches VAHAN linked fine SMS if verified by 2 consecutive camera nodes.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 cursor-pointer">
              <input
                type="checkbox"
                checked={thermalFireAlert}
                onChange={(e) => setThermalFireAlert(e.target.checked)}
                className="mt-0.5 rounded text-primary focus:ring-primary"
              />
              <div>
                <strong className="text-on-surface">Thermal Fire & Smoke Real-Time Broadcast</strong>
                <p className="text-[11px] text-outline">Immediate loud hooter alert in Ward Control Room when open plastic burning is detected.</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
