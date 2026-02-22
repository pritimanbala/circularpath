'use client'

import React from "react"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Leaf, Zap, TrendingUp, Users, Target, MapPin } from 'lucide-react'
import Link from 'next/link'

// Placeholder icon for Factory
const Factory = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7" />
    <path d="M7 7V3" />
    <path d="M12 7V2" />
    <path d="M17 7V3" />
    <path d="M3 17h18" />
    <rect x="5" y="10" width="2" height="4" />
    <rect x="10" y="10" width="2" height="4" />
    <rect x="15" y="10" width="2" height="4" />
  </svg>
)

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-primary">CircularPath</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-sm hover:text-primary transition">Problem</a>
            <a href="#solution" className="text-sm hover:text-primary transition">Solution</a>
            <a href="#workflow" className="text-sm hover:text-primary transition">How It Works</a>
            <Link href="/assess">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden bg-gradient-to-b from-secondary to-background py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
              Transform Agricultural <span className="text-primary">Waste into Value</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Engineering-informed decision support for circular economy practices in food processing and agricultural waste management across India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/assess">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Explore Pathways <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/learn-more">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-secondary bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The Challenge</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              India generates over 500 million tonnes of agricultural and food processing waste annually, yet lacks systematic approaches to identify viable waste-to-value pathways
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-border">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Scale of Waste</h3>
              <p className="text-muted-foreground text-sm">Millions of tonnes generated from rice mills, coconut processors, banana processing units annually with limited recovery mechanisms</p>
            </Card>
            <Card className="p-6 border-border">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Knowledge Gap</h3>
              <p className="text-muted-foreground text-sm">Waste generators lack technical guidance on feasible conversion pathways and available infrastructure in their region</p>
            </Card>
            <Card className="p-6 border-border">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Lost Potential</h3>
              <p className="text-muted-foreground text-sm">Economic and environmental opportunities from waste valorization remain unexploited due to lack of decision support infrastructure</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-16 md:py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">How CircularPath Works</h2>
              <p className="text-muted-foreground mb-6">
                Our platform applies chemical engineering principles and technical feasibility analysis to match your specific waste streams with viable conversion pathways.
              </p>
              <ul className="space-y-4">
                {[
                  'Input waste type, quantity, and composition',
                  'Receive engineering-assessed conversion options',
                  'Identify required infrastructure and technologies',
                  'Evaluate environmental and economic viability',
                  'Access regional facility information'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs text-primary-foreground font-bold">✓</span>
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg p-8 border border-border">
              <div className="space-y-6">
                <div className="p-4 bg-card rounded border border-border">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Example: Rice Mill Waste</div>
                  <div className="text-foreground font-semibold">Husk → Bioenergy / Building Material</div>
                </div>
                <div className="p-4 bg-card rounded border border-border">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Example: Coconut Processing</div>
                  <div className="text-foreground font-semibold">Fiber → Textiles / Composites</div>
                </div>
                <div className="p-4 bg-card rounded border border-border">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Example: Banana Processing</div>
                  <div className="text-foreground font-semibold">Peels → Animal Feed / Bioplastics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Workflow */}
      <section id="workflow" className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Platform Workflow</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A streamlined decision-support process designed for waste generators, MSMEs, and policy evaluators
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: '1', title: 'Input Data', description: 'Characterize your waste stream: type, quantity, composition' },
              { number: '2', title: 'Technical Analysis', description: 'Engineering assessment of feasible conversion pathways' },
              { number: '3', title: 'Infrastructure Mapping', description: 'Identify available facilities and technologies across India' },
              { number: '4', title: 'Recommendations', description: 'Actionable guidance on waste valorization options' }
            ].map((step) => (
              <div key={step.number} className="relative">
                <div className="bg-secondary rounded-lg p-6 border border-border h-full">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
                {parseInt(step.number) < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-1 bg-primary/30 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Who Benefits</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Factory, title: 'Food Processing Units', description: 'Rice mills, coconut processors, and banana processing facilities seeking waste valorization strategies' },
              { icon: Users, title: 'Farmer Producer Organizations', description: 'FPOs coordinating collective waste management and value-addition initiatives across member farms' },
              { icon: Zap, title: 'MSMEs in Agri-Processing', description: 'Small and medium enterprises looking to integrate circular economy practices into operations' },
              { icon: Target, title: 'Policy Evaluators & Researchers', description: 'Organizations assessing circular economy feasibility and impact at regional and state levels' }
            ].map((user, i) => {
              const Icon = user.icon
              return (
                <Card key={i} className="p-6 border-border">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{user.title}</h3>
                  <p className="text-muted-foreground text-sm">{user.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* All-India Context */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase">All-India Coverage</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Nationwide Circular Solutions</h2>
              <p className="text-muted-foreground mb-6">
                Our platform is designed for all-India coverage, supporting waste generators across all 28 states and 8 union territories with state-specific waste streams, infrastructure mapping, and circular economy pathways.
              </p>
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-foreground mb-1">Major Waste Sources</div>
                  <p className="text-muted-foreground text-sm">Rice, coconut, banana, sugarcane, cotton, groundnut, maize processing across multiple states</p>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Conversion Pathways</div>
                  <p className="text-muted-foreground text-sm">Bioenergy, animal feed, composting, building materials, bioplastics, biochar, and value-added products</p>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">All-India Infrastructure</div>
                  <p className="text-muted-foreground text-sm">Facility network covering all states with processing infrastructure, enabling nationwide waste-to-value identification</p>
                </div>
              </div>
            </div>
            <div className="bg-primary/10 rounded-lg p-8 border border-border">
              <div className="space-y-4">
                <div className="bg-card rounded p-4 border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">500M+</div>
                  <div className="text-muted-foreground text-sm">Tonnes of agricultural waste generated annually across India</div>
                </div>
                <div className="bg-card rounded p-4 border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">28</div>
                  <div className="text-muted-foreground text-sm">States and 8 union territories with coverage</div>
                </div>
                <div className="bg-card rounded p-4 border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">16+</div>
                  <div className="text-muted-foreground text-sm">Waste types mapped with properties and pathways</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Scalability */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Impact & Scalability</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              CircularPath enables significant environmental and economic benefits while supporting India's circular economy objectives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { metric: 'Environmental', items: ['CO₂ emissions reduction', 'Waste diversion from landfills', 'Resource conservation', 'Soil health improvement'] },
              { metric: 'Economic', items: ['Revenue from waste valorization', 'Cost savings from waste processing', 'Job creation in processing', 'Supply chain development'] },
              { metric: 'Social', items: ['Technology transfer to MSMEs', 'Livelihood enhancement', 'Community awareness', 'Sustainable development goals alignment'] }
            ].map((impact) => (
              <Card key={impact.metric} className="p-6 border-border">
                <h3 className="font-semibold text-lg text-primary mb-4">{impact.metric} Impact</h3>
                <ul className="space-y-2">
                  {impact.items.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Unlock Your Waste's Value?</h2>
          <p className="text-lg mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
            Join India's circular economy revolution. Get engineering-informed recommendations for your waste streams today.
          </p>
          <Link href="/assess">
            <Button size="lg" className="bg-white text-primary hover:bg-secondary">
              Get Started Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-primary">CircularPath</span>
              </div>
              <p className="text-sm text-muted-foreground">Decision-support for circular economy across India</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">How it Works</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">For Waste Generators</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">For Researchers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/methodology" className="text-muted-foreground hover:text-primary transition">Methodology</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:hello@circularpath.in" className="text-muted-foreground hover:text-primary transition">pritimanbala@gmail.com</a></li>
                <li className="text-muted-foreground">India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 CircularPath. Enabling circular economy practices for sustainable agricultural waste management across India.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
