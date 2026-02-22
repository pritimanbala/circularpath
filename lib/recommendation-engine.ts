// Comprehensive Decision-Support Recommendation Engine
// Uses chemical engineering principles and multi-criteria analysis

export interface WasteCharacteristics {
  wasteType: string
  quantityPerYear: number
  quantityPerDay: number
  moistureContent: number
  bulkDensity?: number
  volatileContent?: number
  ashContent?: number
  calorificValue?: number
  notes?: string
}

export interface FacilityContext {
  facilityType: string
  location?: string
  district?: string
  existingInfrastructure?: string[]
  laborAvailability?: 'high' | 'medium' | 'low'
  marketAccess?: 'high' | 'medium' | 'low'
  financialCapacity?: 'high' | 'medium' | 'low'
}

export interface ConversionPathway {
  id: string
  name: string
  endProduct: string
  description: string
  technicalFeasibility: number // 0-1
  economicViability: number // 0-1
  environmentalBenefit: number // 0-1
  scalabilityScore: number // 0-1
  marketDemandScore: number // 0-1
  infrastructureRequirements: string[]
  estimatedYield: number // percentage
  estimatedInvestment: number // in INR
  annualRevenue: number // in INR
  paybackPeriod: number // in years
  requiredCapacityTonngesPerDay: number
  environmentalImpact: {
    co2ReductionPerTonne: number
    landfillDiversionPercentage: number
    waterUsagePerTonne?: number
    pollutionRisk: 'low' | 'medium' | 'high'
  }
}

export interface RecommendationScore {
  pathway: ConversionPathway
  overallScore: number
  technicalScore: number
  economicScore: number
  environmentalScore: number
  feasibilityStatus: 'RECOMMENDED' | 'FEASIBLE' | 'CHALLENGING' | 'NOT_FEASIBLE'
  matchPercentage: number
  rationale: string[]
  risks: string[]
  opportunities: string[]
  implementationPriority: number // 1-3, where 1 is highest
}

// Waste stream database with chemical composition and processing characteristics
const wasteStreamDatabase: {
  [key: string]: {
    composition: { [key: string]: number }
    typicalMoisture: number
    bulkDensity: number
    calorificValue?: number
    seasonalVariation: number
    primaryPathways: string[]
  }
} = {
  rice_husk: {
    composition: {
      cellulose: 0.35,
      lignin: 0.20,
      silica: 0.17,
      ash: 0.28,
      moisture: 0.12
    },
    typicalMoisture: 12,
    bulkDensity: 0.12,
    calorificValue: 3500, // kcal/kg
    seasonalVariation: 0.15,
    primaryPathways: ['ash_production', 'bioenergy', 'activated_carbon']
  },
  coconut_fiber: {
    composition: {
      cellulose: 0.43,
      lignin: 0.30,
      tannins: 0.06,
      moisture: 0.12,
      ash: 0.09
    },
    typicalMoisture: 12,
    bulkDensity: 0.08,
    calorificValue: 4200,
    seasonalVariation: 0.10,
    primaryPathways: ['textile_fiber', 'composites', 'composting']
  },
  banana_peel: {
    composition: {
      carbohydrates: 0.20,
      cellulose: 0.15,
      moisture: 0.70,
      protein: 0.03,
      minerals: 0.05,
      others: 0.02
    },
    typicalMoisture: 70,
    bulkDensity: 0.20,
    seasonalVariation: 0.20,
    primaryPathways: ['animal_feed', 'compost', 'bioplastics']
  },
  rice_bran: {
    composition: {
      oil: 0.18,
      protein: 0.12,
      carbohydrates: 0.50,
      fiber: 0.08,
      ash: 0.08,
      moisture: 0.12
    },
    typicalMoisture: 12,
    bulkDensity: 0.32,
    calorificValue: 4100,
    seasonalVariation: 0.05,
    primaryPathways: ['oil_extraction', 'animal_feed', 'biofuel']
  },
  coconut_shell: {
    composition: {
      cellulose: 0.40,
      lignin: 0.35,
      ash: 0.05,
      moisture: 0.10,
      others: 0.10
    },
    typicalMoisture: 10,
    bulkDensity: 0.32,
    calorificValue: 5000,
    seasonalVariation: 0.08,
    primaryPathways: ['charcoal_production', 'activated_carbon', 'bioenergy']
  },
  banana_stem: {
    composition: {
      cellulose: 0.30,
      hemicellulose: 0.20,
      lignin: 0.15,
      moisture: 0.28,
      ash: 0.07
    },
    typicalMoisture: 80,
    bulkDensity: 0.15,
    seasonalVariation: 0.15,
    primaryPathways: ['fiber_extraction', 'composting', 'biogas']
  }
}

