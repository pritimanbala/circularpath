export interface Facility {
  id: string
  name: string
  state: string
  district: string
  city: string
  latitude: number
  longitude: number
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
  // Tamil Nadu Facilities
  {
    id: 'f1',
    name: 'EcoCompost Solutions',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    city: 'Coimbatore',
    latitude: 11.0086,
    longitude: 76.9960,
    type: 'Composting Unit',
    wasteTypesAccepted: ['Rice Husk', 'Banana Peel', 'Agricultural Residue'],
    processingCapacity: '25 tonnes/day',
    contact: 'Raj Kumar',
    phone: '+91 94423 12345',
    email: 'info@ecocompost.in',
    established: 2015,
    certifications: ['ISO 9001', 'Organic Certified'],
    pathwaysSupported: ['Composting', 'Anaerobic Digestion']
  },
  {
    id: 'f2',
    name: 'BioEnergy Systems Tamil Nadu',
    state: 'Tamil Nadu',
    district: 'Thanjavur',
    city: 'Thanjavur',
    latitude: 10.7905,
    longitude: 79.1379,
    type: 'Biogas Generation',
    wasteTypesAccepted: ['Rice Bran', 'Agricultural Waste', 'Food Waste'],
    processingCapacity: '30 tonnes/day',
    contact: 'Meera Singh',
    phone: '+91 98765 43210',
    email: 'contact@bioenergy-tn.in',
    established: 2017,
    certifications: ['ISO 14001', 'MNRE Accredited'],
    pathwaysSupported: ['Anaerobic Digestion', 'Biomass Energy']
  },
  {
    id: 'f3',
    name: 'Green Energy Biomass Works',
    state: 'Tamil Nadu',
    district: 'Madurai',
    city: 'Madurai',
    latitude: 9.9252,
    longitude: 78.1198,
    type: 'Biomass Processing',
    wasteTypesAccepted: ['Coconut Fiber', 'Groundnut Shell', 'Agri-waste'],
    processingCapacity: '40 tonnes/day',
    contact: 'Suresh Gupta',
    phone: '+91 98765 65432',
    email: 'contact@greenergyworks.in',
    established: 2019,
    certifications: ['ISO 14001', 'BIS Certified'],
    pathwaysSupported: ['Biomass Energy', 'Biochar']
  },
  // West Bengal Facilities
  {
    id: 'f4',
    name: 'Bengal Biogas Solutions',
    state: 'West Bengal',
    district: 'Kolkata',
    city: 'Kolkata',
    latitude: 22.5726,
    longitude: 88.3639,
    type: 'Biogas Generation',
    wasteTypesAccepted: ['Rice Husk', 'Food Waste', 'Agricultural Residue'],
    processingCapacity: '35 tonnes/day',
    contact: 'Amit Sharma',
    phone: '+91 98234 56789',
    email: 'info@bengalbiogas.in',
    established: 2016,
    certifications: ['ISO 9001', 'MNRE Accredited'],
    pathwaysSupported: ['Anaerobic Digestion', 'Biogas Energy']
  },
  {
    id: 'f5',
    name: 'Darjeeling Organic Compost',
    state: 'West Bengal',
    district: 'Darjeeling',
    city: 'Darjeeling',
    latitude: 27.0410,
    longitude: 88.2663,
    type: 'Composting Unit',
    wasteTypesAccepted: ['Banana Peel', 'Tea Waste', 'Organic Matter'],
    processingCapacity: '15 tonnes/day',
    contact: 'Priya Das',
    phone: '+91 99876 54321',
    email: 'contact@darjeelingcompost.in',
    established: 2018,
    certifications: ['Organic Certified'],
    pathwaysSupported: ['Composting']
  },
  // Karnataka Facilities
  {
    id: 'f6',
    name: 'Bangalore Waste Solutions',
    state: 'Karnataka',
    district: 'Bangalore Urban',
    city: 'Bangalore',
    latitude: 12.9716,
    longitude: 77.5946,
    type: 'Integrated Facility',
    wasteTypesAccepted: ['All Agricultural Waste', 'Food Processing Waste'],
    processingCapacity: '50 tonnes/day',
    contact: 'Rakesh Patel',
    phone: '+91 98765 12340',
    email: 'contact@bangalorewaste.in',
    established: 2014,
    certifications: ['ISO 14001', 'MNRE Accredited', 'BIS Certified'],
    pathwaysSupported: ['Composting', 'Anaerobic Digestion', 'Biomass Energy']
  },
  // Maharashtra Facilities
  {
    id: 'f7',
    name: 'Maharashtra Green Processing',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Pune',
    latitude: 18.5204,
    longitude: 73.8567,
    type: 'Biochar Production',
    wasteTypesAccepted: ['Sugarcane Bagasse', 'Coconut Shell', 'Agricultural Residue'],
    processingCapacity: '45 tonnes/day',
    contact: 'Vikas Kumar',
    phone: '+91 98234 67890',
    email: 'contact@mahagreenprocessing.in',
    established: 2015,
    certifications: ['ISO 14001', 'BIS Certified'],
    pathwaysSupported: ['Biochar', 'Biomass Energy']
  },
  // Uttar Pradesh Facilities
  {
    id: 'f8',
    name: 'UP Biorenewables',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    city: 'Lucknow',
    latitude: 26.8467,
    longitude: 80.9462,
    type: 'Anaerobic Digestion',
    wasteTypesAccepted: ['Rice Bran', 'Wheat Straw', 'Agricultural Waste'],
    processingCapacity: '38 tonnes/day',
    contact: 'Sharma Ji',
    phone: '+91 98765 23456',
    email: 'contact@upbiorenewables.in',
    established: 2017,
    certifications: ['ISO 9001', 'MNRE Accredited'],
    pathwaysSupported: ['Anaerobic Digestion', 'Biogas Energy']
  },
  // Rajasthan Facilities
  {
    id: 'f9',
    name: 'Rajasthan Agri Solutions',
    state: 'Rajasthan',
    district: 'Jaipur',
    city: 'Jaipur',
    latitude: 26.9124,
    longitude: 75.7873,
    type: 'Composting & Biochar',
    wasteTypesAccepted: ['Groundnut Shell', 'Maize Straw', 'Agricultural Waste'],
    processingCapacity: '32 tonnes/day',
    contact: 'Ajay Singh',
    phone: '+91 99234 56789',
    email: 'contact@rajagrisolutions.in',
    established: 2016,
    certifications: ['ISO 14001'],
    pathwaysSupported: ['Composting', 'Biochar']
  },
  // Gujarat Facilities
  {
    id: 'f10',
    name: 'Gujarat BioWaste Management',
    state: 'Gujarat',
    district: 'Ahmedabad',
    city: 'Ahmedabad',
    latitude: 23.0225,
    longitude: 72.5714,
    type: 'Integrated Facility',
    wasteTypesAccepted: ['Cotton Stalk', 'Groundnut Husk', 'Agricultural Residue'],
    processingCapacity: '42 tonnes/day',
    contact: 'Nikhil Desai',
    phone: '+91 98765 34567',
    email: 'contact@gujaratbiowaste.in',
    established: 2015,
    certifications: ['ISO 9001', 'MNRE Accredited'],
    pathwaysSupported: ['Composting', 'Biomass Energy', 'Biochar']
  },
  // Haryana Facilities
  {
    id: 'f11',
    name: 'Haryana Organic Waste Processing',
    state: 'Haryana',
    district: 'Faridabad',
    city: 'Faridabad',
    latitude: 28.4089,
    longitude: 77.3178,
    type: 'Composting Unit',
    wasteTypesAccepted: ['Rice Straw', 'Maize Residue', 'Agricultural Waste'],
    processingCapacity: '28 tonnes/day',
    contact: 'Priya Sharma',
    phone: '+91 98876 54321',
    email: 'contact@haryanaorganic.in',
    established: 2018,
    certifications: ['ISO 9001'],
    pathwaysSupported: ['Composting']
  },
  // Punjab Facilities
  {
    id: 'f12',
    name: 'Punjab BioEnergy Hub',
    state: 'Punjab',
    district: 'Ludhiana',
    city: 'Ludhiana',
    latitude: 30.9010,
    longitude: 75.8573,
    type: 'Biogas & Composting',
    wasteTypesAccepted: ['Rice Husk', 'Wheat Straw', 'Food Processing Waste'],
    processingCapacity: '48 tonnes/day',
    contact: 'Mandeep Singh',
    phone: '+91 98765 45678',
    email: 'contact@punjabbioenergy.in',
    established: 2014,
    certifications: ['ISO 14001', 'MNRE Accredited', 'BIS Certified'],
    pathwaysSupported: ['Anaerobic Digestion', 'Composting', 'Biomass Energy']
  },
  // Andhra Pradesh Facilities
  {
    id: 'f13',
    name: 'Andhra Green Processing',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Visakhapatnam',
    latitude: 17.6869,
    longitude: 83.2185,
    type: 'Biochar Production',
    wasteTypesAccepted: ['Coconut Shell', 'Rice Husk', 'Agricultural Waste'],
    processingCapacity: '35 tonnes/day',
    contact: 'Krishna Kumar',
    phone: '+91 98234 78901',
    email: 'contact@andhrgreen.in',
    established: 2017,
    certifications: ['ISO 9001', 'BIS Certified'],
    pathwaysSupported: ['Biochar', 'Biomass Energy']
  },
  // Telangana Facilities
  {
    id: 'f14',
    name: 'Telangana Waste Solutions',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Hyderabad',
    latitude: 17.3850,
    longitude: 78.4867,
    type: 'Integrated Facility',
    wasteTypesAccepted: ['All Agricultural Waste', 'Food Waste'],
    processingCapacity: '52 tonnes/day',
    contact: 'Sanjay Reddy',
    phone: '+91 99876 23456',
    email: 'contact@telwastesolutions.in',
    established: 2016,
    certifications: ['ISO 14001', 'MNRE Accredited'],
    pathwaysSupported: ['Composting', 'Anaerobic Digestion', 'Biochar']
  }
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

export function getNearestFacility(centerLat: number, centerLon: number, excludeDistrict?: string): (Facility & { distance: number }) | null {
  const facilitiesWithDistance = facilitiesDatabase.map(f => ({
    ...f,
    distance: calculateDistance(centerLat, centerLon, f.latitude, f.longitude)
  }))
  
  // Filter out facilities from the same district if specified
  const filtered = excludeDistrict 
    ? facilitiesWithDistance.filter(f => f.district !== excludeDistrict)
    : facilitiesWithDistance
  
  if (filtered.length === 0) return null
  
  // Return the facility with the minimum distance
  return filtered.reduce((nearest, facility) =>
    facility.distance < nearest.distance ? facility : nearest
  )
}
