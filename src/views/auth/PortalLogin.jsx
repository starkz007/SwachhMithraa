import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PortalLogin = () => {
  const { setRole, showToast } = useApp();
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [showCctvPass, setShowCctvPass] = useState(false);

  // Forms states
  const [citizenPhone, setCitizenPhone] = useState("9876543210");
  const [employeePhone, setEmployeePhone] = useState("9845122891");
  const [adminId, setAdminId] = useState("ADM-2041");
  const [adminPass, setAdminPass] = useState("swachh2024");
  const [cctvId, setCctvId] = useState("CAM-ENG-401");
  const [cctvPass, setCctvPass] = useState("telecom_noc");

  const [otpModal, setOtpModal] = useState(null); // null | 'citizen' | 'employee'
  const [enteredOtp, setEnteredOtp] = useState(["5", "2", "8", "9", "1", "4"]);

  const handleCitizenSubmit = (e) => {
    e.preventDefault();
    setOtpModal('citizen');
    showToast("OTP sent to +91 " + citizenPhone + "! (Use pre-filled: 528914)", "info");
  };

  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
    setOtpModal('employee');
    showToast("OTP sent to registered Sanitary Staff phone! (Use pre-filled: 528914)", "info");
  };

  const verifyOtpAndLogin = () => {
    if (otpModal === 'citizen') {
      showToast("Citizen Verified! Welcome Rajesh Sharma", "success");
      setRole('citizen');
    } else if (otpModal === 'employee') {
      showToast("Sanitary Staff Verified! Welcome Sunil V.", "success");
      setRole('worker');
    }
    setOtpModal(null);
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    showToast("Officer authenticated successfully! Welcome Inspector Suresh Gowda", "success");
    setRole('local_admin');
  };

  const handleCctvSubmit = (e) => {
    e.preventDefault();
    showToast("Command Enclave secured! Welcome Eng. Vikrant Patil", "success");
    setRole('cctv_ops');
  };

  return (
    <div className="min-h-screen flex flex-col relative w-full bg-surface overflow-x-hidden">
      {/* Ambient Glowing Background Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-36 left-1/4 w-[550px] h-[550px] bg-primary-fixed/30 rounded-full blur-3xl"></div>
        <div className="absolute top-24 -right-24 w-[480px] h-[480px] bg-secondary-fixed/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 left-1/12 w-[600px] h-[600px] bg-tertiary-fixed/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 flex flex-col items-center">
        {/* Hero Header Section */}
        <div className="w-full text-center flex flex-col items-center max-w-3xl">
          {/* Key Pillars Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container border border-outline-variant/40 text-on-surface-variant shadow-xs mb-4">
            <span className="material-symbols-outlined text-sm text-primary">eco</span>
            <span className="text-xs font-semibold">Clean City</span>
            <span className="text-outline-variant font-bold">•</span>
            <span className="material-symbols-outlined text-sm text-secondary">group</span>
            <span className="text-xs font-semibold">Active Citizens</span>
            <span className="text-outline-variant font-bold">•</span>
            <span className="material-symbols-outlined text-sm text-tertiary">verified</span>
            <span className="text-xs font-semibold">Dignified Workforce</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
            Empowering Communities for a{" "}
            <span className="text-primary bg-gradient-to-r from-primary via-primary-container to-secondary bg-clip-text text-transparent">
              Cleaner, Greener
            </span>{" "}
            Tomorrow
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-on-surface-variant mt-3 max-w-2xl leading-relaxed">
            Access your dedicated Swachh portal to lodge civic grievances, track ward sanitation operations, or monitor urban waste intelligence in real time.
          </p>
        </div>

        {/* Civic Quote Banner */}
        <div className="w-full max-w-5xl mt-6 mb-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface-container-lowest via-surface-container-low to-surface-container-lowest border border-outline-variant/30 p-5 lg:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4 z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-primary-fixed text-on-primary-fixed text-xs font-bold uppercase tracking-wider">
                    Civic Inspiration
                  </span>
                  <span className="text-xs text-outline font-medium">National Sanitation Pledge</span>
                </div>
                <p className="text-sm sm:text-base text-on-surface font-semibold italic">
                  “स्वच्छता ही सेवा है — Where there is civic cleanliness and dignity, there is true national progress.”
                </p>
                <p className="text-xs text-on-surface-variant">
                  A cleaner neighborhood is born from our collective responsibility. Join hands across our city beat by beat.
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2 z-10">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-on-surface">Swachh Bharat Urban</div>
                <div className="text-[11px] text-outline">Citizen & Municipal Compact</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header for Portals */}
        <div className="w-full flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl lg:text-3xl text-on-surface font-bold">
              Select Your Portal
            </h2>
            <p className="text-sm text-on-surface-variant">
              Log in through your authorized civic role to access personalized dashboards and services
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container text-xs font-bold text-outline">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>4 Unified Access Portals</span>
          </div>
        </div>

        {/* 4-Portal Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {/* Portal 1: Citizen Login */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl p-6 flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-primary-fixed/25 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110 duration-500"></div>
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed shadow-sm">
                    <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
                  </div>
                  <div>
                    <h3 className="text-xl text-on-surface font-bold">Citizen Login</h3>
                    <p className="text-xs text-primary font-bold">नागरिक सेवा पोर्टल</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                  Public
                </span>
              </div>

              <form className="space-y-4" onSubmit={handleCitizenSubmit}>
                <div>
                  <label className="block text-xs text-on-surface font-semibold mb-1.5">Mobile Number</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-on-surface-variant material-symbols-outlined text-xl">smartphone</span>
                    <input
                      type="tel"
                      value={citizenPhone}
                      onChange={(e) => setCitizenPhone(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-primary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner font-mono"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-outline mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-primary">lock_clock</span>
                    6-digit instant OTP verification
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary-container hover:to-primary text-on-primary text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <span>Get OTP & Login as Citizen</span>
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setRole('citizen')}
                className="inline-flex items-center gap-1 text-secondary hover:text-primary font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-base">fingerprint</span>
                <span>Aadhaar SSO</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('citizen_registration')}
                className="text-primary hover:underline font-bold"
              >
                New Register?
              </button>
            </div>
          </div>

          {/* Portal 2: Field Employee Login */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-tertiary/50 transition-all duration-300 shadow-md hover:shadow-xl p-6 flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-tertiary-fixed/30 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110 duration-500"></div>
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shadow-sm">
                    <span className="material-symbols-outlined text-2xl">cleaning_services</span>
                  </div>
                  <div>
                    <h3 className="text-xl text-on-surface font-bold">Employee Login</h3>
                    <p className="text-xs text-tertiary font-bold">कर्मचारी पोर्टल • Staff</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold border border-tertiary/20">
                  Field Staff
                </span>
              </div>

              <form className="space-y-4" onSubmit={handleEmployeeSubmit}>
                <div>
                  <label className="block text-xs text-on-surface font-semibold mb-1.5">Registered Phone Number</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-on-surface-variant material-symbols-outlined text-xl">smartphone</span>
                    <input
                      type="tel"
                      value={employeePhone}
                      onChange={(e) => setEmployeePhone(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-tertiary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-tertiary/20 transition-all shadow-inner font-mono"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-outline mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-tertiary">badge</span>
                    Registered Municipal Sanitation Board SIM
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-tertiary hover:bg-tertiary-deep text-on-tertiary text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <span>Get OTP & Login as Staff</span>
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-base text-tertiary">location_on</span>
                Ward Beat GPS Active
              </span>
              <button
                type="button"
                onClick={() => setRole('worker_registration')}
                className="text-tertiary hover:underline font-bold"
              >
                Join Workforce
              </button>
            </div>
          </div>

          {/* Portal 3: Admin Login */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-secondary/50 transition-all duration-300 shadow-md hover:shadow-xl p-6 flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-secondary-fixed/30 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110 duration-500"></div>
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shadow-sm">
                    <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                  </div>
                  <div>
                    <h3 className="text-xl text-on-surface font-bold">Admin Login</h3>
                    <p className="text-xs text-secondary font-bold">प्रशासनिक लॉगिन • Officer</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold border border-secondary/20">
                  Ward & Zone
                </span>
              </div>

              <form className="space-y-3" onSubmit={handleAdminSubmit}>
                <div>
                  <label className="block text-xs text-on-surface font-semibold mb-1">Username or Employee ID</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-on-surface-variant material-symbols-outlined text-xl">badge</span>
                    <input
                      type="text"
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                      className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-secondary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all shadow-inner font-mono"
                      placeholder="e.g. ADM-2041"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs text-on-surface font-semibold">Password</label>
                    <span className="text-[11px] text-secondary">Pre-filled</span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-on-surface-variant material-symbols-outlined text-xl">lock</span>
                    <input
                      type={showAdminPass ? "text" : "password"}
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      className="w-full h-11 pl-11 pr-11 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-secondary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all shadow-inner font-mono"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPass(!showAdminPass)}
                      className="absolute right-3 text-on-surface-variant hover:text-on-surface focus:outline-none"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showAdminPass ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary-container hover:text-on-secondary-container text-on-secondary text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-1"
                >
                  <span className="material-symbols-outlined text-lg">login</span>
                  <span>Login as Ward Officer</span>
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-base text-secondary">security</span>
                2FA Protected
              </span>
              <button
                type="button"
                onClick={() => setRole('central_admin')}
                className="text-secondary hover:underline font-bold"
              >
                Apex Central Hub &rarr;
              </button>
            </div>
          </div>

          {/* Portal 4: AI Vision & CCTV Command Hub */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl p-6 flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-primary-fixed/20 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110 duration-500"></div>
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm">
                    <span className="material-symbols-outlined text-2xl">videocam</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-on-surface leading-snug">AI Vision & CCTV</h3>
                    <p className="text-xs text-primary font-bold">एआई विज़न कमांड</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold border border-primary/20">
                  Ops Enclave
                </span>
              </div>

              <form className="space-y-3" onSubmit={handleCctvSubmit}>
                <div>
                  <label className="block text-xs text-on-surface font-semibold mb-1">Username or Engineer ID</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-on-surface-variant material-symbols-outlined text-xl">smart_toy</span>
                    <input
                      type="text"
                      value={cctvId}
                      onChange={(e) => setCctvId(e.target.value)}
                      className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-primary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner font-mono"
                      placeholder="e.g. CAM-ENG-401"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs text-on-surface font-semibold">Security Key / Pass</label>
                    <span className="text-[11px] text-primary">Pre-filled</span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-on-surface-variant material-symbols-outlined text-xl">key</span>
                    <input
                      type={showCctvPass ? "text" : "password"}
                      value={cctvPass}
                      onChange={(e) => setCctvPass(e.target.value)}
                      className="w-full h-11 pl-11 pr-11 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-primary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner font-mono"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCctvPass(!showCctvPass)}
                      className="absolute right-3 text-on-surface-variant hover:text-on-surface focus:outline-none"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showCctvPass ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary-deep text-on-primary text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-1"
                >
                  <span className="material-symbols-outlined text-lg">analytics</span>
                  <span>Login to Command Hub</span>
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 text-on-surface-variant text-[11px]">
                <span className="material-symbols-outlined text-base text-primary">memory</span>
                Edge TPU Monitored
              </span>
              <span className="inline-flex items-center gap-1 text-primary font-bold text-[11px]">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                Secured
              </span>
            </div>
          </div>
        </div>

        {/* 24x7 Helpline Strip */}
        <div className="w-full max-w-5xl mt-12 rounded-2xl bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high p-5 lg:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-outline-variant/30 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-2xl">support_agent</span>
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h4 className="text-base font-bold text-on-surface">Civic Grievance & Sanitary Helpline</h4>
                <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-extrabold uppercase">
                  24x7 Active
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Toll-Free citizen assistance for unattended garbage, broken bins, and public hygiene alerts
              </p>
            </div>
          </div>

          <a
            href="tel:1969"
            className="px-6 py-3 rounded-full bg-primary text-on-primary text-sm font-bold shadow-md hover:bg-primary-deep flex items-center gap-2 shrink-0 transition-all"
          >
            <span className="material-symbols-outlined text-lg">call</span>
            <span>Dial 1969 (Toll-Free)</span>
          </a>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {otpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl p-6 sm:p-8 border border-outline-variant/30 text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">sms</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface">Enter 6-Digit OTP</h3>
            <p className="text-xs text-on-surface-variant mt-1 mb-6">
              A secure one-time passcode was sent to your registered mobile number
            </p>

            <div className="flex justify-center gap-2 sm:gap-3 mb-6">
              {enteredOtp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const next = [...enteredOtp];
                    next[idx] = e.target.value;
                    setEnteredOtp(next);
                  }}
                  className="w-11 h-13 text-center text-xl font-bold rounded-xl bg-surface-container-low border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={verifyOtpAndLogin}
              className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-deep transition-all"
            >
              Verify OTP & Proceed to Portal
            </button>

            <div className="mt-4 flex items-center justify-between text-xs text-outline">
              <button type="button" onClick={() => showToast("New OTP sent: 528914", "info")} className="hover:text-primary">
                Resend Code (30s)
              </button>
              <button type="button" onClick={() => setOtpModal(null)} className="hover:text-error">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
