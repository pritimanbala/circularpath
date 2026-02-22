'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, TrendingUp, Zap, Leaf, Target, ArrowLeft, Filter, Download } from 'lucide-react'
import Link from 'next/link'
import { recommendationEngine, type WasteCharacteristics, type FacilityContext, type RecommendationScore } from '@/lib/recommendation-engine'

export default function DecisionSupportPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    feasibility: 'all', // all, recommended, feasible
    sortBy: 'overall', // overall, economic, environmental, technical
    showRisks: true
  })

  // Mock waste data - in production would come from user assessment
  const wasteCharacteristics: WasteCharacteristics = {
    wasteType: 'rice_husk',
    quantityPerYear: 15000,
    quantityPerDay: 50,
    moistureContent: 12
  }

  const facilityContext: FacilityContext = {
    facilityType: 'rice_mill',
    district: 'Thanjavur',
    laborAvailability: 'medium',
    marketAccess: 'high',
    financialCapacity: 'medium'
  }

  // Generate recommendations
  const allRecommendations = recommendationEngine.recommendPathways(
    wasteCharacteristics,
    facilityContext
  )

  // Apply filters
  const filteredRecommendations = allRecommendations.filter(rec => {
    if (selectedFilters.feasibility === 'recommended') {
      return rec.feasibilityStatus === 'RECOMMENDED'
    } else if (selectedFilters.feasibility === 'feasible') {
      return ['RECOMMENDED', 'FEASIBLE'].includes(rec.feasibilityStatus)
    }
    return true
  })

  const getSortedRecommendations = () => {
    const sorted = [...filteredRecommendations]
    if (selectedFilters.sortBy === 'economic') {
      return sorted.sort((a, b) => b.economicScore - a.economicScore)
    } else if (selectedFilters.sortBy === 'environmental') {
      return sorted.sort((a, b) => b.environmentalScore - a.environmentalScore)
    } else if (selectedFilters.sortBy === 'technical') {
      return sorted.sort((a, b) => b.technicalScore - a.technicalScore)
    }
    return sorted // overall score (already sorted)
  }

  const recommendations = getSortedRecommendations()

  const feasibilityColor = {
    RECOMMENDED: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/30' },
    FEASIBLE: { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/30' },
    CHALLENGING: { bg: 'bg-yellow-500/10', text: 'text-yellow-600', border: 'border-yellow-500/30' },
    NOT_FEASIBLE: { bg: 'bg-destructive/10', text: 'text-destructive', border: 'border-destructive/30' }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/assess">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Decision-Support System</h1>
              <p className="text-xs text-muted-foreground">Engineering-informed recommendations</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Summary Section */}
        <Card className="p-6 border-border bg-gradient-to-br from-primary/5 to-accent/5 mb-8">
          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Facility Type</p>
              <p className="font-semibold text-foreground">Rice Mill</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Waste Stream</p>
              <p className="font-semibold text-foreground">Rice Husk</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Annual Quantity</p>
              <p className="font-semibold text-foreground">15,000 tonnes</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="font-semibold text-foreground">Thanjavur District</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Viable Pathways</p>
              <p className="font-semibold text-primary text-lg">{recommendations.length}</p>
            </div>
          </div>
        </Card>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground block mb-2">Filter by Feasibility</label>
            <select
              value={selectedFilters.feasibility}
              onChange={(e) =>
                setSelectedFilters({ ...selectedFilters, feasibility: e.target.value })
              }
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Pathways</option>
              <option value="recommended">Recommended Only</option>
              <option value="feasible">Recommended & Feasible</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground block mb-2">Sort By</label>
            <select
              value={selectedFilters.sortBy}
              onChange={(e) =>
                setSelectedFilters({ ...selectedFilters, sortBy: e.target.value })
              }
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="overall">Overall Score</option>
              <option value="economic">Economic Viability</option>
              <option value="environmental">Environmental Impact</option>
              <option value="technical">Technical Feasibility</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button variant="outline" className="border-primary text-primary hover:bg-secondary gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="space-y-6">
          {recommendations.map((rec, index) => {
            const colors = feasibilityColor[rec.feasibilityStatus]
            return (
              <Card
                key={rec.pathway.id}
                className={`p-6 border-2 transition-all hover:shadow-lg ${colors.border} ${colors.bg}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{rec.pathway.name}</h3>
                        <p className="text-sm text-muted-foreground">→ {rec.pathway.endProduct}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${colors.text}`}>
                      {rec.matchPercentage}%
                    </div>
                    <Badge className={`${colors.bg} ${colors.text} border-0 mt-2`}>
                      {rec.feasibilityStatus === 'RECOMMENDED' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {rec.feasibilityStatus === 'RECOMMENDED'
                        ? 'Highly Recommended'
                        : rec.feasibilityStatus === 'FEASIBLE'
                          ? 'Feasible'
                          : rec.feasibilityStatus === 'CHALLENGING'
                            ? 'Challenging'
                            : 'Not Feasible'}
                    </Badge>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="grid md:grid-cols-4 gap-4 mb-6 p-4 bg-background rounded-lg border border-border">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{rec.technicalScore}%</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">Technical</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">{rec.economicScore}%</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">Economic</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{rec.environmentalScore}%</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">Environmental</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{rec.pathway.estimatedYield}%</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">Yield Rate</p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Investment Required</p>
                    <p className="font-bold text-foreground">₹{(rec.pathway.estimatedInvestment / 100000).toFixed(1)}L</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Annual Revenue</p>
                    <p className="font-bold text-primary">₹{(rec.pathway.annualRevenue / 100000).toFixed(1)}L</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Payback Period</p>
                    <p className="font-bold text-foreground">{rec.pathway.paybackPeriod} years</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">CO₂ Reduction/Year</p>
                    <p className="font-bold text-primary">{(rec.pathway.environmentalImpact.co2ReductionPerTonne * 15000).toFixed(0)} tonnes</p>
                  </div>
                </div>

                {/* Rationale */}
                <div className="mb-6 p-4 bg-secondary rounded-lg">
                  <p className="text-sm font-semibold text-foreground mb-3">Why This Pathway</p>
                  <ul className="space-y-2">
                    {rec.rationale.map((point, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-foreground mb-2">Required Infrastructure</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.pathway.infrastructureRequirements.map((req, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Risks & Opportunities */}
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedFilters.showRisks && rec.risks.length > 0 && (
                    <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                      <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        Key Risks
                      </p>
                      <ul className="space-y-1">
                        {rec.risks.map((risk, i) => (
                          <li key={i} className="text-xs text-muted-foreground">
                            • {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {rec.opportunities.length > 0 && (
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        Opportunities
                      </p>
                      <ul className="space-y-1">
                        {rec.opportunities.map((opp, i) => (
                          <li key={i} className="text-xs text-muted-foreground">
                            • {opp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3 pt-4 border-t border-border">
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                    View Detailed Analysis
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-secondary bg-transparent">
                    Find Facilities
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-secondary bg-transparent">
                    Contact Expert
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        {/* No Results */}
        {recommendations.length === 0 && (
          <Card className="p-12 text-center border-border">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No pathways match your current filters</p>
            <Button
              onClick={() => setSelectedFilters({ ...selectedFilters, feasibility: 'all' })}
              variant="outline"
              className="border-primary text-primary hover:bg-secondary"
            >
              Reset Filters
            </Button>
          </Card>
        )}

        {/* Methodology Section */}
        <Card className="p-6 border-border mt-12">
          <h3 className="text-lg font-bold text-foreground mb-4">Decision-Support Methodology</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Technical Analysis
              </p>
              <p className="text-muted-foreground">
                Evaluates feasibility based on waste composition, processing requirements, and technology readiness levels
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Economic Assessment
              </p>
              <p className="text-muted-foreground">
                Analyzes capital requirements, revenue potential, payback periods, and financial accessibility
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                Environmental Impact
              </p>
              <p className="text-muted-foreground">
                Assesses CO₂ reduction, waste diversion rates, resource efficiency, and pollution mitigation
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
