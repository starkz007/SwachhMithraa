import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const CitizenRegistration = () => {
  const { setRole, showToast } = useApp();
  const [step, setStep] = useState(1); // 1: Personal, 2: Address/Ward, 3: Success Pass
  const [formData, setFormData] = useState({
    fullName: "Priya Sharma",
    phone: "98765 43210",
    email: "priya.sharma@example.com",
    ward: "Ward 14 - Indiranagar",
    subLocality: "12th Main, 2nd Stage",
    houseNo: "Flat 302, Green Orchid Apartments"
  });

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      showToast("Personal details verified! Select your municipal ward.", "info");
    } else if (step === 2) {
      setStep(3);
      showToast("Citizen pass generated with QR code and Beat #4 alignment!", "success");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 sm:p-6 relative">
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-xl border border-outline-variant/30 p-6 sm:p-8 relative z-10">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">how_to_reg</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-on-surface">First-Time Citizen Registration</h2>
              <p className="text-xs text-on-surface-variant">Swachh Citizen ID & Digital Ward Pass</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRole('login')}
            className="text-xs font-bold text-primary hover:underline"
          >
            Back to Login
          </button>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? 'text-primary' : 'text-outline'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-primary text-white' : 'bg-surface-container text-outline'}`}>1</span>
            <span>Aadhaar / Mobile</span>
          </div>
          <div className="flex-1 h-0.5 mx-2 bg-outline-variant/40"></div>
          <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? 'text-primary' : 'text-outline'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-primary text-white' : 'bg-surface-container text-outline'}`}>2</span>
            <span>Ward & Beat</span>
          </div>
          <div className="flex-1 h-0.5 mx-2 bg-outline-variant/40"></div>
          <div className={`flex items-center gap-2 text-xs font-bold ${step >= 3 ? 'text-primary' : 'text-outline'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-primary text-white' : 'bg-surface-container text-outline'}`}>3</span>
            <span>Digital Pass</span>
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">Full Name (as per Aadhaar)</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">Mobile Number (for SMS & OTP Alerts)</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">Email Address (Optional)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm focus:border-primary outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-deep transition-all mt-4"
            >
              Continue to Ward Selection &rarr;
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">Select Municipal Ward</label>
              <select
                value={formData.ward}
                onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm focus:border-primary outline-none font-semibold"
              >
                <option>Ward 14 - Indiranagar, East Zone (PIN 560038)</option>
                <option>Ward 15 - Domlur, East Zone (PIN 560071)</option>
                <option>Ward 18 - Koramangala, South Zone (PIN 560034)</option>
                <option>Ward 22 - Malleshwaram, West Zone (PIN 560003)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">Locality / Colony Street</label>
              <input
                type="text"
                required
                value={formData.subLocality}
                onChange={(e) => setFormData({ ...formData, subLocality: e.target.value })}
                placeholder="e.g. 12th Cross Rd, Indiranagar 2nd Stage"
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">House / Apartment / Plot No.</label>
              <input
                type="text"
                required
                value={formData.houseNo}
                onChange={(e) => setFormData({ ...formData, houseNo: e.target.value })}
                placeholder="e.g. #402, Shanti Nilayam, 12th Cross"
                className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm focus:border-primary outline-none"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-primary-fixed/30 border border-primary/20 text-xs text-on-primary-fixed flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">my_location</span>
              <span>Auto-detected: <strong>Beat #4 Sanitary Route</strong> (Tipper arrives 08:30 AM - 09:00 AM)</span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high"
              >
                &larr; Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-deep shadow-md"
              >
                Complete Registration & Issue ID &rarr;
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center space-y-5 animate-fade-in">
            {/* Digital Card Preview */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-container to-primary text-on-primary text-left shadow-xl relative overflow-hidden border border-primary-fixed/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl text-secondary-fixed">verified</span>
                  <div>
                    <div className="text-sm font-black tracking-wide">SWACHH CITIZEN PASS</div>
                    <div className="text-[10px] text-secondary-fixed">Government of India • Swachh Bharat Urban</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">ACTIVE</span>
              </div>

              <div className="space-y-1 my-3">
                <div className="text-lg font-black">{formData.fullName}</div>
                <div className="text-xs text-gray-200">ID: CZ-2024-{Math.floor(1000 + Math.random() * 9000)}</div>
                <div className="text-xs text-gray-200">{formData.ward} • Beat #4</div>
                <div className="text-[11px] text-gray-300">{formData.houseNo}, {formData.subLocality}</div>
              </div>

              <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[11px]">
                <span>🌿 Cleanliness Tier: Green Champion</span>
                <span>Starting Score: 100 pts</span>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant">
              Your household is now linked to daily tipper schedule notifications and emergency sanitation reporting.
            </p>

            <button
              type="button"
              onClick={() => setRole('citizen')}
              className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-deep"
            >
              Enter Citizen Portal Dashboard &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
