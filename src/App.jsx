import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Toast } from './components/common/Toast';
import { DevPortalSwitcher } from './components/common/DevPortalSwitcher';

import { PortalLogin } from './views/auth/PortalLogin';
import { CitizenRegistration } from './views/auth/CitizenRegistration';
import { EmployeeRegistration } from './views/auth/EmployeeRegistration';
import { CitizenDashboard } from './views/citizen/CitizenDashboard';
import { WorkerPortal } from './views/employee/WorkerPortal';
import { LocalAdminLayout } from './views/localAdmin/LocalAdminLayout';
import { ZonalAdminLayout } from './views/zonalAdmin/ZonalAdminLayout';
import { CentralAdminLayout } from './views/centralAdmin/CentralAdminLayout';
import { CctvLayout } from './views/cctv/CctvLayout';

export const App = () => {
  const { activeRole } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans text-on-surface antialiased">
      <Toast />
      
      {/* Universal Header (Rendered on all screens except initial login hero, or everywhere with role context) */}
      {activeRole !== 'login' && <Header />}

      {/* Dynamic View Router */}
      <div className="flex-1 flex flex-col">
        {activeRole === 'login' && <PortalLogin />}
        {activeRole === 'citizen_registration' && <CitizenRegistration />}
        {activeRole === 'worker_registration' && <EmployeeRegistration />}
        {activeRole === 'citizen' && <CitizenDashboard />}
        {activeRole === 'worker' && <WorkerPortal />}
        {activeRole === 'local_admin' && <LocalAdminLayout />}
        {activeRole === 'zonal_admin' && <ZonalAdminLayout />}
        {activeRole === 'central_admin' && <CentralAdminLayout />}
        {activeRole === 'cctv_ops' && <CctvLayout />}
      </div>

      {/* Floating 26-Screen Dev & Evaluation Switcher */}
      <DevPortalSwitcher />
    </div>
  );
};
