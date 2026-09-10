import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const DevPortalSwitcher = () => {
  const { activeRole, activeTab, setRole, setTab } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const screens = [
    {
      group: "Auth & Onboarding",
      items: [
        { name: "Universal Portal Login", role: "login", tab: "login", icon: "login" },
        { name: "Citizen Registration", role: "citizen_registration", tab: "citizen-reg", icon: "how_to_reg" },
        { name: "Sanitary Staff Registration", role: "worker_registration", tab: "worker-reg", icon: "badge" },
      ]
    },
    {
      group: "Citizen Portal",
      items: [
        { name: "Citizen Dashboard & Grievances", role: "citizen", tab: "overview-grievances", icon: "volunteer_activism" },
        { name: "Raise Grievance Form", role: "citizen", tab: "raise-grievance-ticket", icon: "add_circle" },
        { name: "Live Vehicle GPS Tracker", role: "citizen", tab: "garbage-vehicle-schedule-live-tracker", icon: "local_shipping" },
        { name: "Past Complaints & SLA Timeline", role: "citizen", tab: "my-past-complaints", icon: "history" },
      ]
    },
    {
      group: "Sanitation Worker Portal",
      items: [
        { name: "Field Tasks & Dignity Credits", role: "worker", tab: "field-tasks", icon: "cleaning_services" },
        { name: "Beat GPS Navigation", role: "worker", tab: "beat-route", icon: "route" },
        { name: "Dignity Welfare Wallet", role: "worker", tab: "credits-wallet", icon: "wallet" },
      ]
    },
    {
      group: "Ward / Local Admin",
      items: [
        { name: "Ward GIS AI Dispatch", role: "local_admin", tab: "ward-gis-dispatch", icon: "map" },
        { name: "Public Complaints Triage", role: "local_admin", tab: "public-complaints-dispatch", icon: "assignment_turned_in" },
        { name: "Worker Roster & Assign", role: "local_admin", tab: "worker-roster-assign", icon: "groups" },
        { name: "Chronic Blackspot Heatmap", role: "local_admin", tab: "blackspot-heatmap", icon: "local_fire_department" },
        { name: "AI Camera Penalty Tickets", role: "local_admin", tab: "ai-camera-tickets", icon: "receipt_long" },
        { name: "Locality GIS Radar", role: "local_admin", tab: "locality-gis-radar", icon: "radar" },
      ]
    },
    {
      group: "Zonal Admin Hub",
      items: [
        { name: "Zonal Command Telemetry", role: "zonal_admin", tab: "command-locality-telemetry", icon: "speed" },
        { name: "Waste Segregation Reports", role: "zonal_admin", tab: "waste-collection-reports", icon: "bar_chart" },
        { name: "Inter-Ward Escalations", role: "zonal_admin", tab: "inter-ward-escalations", icon: "notification_important" },
        { name: "Locality Ward GIS Explorer", role: "zonal_admin", tab: "locality-ward-gis-explorer", icon: "travel_explore" },
        { name: "AI Camera Pole Infra Health", role: "zonal_admin", tab: "ai-camera-infra-health", icon: "solar_power" },
      ]
    },
    {
      group: "Apex Central Admin",
      items: [
        { name: "Apex Inter-Zone Oversight", role: "central_admin", tab: "apex-inter-zone-oversight", icon: "corporate_fare" },
        { name: "Inter-Zone Leaderboard", role: "central_admin", tab: "inter-zone-leaderboard", icon: "leaderboard" },
        { name: "Waste Diversion & Circular Econ", role: "central_admin", tab: "waste-diversion", icon: "recycling" },
        { name: "Apex SLA Audit & Analytics", role: "central_admin", tab: "grievances-sla", icon: "analytics" },
        { name: "Critical Interventions (Crisis)", role: "central_admin", tab: "critical-interventions", icon: "emergency_home" },
        { name: "Directives & Gazette Publisher", role: "central_admin", tab: "directives-gazettes", icon: "newspaper" },
      ]
    },
    {
      group: "AI Vision & CCTV Enclave",
      items: [
        { name: "Live Mobile / USB Camera Feed", role: "cctv_ops", tab: "live-camera-surveillance", icon: "photo_camera_front" },
        { name: "CCTV Command Hub Master View", role: "cctv_ops", tab: "cctv-command-hub", icon: "hub" },
        { name: "Live Stream & AI Detection Grid", role: "cctv_ops", tab: "live-cctv-stream-ai-detection-grid", icon: "grid_view" },
        { name: "Incident Playback & Evidence Vault", role: "cctv_ops", tab: "incident-playback-evidence-vault", icon: "video_library" },
        { name: "Camera Fleet Pole Telemetry", role: "cctv_ops", tab: "camera-fleet-pole-telemetry", icon: "settings_input_antenna" },
        { name: "AI Rule Engine & Automation", role: "cctv_ops", tab: "ai-rule-engine-automation", icon: "tune" },
      ]
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-on-primary shadow-xl hover:shadow-2xl hover:scale-105 transition-all border border-primary-fixed/30 text-xs font-bold"
        >
          <span className="material-symbols-outlined text-lg animate-pulse">navigation</span>
          <span>Screen Navigator (26 Views)</span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 max-h-[80vh] bg-surface-container-lowest/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-primary/20 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">grid_view</span>
              <div>
                <div className="font-extrabold text-sm">SwachhMitra Screen Matrix</div>
                <div className="text-[10px] opacity-80">Direct 1-Click Access to All 26 Prototype Screens</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>

          {/* Screen list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
            {screens.map((grp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-[10px] font-bold text-primary uppercase tracking-wider px-2 py-0.5 bg-primary/5 rounded-md">
                  {grp.group}
                </div>
                <div className="space-y-0.5">
                  {grp.items.map((item, i) => {
                    const isCurrent = activeRole === item.role && activeTab === item.tab;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setRole(item.role, item.tab);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2.5 transition-colors ${isCurrent ? 'bg-primary text-on-primary font-bold' : 'hover:bg-surface-container text-on-surface'}`}
                      >
                        <span className={`material-symbols-outlined text-base ${isCurrent ? 'text-white' : 'text-primary'}`}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
