import { WasteType, getWasteType } from './waste-database'

export interface PathwayCalculation {
  wasteTypeId: string
  quantity: number // in kg
  quantityUnit: string
  bioContent: number
  carbonContent: number
  moisture: 'dry' | 'wet' | 'mixed'
  
  // Anaerobic Digestion Metrics
  biogas_daily_kg: number
  methane_daily_kg: number
  electricity_daily_kwh: number
  electricity_annual_kwh: number
  electricity_annual_revenue: number
  fertilizer_daily_kg: number
  fertilizer_annual_revenue: number
  ad_investment_lakhs: number
  ad_annual_revenue_lakhs: number
  ad_payback_years: number
  
  // Composting Metrics
  compost_daily_kg: number
  compost_annual_tonnes: number
  compost_annual_revenue_lakhs: number
  compost_investment_lakhs: number
  compost_payback_years: number
  landfill_diversion_tonnes: number
  
  // Biomass Energy Metrics
  briquette_daily_kg: number
  energy_daily_mj: number
  energy_annual_gj: number
  briquette_annual_revenue_lakhs: number
  biomass_investment_lakhs: number
  biomass_payback_years: number
  
  // Environmental Impact (Annual)
  co2_avoided_tonnes: number
  landfill_waste_diverted_tonnes: number
  energy_offset_kwh: number
}

// Constants for calculations
const BIOGAS_YIELD_PER_KG = 0.25 // m³ per kg of organic matter
const METHANE_PERCENTAGE = 0.65 // 65% methane in biogas
const ELECTRICITY_CONVERSION = 2 // kWh per m³ of biogas
const ELECTRICITY_PRICE = 8 // ₹/kWh
const FERTILIZER_YIELD = 0.3 // kg digestate per kg input
const FERTILIZER_PRICE = 5000 // ₹ per tonne

const COMPOST_YIELD = 0.35 // kg compost per kg organic matter
const COMPOST_PRICE = 8000 // ₹ per tonne
const COMPOST_INVESTMENT_BASE = 800000 // ₹

const BRIQUETTE_YIELD = 0.85 // kg briquette per kg biomass
const BRIQUETTE_PRICE = 12000 // ₹ per tonne
const BRIQUETTE_ENERGY = 18 // MJ per kg
const BRIQUETTE_INVESTMENT_BASE = 1500000 // ₹

const AD_INVESTMENT_BASE = 5000000 // ₹ (50 lakhs base)
const BIOMASS_INVESTMENT_BASE = 2000000 // ₹ (20 lakhs base)

export function normalizeQuantity(quantity: number, unit: string): number {
  // Normalize all quantities to kg per day
  switch (unit) {
    case 'kg/day':
      return quantity
    case 'tonnes/month':
      return (quantity * 1000) / 30 // Convert to kg/day
    case 'tonnes/year':
      return (quantity * 1000) / 365 // Convert to kg/day
    default:
      return quantity
  }
}

