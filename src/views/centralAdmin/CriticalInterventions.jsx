import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const CriticalInterventions = () => {
  const { showToast } = useApp();
  const [activeProtocols, setActiveProtocols] = useState({
    floodSanitation: true,
    epidemicFogging: false,
    strikeContingency: false
  });

  const toggleProtocol = (key, name) => {
    setActiveProtocols(prev => {
      const next = !prev[key];
      showToast(`${name} status updated: ${next ? 'ACTIVATED & MOBILIZED' : 'STANDBY'}`, next ? 'error' : 'info');
      return { ...prev, [key]: next };
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
              Apex Disaster & Crisis Desk
            </span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Critical Interventions & Emergency Contingencies</h2>
          <p className="text-xs text-on-surface-variant">
            Emergency mobilization protocols for monsoon flooding, sanitary worker strikes, and epidemic vectors
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Monsoon Protocol */}
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-cyan-600 text-3xl">flood</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${activeProtocols.floodSanitation ? 'bg-rose-100 text-rose-800' : 'bg-surface-container text-outline'}`}>
                {activeProtocols.floodSanitation ? 'ACTIVE ALERT' : 'STANDBY'}
              </span>
            </div>
            <h3 className="font-bold text-base text-on-surface">Monsoon Inundation Sanitary Protocol</h3>
            <p className="text-xs text-on-surface-variant">
              High-power super-sucker suction tankers and motorized desilting jetters deployed to low-lying culverts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleProtocol('floodSanitation', 'Monsoon Protocol')}
            className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors ${activeProtocols.floodSanitation ? 'bg-rose-700 hover:bg-rose-800 text-white' : 'bg-primary text-on-primary'}`}
          >
            {activeProtocols.floodSanitation ? 'De-escalate to Standby' : 'Trigger Red Monsoon Alert'}
          </button>
        </div>

        {/* Epidemic Fogging */}
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-amber-600 text-3xl">pest_control</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${activeProtocols.epidemicFogging ? 'bg-rose-100 text-rose-800' : 'bg-surface-container text-outline'}`}>
                {activeProtocols.epidemicFogging ? 'ACTIVE ALERT' : 'STANDBY'}
              </span>
            </div>
            <h3 className="font-bold text-base text-on-surface">Vector-Borne Epidemic Ring Fogging</h3>
            <p className="text-xs text-on-surface-variant">
              Targeted pyrethrum thermal smoke fogging across water stagnation clusters and construction sites.
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleProtocol('epidemicFogging', 'Epidemic Fogging')}
            className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors ${activeProtocols.epidemicFogging ? 'bg-rose-700 hover:bg-rose-800 text-white' : 'bg-primary text-on-primary'}`}
          >
            {activeProtocols.epidemicFogging ? 'De-escalate to Standby' : 'Mobilize Zonal Fogging Units'}
          </button>
        </div>

        {/* Strike Contingency */}
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-primary text-3xl">groups_3</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${activeProtocols.strikeContingency ? 'bg-rose-100 text-rose-800' : 'bg-surface-container text-outline'}`}>
                {activeProtocols.strikeContingency ? 'ACTIVE ALERT' : 'STANDBY'}
              </span>
            </div>
            <h3 className="font-bold text-base text-on-surface">Sanitary Strike Contingency Corps</h3>
            <p className="text-xs text-on-surface-variant">
              Emergency secondary contractor mobilization to ensure zero garbage accumulation during union disputes.
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleProtocol('strikeContingency', 'Strike Contingency')}
            className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors ${activeProtocols.strikeContingency ? 'bg-rose-700 hover:bg-rose-800 text-white' : 'bg-primary text-on-primary'}`}
          >
            {activeProtocols.strikeContingency ? 'De-escalate' : 'Activate Contingency Corps'}
          </button>
        </div>
      </div>
    </div>
  );
};
