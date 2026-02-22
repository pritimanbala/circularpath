// Admin dashboard utilities and data management functions

export interface DashboardStats {
  totalAssessments: number
  totalFacilities: number
  wasteStreamsTracked: number
  totalWasteProcessed: number
  co2Reduced: number
  activeUsers: number
  completionRate: number
  growthRate: number
}

export interface AssessmentData {
  id: string
  facilityName: string
  wasteType: string
  quantityAnnual: number
  status: 'pending' | 'completed' | 'in_progress'
  createdAt: string
  updatedAt: string
  selectedPathway?: string
  implementationStatus?: 'planning' | 'implementation' | 'operational'
}

export interface FacilityData {
  id: string
  name: string
  type: string
  location: string
  district: string
  capacityPerDay: number
  status: 'active' | 'inactive' | 'pending'
  contactPerson: string
  email: string
  phone: string
  wasteStreamsHandled: string[]
}

export interface WasteStreamData {
  id: string
  name: string
  category: string
  description: string
  quantityPerYear: number
  quantityPerMonth: number
  status: 'tracking' | 'monitoring' | 'archived'
  primaryPathways: string[]
}

export interface SystemMetrics {
  timestamp: string
  assessmentsProcessed: number
  averageProcessingTime: number
  recommendationAccuracy: number
  userSatisfaction: number
  pathwayAdoptionRate: number
  co2Offset: number
}

export class AdminService {
  // Mock data - in production would connect to database
  private assessments: AssessmentData[] = [
    {
      id: 'A001',
      facilityName: 'Tamil Nadu Rice Mills',
      wasteType: 'rice_husk',
      quantityAnnual: 15000,
      status: 'completed',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      selectedPathway: 'rice_husk_ash',
      implementationStatus: 'planning'
    },
    {
      id: 'A002',
      facilityName: 'Coconut Processors Coop',
      wasteType: 'coconut_fiber',
      quantityAnnual: 8000,
      status: 'completed',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-05',
      selectedPathway: 'coconut_fiber_textiles',
      implementationStatus: 'implementation'
    },
    {
      id: 'A003',
      facilityName: 'Banana Processing Unit',
      wasteType: 'banana_peel',
      quantityAnnual: 5000,
      status: 'in_progress',
      createdAt: '2024-02-10',
      updatedAt: '2024-02-15'
    },
    {
      id: 'A004',
      facilityName: 'Thanjavur Rice Mill Ltd',
      wasteType: 'rice_husk',
      quantityAnnual: 12000,
      status: 'pending',
      createdAt: '2024-02-14',
      updatedAt: '2024-02-15'
    }
  ]

  private facilities: FacilityData[] = [
    {
      id: 'F001',
      name: 'Silica Ash Processing Center',
      type: 'Processing Facility',
      location: 'Kumbakonam',
      district: 'Thanjavur',
      capacityPerDay: 50,
      status: 'active',
      contactPerson: 'Rajesh Kumar',
      email: 'rajesh@silicaash.in',
      phone: '9876543210',
      wasteStreamsHandled: ['rice_husk', 'rice_bran']
    },
    {
      id: 'F002',
      name: 'Coir Fiber Production Unit',
      type: 'Processing Facility',
      location: 'Tirunelveli',
      district: 'Tirunelveli',
      capacityPerDay: 35,
      status: 'active',
      contactPerson: 'Priya Nair',
      email: 'priya@coirfiber.in',
      phone: '9876543211',
      wasteStreamsHandled: ['coconut_fiber', 'coconut_shell']
    },
    {
      id: 'F003',
      name: 'Composting and Biogas Plant',
      type: 'Processing Facility',
      location: 'Chennai',
      district: 'Chennai',
      capacityPerDay: 25,
      status: 'active',
      contactPerson: 'Anand Singh',
      email: 'anand@biogas.in',
      phone: '9876543212',
      wasteStreamsHandled: ['banana_peel', 'banana_stem']
    }
  ]

  private wasteStreams: WasteStreamData[] = [
    {
      id: 'WS001',
      name: 'Rice Husk',
      category: 'Agricultural',
      description: 'Byproduct from rice milling operations',
      quantityPerYear: 27000,
      quantityPerMonth: 2250,
      status: 'tracking',
      primaryPathways: ['ash_production', 'bioenergy', 'activated_carbon']
    },
    {
      id: 'WS002',
      name: 'Coconut Fiber',
      category: 'Agricultural',
      description: 'Extracted from coconut husk processing',
      quantityPerYear: 8000,
      quantityPerMonth: 667,
      status: 'tracking',
      primaryPathways: ['textile_fiber', 'composites', 'composting']
    },
    {
      id: 'WS003',
      name: 'Banana Peel',
      category: 'Agricultural',
      description: 'Byproduct from banana processing',
      quantityPerYear: 5000,
      quantityPerMonth: 417,
      status: 'tracking',
      primaryPathways: ['animal_feed', 'compost', 'bioplastics']
    }
  ]

  // Get dashboard statistics
  getDashboardStats(): DashboardStats {
    const totalWaste = this.wasteStreams.reduce((sum, ws) => sum + ws.quantityPerYear, 0)
    const co2PerTonne = 0.85 // Average CO2 reduction per tonne
    
    return {
      totalAssessments: this.assessments.length,
      totalFacilities: this.facilities.length,
      wasteStreamsTracked: this.wasteStreams.length,
      totalWasteProcessed: totalWaste,
      co2Reduced: Math.round(totalWaste * co2PerTonne),
      activeUsers: 12,
      completionRate: 75,
      growthRate: 28
    }
  }

