import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const { activeRole, setRole, language, setLanguage, t, backendConnected } = useApp();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const roleLabels = {
    citizen: { title: "Citizen Portal", sub: "नागरिक सेवा", color: "bg-primary text-on-primary" },
    worker: { title: "Field Employee Portal", sub: "कर्मचारी सेवा", color: "bg-tertiary text-on-tertiary" },
    local_admin: { title: "Ward Admin Portal", sub: "स्थानीय प्रशासन", color: "bg-secondary text-on-secondary" },
    zonal_admin: { title: "Zonal Admin Hub", sub: "क्षेत्रीय प्रशासन", color: "bg-primary-container text-on-primary" },
    central_admin: { title: "Apex Central Command", sub: "शीर्ष मुख्यालय", color: "bg-primary-deep text-on-primary" },
    cctv_ops: { title: "AI Vision & CCTV Enclave", sub: "एआई कमांड हब", color: "bg-secondary text-on-secondary" }
  };

  const userProfiles = {
    citizen: { name: "Rajesh Sharma", tag: "Citizen #9842", beat: "Ward 14 • Beat #4" },
    worker: { name: "Sunil V.", tag: "Sanitary Lead #104", beat: "Beat #4 Active" },
    local_admin: { name: "Suresh M. Gowda", tag: "Inspector ADM-2041", beat: "Ward 14 Indiranagar" },
    zonal_admin: { name: "Dr. Ananya Sen", tag: "Zonal Director Z-3", beat: "East Urban Zone" },
    central_admin: { name: "Commissioner Office", tag: "MoHUA / BBMP Apex", beat: "City-Wide Command" },
    cctv_ops: { name: "Eng. Vikrant Patil", tag: "Lead AI Ops #401", beat: "128 Nodes Online" }
  };

  const currentRoleInfo = roleLabels[activeRole] || roleLabels.citizen;
  const currentProfile = userProfiles[activeRole] || userProfiles.citizen;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand logo & portal context */}
        <div className="flex items-center gap-3.5">
          <div 
            onClick={() => setRole('login')} 
            className="cursor-pointer relative w-11 h-11 rounded-full bg-surface-container-lowest p-1 shadow-md border border-primary/20 flex items-center justify-center hover:scale-105 transition-transform"
            title="Return to Universal Login"
          >
            <img 
              alt="SwachhMitra Official Emblem" 
              className="w-full h-full object-contain rounded-full" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1XY4-zEiNe6HJTHsewTDVANEIGbXfk_8W4wqIK9bIpp9KIj1YK_1ssrA7Vxs-CMUzzMFMMNr8Jhu7wpfJltK15c_3nyUSjqrG9TI7q80XCP4b1qotLRBoWN82vgO4assMAuD8N5NJ52i5uH3HlZhoKtxPCx1BeWymD-hpxLD-Wk-NPAuFg-GSXbiHeZzv9ZYmsKzNO-HbTJBzkObmC4xw42WU01wcwhf1GQVD8vcPFXFhC68hH7hCzu-g" 
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold tracking-tight text-on-surface">
                Swachh<span className="text-primary font-black">Mitra</span>
              </span>
              <span className="text-xs font-bold text-secondary hidden sm:inline">स्वच्छ मित्र</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-on-surface-variant tracking-wide">
                {currentRoleInfo.title}
              </span>
              <span className="text-outline-variant text-[10px] hidden md:inline">•</span>
              <span className="text-[10px] font-medium text-primary hidden md:inline">
                {currentProfile.beat}
              </span>
            </div>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dual-Mode Architecture Status Indicator */}
          <div 
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
              backendConnected 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' 
                : 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
            }`}
            title={backendConnected ? "Connected to live Python FastAPI backend on port 8000 with SQLite/Postgres ORM" : "Autonomous In-Browser Database Active (GitHub Pages Compatible)"}
          >
            <span className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            <span>{backendConnected ? 'FastAPI Backend: Online' : 'Edge Mode (Local DB)'}</span>
          </div>

          {/* Quick Role Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface font-semibold text-xs transition-all"
            >
              <span className="material-symbols-outlined text-base text-primary">swap_horiz</span>
              <span className="hidden md:inline">Switch Role:</span>
              <span className="text-primary font-bold">{currentRoleInfo.title.split(' ')[0]}</span>
              <span className="material-symbols-outlined text-sm text-outline">arrow_drop_down</span>
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 py-2 z-50">
                <div className="px-4 py-2 text-[11px] font-bold text-outline uppercase tracking-wider">
                  Select Civic Role
                </div>
                {Object.entries(roleLabels).map(([roleKey, info]) => (
                  <button
                    key={roleKey}
                    type="button"
                    onClick={() => {
                      setRole(roleKey);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 flex items-center justify-between text-xs hover:bg-surface-container transition-colors ${activeRole === roleKey ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface'}`}
                  >
                    <div>
                      <div className="font-semibold">{info.title}</div>
                      <div className="text-[10px] text-outline">{info.sub}</div>
                    </div>
                    {activeRole === roleKey && (
                      <span className="material-symbols-outlined text-sm text-primary">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Emergency Helpline Pill */}
          <a
            href="tel:1969"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-error-container/60 hover:bg-error-container text-on-error-container text-xs font-bold transition-colors"
            title="National Civic Sanitation Helpline"
          >
            <span className="material-symbols-outlined text-sm text-error">emergency</span>
            <span>Helpline: 1969</span>
          </a>

          {/* Language Switcher Modal/Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-xs border border-outline-variant/40 hover:border-primary text-on-surface text-xs font-bold transition-all"
            >
              <span className="material-symbols-outlined text-base text-primary">translate</span>
              <span>{language.toUpperCase()}</span>
              <span className="material-symbols-outlined text-xs text-outline">expand_more</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 py-2 z-50">
                <button
                  type="button"
                  onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-surface-container transition-colors ${language === 'en' ? 'font-bold text-primary bg-primary/10' : ''}`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => { setLanguage('hi'); setLangMenuOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-surface-container transition-colors ${language === 'hi' ? 'font-bold text-primary bg-primary/10' : ''}`}
                >
                  हिन्दी (Hindi)
                </button>
                <button
                  type="button"
                  onClick={() => { setLanguage('kn'); setLangMenuOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-surface-container transition-colors ${language === 'kn' ? 'font-bold text-primary bg-primary/10' : ''}`}
                >
                  ಕನ್ನಡ (Kannada)
                </button>
              </div>
            )}
          </div>

          {/* User Profile Chip */}
          <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/30">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs shadow-sm">
              <span className="material-symbols-outlined text-base">person</span>
            </div>
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-on-surface">{currentProfile.name}</span>
              <span className="text-[10px] text-outline">{currentProfile.tag}</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => setRole('login')}
            className="p-2 rounded-full text-on-surface-variant hover:bg-error-container/40 hover:text-error transition-colors"
            title="Exit / Logout to Portal Gateway"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