// Conversion pathway database
const pathwayDatabase: ConversionPathway[] = [
  // Rice-based pathways
  {
    id: 'rice_husk_ash',
    name: 'Husk Ash Production',
    endProduct: 'Silica Ash / Pozzolanic Material',
    description: 'Thermal conversion of rice husk to produce high-quality silica ash used in construction, concrete, and refractory applications',
    technicalFeasibility: 0.92,
    economicViability: 0.85,
    environmentalBenefit: 0.95,
    scalabilityScore: 0.88,
    marketDemandScore: 0.85,
    infrastructureRequirements: ['Calcination kiln (500-800°C)', 'Air classification system', 'Quality testing lab'],
    estimatedYield: 20,
    estimatedInvestment: 45_000_000,
    annualRevenue: 20_000_000,
    paybackPeriod: 2.5,
    requiredCapacityTonngesPerDay: 50,
    environmentalImpact: {
      co2ReductionPerTonne: 0.85,
      landfillDiversionPercentage: 100,
      waterUsagePerTonne: 0.5,
      pollutionRisk: 'low'
    }
  },
  {
    id: 'rice_husk_bioenergy',
    name: 'Husk-based Bioenergy',
    endProduct: 'Briquettes / Charcoal',
    description: 'Conversion of rice husk to energy-dense briquettes or charcoal for industrial and domestic use',
    technicalFeasibility: 0.88,
    economicViability: 0.82,
    environmentalBenefit: 0.90,
    scalabilityScore: 0.92,
    marketDemandScore: 0.88,
    infrastructureRequirements: ['Carbonization unit', 'Briquetting machine', 'Drying facility'],
    estimatedYield: 35,
    estimatedInvestment: 32_000_000,
    annualRevenue: 18_000_000,
    paybackPeriod: 2.2,
    requiredCapacityTonngesPerDay: 50,
    environmentalImpact: {
      co2ReductionPerTonne: 1.2,
      landfillDiversionPercentage: 100,
      waterUsagePerTonne: 0.3,
      pollutionRisk: 'low'
    }
  },
  {
    id: 'rice_husk_activated_carbon',
    name: 'Activated Carbon Production',
    endProduct: 'Activated Carbon',
    description: 'Chemical or thermal activation of carbonized rice husk to produce activated carbon for water purification and air filtration',
    technicalFeasibility: 0.75,
    economicViability: 0.80,
    environmentalBenefit: 0.85,
    scalabilityScore: 0.65,
    marketDemandScore: 0.82,
    infrastructureRequirements: ['Activation reactor', 'Chemical handling infrastructure', 'Filtration system', 'Quality control'],
    estimatedYield: 12,
    estimatedInvestment: 75_000_000,
    annualRevenue: 25_000_000,
    paybackPeriod: 3.5,
    requiredCapacityTonngesPerDay: 80,
    environmentalImpact: {
      co2ReductionPerTonne: 0.95,
      landfillDiversionPercentage: 100,
      waterUsagePerTonne: 2.5,
      pollutionRisk: 'medium'
    }
  },

  // Coconut-based pathways
  {
    id: 'coconut_fiber_textiles',
    name: 'Coir Fiber Extraction & Textiles',
    endProduct: 'Coir Textiles / Cordage',
    description: 'Extraction and processing of coconut fiber for use in textiles, ropes, mats, and composite materials',
    technicalFeasibility: 0.90,
    economicViability: 0.88,
    environmentalBenefit: 0.92,
    scalabilityScore: 0.85,
    marketDemandScore: 0.90,
    infrastructureRequirements: ['Retting facility', 'Beating equipment', 'Spinning/weaving unit'],
    estimatedYield: 40,
    estimatedInvestment: 50_000_000,
    annualRevenue: 22_000_000,
    paybackPeriod: 2.8,
    requiredCapacityTonngesPerDay: 60,
    environmentalImpact: {
      co2ReductionPerTonne: 0.75,
      landfillDiversionPercentage: 100,
      waterUsagePerTonne: 5.0,
      pollutionRisk: 'medium'
    }
  },
  {
    id: 'coconut_fiber_composites',
    name: 'Coconut Fiber Composite Boards',
    endProduct: 'Composite Panels / Building Materials',
    description: 'Production of fiber-reinforced composite boards for construction, furniture, and packaging applications',
    technicalFeasibility: 0.85,
    economicViability: 0.84,
    environmentalBenefit: 0.88,
    scalabilityScore: 0.82,
    marketDemandScore: 0.80,
    infrastructureRequirements: ['Mat forming machine', 'Binder application system', 'Hot press unit'],
    estimatedYield: 38,
    estimatedInvestment: 42_000_000,
    annualRevenue: 19_500_000,
    paybackPeriod: 2.6,
    requiredCapacityTonngesPerDay: 55,
    environmentalImpact: {
      co2ReductionPerTonne: 0.80,
      landfillDiversionPercentage: 100,
      waterUsagePerTonne: 1.5,
      pollutionRisk: 'low'
    }
  },

  // Banana-based pathways
  {
    id: 'banana_peel_animal_feed',
    name: 'Animal Feed Pellet Production',
    endProduct: 'Cattle/Poultry Feed Pellets',
    description: 'Processing of banana peels into nutritious feed supplements for livestock and poultry',
    technicalFeasibility: 0.88,
    economicViability: 0.85,
    environmentalBenefit: 0.90,
    scalabilityScore: 0.90,
    marketDemandScore: 0.92,
    infrastructureRequirements: ['Drying facility', 'Grinding mill', 'Pelletizing machine'],
    estimatedYield: 25,
    estimatedInvestment: 28_000_000,
    annualRevenue: 15_000_000,
    paybackPeriod: 2.1,
    requiredCapacityTonngesPerDay: 40,
    environmentalImpact: {
      co2ReductionPerTonne: 0.65,
      landfillDiversionPercentage: 100,
      waterUsagePerTonne: 0.2,
      pollutionRisk: 'low'
    }
  },
  {
    id: 'banana_peel_compost',
    name: 'Organic Compost Production',
    endProduct: 'Nutrient-rich Compost',
    description: 'Aerobic composting of banana peels to produce high-quality organic compost for agriculture',
    technicalFeasibility: 0.82,
    economicViability: 0.70,
    environmentalBenefit: 0.96,
    scalabilityScore: 0.88,
    marketDemandScore: 0.75,
    infrastructureRequirements: ['Composting beds', 'Aeration system', 'Curing facility'],
    estimatedYield: 50,
    estimatedInvestment: 12_000_000,
    annualRevenue: 7_000_000,
    paybackPeriod: 1.8,
    requiredCapacityTonngesPerDay: 30,
    environmentalImpact: {
      co2ReductionPerTonne: 1.5,
      landfillDiversionPercentage: 100,
      waterUsagePerTonne: 0.1,
      pollutionRisk: 'low'
    }
  },
  {
    id: 'banana_stem_biogas',
    name: 'Anaerobic Digestion for Biogas',
    endProduct: 'Biogas / Digestate',
    description: 'Anaerobic digestion of banana waste for biogas production and organic fertilizer',
    technicalFeasibility: 0.80,
    economicViability: 0.75,
    environmentalBenefit: 0.93,
    scalabilityScore: 0.78,
    marketDemandScore: 0.70,
    infrastructureRequirements: ['Anaerobic digester', 'Gas handling system', 'Biogas upgrading unit'],
    estimatedYield: 180, // cubic meters per tonne
    estimatedInvestment: 55_000_000,
    annualRevenue: 12_000_000,
    paybackPeriod: 4.5,
    requiredCapacityTonngesPerDay: 50,
    environmentalImpact: {
      co2ReductionPerTonne: 2.1,
      landfillDiversionPercentage: 100,
      waterUsagePerTonne: 0.5,
      pollutionRisk: 'low'
    }
  }
]

