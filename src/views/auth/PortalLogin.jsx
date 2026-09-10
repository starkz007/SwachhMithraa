import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PORTAL_CREDENTIALS } from '../../config/portalCredentials';

export const PortalLogin = () => {
  const { setRole, showToast } = useApp();
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [showCctvPass, setShowCctvPass] = useState(false);
  const [showCredModal, setShowCredModal] = useState(false);

  // Active Admin Tier selection: 'local_admin' | 'zonal_admin' | 'central_admin'
  const [selectedAdminTier, setSelectedAdminTier] = useState('local_admin');

  // Input states - starting blank with NO pre-filled values
  const [citizenPhone, setCitizenPhone] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [adminId, setAdminId] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [cctvId, setCctvId] = useState("");
  const [cctvPass, setCctvPass] = useState("");

  // OTP flow state
  const [otpModal, setOtpModal] = useState(null); // null | 'citizen' | 'employee'
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState(["", "", "", "", "", ""]);

  // Quick fill helper for testing/demo
  const fillCredentials = (type) => {
    const cred = PORTAL_CREDENTIALS[type];
    if (!cred) return;
    if (type === 'citizen') {
      setCitizenPhone(cred.phone);
    } else if (type === 'worker') {
      setEmployeePhone(cred.phone);
    } else if (type === 'cctv_ops') {
      setCctvId(cred.id);
      setCctvPass(cred.pass);
    } else {
      setSelectedAdminTier(type);
      setAdminId(cred.id);
      setAdminPass(cred.pass);
    }
    showToast(`Credentials selected for ${cred.name || type}`, "info");
  };

  const handleCitizenSubmit = (e) => {
    e.preventDefault();
    if (!citizenPhone.trim()) {
      showToast("Please enter a valid 10-digit mobile number", "error");
      return;
    }
    const cleanPhone = citizenPhone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      showToast("Phone number must be at least 10 digits", "error");
      return;
    }

    // Generate or fetch OTP
    const code = cleanPhone === PORTAL_CREDENTIALS.citizen.phone 
      ? PORTAL_CREDENTIALS.citizen.defaultOtp 
      : Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setEnteredOtp(["", "", "", "", "", ""]);
    setOtpModal('citizen');
    showToast(`OTP sent to +91 ${cleanPhone}! (Demo OTP: ${code})`, "info");
  };

  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
    if (!employeePhone.trim()) {
      showToast("Please enter your registered staff phone number", "error");
      return;
    }
    const cleanPhone = employeePhone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      showToast("Phone number must be at least 10 digits", "error");
      return;
    }

    const code = cleanPhone === PORTAL_CREDENTIALS.worker.phone
      ? PORTAL_CREDENTIALS.worker.defaultOtp
      : Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setEnteredOtp(["", "", "", "", "", ""]);
    setOtpModal('employee');
    showToast(`OTP sent to sanitary staff phone! (Demo OTP: ${code})`, "info");
  };

  const verifyOtpAndLogin = () => {
    const entered = enteredOtp.join("");
    if (entered.length !== 6) {
      showToast("Please enter all 6 digits of the OTP", "error");
      return;
    }

    if (generatedOtp && entered !== generatedOtp && entered !== "123456") {
      showToast("Incorrect OTP entered. Please check and try again.", "error");
      return;
    }

    if (otpModal === 'citizen') {
      const isKnown = citizenPhone.replace(/\D/g, "") === PORTAL_CREDENTIALS.citizen.phone;
      const userName = isKnown ? PORTAL_CREDENTIALS.citizen.name : "Citizen User";
      showToast(`Citizen Verified! Welcome ${userName}`, "success");
      setRole('citizen');
    } else if (otpModal === 'employee') {
      const isKnown = employeePhone.replace(/\D/g, "") === PORTAL_CREDENTIALS.worker.phone;
      const userName = isKnown ? PORTAL_CREDENTIALS.worker.name : "Sanitary Staff";
      showToast(`Sanitary Staff Verified! Welcome ${userName}`, "success");
      setRole('worker');
    }
    setOtpModal(null);
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    const cleanId = adminId.trim().toUpperCase();
    const cleanPass = adminPass.trim();

    if (!cleanId || !cleanPass) {
      showToast("Please enter both Admin ID and Password", "error");
      return;
    }

    // Determine target admin credential by selected tab or auto-detect by entered ID
    let matchedTier = selectedAdminTier;
    const allAdminTiers = ['local_admin', 'zonal_admin', 'central_admin'];
    const detected = allAdminTiers.find(k => PORTAL_CREDENTIALS[k].id.toUpperCase() === cleanId);
    if (detected) {
      matchedTier = detected;
    }

    const targetCred = PORTAL_CREDENTIALS[matchedTier];
    if (cleanId === targetCred.id.toUpperCase() && cleanPass === targetCred.pass) {
      showToast(`Authenticated successfully! Welcome ${targetCred.name} (${targetCred.designation})`, "success");
      setRole(targetCred.role);
    } else {
      showToast(`Authentication failed: Invalid credentials for ${targetCred.designation}. Check demo credentials.`, "error");
    }
  };

  const handleCctvSubmit = (e) => {
    e.preventDefault();
    const cleanId = cctvId.trim().toUpperCase();
    const cleanPass = cctvPass.trim();

    if (!cleanId || !cleanPass) {
      showToast("Please enter Engineer ID and Security Key", "error");
      return;
    }

    const targetCred = PORTAL_CREDENTIALS.cctv_ops;
    if (cleanId === targetCred.id.toUpperCase() && cleanPass === targetCred.pass) {
      showToast(`Command Enclave secured! Welcome ${targetCred.name}`, "success");
      setRole('cctv_ops');
    } else {
      showToast("Authentication failed: Invalid Edge Ops credentials", "error");
    }
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 flex flex-col items-center">
        {/* Top Floating Action: Authorized Credentials Cheat Sheet */}
        <div className="w-full flex justify-end mb-2">
          <button
            type="button"
            onClick={() => setShowCredModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold border border-outline-variant/50 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-primary">badge</span>
            <span>View Authorized Login Credentials</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>
        </div>

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
                      placeholder="Enter 10-digit mobile number"
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
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary-container hover:to-primary text-on-primary text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                className="inline-flex items-center gap-1 text-secondary hover:text-primary font-semibold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">fingerprint</span>
                <span>Aadhaar SSO</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('citizen_registration')}
                className="text-primary hover:underline font-bold cursor-pointer"
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
                      placeholder="Enter registered mobile number"
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
                  className="w-full h-12 rounded-xl bg-tertiary hover:bg-tertiary-deep text-on-tertiary text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                className="text-tertiary hover:underline font-bold cursor-pointer"
              >
                Join Workforce
              </button>
            </div>
          </div>

          {/* Portal 3: Multi-Tier Admin Login */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-secondary/50 transition-all duration-300 shadow-md hover:shadow-xl p-6 flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-secondary-fixed/30 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110 duration-500"></div>
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shadow-sm">
                    <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                  </div>
                  <div>
                    <h3 className="text-xl text-on-surface font-bold">Admin Login</h3>
                    <p className="text-xs text-secondary font-bold">प्रशासनिक लॉगिन • Officers</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[11px] font-bold border border-secondary/20">
                  {selectedAdminTier === 'local_admin' ? 'Ward' : selectedAdminTier === 'zonal_admin' ? 'Zone' : 'Apex'}
                </span>
              </div>

              {/* Admin Tier Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-surface-container-low rounded-xl mb-3 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setSelectedAdminTier('local_admin')}
                  className={`py-1 rounded-lg transition-all cursor-pointer ${
                    selectedAdminTier === 'local_admin'
                      ? 'bg-secondary text-on-secondary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Ward Admin
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAdminTier('zonal_admin')}
                  className={`py-1 rounded-lg transition-all cursor-pointer ${
                    selectedAdminTier === 'zonal_admin'
                      ? 'bg-secondary text-on-secondary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Zonal Admin
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAdminTier('central_admin')}
                  className={`py-1 rounded-lg transition-all cursor-pointer ${
                    selectedAdminTier === 'central_admin'
                      ? 'bg-secondary text-on-secondary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Apex Central
                </button>
              </div>

              <form className="space-y-3" onSubmit={handleAdminSubmit}>
                <div>
                  <label className="block text-xs text-on-surface font-semibold mb-1">
                    {selectedAdminTier === 'local_admin' ? 'Ward Officer ID' : selectedAdminTier === 'zonal_admin' ? 'Zonal Director ID' : 'Apex Central Command ID'}
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-on-surface-variant material-symbols-outlined text-xl">badge</span>
                    <input
                      type="text"
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                      className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-secondary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all shadow-inner font-mono"
                      placeholder={
                        selectedAdminTier === 'local_admin' ? "e.g. WARD-ADM-14" :
                        selectedAdminTier === 'zonal_admin' ? "e.g. ZONE-DIR-03" : "e.g. APEX-CMD-01"
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs text-on-surface font-semibold">Password</label>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-on-surface-variant material-symbols-outlined text-xl">lock</span>
                    <input
                      type={showAdminPass ? "text" : "password"}
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      className="w-full h-11 pl-11 pr-11 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-secondary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all shadow-inner font-mono"
                      placeholder="Enter security password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPass(!showAdminPass)}
                      className="absolute right-3 text-on-surface-variant hover:text-on-surface focus:outline-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showAdminPass ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary-container hover:text-on-secondary-container text-on-secondary text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">login</span>
                  <span>
                    Login as {selectedAdminTier === 'local_admin' ? 'Ward Officer' : selectedAdminTier === 'zonal_admin' ? 'Zonal Director' : 'Apex Central'}
                  </span>
                </button>
              </form>
            </div>

            <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 text-on-surface-variant text-[11px]">
                <span className="material-symbols-outlined text-base text-secondary">security</span>
                Role-Based 2FA
              </span>
              <button
                type="button"
                onClick={() => setShowCredModal(true)}
                className="text-secondary hover:underline font-bold text-[11px] cursor-pointer"
              >
                Need Credentials? &rarr;
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
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-on-surface-variant material-symbols-outlined text-xl">key</span>
                    <input
                      type={showCctvPass ? "text" : "password"}
                      value={cctvPass}
                      onChange={(e) => setCctvPass(e.target.value)}
                      className="w-full h-11 pl-11 pr-11 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-primary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner font-mono"
                      placeholder="Enter security key"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCctvPass(!showCctvPass)}
                      className="absolute right-3 text-on-surface-variant hover:text-on-surface focus:outline-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showCctvPass ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary-deep text-on-primary text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer"
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
            <p className="text-xs text-on-surface-variant mt-1 mb-2">
              A secure one-time passcode was sent to your registered mobile number
            </p>
            {generatedOtp && (
              <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
                Passcode: {generatedOtp}
              </div>
            )}

            <div className="flex justify-center gap-2 sm:gap-3 mb-6">
              {enteredOtp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const val = e.target.value;
                    const next = [...enteredOtp];
                    next[idx] = val;
                    setEnteredOtp(next);
                    if (val && idx < 5) {
                      const nextInput = document.getElementById(`otp-input-${idx + 1}`);
                      if (nextInput) nextInput.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !digit && idx > 0) {
                      const prevInput = document.getElementById(`otp-input-${idx - 1}`);
                      if (prevInput) prevInput.focus();
                    }
                  }}
                  className="w-11 h-13 text-center text-xl font-bold rounded-xl bg-surface-container-low border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-mono"
                  placeholder="-"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={verifyOtpAndLogin}
              className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-deep transition-all cursor-pointer"
            >
              Verify OTP & Proceed to Portal
            </button>

            <div className="mt-4 flex items-center justify-between text-xs text-outline">
              <button
                type="button"
                onClick={() => {
                  const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                  setGeneratedOtp(newOtp);
                  showToast(`New OTP sent: ${newOtp}`, "info");
                }}
                className="hover:text-primary font-semibold cursor-pointer"
              >
                Resend Code
              </button>
              <button type="button" onClick={() => setOtpModal(null)} className="hover:text-error font-semibold cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Authorized Credentials Reference Modal */}
      {showCredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-2xl p-6 sm:p-8 border border-outline-variant/30 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">badge</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface">Authorized Portal Credentials Directory</h3>
                  <p className="text-xs text-on-surface-variant">Each role & admin tier has distinct authorized credentials</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCredModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="overflow-y-auto py-4 space-y-3 flex-1 pr-1 text-xs">
              {/* Ward Admin */}
              <div className="p-3.5 rounded-xl bg-secondary/5 border border-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-bold text-[10px] uppercase">
                      Ward Admin (Local)
                    </span>
                    <span className="font-bold text-on-surface">{PORTAL_CREDENTIALS.local_admin.name}</span>
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-on-surface-variant space-x-3">
                    <span>ID: <strong className="text-secondary">{PORTAL_CREDENTIALS.local_admin.id}</strong></span>
                    <span>Pass: <strong className="text-secondary">{PORTAL_CREDENTIALS.local_admin.pass}</strong></span>
                  </div>
                  <p className="text-[11px] text-outline mt-0.5">{PORTAL_CREDENTIALS.local_admin.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { fillCredentials('local_admin'); setShowCredModal(false); }}
                  className="px-3 py-1.5 rounded-lg bg-secondary text-on-secondary font-semibold hover:opacity-90 self-start sm:self-center shrink-0 cursor-pointer"
                >
                  Use This
                </button>
              </div>

              {/* Zonal Admin */}
              <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[10px] uppercase">
                      Zonal Admin
                    </span>
                    <span className="font-bold text-on-surface">{PORTAL_CREDENTIALS.zonal_admin.name}</span>
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-on-surface-variant space-x-3">
                    <span>ID: <strong className="text-blue-600">{PORTAL_CREDENTIALS.zonal_admin.id}</strong></span>
                    <span>Pass: <strong className="text-blue-600">{PORTAL_CREDENTIALS.zonal_admin.pass}</strong></span>
                  </div>
                  <p className="text-[11px] text-outline mt-0.5">{PORTAL_CREDENTIALS.zonal_admin.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { fillCredentials('zonal_admin'); setShowCredModal(false); }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:opacity-90 self-start sm:self-center shrink-0 cursor-pointer"
                >
                  Use This
                </button>
              </div>

              {/* Apex Central Admin */}
              <div className="p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-700 text-white font-bold text-[10px] uppercase">
                      Apex Central Admin
                    </span>
                    <span className="font-bold text-on-surface">{PORTAL_CREDENTIALS.central_admin.name}</span>
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-on-surface-variant space-x-3">
                    <span>ID: <strong className="text-purple-700">{PORTAL_CREDENTIALS.central_admin.id}</strong></span>
                    <span>Pass: <strong className="text-purple-700">{PORTAL_CREDENTIALS.central_admin.pass}</strong></span>
                  </div>
                  <p className="text-[11px] text-outline mt-0.5">{PORTAL_CREDENTIALS.central_admin.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { fillCredentials('central_admin'); setShowCredModal(false); }}
                  className="px-3 py-1.5 rounded-lg bg-purple-700 text-white font-semibold hover:opacity-90 self-start sm:self-center shrink-0 cursor-pointer"
                >
                  Use This
                </button>
              </div>

              {/* AI Vision & CCTV Ops */}
              <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px] uppercase">
                      AI Vision & CCTV Ops
                    </span>
                    <span className="font-bold text-on-surface">{PORTAL_CREDENTIALS.cctv_ops.name}</span>
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-on-surface-variant space-x-3">
                    <span>ID: <strong className="text-emerald-600">{PORTAL_CREDENTIALS.cctv_ops.id}</strong></span>
                    <span>Key: <strong className="text-emerald-600">{PORTAL_CREDENTIALS.cctv_ops.pass}</strong></span>
                  </div>
                  <p className="text-[11px] text-outline mt-0.5">{PORTAL_CREDENTIALS.cctv_ops.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { fillCredentials('cctv_ops'); setShowCredModal(false); }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:opacity-90 self-start sm:self-center shrink-0 cursor-pointer"
                >
                  Use This
                </button>
              </div>

              {/* Citizen */}
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-bold text-[10px] uppercase">
                      Citizen Portal
                    </span>
                    <span className="font-bold text-on-surface">{PORTAL_CREDENTIALS.citizen.name}</span>
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-on-surface-variant space-x-3">
                    <span>Phone: <strong>{PORTAL_CREDENTIALS.citizen.phone}</strong></span>
                    <span>Default OTP: <strong>{PORTAL_CREDENTIALS.citizen.defaultOtp}</strong></span>
                  </div>
                  <p className="text-[11px] text-outline mt-0.5">{PORTAL_CREDENTIALS.citizen.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { fillCredentials('citizen'); setShowCredModal(false); }}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-highest text-on-surface font-semibold hover:bg-surface-container-high self-start sm:self-center shrink-0 cursor-pointer"
                >
                  Use This
                </button>
              </div>

              {/* Sanitary Staff */}
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-bold text-[10px] uppercase">
                      Field Sanitary Worker
                    </span>
                    <span className="font-bold text-on-surface">{PORTAL_CREDENTIALS.worker.name}</span>
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-on-surface-variant space-x-3">
                    <span>Phone: <strong>{PORTAL_CREDENTIALS.worker.phone}</strong></span>
                    <span>Default OTP: <strong>{PORTAL_CREDENTIALS.worker.defaultOtp}</strong></span>
                  </div>
                  <p className="text-[11px] text-outline mt-0.5">{PORTAL_CREDENTIALS.worker.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { fillCredentials('worker'); setShowCredModal(false); }}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-highest text-on-surface font-semibold hover:bg-surface-container-high self-start sm:self-center shrink-0 cursor-pointer"
                >
                  Use This
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/30 flex justify-end">
              <button
                type="button"
                onClick={() => setShowCredModal(false)}
                className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs cursor-pointer"
              >
                Close Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
