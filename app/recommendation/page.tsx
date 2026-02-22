'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle, AlertCircle, TrendingUp, Leaf, Zap } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState, useEffect } from 'react'
import LoadingSpinner from '@/components/loading-spinner'
import { getWasteType } from '@/lib/waste-database'
import { calculatePathwayMetrics, getPathwayScores, PathwayCalculation } from '@/lib/pathway-calculator'
import { getFacilitiesByLocation, calculateDistance } from '@/lib/facilities-database'
import { MapPin } from 'lucide-react'

interface Pathway {
  id: string
  name: string
  endProduct: string
  description: string
  feasibility: 'RECOMMENDED' | 'FEASIBLE' | 'CHALLENGING'
  explanation: string
  characteristics: string[]
  requirements: string[]
  earningPotential: string
  environmentalBenefit: string
}

export default function RecommendationPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  
  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])
  
  // Get parameters from URL
  const wasteId = searchParams.get('wasteId') || ''
  const quantity = parseFloat(searchParams.get('quantity') || '0')
  const unit = searchParams.get('unit') || 'kg/day'
  const state = searchParams.get('state') || ''
  const district = searchParams.get('district') || ''
  const city = searchParams.get('city') || ''
  
  // Calculate dynamic metrics
  const calculation = useMemo(() => {
    if (!wasteId || quantity === 0) return null
    try {
      return calculatePathwayMetrics(wasteId, quantity, unit)
    } catch (e) {
      console.error("[v0] Calculation error:", e)
      return null
    }
  }, [wasteId, quantity, unit])

  const waste = getWasteType(wasteId)
  const scores = calculation ? getPathwayScores(calculation) : null
  
  // Get facilities for selected location - always call hooks
  const facilities = useMemo(() => {
    if (!state || !district) return []
    return getFacilitiesByLocation(state, district, city)
  }, [state, district, city])

  // Pathway recommendations based on waste characteristics
  const pathways: Pathway[] = [
    {
      id: 'anaerobic',
      name: 'Anaerobic Digestion',
      endProduct: 'Biogas / Renewable Energy',
      description: 'Convert waste to biogas for electricity and heat generation',
      feasibility: calculation && calculation.biogas_daily_kg > 0 ? 'RECOMMENDED' : 'FEASIBLE',
      explanation: calculation ? `This waste produces ${calculation.biogas_daily_kg} kg of biogas daily (${calculation.methane_daily_kg} kg methane), generating ${calculation.electricity_daily_kwh} kWh of electricity per day. Investment: ₹${calculation.ad_investment_lakhs} lakhs with payback in ${calculation.ad_payback_years} years.` : 'High moisture and biodegradable organic content makes the waste ideal for anaerobic digestion.',
      characteristics: [
        calculation ? `Daily biogas production: ${calculation.biogas_daily_kg} kg` : 'Ideal for wet, high-organic waste',
        calculation ? `Annual electricity: ${calculation.electricity_annual_kwh.toLocaleString()} kWh` : 'Moisture content facilitates microbial activity',
        calculation ? `Organic content: ${waste?.bioContent}% biodegradable` : 'Converts organic carbon to usable energy'
      ],
      requirements: [
        'Digestion vessel with temperature control',
        'Gas handling and purification equipment',
        'Biogas collection system',
        'Skilled operator for process management'
      ],
      earningPotential: calculation ? `₹${calculation.ad_annual_revenue_lakhs.toFixed(1)} lakhs/year` : '₹12-25 lakhs/year',
      environmentalBenefit: calculation ? `Reduces CO₂ by ${calculation.co2_avoided_tonnes} tonnes/year, generates ${calculation.electricity_annual_kwh.toLocaleString()} kWh renewable energy` : 'Reduces methane emissions, diverts waste from landfills, produces renewable energy'
    },
    {
      id: 'composting',
      name: 'Composting',
      endProduct: 'Nutrient-Rich Compost / Soil Amendment',
      description: 'Aerobic decomposition to produce high-quality organic compost',
      feasibility: 'RECOMMENDED',
      explanation: calculation ? `This waste produces ${calculation.compost_daily_kg} kg of compost daily, yielding ${calculation.compost_annual_tonnes} tonnes annually worth ₹${calculation.compost_annual_revenue_lakhs} lakhs.` : 'Organic waste with adequate carbon-nitrogen balance can be efficiently composted.',
      characteristics: [
        calculation ? `Daily compost output: ${calculation.compost_daily_kg} kg` : 'Aerobic process with natural microbes',
        calculation ? `Annual production: ${calculation.compost_annual_tonnes} tonnes` : 'Produces stable, nutrient-rich end product',
        calculation ? `Landfill diversion: ${calculation.landfill_diversion_tonnes} tonnes/year` : 'Suitable for large-scale operations'
      ],
      requirements: [
        'Composting beds or windrows',
        'Turning equipment (weekly initially)',
        'Moisture and temperature monitoring',
        'Finished compost screening facility'
      ],
      earningPotential: calculation ? `₹${calculation.compost_annual_revenue_lakhs.toFixed(1)} lakhs/year` : '₹5-12 lakhs/year',
      environmentalBenefit: calculation ? `Diverts ${calculation.landfill_waste_diverted_tonnes} tonnes from landfills, sequesters carbon, improves soil` : 'Improves soil health, sequesters carbon, reduces landfill burden'
    },
    {
      id: 'biomass',
      name: 'Biomass Energy',
      endProduct: 'Briquettes / Charcoal / Direct Combustion',
      description: 'Convert fibrous waste to solid fuel for thermal energy',
      feasibility: calculation && calculation.briquette_daily_kg > 0 ? 'RECOMMENDED' : 'CHALLENGING',
      explanation: calculation ? `Daily briquette production: ${calculation.briquette_daily_kg} kg, annual energy output: ${calculation.energy_annual_gj} GJ. Earning potential: ₹${calculation.briquette_annual_revenue_lakhs} lakhs/year.` : 'Fibrous, cellulose-rich waste can be processed into energy-dense briquettes.',
      characteristics: [
        calculation ? `Carbon content: ${waste?.carbonContent}% for energy recovery` : 'High carbon content enables energy recovery',
        calculation ? `Daily briquette output: ${calculation.briquette_daily_kg} kg` : 'Dry waste preferred for efficient processing',
        calculation ? `Annual energy: ${calculation.energy_annual_gj} GJ equivalent` : 'Produces consistent, storable fuel'
      ],
      requirements: [
        'Drying facility (if moisture high)',
        'Grinding/size reduction mill',
        'Briquetting or carbonization equipment',
        'Quality control and safety systems'
      ],
      earningPotential: calculation ? `₹${calculation.briquette_annual_revenue_lakhs.toFixed(1)} lakhs/year` : '₹15-30 lakhs/year',
      environmentalBenefit: calculation ? `Offset ${calculation.energy_offset_kwh.toLocaleString()} kWh fossil fuel energy, avoid landfill methane` : 'Replaces fossil fuels, reduces CO₂ emissions'
    },
    {
      id: 'biochar',
      name: 'Biochar / Advanced Processing',
      endProduct: 'Biochar for Soil Amendment or Industrial Use',
      description: 'Pyrolysis conversion to produce stable biochar with multiple applications',
      feasibility: 'FEASIBLE',
      explanation: 'Pyrolysis of organic waste under controlled, oxygen-limited conditions produces biochar—a stable form of carbon with long-term storage benefits. Useful for soil enhancement and industrial applications.',
      characteristics: [
        'Produces long-term carbon storage product',
        'Suitable for various waste types',
        'Multiple applications increase revenue streams'
      ],
      requirements: [
        'Pyrolysis reactor with temperature control',
        'Advanced gas handling systems',
        'Safety and emission management',
        'Testing lab for quality assurance'
      ],
      investmentRange: '₹60-150 lakhs',
      revenueRange: '₹20-45 lakhs/year',
      environmentalBenefit: 'Permanent carbon sequestration, improves soil water retention, reduces fertilizer needs'
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/assess">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-foreground ml-4">Recommendations</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Waste Summary Banner */}
        {calculation && waste && (
          <Card className="p-6 mb-12 bg-primary/5 border-primary/30">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Waste Type</p>
                <p className="text-xl font-bold text-foreground">{waste.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Input Quantity</p>
                <p className="text-xl font-bold text-foreground">{quantity} {unit}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Moisture Content</p>
                <p className="text-lg font-semibold text-primary capitalize">{waste.moistureContent}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Biodegradable Content</p>
                <p className="text-lg font-semibold text-primary">{waste.bioContent}%</p>
              </div>
            </div>
          </Card>
        )}

        {/* Intro */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Decision & Recommendation</h2>
          <p className="text-muted-foreground max-w-3xl">
            Based on waste characteristics (moisture, biodegradability, fibrous nature), process feasibility, and technology maturity, these pathways are ranked by suitability. Each recommendation includes waste-specific metrics calculated from your input.
          </p>
        </div>

        {/* Pathways Grid */}
        <div className="space-y-6">
          {pathways.map((pathway, index) => (
            <Card key={pathway.id} className="border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{pathway.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">→ {pathway.endProduct}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                      {pathway.feasibility === 'RECOMMENDED' && (
                        <>
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-primary text-sm">Recommended</span>
                        </>
                      )}
                      {pathway.feasibility === 'FEASIBLE' && (
                        <>
                          <CheckCircle className="w-4 h-4 text-accent" />
                          <span className="font-semibold text-accent text-sm">Feasible</span>
                        </>
                      )}
                      {pathway.feasibility === 'CHALLENGING' && (
                        <>
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                          <span className="font-semibold text-yellow-600 text-sm">Challenging</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Explanation of Selection Logic */}
                <div className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                  <p className="text-sm font-semibold text-foreground mb-2">Why This Pathway?</p>
                  <p className="text-sm text-muted-foreground">{pathway.explanation}</p>
                </div>

                {/* Key Characteristics */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-3">Waste Characteristics Matched</p>
                    <ul className="space-y-2">
                      {pathway.characteristics.map((char, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Earning Potential */}
                  <div>
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                      <p className="text-xs text-muted-foreground mb-1 font-medium">Your Earning Potential</p>
                      <p className="text-lg font-bold text-primary">{pathway.earningPotential}</p>
                      <p className="text-xs text-muted-foreground mt-2">From converting your waste using this pathway</p>
                    </div>
                  </div>
                </div>

                {/* Implementation Requirements */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-foreground mb-3">Infrastructure Requirements</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {pathway.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg mb-6">
                  <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-primary" />
                    Environmental Impact
                  </p>
                  <p className="text-sm text-muted-foreground">{pathway.environmentalBenefit}</p>
                </div>

                {/* CTA Buttons */}
                <div className="pt-4 border-t border-border">
                  <Link href={`/facility-mapping?pathway=${pathway.id}&state=${state}&district=${district}`} className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Find Facilities for {pathway.name}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Nearby Facilities */}
        <Card className="p-6 border-border mt-12">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Processing Facilities Near You
          </h3>
          
          {facilities.length > 0 ? (
            <div className="space-y-4">
              {facilities.map(facility => (
                <div key={facility.id} className="p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="font-semibold text-foreground">{facility.name}</p>
                      <p className="text-sm text-muted-foreground">{facility.city}, {facility.district}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Type: {facility.type}</p>
                      <p className="text-sm text-muted-foreground">Capacity: {facility.processingCapacity}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href={`tel:${facility.phone}`} className="text-sm text-primary hover:underline">
                        {facility.phone}
                      </a>
                      <Link href={`https://maps.google.com/?q=${facility.latitude},${facility.longitude}`} target="_blank" className="text-sm text-primary hover:underline">
                        View on Map →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-secondary/50 rounded-lg border border-dashed border-border">
              <p className="text-muted-foreground mb-2">Sorry, no processing centers found in your area yet.</p>
              <p className="text-sm text-muted-foreground">
                We're expanding our facility network across India. Please check back soon or try a nearby district.
              </p>
            </div>
          )}
        </Card>

        {/* Additional Pathways Info */}
        <Card className="p-6 border-border mt-12 bg-secondary/30">
          <h3 className="text-lg font-bold text-foreground mb-4">How We Rank Pathways</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-accent" />
                <p className="font-semibold text-foreground">Technical Feasibility</p>
              </div>
              <p className="text-muted-foreground">
                Evaluated based on waste composition, processing requirements, and technology readiness
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <p className="font-semibold text-foreground">Economic Viability</p>
              </div>
              <p className="text-muted-foreground">
                Considers investment costs, revenue potential, and payback periods based on regional data
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 text-primary" />
                <p className="font-semibold text-foreground">Environmental Impact</p>
              </div>
              <p className="text-muted-foreground">
                Assesses CO₂ reduction, waste diversion, and long-term sustainability benefits
              </p>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-foreground mb-4">Next Steps</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Select a pathway and find nearby processing facilities to explore partnership opportunities.
          </p>
          <Link href="/facility-mapping">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Explore Facility Network
            </Button>
          </Link>
        </div>
      </main>
      
      {/* Show loading spinner overlay if loading */}
      {isLoading && <LoadingSpinner />}
    </div>
  )
}