export class RecommendationEngine {
  private pathways: ConversionPathway[] = pathwayDatabase
  private wasteDatabase = wasteStreamDatabase

  // Main recommendation function
  recommendPathways(
    wasteCharacteristics: WasteCharacteristics,
    facilityContext: FacilityContext,
    weights?: {
      technical?: number
      economic?: number
      environmental?: number
      scalability?: number
    }
  ): RecommendationScore[] {
    const defaultWeights = {
      technical: weights?.technical ?? 0.25,
      economic: weights?.economic ?? 0.30,
      environmental: weights?.environmental ?? 0.25,
      scalability: weights?.scalability ?? 0.20
    }

    // Score each pathway
    const scoredPathways = this.pathways.map(pathway => {
      return this.scorePathway(pathway, wasteCharacteristics, facilityContext, defaultWeights)
    })

    // Sort by overall score
    return scoredPathways.sort((a, b) => b.overallScore - a.overallScore)
  }

  private scorePathway(
    pathway: ConversionPathway,
    waste: WasteCharacteristics,
    facility: FacilityContext,
    weights: {
      technical: number
      economic: number
      environmental: number
      scalability: number
    }
  ): RecommendationScore {
    // Calculate component scores
    const technicalScore = this.calculateTechnicalScore(pathway, waste)
    const economicScore = this.calculateEconomicScore(pathway, facility)
    const environmentalScore = this.calculateEnvironmentalScore(pathway, waste)
    const scalabilityScore = this.calculateScalabilityScore(pathway, waste, facility)

    // Weighted overall score
    const overallScore =
      technicalScore * weights.technical +
      economicScore * weights.economic +
      environmentalScore * weights.environmental +
      scalabilityScore * weights.scalability

    const matchPercentage = Math.round(overallScore * 100)

    // Determine feasibility status
    const feasibilityStatus = this.determineFeasibility(
      technicalScore,
      economicScore,
      environmentalScore
    )

    // Generate rationale
    const rationale = this.generateRationale(pathway, waste, {
      technical: technicalScore,
      economic: economicScore,
      environmental: environmentalScore,
      scalability: scalabilityScore
    })

    // Identify risks
    const risks = this.identifyRisks(pathway, waste, facility)

    // Identify opportunities
    const opportunities = this.identifyOpportunities(pathway, waste, facility)

    // Calculate implementation priority
    const implementationPriority = this.calculatePriority(overallScore, feasibilityStatus)

    return {
      pathway,
      overallScore,
      technicalScore: Math.round(technicalScore * 100),
      economicScore: Math.round(economicScore * 100),
      environmentalScore: Math.round(environmentalScore * 100),
      feasibilityStatus,
      matchPercentage,
      rationale,
      risks,
      opportunities,
      implementationPriority
    }
  }

