import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const EmployeeRegistration = () => {
  const { setRole, showToast } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "Sunil Varma",
    phone: "+91 98451 22891",
    role: "Sanitation Lead / Sweeper",
    ward: "Ward 14 - Indiranagar",
    assignedBeat: "Beat #4 (12th Main to CMH Road)",
    safetyGearChecked: true,
    insuranceLinked: true
  });

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      showToast("Biometric beat verification simulated successfully!", "info");
    } else if (step === 2) {
      setStep(3);
      showToast("Digital Field ID Card issued with Welfare Credits Wallet!", "success");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 sm:p-6 relative">
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-xl border border-outline-variant/30 p-6 sm:p-8 relative z-10">
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-2xl">badge</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-on-surface">Sanitary Staff Onboarding</h2>
              <p className="text-xs text-on-surface-variant">Biometric Beat Verification & Field Badge</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRole('login')}
            className="text-xs font-bold text-tertiary hover:underline"
          >
            Back to Login
          </button>
        </div>

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">Employee Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm focus:border-tertiary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">Assigned Operational Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm focus:border-tertiary outline-none font-semibold"
              >
                <option>Sanitation Lead / Sweeper</option>
                <option>Tipper Auto Driver</option>
                <option>Mechanized Sweeper Operator</option>
                <option>Heavy Compactor Loader</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">Phone Number (Registered SIM)</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm focus:border-tertiary outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-tertiary text-on-tertiary font-bold text-sm shadow-md hover:bg-tertiary-deep transition-all mt-4"
            >
              Verify Beat & Welfare Entitlements &rarr;
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNext} className="space-y-4">
            <div className="p-4 rounded-2xl bg-tertiary-fixed/30 border border-tertiary/20 space-y-2 text-xs">
              <div className="font-bold text-on-tertiary-fixed text-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined text-tertiary">fingerprint</span>
                Biometric Beat Allocation
              </div>
              <div>Assigned Jurisdiction: <strong>{formData.ward}</strong></div>
              <div>Assigned Beat Sector: <strong>{formData.assignedBeat}</strong></div>
              <div>Shift Hours: <strong>06:30 AM - 02:30 PM (Morning Beat)</strong></div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.safetyGearChecked}
                  onChange={(e) => setFormData({ ...formData, safetyGearChecked: e.target.checked })}
                  className="rounded text-tertiary focus:ring-tertiary"
                />
                <span>High-Visibility Radium Jacket, Puncture-proof Gloves & Boots Issued</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.insuranceLinked}
                  onChange={(e) => setFormData({ ...formData, insuranceLinked: e.target.checked })}
                  className="rounded text-tertiary focus:ring-tertiary"
                />
                <span>Linked to Ayushman Bharat & Dignity Welfare Healthcare Shield</span>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl bg-surface-container text-on-surface text-xs font-bold"
              >
                &larr; Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-tertiary text-on-tertiary text-xs font-bold hover:bg-tertiary-deep shadow-md"
              >
                Issue Digital ID & Finish &rarr;
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center space-y-5 animate-fade-in">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-tertiary-deep to-tertiary text-on-tertiary text-left shadow-xl relative overflow-hidden border border-tertiary-fixed/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl text-tertiary-fixed">badge</span>
                  <div>
                    <div className="text-sm font-black tracking-wide">SANITARY WORKFORCE ID</div>
                    <div className="text-[10px] text-tertiary-fixed">Urban Sanitation Board • Dignity Cadre</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">VERIFIED</span>
              </div>

              <div className="space-y-1 my-3">
                <div className="text-lg font-black">{formData.name}</div>
                <div className="text-xs text-gray-200">Staff ID: WKR-104 • {formData.role}</div>
                <div className="text-xs text-gray-200">{formData.assignedBeat}</div>
              </div>

              <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[11px]">
                <span>🪙 Dignity Credits: 1,420 pts</span>
                <span>⭐ Rating: 4.9 / 5.0</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setRole('worker')}
              className="w-full py-3.5 rounded-xl bg-tertiary text-on-tertiary font-bold text-sm shadow-md hover:bg-tertiary-deep"
            >
              Enter Field Worker Portal &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
