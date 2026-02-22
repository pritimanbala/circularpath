'use client'

import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useMemo, useEffect } from "react"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getStateNames, getState, getStateByName, getDistrictsByState, getCitiesByDistrict, State } from '@/lib/india-geography'
import { wasteDatabase, getWastesByCategory, getWasteMoistureContent, getWasteType } from '@/lib/waste-database'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/loading-spinner'

// Mock assessment engine - returns recommendations based on waste stream
function generateAssessmentResults(formData: WasteFormData) {
  const wasteStreamData: {
    [key: string]: {
      pathways: Array<{
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
      }>
    }
  } = {
    rice_husk: {
      pathways: [
        {
          id: '1',
          pathwayName: 'Husk Ash for Construction',
          endProduct: 'Silica Ash / Pozzolanic Material',
          technicalScore: 0.92,
          economicScore: 0.85,
          environmentalScore: 0.95,
          feasibilityStatus: 'RECOMMENDED',
          implementationRequirements: ['Calcination kiln', 'Air classification', 'Quality testing lab'],
          estimatedInvestment: 4500000,
          paybackPeriodYears: 2.5,
          annualRevenuePotential: 2000000,
          yieldPercentage: 20
        },
        {
          id: '2',
          pathwayName: 'Husk-based Bioenergy',
          endProduct: 'Briquettes / Charcoal',
          technicalScore: 0.88,
          economicScore: 0.82,
          environmentalScore: 0.90,
          feasibilityStatus: 'RECOMMENDED',
          implementationRequirements: ['Carbonization unit', 'Briquetting machine', 'Drying facility'],
          estimatedInvestment: 3200000,
          paybackPeriodYears: 2.2,
          annualRevenuePotential: 1800000,
          yieldPercentage: 35
        },
        {
          id: '3',
          pathwayName: 'Activated Carbon Production',
          endProduct: 'Activated Carbon',
          technicalScore: 0.75,
          economicScore: 0.80,
          environmentalScore: 0.85,
          feasibilityStatus: 'FEASIBLE',
          implementationRequirements: ['Activation reactor', 'Chemical handling', 'Filtration system'],
          estimatedInvestment: 7500000,
          paybackPeriodYears: 3.5,
          annualRevenuePotential: 2500000,
          yieldPercentage: 12
        }
      ]
    },
    coconut_fiber: {
      pathways: [
        {
          id: '1',
          pathwayName: 'Coir Fiber Products',
          endProduct: 'Textiles / Cordage',
          technicalScore: 0.90,
          economicScore: 0.88,
          environmentalScore: 0.92,
          feasibilityStatus: 'RECOMMENDED',
          implementationRequirements: ['Retting facility', 'Beating equipment', 'Spinning unit'],
          estimatedInvestment: 5000000,
          paybackPeriodYears: 2.8,
          annualRevenuePotential: 2200000,
          yieldPercentage: 40
        },
        {
          id: '2',
          pathwayName: 'Coconut Fiber Boards',
          endProduct: 'Composite Panels',
          technicalScore: 0.85,
          economicScore: 0.84,
          environmentalScore: 0.88,
          feasibilityStatus: 'RECOMMENDED',
          implementationRequirements: ['Mat forming machine', 'Binder application', 'Press unit'],
          estimatedInvestment: 4200000,
          paybackPeriodYears: 2.6,
          annualRevenuePotential: 1950000,
          yieldPercentage: 38
        },
        {
          id: '3',
          pathwayName: 'Coir Pith Composting',
          endProduct: 'Growing Media',
          technicalScore: 0.72,
          economicScore: 0.65,
          environmentalScore: 0.95,
          feasibilityStatus: 'FEASIBLE',
          implementationRequirements: ['Composting bins', 'Ventilation system', 'Quality control lab'],
          estimatedInvestment: 800000,
          paybackPeriodYears: 1.5,
          annualRevenuePotential: 600000,
          yieldPercentage: 45
        }
      ]
    },
    banana_peel: {
      pathways: [
        {
          id: '1',
          pathwayName: 'Animal Feed Supplement',
          endProduct: 'Cattle/Poultry Feed Pellets',
          technicalScore: 0.88,
          economicScore: 0.85,
          environmentalScore: 0.90,
          feasibilityStatus: 'RECOMMENDED',
          implementationRequirements: ['Drying facility', 'Grinding mill', 'Pelletizing machine'],
          estimatedInvestment: 2800000,
          paybackPeriodYears: 2.1,
          annualRevenuePotential: 1500000,
          yieldPercentage: 25
        },
        {
          id: '2',
          pathwayName: 'Bioplastic Production',
          endProduct: 'Biodegradable Plastics',
          technicalScore: 0.70,
          economicScore: 0.72,
          environmentalScore: 0.93,
          feasibilityStatus: 'FEASIBLE',
          implementationRequirements: ['Extraction reactor', 'Polymerization unit', 'Processing line'],
          estimatedInvestment: 8500000,
          paybackPeriodYears: 4.2,
          annualRevenuePotential: 2800000,
          yieldPercentage: 18
        },
        {
          id: '3',
          pathwayName: 'Organic Composting',
          endProduct: 'Nutrient-rich Compost',
          technicalScore: 0.82,
          economicScore: 0.70,
          environmentalScore: 0.96,
          feasibilityStatus: 'RECOMMENDED',
          implementationRequirements: ['Composting beds', 'Aeration system', 'Curing facility'],
          estimatedInvestment: 1200000,
          paybackPeriodYears: 1.8,
          annualRevenuePotential: 700000,
          yieldPercentage: 50
        }
      ]
    }
  }

  const selectedPathways = wasteStreamData[formData.wasteStream as string] || {
    pathways: []
  }

  return selectedPathways.pathways
}