  // Get all assessments with filtering
  getAssessments(
    filter?: 'all' | 'pending' | 'completed' | 'in_progress'
  ): AssessmentData[] {
    if (!filter || filter === 'all') {
      return this.assessments
    }
    return this.assessments.filter(a => a.status === filter)
  }

  // Get assessment by ID
  getAssessmentById(id: string): AssessmentData | undefined {
    return this.assessments.find(a => a.id === id)
  }

  // Update assessment
  updateAssessment(id: string, updates: Partial<AssessmentData>): AssessmentData | null {
    const index = this.assessments.findIndex(a => a.id === id)
    if (index === -1) return null
    
    this.assessments[index] = {
      ...this.assessments[index],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0]
    }
    return this.assessments[index]
  }

  // Delete assessment
  deleteAssessment(id: string): boolean {
    const index = this.assessments.findIndex(a => a.id === id)
    if (index === -1) return false
    this.assessments.splice(index, 1)
    return true
  }

  // Get all facilities
  getFacilities(): FacilityData[] {
    return this.facilities
  }

  // Get facility by ID
  getFacilityById(id: string): FacilityData | undefined {
    return this.facilities.find(f => f.id === id)
  }

  // Add new facility
  addFacility(facility: Omit<FacilityData, 'id'>): FacilityData {
    const newFacility = {
      ...facility,
      id: `F${String(this.facilities.length + 1).padStart(3, '0')}`
    }
    this.facilities.push(newFacility)
    return newFacility
  }

  // Update facility
  updateFacility(id: string, updates: Partial<FacilityData>): FacilityData | null {
    const index = this.facilities.findIndex(f => f.id === id)
    if (index === -1) return null
    
    this.facilities[index] = {
      ...this.facilities[index],
      ...updates
    }
    return this.facilities[index]
  }

  // Delete facility
  deleteFacility(id: string): boolean {
    const index = this.facilities.findIndex(f => f.id === id)
    if (index === -1) return false
    this.facilities.splice(index, 1)
    return true
  }

  // Get all waste streams
  getWasteStreams(): WasteStreamData[] {
    return this.wasteStreams
  }

  // Get waste stream by ID
  getWasteStreamById(id: string): WasteStreamData | undefined {
    return this.wasteStreams.find(ws => ws.id === id)
  }

  // Update waste stream
  updateWasteStream(id: string, updates: Partial<WasteStreamData>): WasteStreamData | null {
    const index = this.wasteStreams.findIndex(ws => ws.id === id)
    if (index === -1) return null
    
    this.wasteStreams[index] = {
      ...this.wasteStreams[index],
      ...updates
    }
    return this.wasteStreams[index]
  }

  // Get system metrics
  getSystemMetrics(): SystemMetrics {
    return {
      timestamp: new Date().toISOString(),
      assessmentsProcessed: 145,
      averageProcessingTime: 2.5, // minutes
      recommendationAccuracy: 92,
      userSatisfaction: 4.6, // out of 5
      pathwayAdoptionRate: 68,
      co2Offset: 40500 // tonnes CO2
    }
  }

  // Get assessment analytics
  getAssessmentAnalytics() {
    const byStatus = {
      pending: this.assessments.filter(a => a.status === 'pending').length,
      in_progress: this.assessments.filter(a => a.status === 'in_progress').length,
      completed: this.assessments.filter(a => a.status === 'completed').length
    }

    const byWasteType = this.assessments.reduce(
      (acc, a) => {
        acc[a.wasteType] = (acc[a.wasteType] || 0) + 1
        return acc
      },
      {} as { [key: string]: number }
    )

    const totalQuantity = this.assessments.reduce((sum, a) => sum + a.quantityAnnual, 0)

    return {
      byStatus,
      byWasteType,
      totalQuantity,
      averageQuantity: Math.round(totalQuantity / this.assessments.length)
    }
  }

  // Get facility analytics
  getFacilityAnalytics() {
    const byDistrict = this.facilities.reduce(
      (acc, f) => {
        acc[f.district] = (acc[f.district] || 0) + 1
        return acc
      },
      {} as { [key: string]: number }
    )

    const totalCapacity = this.facilities.reduce((sum, f) => sum + f.capacityPerDay, 0)

    const byStatus = {
      active: this.facilities.filter(f => f.status === 'active').length,
      inactive: this.facilities.filter(f => f.status === 'inactive').length,
      pending: this.facilities.filter(f => f.status === 'pending').length
    }

    return {
      byDistrict,
      totalCapacity,
      averageCapacity: Math.round(totalCapacity / this.facilities.length),
      byStatus
    }
  }

  // Export assessments as CSV
  exportAssessmentsCSV(): string {
    const headers = ['ID', 'Facility', 'Waste Type', 'Annual Quantity', 'Status', 'Created', 'Updated']
    const rows = this.assessments.map(a => [
      a.id,
      a.facilityName,
      a.wasteType,
      a.quantityAnnual,
      a.status,
      a.createdAt,
      a.updatedAt
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    return csv
  }

  // Export facilities as CSV
  exportFacilitiesCSV(): string {
    const headers = ['ID', 'Name', 'Type', 'Location', 'Capacity/Day', 'Status', 'Contact', 'Email']
    const rows = this.facilities.map(f => [
      f.id,
      f.name,
      f.type,
      f.location,
      f.capacityPerDay,
      f.status,
      f.contactPerson,
      f.email
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    return csv
  }
}

// Export singleton instance
export const adminService = new AdminService()
