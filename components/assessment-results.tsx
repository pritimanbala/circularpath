'use client'

import React from "react"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, AlertCircle, CheckCircle, Target, Zap, Leaf } from 'lucide-react'

interface PathwayResult {
  id: string
  pathwayName: string
  endProduct: string
  technicalScore: number
  economicScore: number
  environmentalScore: number
  feasibilityStatus: 'RECOMMENDED' | 'FEASIBLE' | 'CHALLENGING' | 'NOT_FEASIBLE'
  implementationRequirements: string[]
  estimatedInvestment: number
  paybackPeriodYears: number
  annualRevenuePotential: number
  yieldPercentage: number
}

interface AssessmentResultsProps {
  facilityName: string
  wasteStream: string
  quantityAnnual: number
  pathways: PathwayResult[]
}

function ScoreGauge({ score, label }: { score: number; label: string }) {
  const percentage = Math.round(score * 100)
  const color = percentage >= 75 ? 'text-primary' : percentage >= 50 ? 'text-accent' : 'text-destructive'
  
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-secondary flex items-center justify-center">
        <div className={`text-xl font-bold ${color}`}>{percentage}%</div>
      </div>
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
    </div>
  )
}

function FeasibilityBadge({ status }: { status: string }) {
  const variants: { [key: string]: { bg: string; text: string; icon: React.ReactNode } } = {
    RECOMMENDED: {
      bg: 'bg-primary/10',
      text: 'text-primary',
      icon: <CheckCircle className="w-4 h-4" />
    },
    FEASIBLE: {
      bg: 'bg-accent/10',
      text: 'text-accent',
      icon: <TrendingUp className="w-4 h-4" />
    },
    CHALLENGING: {
      bg: 'bg-yellow-500/10',
      text: 'text-yellow-600',
      icon: <AlertCircle className="w-4 h-4" />
    },
    NOT_FEASIBLE: {
      bg: 'bg-destructive/10',
      text: 'text-destructive',
      icon: <AlertCircle className="w-4 h-4" />
    }
  }
  
  const variant = variants[status] || variants.FEASIBLE
  const labels: { [key: string]: string } = {
    RECOMMENDED: 'Highly Recommended',
    FEASIBLE: 'Feasible',
    CHALLENGING: 'Challenging',
    NOT_FEASIBLE: 'Not Feasible'
  }
  
  return (
    <Badge className={`${variant.bg} ${variant.text} border-0 font-medium flex items-center gap-1`}>
      {variant.icon}
      {labels[status]}
    </Badge>
  )
}

