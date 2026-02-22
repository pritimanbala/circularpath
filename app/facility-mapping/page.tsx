'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MapPin, Phone, Mail, TrendingUp, Zap, Leaf, Users, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { getStateNames, getStateByName, getDistrictCoordinates } from '@/lib/india-geography'
import { facilitiesDatabase, getNearestFacility, calculateDistance } from '@/lib/facilities-database'

interface Facility {
  id: string
  name: string
  state: string
  district: string
  city: string
  latitude: number
  longitude: number
  type: string
  wasteTypesAccepted: string[]
  processingCapacity: string
  contact: string
  phone: string
  email: string
  pathwaysSupported: string[]
}

export default function FacilityMappingPage() {
  const searchParams = useSearchParams()
  const urlPathway = searchParams.get('pathway') || 'all'
  const urlState = searchParams.get('state') || ''
  const urlDistrict = searchParams.get('district') || ''

  const stateNames = getStateNames()
  
  const [selectedState, setSelectedState] = useState(urlState || '')
  const [selectedDistrict, setSelectedDistrict] = useState(urlDistrict || '')
  const [selectedPathway, setSelectedPathway] = useState(urlPathway)

  // Get all districts for selected state
  const districts = useMemo(() => {
    if (!selectedState) return []
    const state = getStateByName(selectedState)
    return state?.districts || []
  }, [selectedState])

  // Get facilities based on filters
  const allFacilities = useMemo(() => {
    let facilities = [...facilitiesDatabase]
    
    // Filter by state
    if (selectedState) {
      facilities = facilities.filter(f => f.state === selectedState)
    }
    
    // Filter by district
    if (selectedDistrict && selectedState) {
      facilities = facilities.filter(f => f.district === selectedDistrict)
    }
    
    // Filter by pathway
    if (selectedPathway !== 'all') {
      facilities = facilities.filter(f => 
        f.pathwaysSupported.some(p => p.toLowerCase() === selectedPathway.toLowerCase())
      )
    }
    
    return facilities
  }, [selectedState, selectedDistrict, selectedPathway])

  // Calculate nearest facility (always, outside of conditional)
  const nearestFacility = useMemo(() => {
    if (!selectedState) {
      // Default to India center if no state selected
      return getNearestFacility(20.5937, 78.9629)
    }
    
    // Get actual district coordinates if selected
    const coords = selectedDistrict 
      ? getDistrictCoordinates(selectedState, selectedDistrict)
      : { latitude: 20.5937, longitude: 78.9629 }
    
    return getNearestFacility(coords.latitude, coords.longitude, selectedDistrict)
  }, [selectedState, selectedDistrict])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/recommendation">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-foreground ml-4">Facility Mapping</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">All-India Processing Infrastructure Network</h2>
          <p className="text-muted-foreground max-w-3xl">
            Find waste-processing facilities across India that accept your waste stream. The platform shows facility details, accepted waste types, processing capacity, and supported pathways. This is informational only—the platform does not arrange logistics or coordinate bookings.
          </p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">State</label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value)
                setSelectedDistrict('')
              }}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select State</option>
              {stateNames.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="">All Districts</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Conversion Pathway</label>
            <select
              value={selectedPathway}
              onChange={(e) => setSelectedPathway(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Pathways</option>
              <option value="anaerobic">Anaerobic Digestion</option>
              <option value="composting">Composting</option>
              <option value="biomass">Biomass Energy</option>
              <option value="biochar">Biochar / Advanced Processing</option>
            </select>
          </div>
        </div>

        {/* Facilities List */}
        {allFacilities.length > 0 ? (
          <div className="grid gap-6">
            {allFacilities.map((facility) => (
              <Card key={facility.id} className="border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Header with Name and Location */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-primary/10 text-primary border-0">{facility.type}</Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{facility.name}</h3>
                      <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <p className="text-sm">{facility.city}, {facility.district}, {facility.state}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-4">
                    {/* Key Information Grid */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium mb-2">Processing Capacity</p>
                        <p className="font-semibold text-foreground flex items-center gap-2">
                          <Zap className="w-4 h-4 text-accent" />
                          {facility.processingCapacity}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium mb-2">Type</p>
                        <p className="font-semibold text-foreground">{facility.type}</p>
                      </div>
                    </div>

                    {/* Accepted Waste Types */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-foreground mb-2">Accepted Waste Types</p>
                      <div className="flex flex-wrap gap-2">
                        {facility.wasteTypesAccepted.map(waste => (
                          <div key={waste} className="px-3 py-1 bg-secondary rounded-full text-sm text-foreground flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-primary" />
                            {waste}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Supported Pathways */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-foreground mb-2">Supported Pathways</p>
                      <div className="flex flex-wrap gap-2">
                        {facility.pathwaysSupported.map(pathway => (
                          <Badge key={pathway} className="bg-primary/10 text-primary border-0">{pathway}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-secondary/50 rounded-lg p-4 mb-4 border border-border">
                      <p className="font-semibold text-foreground mb-3">Contact</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <a href={`tel:${facility.phone}`} className="text-primary hover:underline">{facility.phone}</a>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <a href={`mailto:${facility.email}`} className="text-primary hover:underline">{facility.email}</a>
                        </div>
                      </div>
                    </div>

                    {/* View Location Button */}
                    <div className="pt-4 border-t border-border">
                      <Link href={`https://maps.google.com/?q=${facility.latitude},${facility.longitude}`} target="_blank" className="w-full">
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          View on Google Maps
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="p-8 border-border bg-secondary/50">
              <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4 text-center">No facilities found matching your filters in the selected location.</p>
              <Button
                onClick={() => {
                  setSelectedState('')
                  setSelectedDistrict('')
                  setSelectedPathway('all')
                }}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Clear All Filters
              </Button>
            </Card>

            
          </div>
        )}

        {/* Information Note */}
        <Card className="p-6 border-border mt-12 bg-secondary/30">
          <h3 className="text-lg font-bold text-foreground mb-3">Important Information</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Disclaimer:</span> This platform is a decision-support tool only. It does not arrange logistics, coordinate bookings, or serve as a service provider. Users must directly contact facilities for partnership inquiries.
            </p>
            <p>
              <span className="font-semibold text-foreground">Facility Data:</span> Information is current as of the last update. Verify directly with facilities regarding capacity, acceptance criteria, and rates before engagement.
            </p>
            <p>
              <span className="font-semibold text-foreground">Next Steps:</span> Contact facility operators to discuss your specific waste stream, technical requirements, and partnership terms.
            </p>
          </div>
        </Card>
      </main>
    </div>
  )
}
