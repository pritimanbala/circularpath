'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

interface WasteFormData {
  facilityName: string
  facilityType: 'rice_mill' | 'coconut_processor' | 'banana_processor' | 'other' | ''
  wasteStream: 'rice_husk' | 'coconut_fiber' | 'banana_peel' | 'other' | ''
  quantityPerDay: string
  quantityPerYear: string
  moistureContent: string
  notes: string
}

interface FormErrors {
  [key: string]: string
}

export function WasteInputForm({ onSubmit }: { onSubmit: (data: WasteFormData) => void }) {
  const [formData, setFormData] = useState<WasteFormData>({
    facilityName: '',
    facilityType: '',
    wasteStream: '',
    quantityPerDay: '',
    quantityPerYear: '',
    moistureContent: '',
    notes: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const wasteStreamOptions = {
    rice_mill: [
      { value: 'rice_husk', label: 'Rice Husk' },
      { value: 'rice_bran', label: 'Rice Bran' },
      { value: 'rice_straw', label: 'Rice Straw' }
    ],
    coconut_processor: [
      { value: 'coconut_fiber', label: 'Coconut Fiber (Coir)' },
      { value: 'coconut_shell', label: 'Coconut Shell' },
      { value: 'coconut_pith', label: 'Coconut Pith' }
    ],
    banana_processor: [
      { value: 'banana_peel', label: 'Banana Peel' },
      { value: 'banana_stem', label: 'Banana Stem' },
      { value: 'banana_leaf', label: 'Banana Leaf' }
    ],
    other: [
      { value: 'other', label: 'Other' }
    ]
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.facilityName.trim()) {
      newErrors.facilityName = 'Facility name is required'
    }
    if (!formData.facilityType) {
      newErrors.facilityType = 'Please select facility type'
    }
    if (!formData.wasteStream) {
      newErrors.wasteStream = 'Please select waste stream'
    }
    if (!formData.quantityPerDay || parseFloat(formData.quantityPerDay) <= 0) {
      newErrors.quantityPerDay = 'Please enter valid daily quantity'
    }
    if (!formData.quantityPerYear || parseFloat(formData.quantityPerYear) <= 0) {
      newErrors.quantityPerYear = 'Please enter valid annual quantity'
    }
    if (formData.moistureContent && (parseFloat(formData.moistureContent) < 0 || parseFloat(formData.moistureContent) > 100)) {
      newErrors.moistureContent = 'Moisture content must be between 0-100%'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitSuccess(true)
      onSubmit(formData)
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          facilityName: '',
          facilityType: '',
          wasteStream: '',
          quantityPerDay: '',
          quantityPerYear: '',
          moistureContent: '',
          notes: ''
        })
        setSubmitSuccess(false)
      }, 2000)
    } catch (error) {
      setErrors({ submit: 'Failed to submit assessment. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getWasteOptions = () => {
    if (formData.facilityType && formData.facilityType in wasteStreamOptions) {
      return wasteStreamOptions[formData.facilityType as keyof typeof wasteStreamOptions]
    }
    return []
  }

  return (
    <Card className="p-8 border-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Waste Assessment Form</h2>
          <p className="text-muted-foreground mt-2">Provide details about your waste stream for engineering-informed recommendations</p>
        </div>

        {/* Facility Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Facility Information</h3>
          
          <div>
            <label htmlFor="facilityName" className="block text-sm font-medium text-foreground mb-2">
              Facility Name *
            </label>
            <input
              type="text"
              id="facilityName"
              name="facilityName"
              value={formData.facilityName}
              onChange={handleInputChange}
              placeholder="e.g., Tamil Nadu Rice Mills Pvt Ltd"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.facilityName && (
              <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.facilityName}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="facilityType" className="block text-sm font-medium text-foreground mb-2">
                Facility Type *
              </label>
              <select
                id="facilityType"
                name="facilityType"
                value={formData.facilityType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select facility type</option>
                <option value="rice_mill">Rice Mill</option>
                <option value="coconut_processor">Coconut Processor</option>
                <option value="banana_processor">Banana Processor</option>
                <option value="other">Other Agri-Processing</option>
              </select>
              {errors.facilityType && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.facilityType}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="wasteStream" className="block text-sm font-medium text-foreground mb-2">
                Waste Stream *
              </label>
              <select
                id="wasteStream"
                name="wasteStream"
                value={formData.wasteStream}
                onChange={handleInputChange}
                disabled={!formData.facilityType}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select waste stream</option>
                {getWasteOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.wasteStream && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.wasteStream}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quantity Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Waste Quantity</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="quantityPerDay" className="block text-sm font-medium text-foreground mb-2">
                Daily Quantity (Tonnes) *
              </label>
              <input
                type="number"
                id="quantityPerDay"
                name="quantityPerDay"
                value={formData.quantityPerDay}
                onChange={handleInputChange}
                placeholder="e.g., 50"
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.quantityPerDay && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.quantityPerDay}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="quantityPerYear" className="block text-sm font-medium text-foreground mb-2">
                Annual Quantity (Tonnes) *
              </label>
              <input
                type="number"
                id="quantityPerYear"
                name="quantityPerYear"
                value={formData.quantityPerYear}
                onChange={handleInputChange}
                placeholder="e.g., 15000"
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.quantityPerYear && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.quantityPerYear}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Waste Characteristics Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Waste Characteristics</h3>
          
          <div>
            <label htmlFor="moistureContent" className="block text-sm font-medium text-foreground mb-2">
              Moisture Content (%) <span className="text-muted-foreground">(Optional)</span>
            </label>
            <input
              type="number"
              id="moistureContent"
              name="moistureContent"
              value={formData.moistureContent}
              onChange={handleInputChange}
              placeholder="e.g., 12"
              step="0.1"
              min="0"
              max="100"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.moistureContent && (
              <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.moistureContent}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">Helps determine processing requirements and yield</p>
          </div>
        </div>

        {/* Additional Notes Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Additional Information</h3>
          
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-2">
              Additional Notes <span className="text-muted-foreground">(Optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Share any additional details about your waste stream or specific concerns..."
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">This helps our engineers provide more tailored recommendations</p>
          </div>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{errors.submit}</p>
          </div>
        )}

        {/* Success Message */}
        {submitSuccess && (
          <div className="p-4 bg-primary/10 border border-primary rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-primary">Assessment submitted successfully!</p>
              <p className="text-xs text-primary/80 mt-1">Redirecting to results...</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting || submitSuccess}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : submitSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Submitted
              </>
            ) : (
              <>
                Get Recommendations
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          * Required fields. Your data will be used only for assessment purposes and stored securely.
        </p>
      </form>
    </Card>
  )
}