export function AssessmentResults({ facilityName, wasteStream, quantityAnnual, pathways }: AssessmentResultsProps) {
  const recommendedPathways = pathways.filter(p => p.feasibilityStatus === 'RECOMMENDED')
  const totalPotentialRevenue = pathways.reduce((sum, p) => sum + p.annualRevenuePotential, 0)

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <Card className="p-6 border-border bg-gradient-to-br from-primary/5 to-accent/5">
        <h2 className="text-2xl font-bold text-foreground mb-4">Assessment Summary</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Facility</p>
            <p className="font-semibold text-foreground">{facilityName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Waste Stream</p>
            <p className="font-semibold text-foreground capitalize">{wasteStream.replace(/_/g, ' ')}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Annual Quantity</p>
            <p className="font-semibold text-foreground">{quantityAnnual.toLocaleString()} tonnes</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Revenue Potential</p>
            <p className="font-semibold text-primary">₹{(totalPotentialRevenue / 100000).toFixed(1)}L</p>
          </div>
        </div>
      </Card>

      {/* Recommendations Section */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-primary" />
          Recommended Pathways
        </h3>
        {recommendedPathways.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {recommendedPathways.map(pathway => (
              <Card key={pathway.id} className="p-6 border-border border-2 border-primary/30 bg-primary/5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{pathway.pathwayName}</h4>
                    <p className="text-sm text-muted-foreground">→ {pathway.endProduct}</p>
                  </div>
                  <FeasibilityBadge status={pathway.feasibilityStatus} />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-background rounded-lg">
                  <ScoreGauge score={pathway.technicalScore} label="Technical" />
                  <ScoreGauge score={pathway.economicScore} label="Economic" />
                  <ScoreGauge score={pathway.environmentalScore} label="Environmental" />
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Expected Yield</span>
                    <span className="font-semibold text-foreground">{pathway.yieldPercentage}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Annual Revenue Potential</span>
                    <span className="font-semibold text-primary">₹{(pathway.annualRevenuePotential / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Initial Investment</span>
                    <span className="font-semibold text-foreground">₹{(pathway.estimatedInvestment / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Payback Period</span>
                    <span className="font-semibold text-foreground">{pathway.paybackPeriodYears.toFixed(1)} years</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Implementation Requirements</p>
                  <div className="flex flex-wrap gap-2">
                    {pathway.implementationRequirements.map((req, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 border-border text-center">
            <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No highly recommended pathways found. See feasible options below.</p>
          </Card>
        )}
      </div>

      {/* All Pathways Section */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-accent" />
          All Viable Pathways
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {pathways.map(pathway => (
            <Card key={pathway.id} className="p-4 border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{pathway.pathwayName}</h4>
                  <p className="text-xs text-muted-foreground">→ {pathway.endProduct}</p>
                </div>
                <FeasibilityBadge status={pathway.feasibilityStatus} />
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-secondary rounded text-xs">
                  <div className="font-bold text-primary">{Math.round(pathway.technicalScore * 100)}%</div>
                  <div className="text-muted-foreground text-xs">Technical</div>
                </div>
                <div className="text-center p-2 bg-secondary rounded text-xs">
                  <div className="font-bold text-accent">{Math.round(pathway.economicScore * 100)}%</div>
                  <div className="text-muted-foreground text-xs">Economic</div>
                </div>
                <div className="text-center p-2 bg-secondary rounded text-xs">
                  <div className="font-bold text-primary">{Math.round(pathway.environmentalScore * 100)}%</div>
                  <div className="text-muted-foreground text-xs">Environment</div>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenue Potential</span>
                  <span className="font-semibold">₹{(pathway.annualRevenuePotential / 100000).toFixed(1)}L/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payback Period</span>
                  <span className="font-semibold">{pathway.paybackPeriodYears.toFixed(1)} years</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Environmental Impact Section */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Leaf className="w-6 h-6 text-primary" />
          Environmental Impact Potential
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-secondary rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-2">CO₂ Emissions Reduction</p>
            <p className="text-2xl font-bold text-primary">{(quantityAnnual * 0.85).toFixed(0)}</p>
            <p className="text-xs text-muted-foreground mt-1">tonnes CO₂/year</p>
          </div>
          <div className="p-4 bg-secondary rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-2">Landfill Waste Diversion</p>
            <p className="text-2xl font-bold text-primary">{quantityAnnual.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground mt-1">tonnes/year</p>
          </div>
          <div className="p-4 bg-secondary rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-2">Composite Score</p>
            <p className="text-2xl font-bold text-accent">85%</p>
            <p className="text-xs text-muted-foreground mt-1">Very High Impact</p>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="p-6 border-border bg-accent/5">
        <h3 className="text-lg font-bold text-foreground mb-4">Next Steps</h3>
        <ol className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="font-bold text-accent min-w-fit">1.</span>
            <span className="text-foreground">Review the recommended pathways and select the most suitable option for your facility</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-accent min-w-fit">2.</span>
            <span className="text-foreground">Connect with our processing facility database to identify local partners and infrastructure providers</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-accent min-w-fit">3.</span>
            <span className="text-foreground">Download detailed technical specifications and implementation guides</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-accent min-w-fit">4.</span>
            <span className="text-foreground">Contact our support team for customized consulting and assistance</span>
          </li>
        </ol>
      </Card>
    </div>
  )
}
