import React from 'react';
import { InteractiveMap } from '../../components/common/InteractiveMap';

export const ZonalGisExplorer = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-on-surface">Locality & Multi-Ward GIS Explorer</h2>
          <p className="text-xs text-on-surface-variant">
            Macro-level GIS layer showing contiguous ward boundaries, arterial transport corridors, and transfer hubs
          </p>
        </div>
      </div>

      <InteractiveMap height="500px" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-xs space-y-1">
          <div className="font-bold text-primary">Ward 14 (Indiranagar)</div>
          <div className="text-outline">Area: 3.2 km² | Population: 14,800</div>
          <div className="text-emerald-700 font-semibold">Cleanliness Index: 94.2%</div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-xs space-y-1">
          <div className="font-bold text-primary">Ward 15 (Domlur)</div>
          <div className="text-outline">Area: 4.1 km² | Population: 21,500</div>
          <div className="text-emerald-700 font-semibold">Cleanliness Index: 91.8%</div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-xs space-y-1">
          <div className="font-bold text-primary">Ward 12 (Ulsoor)</div>
          <div className="text-outline">Area: 2.8 km² | Population: 18,200</div>
          <div className="text-emerald-700 font-semibold">Cleanliness Index: 96.0%</div>
        </div>
      </div>
    </div>
  );
};
