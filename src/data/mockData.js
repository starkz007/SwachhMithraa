export const initialTickets = [];


export const initialWorkers = [
  {
    id: "WKR-104",
    name: "Sunil V.",
    role: "Sanitation Lead / Sweeper",
    phone: "+91 98451 22891",
    beat: "Beat #4 (Indiranagar 12th Main)",
    dutyStatus: "on_duty",
    punchedInAt: "06:30 AM",
    rating: 4.9,
    tasksCompletedToday: 4,
    creditsWallet: 1420,
    currentLocation: "12th Cross Park (Lat 12.9716, Lng 77.6412)"
  },
  {
    id: "WKR-102",
    name: "Ramesh Babu",
    role: "Tipper Auto Driver",
    phone: "+91 98450 77123",
    beat: "Beat #4 (Commercial Belt)",
    dutyStatus: "on_duty",
    punchedInAt: "06:15 AM",
    rating: 4.8,
    tasksCompletedToday: 6,
    creditsWallet: 1850,
    currentLocation: "CMH Road Junction"
  },
  {
    id: "WKR-109",
    name: "Lakshmi Devi",
    role: "Area Sweeper",
    phone: "+91 98452 44321",
    beat: "Beat #3 (Defence Colony)",
    dutyStatus: "on_duty",
    punchedInAt: "06:45 AM",
    rating: 4.95,
    tasksCompletedToday: 3,
    creditsWallet: 2100,
    currentLocation: "6th Cross Defence Colony"
  },
  {
    id: "WKR-115",
    name: "Mohan Kumar",
    role: "Heavy Compactor Loader",
    phone: "+91 98459 88312",
    beat: "Zone 3 Transfer Station",
    dutyStatus: "off_duty",
    punchedInAt: "-",
    rating: 4.7,
    tasksCompletedToday: 0,
    creditsWallet: 980,
    currentLocation: "Off-duty / Depo 4"
  }
];

export const initialAiCameraViolations = [];

export const smartBins = [
  { id: "BIN-101", location: "12th Cross Park Main Entrance, Indiranagar 2nd Stage", address: "12th Cross Rd, Bengaluru 560038", fillPercent: 92, type: "Dry Recyclables", status: "Critical Overflow", lat: 12.9716, lng: 77.6412 },
  { id: "BIN-102", location: "CMH Road Metro Gate 2 & Feeder Bay", address: "CMH Rd, Indiranagar, Bengaluru 560038", fillPercent: 44, type: "Wet Compostable", status: "Normal", lat: 12.9785, lng: 77.6388 },
  { id: "BIN-103", location: "80ft Road & 7th Main BMTC Shelter", address: "80 Feet Rd, Indiranagar, Bengaluru 560075", fillPercent: 78, type: "Mixed Urban", status: "Warning", lat: 12.9734, lng: 77.6472 },
  { id: "BIN-104", location: "100ft Road BDA Complex Commercial Corner", address: "100 Feet Rd, Indiranagar, Bengaluru 560038", fillPercent: 28, type: "Sanitary Hazardous", status: "Optimal", lat: 12.9723, lng: 77.6428 }
];

export const blackspots = [
  { id: "BLK-01", name: "12th Cross Park Rear Periphery", address: "12th Cross Rd & 2nd Stage Culvert, Bengaluru 560038", severity: "High (Level 4)", dumpVolume: "2.4 MT / week", clearanceCadence: "Daily 07:00 AM", lat: 12.9716, lng: 77.6412 },
  { id: "BLK-02", name: "CMH Metro Substation & Transformer Bay", address: "CMH Road, Pillar 62 Underpass, Bengaluru 560038", severity: "Critical (Level 5)", dumpVolume: "3.8 MT / week", clearanceCadence: "Twice Daily", lat: 12.9772, lng: 77.6394 },
  { id: "BLK-03", name: "Old Airport Road & HAL Underpass Service Lane", address: "Old Airport Rd, Kodihalli, Bengaluru 560008", severity: "Moderate (Level 2)", dumpVolume: "1.1 MT / week", clearanceCadence: "Alternate Days", lat: 12.9648, lng: 77.6450 }
];

