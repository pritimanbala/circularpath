import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Leaf, Zap, TrendingUp, Globe, Droplets, Wind } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Learn More | Agri Waste',
  description: 'Understand agricultural waste management and conversion pathways',
}

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Learn More</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Agricultural Waste Management</h2>
          <p className="text-lg text-muted-foreground mb-6">
            India generates millions of tonnes of agricultural waste annually. Instead of burning or dumping this waste, we can convert it into valuable resources through proven conversion pathways.
          </p>
          <p className="text-lg text-muted-foreground">
            This platform helps farmers and agricultural businesses assess their waste and find the best processing solutions for their specific situation.
          </p>
        </div>

        {/* Why It Matters */}
        <Card className="p-8 mb-12 bg-primary/5 border-primary/30">
          <h3 className="text-2xl font-bold text-foreground mb-6">Why This Matters</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <Leaf className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Environmental Impact</h4>
                <p className="text-muted-foreground">Crop burning releases CO₂, particulates, and toxic gases. Proper waste management prevents air pollution and reduces greenhouse gases.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Economic Value</h4>
                <p className="text-muted-foreground">Agricultural waste has monetary value. Converting it creates additional income streams and job opportunities.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Energy Generation</h4>
                <p className="text-muted-foreground">Biogas and biomass energy reduce dependence on fossil fuels while generating renewable energy for local communities.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Globe className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Circular Economy</h4>
                <p className="text-muted-foreground">Waste becomes a resource in a circular system, supporting sustainable agriculture and environmental health.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Conversion Pathways */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Conversion Pathways</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Anaerobic Digestion */}
            <Card className="p-6 border-border">
              <h4 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Anaerobic Digestion
              </h4>
              <p className="text-muted-foreground mb-4">
                Microorganisms break down organic matter in oxygen-free conditions, producing biogas (60-70% methane).
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="font-semibold text-foreground">Best for:</span> Wet waste, food waste, manure</p>
                <p><span className="font-semibold text-foreground">Output:</span> Biogas for electricity, heat, cooking fuel</p>
                <p><span className="font-semibold text-foreground">Timeline:</span> 20-40 days digestion period</p>
              </div>
            </Card>

            {/* Composting */}
            <Card className="p-6 border-border">
              <h4 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                Composting
              </h4>
              <p className="text-muted-foreground mb-4">
                Aerobic decomposition converts organic waste into nutrient-rich compost for soil enhancement.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="font-semibold text-foreground">Best for:</span> Crop residue, leaves, straw</p>
                <p><span className="font-semibold text-foreground">Output:</span> Organic fertilizer, soil amendment</p>
                <p><span className="font-semibold text-foreground">Timeline:</span> 60-90 days decomposition</p>
              </div>
            </Card>

            {/* Biomass Energy */}
            <Card className="p-6 border-border">
              <h4 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <Wind className="w-5 h-5 text-primary" />
                Biomass Energy
              </h4>
              <p className="text-muted-foreground mb-4">
                Dense, dry waste is converted into briquettes or charcoal for thermal energy generation.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="font-semibold text-foreground">Best for:</span> Rice husk, coconut shell, straw</p>
                <p><span className="font-semibold text-foreground">Output:</span> Solid fuel, briquettes, charcoal</p>
                <p><span className="font-semibold text-foreground">Timeline:</span> Immediate processing</p>
              </div>
            </Card>

            {/* Biochar */}
            <Card className="p-6 border-border">
              <h4 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-primary" />
                Biochar / Advanced Processing
              </h4>
              <p className="text-muted-foreground mb-4">
                Pyrolysis converts biomass into stable carbon product with agricultural and environmental benefits.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="font-semibold text-foreground">Best for:</span> All types of biomass</p>
                <p><span className="font-semibold text-foreground">Output:</span> Biochar for soil, carbon sequestration</p>
                <p><span className="font-semibold text-foreground">Timeline:</span> Advanced processing (hours)</p>
              </div>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">How Our Platform Works</h3>
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: 'Assess Your Waste',
                description: 'Select your waste type, quantity, and location. Our system analyzes the characteristics of your specific waste.'
              },
              {
                step: 2,
                title: 'Get Recommendations',
                description: 'Based on waste properties, we recommend the most suitable conversion pathways with detailed metrics and earnings potential.'
              },
              {
                step: 3,
                title: 'Find Facilities',
                description: 'Discover nearby processing facilities that can handle your waste type and convert it using your preferred pathway.'
              },
              {
                step: 4,
                title: 'Connect & Earn',
                description: 'Connect with facility operators and start converting your waste into income while helping the environment.'
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary text-lg">{item.step}</span>
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Statistics */}
        <Card className="p-8 mb-12 bg-secondary/50 border-border">
          <h3 className="text-2xl font-bold text-foreground mb-6">Impact by Numbers</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-3xl font-bold text-primary mb-2">500M+</p>
              <p className="text-sm text-muted-foreground">Tonnes of agricultural waste generated annually in India</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-2">40%</p>
              <p className="text-sm text-muted-foreground">Energy content recoverable from agricultural waste</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-2">60%</p>
              <p className="text-sm text-muted-foreground">Reduction in greenhouse gas emissions vs. burning</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-2">₹10K+</p>
              <p className="text-sm text-muted-foreground">Annual earnings per tonne of processed waste</p>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Assess your agricultural waste and discover the best conversion pathway for your situation.
          </p>
          <Link href="/assess">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Assessment
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