  private calculateTechnicalScore(pathway: ConversionPathway, waste: WasteCharacteristics): number {
    let score = pathway.technicalFeasibility

    // Adjust based on quantity
    const capacityMatch = Math.min(waste.quantityPerDay / pathway.requiredCapacityTonngesPerDay, 1)
    score *= (0.5 + capacityMatch * 0.5)

    // Adjust based on waste characteristics
    const wasteData = this.wasteDatabase[waste.wasteType]
    if (wasteData) {
      const moistureMatch = 1 - Math.abs(waste.moistureContent - wasteData.typicalMoisture) / 100
      score *= (0.7 + moistureMatch * 0.3)
    }

    return Math.min(score, 1)
  }

  private calculateEconomicScore(pathway: ConversionPathway, facility: FacilityContext): number {
    let score = pathway.economicViability

    // Adjust based on financial capacity
    if (facility.financialCapacity === 'high') {
      score *= 1.1
    } else if (facility.financialCapacity === 'low') {
      score *= 0.8
    }

    // Adjust based on market access
    if (facility.marketAccess === 'high') {
      score *= 1.05
    } else if (facility.marketAccess === 'low') {
      score *= 0.85
    }

    return Math.min(score, 1)
  }

  private calculateEnvironmentalScore(
    pathway: ConversionPathway,
    waste: WasteCharacteristics
  ): number {
    let score = pathway.environmentalBenefit

    // Adjust based on pollution risk
    if (pathway.environmentalImpact.pollutionRisk === 'high') {
      score *= 0.7
    } else if (pathway.environmentalImpact.pollutionRisk === 'medium') {
      score *= 0.9
    }

    // Bonus for complete waste diversion
    if (pathway.environmentalImpact.landfillDiversionPercentage === 100) {
      score = Math.min(score + 0.05, 1)
    }

    return score
  }

  private calculateScalabilityScore(
    pathway: ConversionPathway,
    waste: WasteCharacteristics,
    facility: FacilityContext
  ): number {
    let score = pathway.scalabilityScore

    // Adjust based on labor availability
    if (facility.laborAvailability === 'high') {
      score *= 1.05
    } else if (facility.laborAvailability === 'low') {
      score *= 0.85
    }

    // Adjust based on quantity variability
    const wasteData = this.wasteDatabase[waste.wasteType]
    if (wasteData && wasteData.seasonalVariation > 0.15) {
      score *= 0.85
    }

    return Math.min(score, 1)
  }