export const cameraFleet = [
  { id: "POLE-CAM-1401", location: "100ft Road & Old Madras Road Junction", address: "100 Feet Rd North End, Indiranagar 560038", status: "Online", solarCharge: "98%", batteryHealth: "99%", fps: 30, resolution: "4K AI HDR", ptzAvailable: true },
  { id: "POLE-CAM-1402", location: "100ft Road & 12th Main Junction", address: "100ft Rd / 12th Main, Indiranagar 560038", status: "Online", solarCharge: "92%", batteryHealth: "96%", fps: 30, resolution: "4K AI HDR", ptzAvailable: true },
  { id: "POLE-CAM-1407", location: "CMH Metro Station Entry Plaza", address: "CMH Road Metro Gate 2, Indiranagar 560038", status: "Online", solarCharge: "88%", batteryHealth: "94%", fps: 30, resolution: "1080p Thermal + Optical", ptzAvailable: false },
  { id: "POLE-CAM-1412", location: "12th Main Commercial & Food Street", address: "12th Main Rd, HAL 2nd Stage, Indiranagar 560038", status: "Online", solarCharge: "95%", batteryHealth: "98%", fps: 30, resolution: "4K AI HDR", ptzAvailable: true }
];

export const zonalMetrics = {
  zoneName: "Zone 3 (East Urban Region)",
  totalDailyTonnage: 482.4, // Metric Tonnes
  segregationRate: 86.4, // %
  wetWasteMT: 278.2,
  dryRecyclableMT: 164.5,
  domesticHazardousMT: 39.7,
  landfillDiversionPercent: 74.2,
  compostYieldMT: 92.4,
  rdfRefuseFuelMT: 114.0,
  swachhSurvekshanScore: 894, // Out of 1000
  cityRank: 2
};

export const interZoneLeaderboard = [
  { rank: 1, zone: "Zone 1 (South Greens)", wards: 24, coverage: "99.2%", avgSlaMins: 22, score: 918, badge: "Swachh Gold Star" },
  { rank: 2, zone: "Zone 3 (East Urban)", wards: 28, coverage: "97.8%", avgSlaMins: 24, score: 894, badge: "Excellence Shield" },
  { rank: 3, zone: "Zone 2 (West Tech Belt)", wards: 32, coverage: "95.1%", avgSlaMins: 29, score: 865, badge: "Innovation Runner-Up" },
  { rank: 4, zone: "Zone 4 (North Lakes)", wards: 22, coverage: "92.4%", avgSlaMins: 38, score: 832, badge: "Active Improver" },
  { rank: 5, zone: "Zone 5 (Central Heritage)", wards: 18, coverage: "89.6%", avgSlaMins: 45, score: 804, badge: "Special Heritage Focus" }
];

export const directivesGazettes = [
  {
    id: "MUNICIPAL-DIR-2024/88",
    title: "Mandatory Source Segregation 3-Way Protocol & Bulk Generator Penalty Revision",
    date: "12 Aug 2024",
    issuedBy: "Office of the Principal Municipal Commissioner, Urban Affairs",
    status: "Active Gazette",
    summary: "Strict enforcement of wet, dry, and sanitary waste segregation at source across all apartments (>50 units) and commercial complexes. Non-compliance invites escalating fines starting at ₹5,000 up to ₹25,000 with power/water disconnection notices."
  },
  {
    id: "MUNICIPAL-DIR-2024/76",
    title: "Monsoon Flood Sanitary Contingency & Chemical Desilting Protocols",
    date: "04 Jul 2024",
    issuedBy: "Apex Disaster Preparedness Cell",
    status: "Active Gazette",
    summary: "24x7 standby roster for all zonal jetting machines and suction super-suckers. Anti-larval chemical fogging twice weekly in high vulnerability water-logged wards."
  },
  {
    id: "MUNICIPAL-DIR-2024/52",
    title: "Sanitation Workforce Welfare Shield, Dignity Credits & Biometric Heat Index Safety",
    date: "18 May 2024",
    issuedBy: "Ministry of Housing & Urban Affairs (MoHUA) & Municipal Board",
    status: "Permanent Charter",
    summary: "Mandatory 1.5x hydration breaks during heatwaves (>38°C), digital dignity credits wallet redeemable for subsidized grocery staples, and comprehensive cashless health insurance cover of ₹5 Lakhs per family."
  }
];
