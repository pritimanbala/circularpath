export interface Facility {
  id: string
  name: string
  state: string
  district: string
  city: string
  link: string
  type: string
  wasteTypesAccepted: string[]
  processingCapacity: string
  contact: string
  phone: string
  email: string
  established: number
  certifications: string[]
  pathwaysSupported: string[]
}

export const facilitiesDatabase: Facility[] = [
  {
    "id": "f1",
    "name": "Brahmapuram CBG & Organic Manure Plant",
    "state": "Kerala",
    "district": "Ernakulam",
    "city": "Kochi",
    "link" : "https://maps.app.goo.gl/19jX54iBYaY21CTS7",
    "type": "Biogas / Organic Waste Processing",
    "wasteTypesAccepted": ["Biodegradable Municipal Waste", "Food Waste"],
    "processingCapacity": "150 tonnes/day",
    "contact": "",
    "phone": "",
    "email": "",
    "established": 2026,
    "certifications": [],
    "pathwaysSupported": ["Compressed Biogas (CBG)", "Organic Manure"]
  },
  {
    "id": "f2",
    "name": "BIO CNG PLANT INDORE",
    "state": "Madhya Pradesh",
    "district": "Indore",
    "city": "Indore",
    "link": "https://maps.app.goo.gl/LFVF6svgUAybgFb9A",
    "type": "Bio-CNG / Waste to Energy",
    "wasteTypesAccepted": ["Municipal Organic Waste", "Food Waste", "Market Waste"],
    "processingCapacity": "550 tonnes/day",
    "contact": "",
    "phone": "",
    "email": "",
    "established": 2022,
    "certifications": [],
    "pathwaysSupported": ["Compressed Biogas (CBG)", "Organic Compost"]
  },
  {
    "id": "f3",
    "name": "Biomech Incino Incinerators India - Incinerators in Kerala",
    "state": "Kerala",
    "district": "Thrissur",
    "city": "Thrissur",
    "link": "https://maps.app.goo.gl/noTwjYRvpSfVZyNM6",
    "type": "Organic Waste Converter / Composting",
    "wasteTypesAccepted": ["Vegetable Market Waste"],
    "processingCapacity": "4 tonnes/day",
    "contact": "",
    "phone": "",
    "email": "",
    "established": 2013,
    "certifications": [],
    "pathwaysSupported": ["Organic Compost"]
  },
  {
    "id": "f6",
    "name": "SEWAF ENERGY INDIA PRIVATE LIMITED",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "city": "Chennai",
    "link" : "https://maps.app.goo.gl/gMK8R9Zrw9mbU9Fm9",
    "type": "Composting / Organic Waste",
    "wasteTypesAccepted": ["Wet Waste"],
    "processingCapacity": "1,000 tonnes/day + 50 tonnes/day micro plants",
    "contact": "",
    "phone": "",
    "email": "",
    "established": 2012,
    "certifications": [],
    "pathwaysSupported": ["Organic Compost"]
  },
  // {
  //   "id": "f8",
  //   "name": "Patna Bazar Samiti Biogas Plant",
  //   "state": "Bihar",
  //   "district": "Patna",
  //   "city": "Patna",
  //   "latitude": 25.5941,
  //   "longitude": 85.1376,
  //   "type": "Biogas / Organic Waste",
  //   "wasteTypesAccepted": ["Vegetable & Fruit Market Waste"],
  //   "processingCapacity": "5 tonnes/day",
  //   "contact": "",
  //   "phone": "",
  //   "email": "",
  //   "established": 2025,
  //   "certifications": [],
  //   "pathwaysSupported": ["Biogas Energy", "Organic Fertiliser"]
  // },
  // {
  //   "id": "f9",
  //   "name": "Delhi Green Waste Processing Plant (ITO)",
  //   "state": "Delhi",
  //   "district": "Central Delhi",
  //   "city": "New Delhi",
  //   "latitude": 28.6270,
  //   "longitude": 77.2430,
  //   "type": "Organic Waste Composting",
  //   "wasteTypesAccepted": ["Green Waste", "Garden Waste", "Organic Waste"],
  //   "processingCapacity": "N/A",
  //   "contact": "",
  //   "phone": "",
  //   "email": "",
  //   "established": 2026,
  //   "certifications": [],
  //   "pathwaysSupported": ["Organic Compost"]
  // },
  // {
  //   "id": "f10",
  //   "name": "Mysuru City Corporation Waste-to-Biogas Plants",
  //   "state": "Karnataka",
  //   "district": "Mysore",
  //   "city": "Mysuru",
  //   "latitude": 12.2958,
  //   "longitude": 76.6394,
  //   "type": "Biogas / Waste to Energy",
  //   "wasteTypesAccepted": ["Organic Waste"],
  //   "processingCapacity": "2 x small-scale biogas units",
  //   "contact": "",
  //   "phone": "",
  //   "email": "",
  //   "established": 2024,
  //   "certifications": [],
  //   "pathwaysSupported": ["Compressed Biogas"]
  // },
  // {
  //   "id": "f11",
  //   "name": "Sri Jagannath Temple Organic Waste Plant",
  //   "state": "Odisha",
  //   "district": "Puri",
  //   "city": "Puri",
  //   "latitude": 19.8135,
  //   "longitude": 85.8312,
  //   "type": "Compost / Biogas",
  //   "wasteTypesAccepted": ["Temple Flower Waste", "Food Waste"],
  //   "processingCapacity": "3–4 tonnes/day",
  //   "contact": "",
  //   "phone": "",
  //   "email": "",
  //   "established": 2009,
  //   "certifications": [],
  //   "pathwaysSupported": ["Organic Compost", "Biogas"]
  // },
  // {
  //   "id": "f12",
  //   "name": "Bhopal Centralised Compost Plant",
  //   "state": "Madhya Pradesh",
  //   "district": "Bhopal",
  //   "city": "Bhopal",
  //   "latitude": 23.2599,
  //   "longitude": 77.4126,
  //   "type": "Composting",
  //   "wasteTypesAccepted": ["Municipal Wet Waste"],
  //   "processingCapacity": "300 tonnes/day",
  //   "contact": "",
  //   "phone": "",
  //   "email": "",
  //   "established": 2018,
  //   "certifications": [],
  //   "pathwaysSupported": ["Organic Compost"]
  // }
]
export function getAllFacilities(): Facility[] {
  return facilitiesDatabase
}

export function getFacilitiesByLocation(state: string, district: string, city?: string): Facility[] {
  return facilitiesDatabase.filter(f =>
    f.state.toLowerCase() === state.toLowerCase() &&
    f.district.toLowerCase() === district.toLowerCase() &&
    (!city || f.city.toLowerCase().includes(city.toLowerCase()))
  )
}

export function getFacilitiesByPathway(pathway: string): Facility[] {
  return facilitiesDatabase.filter(f =>
    f.pathwaysSupported.some(p => p.toLowerCase() === pathway.toLowerCase())
  )
}

export function getFacilitiesByWasteType(wasteType: string): Facility[] {
  return facilitiesDatabase.filter(f =>
    f.wasteTypesAccepted.some(w => w.toLowerCase() === wasteType.toLowerCase())
  )
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}


