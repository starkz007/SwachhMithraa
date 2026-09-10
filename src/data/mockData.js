export const initialTickets = [
  {
    id: "SWM-2024-8841",
    title: "Overflowing Bin at 12th Cross Park",
    titleHi: "12वीं क्रॉस पार्क में डस्टबिन ओवरफ्लो",
    category: "Garbage Dump / Overflowing Bin",
    ward: "Ward 14 - Indiranagar",
    beat: "Beat #4",
    location: "12th Cross Park, near Children Play Area, Indiranagar 2nd Stage",
    lat: 12.9716,
    lng: 77.6412,
    reportedBy: "Rajesh Sharma (Citizen #9842)",
    reportedTime: "Today, 07:15 AM",
    status: "in_progress", // 'pending' | 'in_progress' | 'resolved'
    priority: "High",
    assignedWorker: {
      id: "WKR-104",
      name: "Sunil V.",
      phone: "+91 98451 22891",
      beat: "Beat #4",
      status: "En Route with Cart",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    },
    beforePhoto: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80",
    afterPhoto: null,
    slaRemaining: "1h 42m",
    notes: "Citizen reported excessive paper, plastic packaging, and organic waste spilling onto walkway."
  },
  {
    id: "SWM-2024-8839",
    title: "Illegal Construction Debris Dumping",
    titleHi: "सड़क किनारे अवैध मलबा डंपिंग",
    category: "Debris / Malba",
    ward: "Ward 14 - Indiranagar",
    beat: "Beat #4",
    location: "Opposite BDA Complex, 100ft Road",
    lat: 12.9698,
    lng: 77.6435,
    reportedBy: "Meenakshi Sundaram",
    reportedTime: "Yesterday, 04:30 PM",
    status: "resolved",
    priority: "Medium",
    assignedWorker: {
      id: "WKR-102",
      name: "Ramesh Babu",
      phone: "+91 98450 77123",
      beat: "Beat #4",
      status: "Completed",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    beforePhoto: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80",
    afterPhoto: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800&auto=format&fit=crop&q=80",
    slaRemaining: "Completed (2h under SLA)",
    notes: "Tractor debris cleared with municipal JCB assistance. Area sanitized with lime powder."
  },
  {
    id: "SWM-2024-8845",
    title: "Dead Animal Removal on CMH Road",
    titleHi: "सीएमएच रोड पर मृत पशु निस्तारण",
    category: "Dead Animal / Animal Carcass",
    ward: "Ward 14 - Indiranagar",
    beat: "Beat #4",
    location: "CMH Road Metro Pillar #62",
    lat: 12.9785,
    lng: 77.6388,
    reportedBy: "Kavitha R.",
    reportedTime: "Today, 08:45 AM",
    status: "pending",
    priority: "Critical",
    assignedWorker: null,
    beforePhoto: "https://images.unsplash.com/photo-1618060932014-4deda4932554?w=800&auto=format&fit=crop&q=80",
    afterPhoto: null,
    slaRemaining: "3h 15m",
    notes: "Requires specialized hygienic retrieval van and chemical disinfectant spray."
  },
  {
    id: "SWM-2024-8847",
    title: "Clogged Stormwater Drain & Plastic Choke",
    titleHi: "नाली में फंसा प्लास्टिक एवं रुका पानी",
    category: "Drain Chokage / Stagnant Sludge",
    ward: "Ward 14 - Indiranagar",
    beat: "Beat #4",
    location: "80 Feet Road, 7th Main Corner",
    lat: 12.9734,
    lng: 77.6472,
    reportedBy: "Praveen Kumar",
    reportedTime: "Today, 09:10 AM",
    status: "pending",
    priority: "High",
    assignedWorker: null,
    beforePhoto: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
    afterPhoto: null,
    slaRemaining: "5h 50m",
    notes: "Water stagnant during morning downpour, mosquito hazard reported."
  }
];

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

export const initialAiCameraViolations = [
  {
    id: "CAM-VIO-4891",
    cameraNode: "POLE-CAM-1402 (Indiranagar 100ft Rd)",
    timestamp: "10:14:22 AM Today",
    violationType: "Commercial Waste Dumping",
    confidence: 94.8,
    vehiclePlate: "KA-04-MB-4819",
    offenderType: "Commercial Pick-up Truck",
    fineAmount: 2500,
    status: "Review Pending", // 'Review Pending' | 'Challan Issued' | 'Dismissed'
    sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    videoClipUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80",
    bbox: { x: 34, y: 48, w: 28, h: 32 }
  },
  {
    id: "CAM-VIO-4892",
    cameraNode: "POLE-CAM-1407 (CMH Metro Station Plaza)",
    timestamp: "09:48:10 AM Today",
    violationType: "Open Plastic Burning",
    confidence: 97.2,
    vehiclePlate: "N/A (Pedestrian / Vendor)",
    offenderType: "Street Vendor",
    fineAmount: 1000,
    status: "Challan Issued",
    sha256Hash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    videoClipUrl: "https://images.unsplash.com/photo-1618060932014-4deda4932554?w=800&auto=format&fit=crop&q=80",
    bbox: { x: 55, y: 40, w: 22, h: 26 }
  },
  {
    id: "CAM-VIO-4893",
    cameraNode: "POLE-CAM-1412 (12th Main Food Street)",
    timestamp: "08:12:05 AM Today",
    violationType: "Bin Overflow > 90%",
    confidence: 89.4,
    vehiclePlate: "N/A (Smart Sensor Alert)",
    offenderType: "Civic Infrastructure Overflow",
    fineAmount: 0,
    status: "Auto-Dispatched",
    sha256Hash: "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e",
    videoClipUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
    bbox: { x: 20, y: 52, w: 25, h: 35 }
  }
];

export const smartBins = [
  { id: "BIN-101", location: "12th Cross Park Entrance", fillPercent: 92, type: "Dry Recyclables", status: "Critical Overflow", lat: 12.9716, lng: 77.6412 },
  { id: "BIN-102", location: "CMH Road Metro Gate 2", fillPercent: 44, type: "Wet Compostable", status: "Normal", lat: 12.9785, lng: 77.6388 },
  { id: "BIN-103", location: "80ft Road Bus Stop", fillPercent: 78, type: "Mixed Urban", status: "Warning", lat: 12.9734, lng: 77.6472 },
  { id: "BIN-104", location: "100ft Road BDA Corner", fillPercent: 28, type: "Sanitary Hazardous", status: "Optimal", lat: 12.9698, lng: 77.6435 }
];

export const blackspots = [
  { id: "BLK-01", name: "12th Cross Park Periphery", severity: "High (Level 4)", dumpVolume: "2.4 MT / week", clearanceCadence: "Daily 07:00 AM", lat: 12.9716, lng: 77.6412 },
  { id: "BLK-02", name: "Behind Metro Substation CMH", severity: "Critical (Level 5)", dumpVolume: "3.8 MT / week", clearanceCadence: "Twice Daily", lat: 12.9772, lng: 77.6394 },
  { id: "BLK-03", name: "Old Flyover Service Lane", severity: "Moderate (Level 2)", dumpVolume: "1.1 MT / week", clearanceCadence: "Alternate Days", lat: 12.9680, lng: 77.6450 }
];

export const cameraFleet = [
  { id: "POLE-CAM-1401", location: "100ft Road North Junction", status: "Online", solarCharge: "98%", batteryHealth: "99%", fps: 30, resolution: "4K AI HDR", ptzAvailable: true },
  { id: "POLE-CAM-1402", location: "Indiranagar 100ft Rd / 12th Main", status: "Online", solarCharge: "92%", batteryHealth: "96%", fps: 30, resolution: "4K AI HDR", ptzAvailable: true },
  { id: "POLE-CAM-1407", location: "CMH Metro Station Plaza", status: "Online", solarCharge: "88%", batteryHealth: "94%", fps: 30, resolution: "1080p Thermal + Optical", ptzAvailable: false },
  { id: "POLE-CAM-1412", location: "12th Main Food Street", status: "Online", solarCharge: "95%", batteryHealth: "98%", fps: 30, resolution: "4K AI HDR", ptzAvailable: true }
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
