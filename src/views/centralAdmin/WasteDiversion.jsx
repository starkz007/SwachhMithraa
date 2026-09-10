import React from 'react';
import { useApp } from '../../context/AppContext';

export const WasteDiversion = () => {
  const { zonalMetrics } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-emerald-600">recycling</span>
              Zero-Waste Circular Economy
            </span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">City Landfill Diversion & Circular Economy</h2>
          <p className="text-xs text-on-surface-variant">
            Scientific processing of municipal solid waste into Bio-CNG, organic compost, and RDF fuel
          </p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-black text-emerald-700">74.2% Diverted</div>
          <div className="text-xs text-outline">Target: 85% by 2026</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">eco</span>
          </div>
          <h3 className="text-base font-bold text-on-surface">Bio-Methanation & Compost</h3>
          <div className="text-3xl font-black text-emerald-800">1,380 MT/day</div>
          <p className="text-xs text-on-surface-variant">
            Fueling 140 city municipal buses with purified compressed biogas (CBG).
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">local_fire_department</span>
          </div>
          <h3 className="text-base font-bold text-on-surface">Refuse Derived Fuel (RDF)</h3>
          <div className="text-3xl font-black text-blue-800">540 MT/day</div>
          <p className="text-xs text-on-surface-variant">
            High calorific combustible fractions supplied to state cement plants.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">delete_sweep</span>
          </div>
          <h3 className="text-base font-bold text-on-surface">Residual Landfill Inert</h3>
          <div className="text-3xl font-black text-amber-700">490 MT/day</div>
          <p className="text-xs text-on-surface-variant">
            Non-reactive silt and inert residues routed to scientific engineered landfill cell.
          </p>
        </div>
      </div>
    </div>
  );
};
