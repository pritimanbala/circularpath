'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Database,
  AlertCircle,
  Zap,
  Globe,
  Users,
} from 'lucide-react'
import Link from 'next/link'

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-foreground ml-4">
            Methodology & About
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How CircularPath Works
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            CircularPath is a decision-support platform grounded in chemical engineering
            principles and circular economy theory. It helps waste generators identify
            technically feasible and environmentally sound waste-to-value pathways using
            rule-based logic and established conversion parameters. 
          </p>
        </section>

        {/* Core Approach */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Core Technical Approach
          </h2>

          <div className="space-y-6">
            {/* Decision Logic Flowchart */}
            <Card className="p-8 border-border bg-secondary/30">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Decision Logic Flowchart
              </h3>
              <div className="space-y-4 font-mono text-sm">
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-bold text-primary">1. User Input</p>
                  <p className="text-muted-foreground">
                    Waste stream (type, quantity, composition, location)
                  </p>
                </div>

                <div className="text-center text-muted-foreground">↓</div>

                <div className="border-l-4 border-primary pl-4">
                  <p className="font-bold text-primary">
                    2. Waste Characterization
                  </p>
                  <p className="text-muted-foreground">
                    Match input to pre-defined waste stream profiles (moisture, carbon,
                    nitrogen, heavy metals)
                  </p>
                </div>

                <div className="text-center text-muted-foreground">↓</div>

                <div className="border-l-4 border-primary pl-4">
                  <p className="font-bold text-primary">3. Pathway Screening</p>
                  <p className="text-muted-foreground">
                    Evaluate 8+ conversion pathways against technical feasibility criteria
                    (moisture, scale, infrastructure)
                  </p>
                </div>

                <div className="text-center text-muted-foreground">↓</div>

                <div className="border-l-4 border-primary pl-4">
                  <p className="font-bold text-primary">4. Multi-Criteria Scoring</p>
                  <p className="text-muted-foreground">
                    Rate each pathway on Technical (50%), Economic (25%), Environmental
                    (15%), and Scalability (10%) factors
                  </p>
                </div>

                <div className="text-center text-muted-foreground">↓</div>

                <div className="border-l-4 border-primary pl-4">
                  <p className="font-bold text-primary">5. Facility Matching</p>
                  <p className="text-muted-foreground">
                    Identify nearby processing infrastructure across India
                  </p>
                </div>

                <div className="text-center text-muted-foreground">↓</div>

                <div className="border-l-4 border-primary pl-4">
                  <p className="font-bold text-primary">6. Impact Estimation</p>
                  <p className="text-muted-foreground">
                    Calculate environmental and economic benefits using literature values
                  </p>
                </div>
              </div>
            </Card>

            {/* Chemical Engineering Principles */}
            <Card className="p-8 border-border">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Chemical Engineering Principles
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Thermodynamic Basis</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Biogas yield calculations based on volatile solids degradation
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Energy content estimation from elemental composition
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Mass balance analysis for material recovery rates
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Process-Specific Criteria
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Moisture content thresholds for aerobic/anaerobic pathways
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Nutrient ratios (C:N) for optimal microbial activity
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Temperature and pH requirements for biological processes
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Environmental Impact Metrics
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Life cycle assessment frameworks for GHG calculation
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Methane avoidance factors versus landfill decomposition
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Soil health and nutrient cycling benefits
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Economic Analysis</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Levelized cost of waste processing (capex + opex)
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Revenue from byproducts (energy, compost, bioplastics)
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Break-even and ROI timeline analysis
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Data Sources & Literature */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Database className="w-6 h-6 text-primary" />
            Data Sources & References
          </h2>

          <Card className="p-8 border-border">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  Government & Official Data
                </h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Central Pollution Control Board (CPCB) - Waste generation and composition data</li>
                  <li>• Ministry of Agriculture & Farmers Welfare - Crop residue data and statistics</li>
                  <li>• National Institute of Agricultural Economics and Policy Research (NIEAP)</li>
                  <li>• State Agricultural Departments - District-wise production statistics across India</li>
                  <li>• Environmental Impact Assessment (EIA) guidelines and standards</li>
                </ul>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="font-semibold text-foreground mb-3">
                  Scientific Literature
                </h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Indian Council of Agricultural Research (ICAR) publications on crop residues</li>
                  <li>• Journal of Environmental Management - Waste valorization studies</li>
                  <li>• Renewable Energy journal - Biogas and biomass conversion efficiencies</li>
                  <li>• Bioresource Technology - Anaerobic digestion and composting parameters</li>
                  <li>• Waste Management journal - Circular economy implementation case studies</li>
                </ul>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="font-semibold text-foreground mb-3">International Standards</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• EPA GHG Emission Factor Database - CO₂ and methane factors</li>
                  <li>• IPCC Guidelines for National Greenhouse Gas Inventories</li>
                  <li>• ISO 14040/14044 - Life Cycle Assessment methodology</li>
                  <li>• Waste & Resources Action Programme (WRAP) conversion tables</li>
                  <li>• FAO Waste Characterization Database - Crop-specific composition</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Limitations & Assumptions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-accent" />
            Limitations & Assumptions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-border border-accent/20">
              <h4 className="font-bold text-foreground mb-4">Key Assumptions</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-bold text-accent">1.</span>
                  <span>
                    Waste composition matches literature values for specific crop types
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">2.</span>
                  <span>
                    Conversion yields based on optimized facility operations
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">3.</span>
                  <span>
                    Market prices based on historical averages (2022-2024)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">4.</span>
                  <span>
                    Climate and soil conditions representative of different agricultural regions across India
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">5.</span>
                  <span>
                    Infrastructure availability as mapped in database (point-in-time)
                  </span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-border border-accent/20">
              <h4 className="font-bold text-foreground mb-4">Known Limitations</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-bold text-accent">1.</span>
                  <span>
                    Does not account for site-specific variations in waste composition
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">2.</span>
                  <span>
                    Limited facility data for emerging technologies (e.g., biochar)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">3.</span>
                  <span>
                    Does not capture logistics, transportation, or land constraints
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">4.</span>
                  <span>
                    Pricing based on historical trends, not real-time market data
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">5.</span>
                  <span>
                    Qualitative facility data; does not verify actual operational capacity
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Validation & Credibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Validation & Credibility
          </h2>

          <Card className="p-8 border-border bg-secondary/30">
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Literature-Grounded Approach
                </h4>
                <p className="text-muted-foreground">
                  All conversion parameters, emission factors, and economic assumptions are
                  derived from peer-reviewed research and official government databases. The
                  platform is not a black-box AI system—it is a transparent, rule-based
                  decision tree that can be audited and improved.
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Expert Feedback Integration
                </h4>
                <p className="text-muted-foreground">
                  CircularPath is designed as a decision-support tool, not a replacement for
                  expert judgment. Policy makers, facility managers, and researchers can review
                  recommendations, validate assumptions, and refine pathways based on local
                  conditions.
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  All-India Coverage
                </h4>
                <p className="text-muted-foreground">
                  The platform is designed for all-India coverage with state and district-level waste data,
                  facility networks across regions, market prices, and climate-specific parameters.
                  This nationwide approach ensures recommendations are regionally relevant and
                  technically sound.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Future Scope */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Future Scope</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-border">
              <h4 className="font-bold text-foreground mb-4">Short-term Enhancements</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">→</span>
                  <span>Real-time facility capacity and pricing updates</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">→</span>
                  <span>User testimonials and case study validation</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">→</span>
                  <span>Integration with govt. subsidy and loan schemes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">→</span>
                  <span>Mobile app for field-level waste assessment</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-border">
              <h4 className="font-bold text-foreground mb-4">Long-term Roadmap</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">→</span>
                  <span>AI-assisted decision trees with real-time learning</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">→</span>
                  <span>Policy dashboard for state-level impact tracking</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">→</span>
                  <span>Supply chain coordination and market linkages</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">→</span>
                  <span>Scalability to other states and regions in India</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Functional Scope */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Functional Scope</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-primary/20 bg-primary/5 border-2">
              <h4 className="font-bold text-primary mb-4">Included Features</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Decision-support logic for waste pathway selection</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Waste-to-value recommendations with scoring</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Infrastructure awareness and facility mapping</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Impact estimation (environmental and economic)</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Role-based access (operator, admin, researcher)</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-accent/20 bg-accent/5 border-2">
              <h4 className="font-bold text-accent mb-4">Excluded Features</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex gap-2">
                  <span className="text-accent font-bold">✗</span>
                  <span>Logistics management or route optimization</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">✗</span>
                  <span>Contractor coordination or booking</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">✗</span>
                  <span>Payment processing or financial transactions</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">✗</span>
                  <span>Real-time monitoring or IoT sensor integration</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">✗</span>
                  <span>Automated compliance or permitting support</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Conclusion */}
        <section className="bg-secondary/30 border border-border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Conclusion</h2>
          <p className="text-muted-foreground mb-4">
            CircularPath is grounded in established chemical engineering principles and
            circular economy best practices. It translates technical knowledge into practical,
            actionable recommendations for India's waste generators. By combining
            rule-based decision logic, literature-based parameters, and regional data, the
            platform demonstrates how technology can enable sustainable waste management at
            scale.
          </p>
          <p className="text-muted-foreground">
            The platform's transparent methodology ensures credibility and allows for
            continuous refinement as new data, technologies, and policy frameworks emerge.
            CircularPath is a first step toward building a data-driven circular economy
            ecosystem across India.
          </p>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90">
              Back to Home
            </Button>
          </Link>
          <Link href="/assess">
            <Button variant="outline" className="border-primary text-primary hover:bg-secondary bg-transparent">
              Start Assessment
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