export default function AssessmentPage() {
  const router = useRouter()
  const stateNames = getStateNames()
  const cropCategories = Array.from(new Set(wasteDatabase.map(w => w.category)))
  
  const [selectedState, setSelectedState] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCropType, setSelectedCropType] = useState('')
  const [selectedWasteType, setSelectedWasteType] = useState('')
  const [quantity, setQuantity] = useState('')
  const [quantityUnit, setQuantityUnit] = useState('kg/day')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Get available districts for selected state
  const districts = useMemo(() => {
    if (!selectedState) return []
    const state = getStateByName(selectedState)
    return state?.districts || []
  }, [selectedState])

  // Get available cities for selected district
  const cities = useMemo(() => {
    if (!selectedState || !selectedDistrict) return []
    const state = getStateByName(selectedState)
    if (!state) return []
    const district = state.districts.find(d => d.id === selectedDistrict)
    return district?.cities || []
  }, [selectedState, selectedDistrict])

  // Get waste types for selected crop category
  const wasteTypes = useMemo(() => {
    if (!selectedCropType) return []
    return getWastesByCategory(selectedCropType)
  }, [selectedCropType])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!selectedState) newErrors.state = 'Please select a state'
    if (!selectedDistrict) newErrors.district = 'Please select a district'
    if (!selectedCity) newErrors.city = 'Please select a city'
    if (!selectedCropType) newErrors.cropType = 'Please select a crop type'
    if (!selectedWasteType) newErrors.wasteType = 'Please select a waste type'
    if (!quantity) newErrors.quantity = 'Please enter quantity'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitted(true)
    }
  }

  // Use effect to handle navigation after form submission
  useEffect(() => {
    if (isSubmitted) {
      const params = new URLSearchParams({
        wasteId: selectedWasteType,
        quantity: quantity,
        unit: quantityUnit,
        state: selectedState,
        district: selectedDistrict,
        city: selectedCity
      })
      // Small delay to show loading animation before navigation
      setTimeout(() => {
        router.push(`/recommendation?${params.toString()}`)
      }, 1000)
    }
  }, [isSubmitted, selectedWasteType, quantity, quantityUnit, selectedState, selectedDistrict, selectedCity, router])

  // Show loading spinner during submission
  if (isSubmitted) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-foreground ml-4">Waste Input</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Characterize Your Waste</h2>
          <p className="text-muted-foreground">
            Provide basic information about your waste stream across India. The system automatically determines waste properties based on your selection.<p>* Currently we only have a few states but we can expand from it</p>
          </p>
        </div>

        <Card className="p-8 border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* State Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                State *
              </label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value)
                  setSelectedDistrict('')
                  setSelectedCity('')
                  setErrors({ ...errors, state: '' })
                }}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select your state</option>
                {stateNames.map(stateName => (
                  <option key={stateName} value={stateName}>{stateName}</option>
                ))}
              </select>
              {errors.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
            </div>

            {/* District Selection */}
            {selectedState && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  District *
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value)
                    setSelectedCity('')
                    setErrors({ ...errors, district: '' })
                  }}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select district</option>
                  {districts.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
                {errors.district && <p className="text-sm text-destructive mt-1">{errors.district}</p>}
              </div>
            )}

            {/* City Selection */}
            {selectedDistrict && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  City *
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value)
                    setErrors({ ...errors, city: '' })
                  }}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select city</option>
                  {cities.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
              </div>
            )}

            {/* Crop Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Crop Type *
              </label>
              <select
                value={selectedCropType}
                onChange={(e) => {
                  setSelectedCropType(e.target.value)
                  setSelectedWasteType('')
                  setErrors({ ...errors, cropType: '' })
                }}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select crop type</option>
                {cropCategories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              {errors.cropType && <p className="text-sm text-destructive mt-1">{errors.cropType}</p>}
            </div>

            {/* Waste Type */}
            {selectedCropType && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Waste Type * <span className="text-xs text-muted-foreground">(moisture determined automatically)</span>
                </label>
                <select
                  value={selectedWasteType}
                  onChange={(e) => {
                    setSelectedWasteType(e.target.value)
                    setErrors({ ...errors, wasteType: '' })
                  }}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select waste type</option>
                  {wasteTypes.map(waste => (
                    <option key={waste.id} value={waste.id}>
                      {waste.name} ({waste.moistureContent})
                    </option>
                  ))}
                </select>
                {errors.wasteType && <p className="text-sm text-destructive mt-1">{errors.wasteType}</p>}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Approximate Quantity *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value)
                    setErrors({ ...errors, quantity: '' })
                  }}
                  placeholder="e.g., 50"
                  step="0.1"
                  min="0"
                  className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select 
                  value={quantityUnit}
                  onChange={(e) => setQuantityUnit(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="kg/day">kg/day</option>
                  <option value="tonnes/month">tonnes/month</option>
                  <option value="tonnes/year">tonnes/year</option>
                </select>
              </div>
              {errors.quantity && <p className="text-sm text-destructive mt-1">{errors.quantity}</p>}
            </div>

            <button
              type="submit"
              className="w-full mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
            >
              Get Recommendations
              <ArrowRight className="inline ml-2 w-4 h-4" />
            </button>
          </form>
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-6">
          * Required fields. Your data is secure and used only for recommendations.
        </p>
      </main>
    </div>
  )
}
