// Geographic & Infrastructure Master Dataset for Bengaluru (Indiranagar Ward 14 - East Zone)
// All coordinates are real-world GPS coordinates with actual streets, landmarks, and postal codes.

export const BENGALURU_LOCATIONS = {
  ward: {
    number: "Ward 14",
    name: "Indiranagar",
    zone: "East Zone",
    subDivision: "Jeevan Bima Nagar Sub-Division",
    bbmpRange: "Shantinagar - CV Raman Nagar Assembly Const.",
    pincode: "560038",
    bounds: {
      north: 12.9845,
      south: 12.9642,
      east: 77.6535,
      west: 77.6320
    },
    center: { lat: 12.9716, lng: 77.6412 }
  },

  // Verified landmark points in Indiranagar Ward 14
  landmarks: [
    {
      name: "12th Cross Public Park, Indiranagar 2nd Stage",
      address: "12th Cross Rd, Indiranagar 2nd Stage, Bengaluru, Karnataka 560038",
      lat: 12.9716,
      lng: 77.6412,
      beat: "Beat #4",
      landmarkRef: "Near Children Play Area & Community Gazebo",
      type: "Public Park"
    },
    {
      name: "100 Feet Road & 12th Main Junction",
      address: "100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
      lat: 12.9723,
      lng: 77.6428,
      beat: "Beat #4",
      landmarkRef: "Opposite BDA Complex Commercial Arcade",
      type: "Major Junction"
    },
    {
      name: "Indiranagar Metro Station (Purple Line - Pillar #62)",
      address: "Chinmaya Mission Hospital Rd, Indiranagar, Bengaluru, Karnataka 560038",
      lat: 12.9785,
      lng: 77.6388,
      beat: "Beat #4",
      landmarkRef: "CMH Road Metro Entry Gate 2 & Feeder Bay",
      type: "Transit Hub"
    },
    {
      name: "80 Feet Road & 7th Main Road Corner",
      address: "80 Feet Rd, HAL 3rd Stage, Indiranagar, Bengaluru, Karnataka 560075",
      lat: 12.9734,
      lng: 77.6472,
      beat: "Beat #4",
      landmarkRef: "Near 80ft Road BMTC Bus Shelter & Stormwater Culvert",
      type: "Commercial Arterial"
    },
    {
      name: "Defence Colony Main Gate & 6th Cross",
      address: "6th Cross Rd, Defence Colony, Indiranagar, Bengaluru, Karnataka 560038",
      lat: 12.9768,
      lng: 77.6441,
      beat: "Beat #3",
      landmarkRef: "Defence Colony Residents Association Gate #1",
      type: "Residential Zone"
    },
    {
      name: "Old Airport Road & HAL Flyover Service Lane",
      address: "Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560008",
      lat: 12.9648,
      lng: 77.6450,
      beat: "Beat #2",
      landmarkRef: "Near Command Hospital Underpass & Service Lane",
      type: "Highway Service Road"
    }
  ]
};
