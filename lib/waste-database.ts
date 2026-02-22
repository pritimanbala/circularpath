// Comprehensive waste types database with moisture content and properties
export interface WasteType {
  id: string
  name: string
  category: 'rice' | 'coconut' | 'banana' | 'sugarcane' | 'cotton' | 'groundnut' | 'maize'
  moistureContent: 'dry' | 'wet' | 'mixed'
  description: string
  bioContent: number // % biodegradable content
  carbonContent: number // % carbon content
}

export const wasteDatabase: WasteType[] = [
  // Rice Products
  {
    id: 'rice_husk',
    name: 'Rice Husk',
    category: 'rice',
    moistureContent: 'dry',
    description: 'Outer covering of rice grain',
    bioContent: 95,
    carbonContent: 48
  },
  {
    id: 'rice_bran',
    name: 'Rice Bran',
    category: 'rice',
    moistureContent: 'dry',
    description: 'Inner layer removed during milling',
    bioContent: 98,
    carbonContent: 42
  },
  {
    id: 'rice_straw',
    name: 'Rice Straw',
    category: 'rice',
    moistureContent: 'mixed',
    description: 'Stems and leaves after grain harvest',
    bioContent: 92,
    carbonContent: 45
  },

  // Coconut Products
  {
    id: 'coconut_fiber',
    name: 'Coconut Fiber (Coir)',
    category: 'coconut',
    moistureContent: 'dry',
    description: 'Fiber from coconut husk',
    bioContent: 90,
    carbonContent: 46
  },
  {
    id: 'coconut_shell',
    name: 'Coconut Shell',
    category: 'coconut',
    moistureContent: 'dry',
    description: 'Hard outer shell of coconut',
    bioContent: 88,
    carbonContent: 49
  },
  {
    id: 'coconut_pith',
    name: 'Coconut Pith (Coir Dust)',
    category: 'coconut',
    moistureContent: 'mixed',
    description: 'Fine residue from coir processing',
    bioContent: 85,
    carbonContent: 44
  },

  // Banana Products
  {
    id: 'banana_peel',
    name: 'Banana Peel',
    category: 'banana',
    moistureContent: 'wet',
    description: 'Outer skin of banana fruit',
    bioContent: 99,
    carbonContent: 35
  },
  {
    id: 'banana_stem',
    name: 'Banana Stem',
    category: 'banana',
    moistureContent: 'wet',
    description: 'Pseudo-stem of banana plant',
    bioContent: 96,
    carbonContent: 38
  },
  {
    id: 'banana_leaf',
    name: 'Banana Leaf',
    category: 'banana',
    moistureContent: 'mixed',
    description: 'Leaves from banana plants',
    bioContent: 94,
    carbonContent: 40
  },

  // Sugarcane Products
  {
    id: 'bagasse',
    name: 'Bagasse',
    category: 'sugarcane',
    moistureContent: 'mixed',
    description: 'Fibrous residue after sugar extraction',
    bioContent: 93,
    carbonContent: 47
  },
  {
    id: 'sugarcane_trash',
    name: 'Sugarcane Trash',
    category: 'sugarcane',
    moistureContent: 'dry',
    description: 'Leaves and tops from sugarcane',
    bioContent: 91,
    carbonContent: 44
  },

  // Cotton Products
  {
    id: 'cotton_stalk',
    name: 'Cotton Stalk',
    category: 'cotton',
    moistureContent: 'dry',
    description: 'Stem and woody parts of cotton plant',
    bioContent: 89,
    carbonContent: 48
  },
  {
    id: 'cotton_seed_hull',
    name: 'Cotton Seed Hull',
    category: 'cotton',
    moistureContent: 'dry',
    description: 'Shell of cotton seeds',
    bioContent: 87,
    carbonContent: 46
  },

  // Groundnut Products
  {
    id: 'groundnut_shell',
    name: 'Groundnut Shell',
    category: 'groundnut',
    moistureContent: 'dry',
    description: 'Shell from groundnut pods',
    bioContent: 86,
    carbonContent: 45
  },
  {
    id: 'groundnut_haulm',
    name: 'Groundnut Haulm',
    category: 'groundnut',
    moistureContent: 'dry',
    description: 'Leafy and stem material from groundnut',
    bioContent: 88,
    carbonContent: 43
  },

  // Maize Products
  {
    id: 'corn_stover',
    name: 'Corn Stover',
    category: 'maize',
    moistureContent: 'mixed',
    description: 'Stalks, leaves, and cobs from maize',
    bioContent: 90,
    carbonContent: 46
  },
  {
    id: 'corn_cob',
    name: 'Corn Cob',
    category: 'maize',
    moistureContent: 'dry',
    description: 'Core of the corn/maize ear',
    bioContent: 89,
    carbonContent: 47
  }
]

// Get waste type by ID
export function getWasteType(wasteId: string): WasteType | undefined {
  return wasteDatabase.find(w => w.id === wasteId)
}

// Get moisture content for waste
export function getWasteMoistureContent(wasteId: string): 'dry' | 'wet' | 'mixed' | undefined {
  const waste = getWasteType(wasteId)
  return waste?.moistureContent
}

// Get waste types by category
export function getWastesByCategory(category: string): WasteType[] {
  return wasteDatabase.filter(w => w.category === category)
}

// Get all categories
export function getAllCategories(): string[] {
  return Array.from(new Set(wasteDatabase.map(w => w.category)))
}
