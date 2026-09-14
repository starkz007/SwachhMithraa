import React, { useState } from 'react';
import { InteractiveMap } from '../../components/common/InteractiveMap';
import { useApp } from '../../context/AppContext';

export const VehicleTracker = () => {
  const { showToast } = useApp();
  const [notified, setNotified] = useState(false);

  const handleNotifyMe = () => {
    setNotified(true);
    showToast("SMS Alert enabled: We will ring your phone 10 minutes prior to truck arrival!", "success");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Live GPS Telemetry
            </span>
            <span className="text-xs text-outline font-medium">Auto Tipper Fleet #04</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Garbage Vehicle Schedule & Live Tracker</h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Track your ward's segregated waste collection auto in real time with precision ETA
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleNotifyMe}
            className={`px-4 py-2.5 rounded-full font-bold text-xs shadow-md transition-all flex items-center gap-1.5 ${notified ? 'bg-secondary text-white' : 'bg-primary text-on-primary hover:bg-primary-deep'}`}
          >
            <span className="material-symbols-outlined text-base">{notified ? 'notifications_active' : 'notification_add'}</span>
            <span>{notified ? 'Arrival Alert Active' : 'Notify Me 10m Before'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Map Container */}
        <div className="lg:col-span-2 space-y-4">
          <InteractiveMap height="450px" />
          
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-xl">speed</span>
              </div>
              <div>
                <div className="font-bold text-on-surface">Speed: 22 km/h • On Schedule</div>
                <div className="text-outline">Current Sector: 12th Cross Rd, Indiranagar 2nd Stage (12.9716° N, 77.6412° E)</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">scale</span>
              </div>
              <div>
                <div className="font-bold text-on-surface">1.8 MT Collected</div>
                <div className="text-outline">Wet: 65% | Dry: 35%</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-xl">timer</span>
              </div>
              <div>
                <div className="font-bold text-on-surface">ETA at Your Gate: ~08:45 AM</div>
                <div className="text-primary font-semibold">12 minutes away (450m)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Card & Segregation Guide */}
        <div className="space-y-4">
          {/* Driver Profile */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center border-2 border-secondary font-bold text-lg">
                <span className="material-symbols-outlined text-2xl">local_shipping</span>
              </div>
              <div>
                <div className="text-sm font-bold text-on-surface">Ramesh Babu</div>
                <div className="text-xs text-secondary font-semibold">Authorized Tipper Auto Driver</div>
                <div className="text-[11px] text-outline">Vehicle: KA-04-G-8812 (Electric Tipper)</div>
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant/20 flex gap-2 text-xs">
              <a
                href="tel:+919845077123"
                className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-center flex items-center justify-center gap-1 hover:bg-primary-deep"
              >
                <span className="material-symbols-outlined text-base">call</span>
                <span>Call Driver</span>
              </a>
              <button
                type="button"
                onClick={() => showToast("Driver requested to pause at 12th Cross intersection", "info")}
                className="px-3 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold hover:bg-surface-container-high"
              >
                Hold 2 Min
              </button>
            </div>
          </div>

          {/* 3-Way Waste Segregation Protocol Info */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-on-surface font-bold text-sm">
              <span className="material-symbols-outlined text-primary text-lg">recycling</span>
              <span>Mandatory 3-Way Segregation</span>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600 mt-0.5 shrink-0"></span>
                <div>
                  <strong>Green Bin: Wet / Organic</strong>
                  <p className="text-[11px] text-emerald-800">Vegetable peels, cooked food, tea leaves, fallen garden leaves.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600 mt-0.5 shrink-0"></span>
                <div>
                  <strong>Blue Bin: Dry Recyclable</strong>
                  <p className="text-[11px] text-blue-800">Clean paper, cardboard cartons, plastics, glass bottles, metal cans.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-2">
                <span className="w-3 h-3 rounded-full bg-red-600 mt-0.5 shrink-0"></span>
                <div>
                  <strong>Red Bag: Domestic Hazardous</strong>
                  <p className="text-[11px] text-red-800">Sanitary pads, diapers, expired meds, razors, batteries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