  private determineFeasibility(
    technical: number,
    economic: number,
    environmental: number
  ): 'RECOMMENDED' | 'FEASIBLE' | 'CHALLENGING' | 'NOT_FEASIBLE' {
    const average = (technical + economic + environmental) / 3

    if (technical >= 0.85 && economic >= 0.80 && average >= 0.82) {
      return 'RECOMMENDED'
    } else if (average >= 0.70) {
      return 'FEASIBLE'
    } else if (average >= 0.50) {
      return 'CHALLENGING'
    } else {
      return 'NOT_FEASIBLE'
    }
  }

  private generateRationale(
    pathway: ConversionPathway,
    waste: WasteCharacteristics,
    scores: {
      technical: number
      economic: number
      environmental: number
      scalability: number
    }
  ): string[] {
    const rationale: string[] = []

    if (scores.technical >= 0.85) {
      rationale.push(`Strong technical feasibility - ${pathway.name} is well-established for ${waste.wasteType}`)
    }

    if (scores.economic >= 0.80) {
      rationale.push(
        `Good economic potential - Estimated annual revenue of ₹${(pathway.annualRevenue / 100000).toFixed(1)}L with ${pathway.paybackPeriod.toFixed(1)}-year payback`
      )
    }

    if (scores.environmental >= 0.90) {
      rationale.push(`Excellent environmental benefits - ${(pathway.environmentalImpact.co2ReductionPerTonne * waste.quantityPerYear).toFixed(0)} tonnes CO₂ equivalent reduction annually`)
    }

    if (pathway.estimatedYield >= 35) {
      rationale.push(`High resource efficiency - ${pathway.estimatedYield}% yield rate minimizes waste`)
    }

    if (pathway.marketDemandScore >= 0.85) {
      rationale.push(`Strong market demand - End product has established supply chains and end-use markets`)
    }

    return rationale
  }

  private identifyRisks(
    pathway: ConversionPathway,
    waste: WasteCharacteristics,
    facility: FacilityContext
  ): string[] {
    const risks: string[] = []

    if (pathway.estimatedInvestment > 50_000_000) {
      risks.push('High capital investment required - May limit accessibility for small facilities')
    }

    if (pathway.environmentalImpact.pollutionRisk === 'high') {
      risks.push('Environmental compliance required - Stringent pollution control measures needed')
    }

    if (pathway.environmentalImpact.waterUsagePerTonne && pathway.environmentalImpact.waterUsagePerTonne > 2) {
      risks.push('High water consumption - Water availability and management must be assessed')
    }

    if (facility.marketAccess === 'low') {
      risks.push('Market access challenges - Need to develop supply chains and customer networks')
    }

    if (facility.financialCapacity === 'low' && pathway.estimatedInvestment > 30_000_000) {
      risks.push('Financial accessibility - Explore subsidies, loans, and group approaches')
    }

    const wasteData = this.wasteDatabase[waste.wasteType]
    if (wasteData && wasteData.seasonalVariation > 0.20) {
      risks.push('Seasonal variation in waste supply - Year-round feedstock availability should be verified')
    }

    return risks
  }

  private identifyOpportunities(
    pathway: ConversionPathway,
    waste: WasteCharacteristics,
    facility: FacilityContext
  ): string[] {
    const opportunities: string[] = []

    opportunities.push(`Carbon credit potential - Generate ₹${(pathway.environmentalImpact.co2ReductionPerTonne * waste.quantityPerYear * 1000).toFixed(0)} in carbon credits annually`)

    opportunities.push(`Supply chain development - Create partnerships with end-product processors and distributors`)

    if (pathway.estimatedYield >= 40) {
      opportunities.push(`By-product potential - Utilize processing by-products for additional revenue streams`)
    }

    if (pathway.paybackPeriod <= 2.5) {
      opportunities.push(`Rapid ROI - Recover investment in ${pathway.paybackPeriod} years with sustainable operations`)
    }

    if (facility.laborAvailability === 'high') {
      opportunities.push(`Employment generation - Create skilled and unskilled jobs in facility operations`)
    }

    opportunities.push(`Technology upgrade potential - Improve efficiency through automation and IoT monitoring`)

    return opportunities
  }

  private calculatePriority(overallScore: number, feasibility: string): number {
    if (feasibility === 'RECOMMENDED' && overallScore >= 0.80) {
      return 1
    } else if (feasibility === 'RECOMMENDED' || (feasibility === 'FEASIBLE' && overallScore >= 0.70)) {
      return 2
    } else {
      return 3
    }
  }
}

// Export singleton instance
export const recommendationEngine = new RecommendationEngine()
