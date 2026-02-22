'use client'

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'
import { Card } from '@/components/ui/card'
import { TrendingUp, Leaf, Zap, Droplet, Wind } from 'lucide-react'

interface ImpactChartsProps {
  wasteQuantity: number
  selectedPathways: string[]
}

export function ImpactCharts({ wasteQuantity, selectedPathways }: ImpactChartsProps) {
  // Annual impact data
  const co2ReductionPerTonne = 0.85 // tonnes CO2e
  const annualCO2 = wasteQuantity * co2ReductionPerTonne

  // Environmental impact over 5 years
  const yearlyData = Array.from({ length: 5 }, (_, i) => ({
    year: `Year ${i + 1}`,
    co2Reduction: Math.round((wasteQuantity * co2ReductionPerTonne * (i + 1)) / 1000),
    wasteProcessed: Math.round(wasteQuantity * (i + 1) / 1000),
    economicBenefit: Math.round((wasteQuantity * 1200 * (i + 1)) / 100000) // ₹1200 per tonne
  }))

  // Impact breakdown pie chart
  const impactBreakdown = [
    { name: 'CO₂ Reduction', value: 45, color: '#4CAF50' },
    { name: 'Waste Diversion', value: 30, color: '#2196F3' },
    { name: 'Economic Value', value: 15, color: '#FF9800' },
    { name: 'Resource Conservation', value: 10, color: '#9C27B0' }
  ]

  // Pathway comparison data
  const pathwayComparison = [
    { pathway: 'Ash Production', emission: 0.9, revenue: 95, yield: 80 },
    { pathway: 'Bioenergy', emission: 1.2, revenue: 88, yield: 85 },
    { pathway: 'Activated Carbon', emission: 0.7, revenue: 110, yield: 72 },
    { pathway: 'Textiles', emission: 0.8, revenue: 100, yield: 78 },
    { pathway: 'Composting', emission: 1.5, revenue: 65, yield: 90 }
  ]

  // Monthly projection
  const monthlyData = [
    { month: 'Jan', processing: 1250, revenue: 150, forecast: 1400 },
    { month: 'Feb', processing: 1300, revenue: 156, forecast: 1450 },
    { month: 'Mar', processing: 1450, revenue: 174, forecast: 1500 },
    { month: 'Apr', processing: 1380, revenue: 166, forecast: 1550 },
    { month: 'May', processing: 1500, revenue: 180, forecast: 1600 },
    { month: 'Jun', processing: 1550, revenue: 186, forecast: 1650 }
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8">
      {/* Key Impact Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          {
            icon: Leaf,
            label: 'CO₂ Reduction/Year',
            value: `${Math.round(annualCO2)}`,
            unit: 'tonnes',
            color: 'text-primary'
          },
          {
            icon: Wind,
            label: 'Emissions Avoided',
            value: `${Math.round(annualCO2 * 44 / 12)}`,
            unit: 'tonnes CO₂e',
            color: 'text-primary'
          },
          {
            icon: Droplet,
            label: 'Water Conserved',
            value: `${Math.round(wasteQuantity * 0.5)}`,
            unit: 'cubic meters',
            color: 'text-accent'
          },
          {
            icon: TrendingUp,
            label: 'Economic Value',
            value: `₹${Math.round((wasteQuantity * 1200) / 100000)}L`,
            unit: 'annual',
            color: 'text-primary'
          }
        ].map((metric, i) => {
          const Icon = metric.icon
          return (
            <Card key={i} className="p-4 border-border">
              <div className="flex items-start justify-between mb-2">
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.unit}</p>
            </Card>
          )
        })}
      </div>

      {/* 5-Year Projection */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-bold text-foreground mb-6">5-Year Impact Projection</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="co2Reduction"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', r: 4 }}
              name="CO₂ Reduction (K tonnes)"
            />
            <Line
              type="monotone"
              dataKey="wasteProcessed"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--accent))', r: 4 }}
              name="Waste Processed (K tonnes)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Impact Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-border">
          <h3 className="text-lg font-bold text-foreground mb-6">Impact Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={impactBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="hsl(var(--primary))"
                dataKey="value"
              >
                {impactBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border-border">
          <h3 className="text-lg font-bold text-foreground mb-6">Pathway Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="yield"
                name="Yield %"
                type="number"
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                dataKey="emission"
                name="Emissions (kg/tonne)"
                type="number"
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
              <Scatter
                name="Pathways"
                data={pathwayComparison}
                fill="hsl(var(--primary))"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-bold text-foreground mb-6">Monthly Processing & Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="processing" fill="hsl(var(--primary))" name="Waste Processed (tonnes)" />
            <Bar dataKey="revenue" fill="hsl(var(--accent))" name="Revenue (₹L)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Environmental Scorecard */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-bold text-foreground mb-6">Environmental Scorecard</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              metric: 'Landfill Diversion Rate',
              value: '100%',
              description: 'All waste diverted from landfills',
              trend: '↑ +10% YoY'
            },
            {
              metric: 'Carbon Offset Potential',
              value: '42.5K',
              description: 'tonnes CO₂e over 5 years',
              trend: '↑ +5% YoY'
            },
            {
              metric: 'Biodiversity Impact',
              value: 'Very High',
              description: 'Reduces pressure on natural resources',
              trend: 'Stable'
            }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-secondary rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">{item.metric}</p>
              <p className="text-2xl font-bold text-primary mb-2">{item.value}</p>
              <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
              <p className="text-xs font-medium text-primary">{item.trend}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Sustainable Development Goals */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-bold text-foreground mb-6">Sustainable Development Goals Alignment</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { sdg: 'SDG 7', title: 'Affordable & Clean Energy', impact: 'Bioenergy generation reduces fossil fuel dependency' },
            { sdg: 'SDG 12', title: 'Responsible Consumption', impact: 'Circular economy waste valorization' },
            { sdg: 'SDG 13', title: 'Climate Action', impact: 'CO₂ reduction & emissions mitigation' },
            { sdg: 'SDG 15', title: 'Life on Land', impact: 'Reduces agriculture pressure & soil preservation' },
            { sdg: 'SDG 8', title: 'Decent Work', impact: 'Employment in waste processing sector' },
            { sdg: 'SDG 3', title: 'Good Health', impact: 'Reduces air & water pollution from waste' }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-secondary rounded-lg border border-border">
              <p className="text-xs font-bold text-primary mb-1">{item.sdg}</p>
              <p className="text-sm font-semibold text-foreground mb-2">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.impact}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