export function calculatePathwayMetrics(
  wasteTypeId: string,
  quantity: number,
  quantityUnit: string
): PathwayCalculation {
  const waste = getWasteType(wasteTypeId)
  if (!waste) throw new Error(`Waste type ${wasteTypeId} not found`)

  const dailyQuantityKg = normalizeQuantity(quantity, quantityUnit)
  const annualQuantityKg = dailyQuantityKg * 365
  const annualQuantityTonnes = annualQuantityKg / 1000

  // Adjust metrics based on waste properties
  const bioContentFactor = waste.bioContent / 100
  const carbonContentFactor = waste.carbonContent / 100
  const moistureFactor = waste.moistureContent === 'wet' ? 1.2 : waste.moistureContent === 'mixed' ? 1.0 : 0.8

  // ANAEROBIC DIGESTION CALCULATIONS
  const biogas_daily_kg = dailyQuantityKg * BIOGAS_YIELD_PER_KG * bioContentFactor * moistureFactor
  const methane_daily_kg = biogas_daily_kg * METHANE_PERCENTAGE
  const electricity_daily_kwh = biogas_daily_kg * ELECTRICITY_CONVERSION
  const electricity_annual_kwh = electricity_daily_kwh * 365
  const electricity_annual_revenue = electricity_annual_kwh * ELECTRICITY_PRICE

  const fertilizer_daily_kg = dailyQuantityKg * FERTILIZER_YIELD * bioContentFactor
  const fertilizer_annual_revenue = (fertilizer_daily_kg * 365) / 1000 * FERTILIZER_PRICE

  // Scale investment based on daily quantity
  const ad_investment_lakhs = (AD_INVESTMENT_BASE + dailyQuantityKg * 1000) / 100000
  const ad_annual_revenue_lakhs = (electricity_annual_revenue + fertilizer_annual_revenue) / 100000
  const ad_payback_years = ad_investment_lakhs / (ad_annual_revenue_lakhs || 0.1)

  // COMPOSTING CALCULATIONS
  const compost_daily_kg = dailyQuantityKg * COMPOST_YIELD * bioContentFactor
  const compost_annual_tonnes = (compost_daily_kg * 365) / 1000
  const compost_annual_revenue_lakhs = (compost_annual_tonnes * COMPOST_PRICE) / 100000

  // Scale composting investment
  const compost_investment_lakhs = (COMPOST_INVESTMENT_BASE + dailyQuantityKg * 500) / 100000
  const compost_payback_years = compost_investment_lakhs / (compost_annual_revenue_lakhs || 0.1)
  const landfill_diversion_tonnes = annualQuantityTonnes * 0.95

  // BIOMASS ENERGY CALCULATIONS
  // More efficient for dry wastes
  const biomass_efficiency = waste.moistureContent === 'dry' ? 1.2 : waste.moistureContent === 'mixed' ? 1.0 : 0.6
  const briquette_daily_kg = dailyQuantityKg * BRIQUETTE_YIELD * carbonContentFactor * biomass_efficiency
  const energy_daily_mj = briquette_daily_kg * BRIQUETTE_ENERGY
  const energy_annual_gj = (energy_daily_mj * 365) / 1000
  const briquette_annual_revenue_lakhs = ((briquette_daily_kg * 365) / 1000) * BRIQUETTE_PRICE / 100000

  // Scale biomass investment based on quantity and type
  const biomass_investment_lakhs = (BIOMASS_INVESTMENT_BASE + dailyQuantityKg * 800) / 100000
  const biomass_payback_years = biomass_investment_lakhs / (briquette_annual_revenue_lakhs || 0.1)

  // ENVIRONMENTAL IMPACT
  // CO2 avoided through energy generation and composting
  const co2_from_electricity = electricity_annual_kwh * 0.82 / 1000 // kg CO2 per kWh
  const co2_from_fertilizer = (fertilizer_daily_kg * 365) / 1000 * 0.5 // kg CO2 saved vs synthetic fertilizer
  const co2_from_compost = compost_annual_tonnes * 0.8 // Carbon sequestration through compost
  const co2_from_biomass = energy_annual_gj * 2.5 // CO2 saved vs fossil fuel

  const co2_avoided_tonnes = (co2_from_electricity + co2_from_fertilizer + co2_from_compost + co2_from_biomass) / 1000

  const energy_offset_kwh = electricity_annual_kwh + (energy_annual_gj * 277.8) // Convert GJ to kWh

  return {
    wasteTypeId,
    quantity,
    quantityUnit,
    bioContent: waste.bioContent,
    carbonContent: waste.carbonContent,
    moisture: waste.moistureContent,

    biogas_daily_kg: Math.round(biogas_daily_kg * 100) / 100,
    methane_daily_kg: Math.round(methane_daily_kg * 100) / 100,
    electricity_daily_kwh: Math.round(electricity_daily_kwh * 100) / 100,
    electricity_annual_kwh: Math.round(electricity_annual_kwh),
    electricity_annual_revenue: Math.round(electricity_annual_revenue),
    fertilizer_daily_kg: Math.round(fertilizer_daily_kg * 100) / 100,
    fertilizer_annual_revenue: Math.round(fertilizer_annual_revenue),
    ad_investment_lakhs: Math.round(ad_investment_lakhs * 10) / 10,
    ad_annual_revenue_lakhs: Math.round(ad_annual_revenue_lakhs * 10) / 10,
    ad_payback_years: Math.round(ad_payback_years * 10) / 10,

    compost_daily_kg: Math.round(compost_daily_kg * 100) / 100,
    compost_annual_tonnes: Math.round(compost_annual_tonnes * 100) / 100,
    compost_annual_revenue_lakhs: Math.round(compost_annual_revenue_lakhs * 10) / 10,
    compost_investment_lakhs: Math.round(compost_investment_lakhs * 10) / 10,
    compost_payback_years: Math.round(compost_payback_years * 10) / 10,
    landfill_diversion_tonnes: Math.round(landfill_diversion_tonnes * 100) / 100,

    briquette_daily_kg: Math.round(briquette_daily_kg * 100) / 100,
    energy_daily_mj: Math.round(energy_daily_mj * 100) / 100,
    energy_annual_gj: Math.round(energy_annual_gj * 10) / 10,
    briquette_annual_revenue_lakhs: Math.round(briquette_annual_revenue_lakhs * 10) / 10,
    biomass_investment_lakhs: Math.round(biomass_investment_lakhs * 10) / 10,
    biomass_payback_years: Math.round(biomass_payback_years * 10) / 10,

    co2_avoided_tonnes: Math.round(co2_avoided_tonnes * 100) / 100,
    landfill_waste_diverted_tonnes: Math.round(landfill_diversion_tonnes * 100) / 100,
    energy_offset_kwh: Math.round(energy_offset_kwh),
  }
}

export function getPathwayScores(calculation: PathwayCalculation) {
  // Score each pathway based on metrics
  const anaerobic_score = Math.min(
    100,
    ((calculation.ad_annual_revenue_lakhs / calculation.ad_investment_lakhs) * 50 +
      (Math.min(calculation.ad_payback_years, 10) / 10) * 50)
  )

  const compost_score = Math.min(
    100,
    ((calculation.compost_annual_revenue_lakhs / calculation.compost_investment_lakhs) * 50 +
      (Math.min(calculation.compost_payback_years, 10) / 10) * 50)
  )

  const biomass_score = Math.min(
    100,
    ((calculation.briquette_annual_revenue_lakhs / calculation.biomass_investment_lakhs) * 50 +
      (Math.min(calculation.biomass_payback_years, 10) / 10) * 50)
  )

  return {
    anaerobic: Math.round(anaerobic_score),
    compost: Math.round(compost_score),
    biomass: Math.round(biomass_score),
  }
}
