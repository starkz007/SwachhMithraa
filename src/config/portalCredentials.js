// Centralized credentials configuration for SwachhMitra portals
// Each admin tier, officer, and portal user has distinct authorized credentials

export const PORTAL_CREDENTIALS = {
  // 1. Citizen Portal Credentials
  citizen: {
    phone: "9876543210",
    name: "Rajesh Sharma",
    role: "citizen",
    defaultOtp: "741258",
    description: "Registered Citizen (Indiranagar Ward 14)"
  },

  // 2. Field Sanitary Worker Credentials
  worker: {
    phone: "9845122891",
    name: "Sunil V.",
    role: "worker",
    defaultOtp: "369852",
    description: "Lead Sanitary Worker (Beat #4 Active)"
  },

  // 3. Ward / Local Admin Credentials
  local_admin: {
    id: "WARD-ADM-14",
    pass: "WardIndira#2024",
    name: "Inspector Suresh M. Gowda",
    designation: "Ward Health Inspector (Ward 14)",
    role: "local_admin",
    description: "Ward-level complaints triage, beat worker dispatch, & penalty issuance"
  },

  // 4. Zonal Admin Credentials
  zonal_admin: {
    id: "ZONE-DIR-03",
    pass: "ZonalEast@2024",
    name: "Dr. Ananya Sen",
    designation: "Zonal Joint Commissioner (East Zone)",
    role: "zonal_admin",
    description: "Multi-ward oversight, waste segregation, & pole infrastructure"
  },

  // 5. Apex Central Admin Hub Credentials
  central_admin: {
    id: "APEX-CMD-01",
    pass: "ApexSwachh!2024",
    name: "Commissioner Office",
    designation: "Special Commissioner (Solid Waste Mgmt - BBMP / MoHUA)",
    role: "central_admin",
    description: "City-wide metrics, inter-zone leaderboard, & policy directives"
  },

  // 6. AI Vision & CCTV Ops Credentials
  cctv_ops: {
    id: "CAM-ENG-401",
    pass: "EdgeVision*401",
    name: "Eng. Vikrant Patil",
    designation: "Lead AI Surveillance Systems Engineer",
    role: "cctv_ops",
    description: "Edge camera telemetry, live violation models, & evidence vault"
  }
};
