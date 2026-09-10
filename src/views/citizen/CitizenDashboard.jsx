import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RaiseGrievanceModal } from './RaiseGrievanceModal';
import { VehicleTracker } from './VehicleTracker';
import { PastComplaints } from './PastComplaints';
import { RewardStoreModal } from './RewardStoreModal';

export const CitizenDashboard = () => {
  const { activeTab, setTab, tickets, citizenScore, showToast } = useApp();
  const [raiseModalOpen, setRaiseModalOpen] = useState(() => activeTab === 'raise-grievance-ticket');
  const [rewardModalOpen, setRewardModalOpen] = useState(false);

  // Sync modal when activeTab changes via dev switcher or external navigation
  React.useEffect(() => {
    if (activeTab === 'raise-grievance-ticket') {
      setRaiseModalOpen(true);
    }
  }, [activeTab]);

  // Active in-progress ticket
  const activeTicket = tickets.find(t => t.status === 'in_progress') || tickets[0];
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;
  const inProgressCount = tickets.filter(t => t.status === 'in_progress').length;

  return (
    <div className="min-h-screen bg-surface flex flex-col pb-20">
      {/* Citizen Tab Navigation Bar */}
      <div className="w-full bg-surface-container-lowest/80 border-b border-outline-variant/30 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTab('overview-grievances')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${activeTab === 'overview-grievances' ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-base">dashboard</span>
              <span>Overview & Grievances</span>
            </button>

            <button
              type="button"
              onClick={() => setRaiseModalOpen(true)}
              className="px-4 py-2 rounded-xl text-primary bg-primary/10 hover:bg-primary/20 font-bold transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>Raise Grievance / Ticket</span>
            </button>

            <button
              type="button"
              onClick={() => setTab('garbage-vehicle-schedule-live-tracker')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${activeTab === 'garbage-vehicle-schedule-live-tracker' ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-base">local_shipping</span>
              <span>Vehicle Schedule & Live Tracker</span>
            </button>

            <button
              type="button"
              onClick={() => setTab('my-past-complaints')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${activeTab === 'my-past-complaints' ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-base">history</span>
              <span>My Past Complaints ({tickets.length})</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Tab Views */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6">
        {activeTab === 'garbage-vehicle-schedule-live-tracker' ? (
          <VehicleTracker />
        ) : activeTab === 'my-past-complaints' ? (
          <PastComplaints />
        ) : (
          /* Overview & Grievances Dashboard */
          <>
            {/* Top Welcome & Locality Banner */}
            <section className="w-full rounded-3xl bg-surface-container-lowest shadow-sm p-6 sm:p-8 relative overflow-hidden border border-outline-variant/30">
              <div className="absolute -right-16 -top-16 w-80 h-80 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute right-1/3 -bottom-20 w-64 h-64 bg-secondary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        Active Registered Citizen
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium">Citizen ID: CZ-98421</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                      Namaste, Rajesh Sharma!{" "}
                      <span className="text-xl sm:text-2xl text-primary font-semibold block sm:inline">
                        नमस्ते राजेश जी
                      </span>
                    </h1>
                    <p className="text-xs sm:text-sm text-on-surface-variant flex items-center gap-1.5 mt-1">
                      <span className="material-symbols-outlined text-primary text-base">verified_user</span>
                      Ward 14 - Indiranagar, East Zone • Beat #4 (Karnataka Civic Region)
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRaiseModalOpen(true)}
                      className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-deep text-on-primary text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
                    >
                      <span className="material-symbols-outlined text-base">add_a_photo</span>
                      <span>Lodge Grievance with Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRewardModalOpen(true)}
                      className="px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-base text-amber-500">workspace_premium</span>
                      <span>Redeem Rewards ({citizenScore} Pts)</span>
                    </button>
                  </div>
                </div>

                {/* 4 Bento KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  {/* Card 1 */}
                  <div className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors border border-outline-variant/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Active Complaints</span>
                      <span className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                        <span className="material-symbols-outlined text-base">pending_actions</span>
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl text-on-surface font-extrabold">{inProgressCount} In Progress</div>
                    <div className="text-xs text-tertiary font-semibold mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
                      Assigned to Beat Worker Sunil V.
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors border border-outline-variant/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Resolved This Month</span>
                      <span className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                        <span className="material-symbols-outlined text-base">task_alt</span>
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl text-on-surface font-extrabold">{resolvedCount} Resolved</div>
                    <div className="text-xs text-primary font-semibold mt-1">100% within SLA deadline (24h)</div>
                  </div>

                  {/* Card 3 */}
                  <div 
                    onClick={() => setTab('garbage-vehicle-schedule-live-tracker')}
                    className="cursor-pointer p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors border border-outline-variant/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Today's Pickup</span>
                      <span className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                        <span className="material-symbols-outlined text-base">local_shipping</span>
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl text-secondary font-extrabold">~08:45 AM</div>
                    <div className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                      On Schedule • Tipper Auto #04 &rarr;
                    </div>
                  </div>

                  {/* Card 4: Swachh Citizen Score */}
                  <div 
                    onClick={() => setRewardModalOpen(true)}
                    className="cursor-pointer p-4 rounded-2xl bg-gradient-to-br from-primary-container to-primary text-on-primary shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-primary-fixed font-bold uppercase tracking-wider">Swachh Citizen Score</span>
                      <span className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-xs">
                        <span className="material-symbols-outlined text-base">workspace_premium</span>
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black flex items-baseline gap-1">
                      {citizenScore} <span className="text-xs text-primary-fixed-dim">/ 100</span>
                    </div>
                    <div className="text-xs text-primary-fixed mt-1 flex items-center gap-1">
                      <span>🌿 Green Champion Level 3 &rarr;</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Active Ticket Quick Tracker Widget */}
            {activeTicket && (
              <section className="w-full rounded-3xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/30 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                      <span className="material-symbols-outlined text-xl">radar</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-tertiary font-bold tracking-wide">ACTIVE TICKET TRACKER</span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface text-xs font-mono font-bold">
                          {activeTicket.id}
                        </span>
                      </div>
                      <p className="text-base sm:text-lg text-on-surface font-bold">
                        {activeTicket.title} • {activeTicket.titleHi}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-fixed/50 text-on-primary-fixed-variant text-xs font-bold">
                      <span className="material-symbols-outlined text-sm text-primary">directions_walk</span>
                      Worker Assigned: Sunil V. (En Route with Cart)
                    </span>
                    <button
                      type="button"
                      onClick={() => setTab('my-past-complaints')}
                      className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors"
                    >
                      View SLA Details
                    </button>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-emerald-700">task_alt</span>
                      1. Complaint Geotagged
                    </div>
                    <p className="text-[11px] text-emerald-800 mt-1">Verified with GPS coords (12.9716° N)</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-amber-700">cleaning_services</span>
                      2. Clean-Up in Progress
                    </div>
                    <p className="text-[11px] text-amber-800 mt-1">Sunil V. arrived on location with handcart</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 text-xs">
                    <div className="font-bold text-outline flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">verified</span>
                      3. Verification & Closure
                    </div>
                    <p className="text-[11px] text-outline mt-1">After-photo proof audit & citizen rating</p>
                  </div>
                </div>
              </section>
            )}

            {/* Quick Grievance Categories Grid */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-on-surface">Common Civic Sanitation Services</h3>
                <span className="text-xs text-outline">Click any service to lodge instant report</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { name: "Overflowing Dustbin", icon: "delete", color: "bg-primary/10 text-primary" },
                  { name: "Construction Debris", icon: "hardware", color: "bg-tertiary/10 text-tertiary" },
                  { name: "Dead Animal Pickup", icon: "pets", color: "bg-rose-500/10 text-rose-700" },
                  { name: "Blocked Drain / Choke", icon: "water_damage", color: "bg-cyan-500/10 text-cyan-700" },
                  { name: "Public Urination Spot", icon: "wc", color: "bg-amber-500/10 text-amber-700" },
                  { name: "Commercial Garbage", icon: "store", color: "bg-purple-500/10 text-purple-700" },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setRaiseModalOpen(true)}
                    className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all hover:scale-105 flex flex-col items-center text-center gap-2 shadow-xs group"
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                      <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                    </div>
                    <span className="text-xs font-bold text-on-surface">{item.name}</span>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Modals */}
      <RaiseGrievanceModal isOpen={raiseModalOpen} onClose={() => setRaiseModalOpen(false)} />
      <RewardStoreModal isOpen={rewardModalOpen} onClose={() => setRewardModalOpen(false)} />
    </div>
  );
};
