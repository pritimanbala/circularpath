'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3,
  Users,
  Database,
  Settings,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Leaf,
  Building2
} from 'lucide-react'
import Link from 'next/link'
import { adminService, type AssessmentData, type FacilityData } from '@/lib/admin-utils'

type DashboardTab = 'overview' | 'assessments' | 'facilities' | 'waste-streams' | 'settings'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview')
  const [assessmentFilter, setAssessmentFilter] = useState<'all' | 'pending' | 'completed' | 'in_progress'>('all')
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const stats = adminService.getDashboardStats()
  const assessments = adminService.getAssessments(assessmentFilter === 'all' ? undefined : assessmentFilter)
  const facilities = adminService.getFacilities()
  const wasteStreams = adminService.getWasteStreams()
  const metrics = adminService.getSystemMetrics()
  const assessmentAnalytics = adminService.getAssessmentAnalytics()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'active':
        return { bg: 'bg-primary/10', text: 'text-primary', icon: CheckCircle }
      case 'in_progress':
      case 'implementation':
        return { bg: 'bg-accent/10', text: 'text-accent', icon: Clock }
      case 'pending':
        return { bg: 'bg-yellow-500/10', text: 'text-yellow-600', icon: AlertCircle }
      case 'inactive':
        return { bg: 'bg-destructive/10', text: 'text-destructive', icon: AlertCircle }
      default:
        return { bg: 'bg-muted/10', text: 'text-muted-foreground', icon: AlertCircle }
    }
  }

  const handleExportAssessments = () => {
    const csv = adminService.exportAssessmentsCSV()
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'assessments.csv'
    a.click()
  }

  const handleExportFacilities = () => {
    const csv = adminService.exportFacilitiesCSV()
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'facilities.csv'
    a.click()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Platform data management and analytics</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-primary text-primary hover:bg-secondary bg-transparent">
              Back to Platform
            </Button>
          </Link>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'assessments', label: 'Assessments', icon: Database },
              { id: 'facilities', label: 'Facilities', icon: Building2 },
              { id: 'waste-streams', label: 'Waste Streams', icon: Leaf },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as DashboardTab)}
                  className={`px-4 py-4 font-medium text-sm border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: 'Total Assessments', value: stats.totalAssessments, icon: Database, color: 'text-primary' },
                { label: 'Active Facilities', value: stats.totalFacilities, icon: Building2, color: 'text-accent' },
                { label: 'Waste Processed', value: `${stats.totalWasteProcessed}T`, icon: Leaf, color: 'text-primary' },
                { label: 'CO₂ Reduced', value: `${stats.co2Reduced}T`, icon: TrendingUp, color: 'text-primary' }
              ].map((metric, i) => {
                const Icon = metric.icon
                return (
                  <Card key={i} className="p-6 border-border">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
                      <Icon className={`w-5 h-5 ${metric.color}`} />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                  </Card>
                )
              })}
            </div>

            {/* Performance Metrics */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6 border-border">
                <h3 className="text-lg font-bold text-foreground mb-6">System Performance</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Avg Processing Time', value: `${metrics.averageProcessingTime}m`, target: '3m' },
                    { label: 'Recommendation Accuracy', value: `${metrics.recommendationAccuracy}%`, target: '90%' },
                    { label: 'User Satisfaction', value: `${metrics.userSatisfaction}/5`, target: '4.5/5' },
                    { label: 'Pathway Adoption', value: `${metrics.pathwayAdoptionRate}%`, target: '70%' }
                  ].map((metric, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-secondary rounded">
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="text-lg font-bold text-foreground">{metric.value}</p>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">Target: {metric.target}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-border">
                <h3 className="text-lg font-bold text-foreground mb-6">Assessment Status</h3>
                <div className="space-y-3">
                  {Object.entries(assessmentAnalytics.byStatus).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={`capitalize ${getStatusColor(status).bg} ${getStatusColor(status).text} border-0`}>
                          {status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{count} assessments</span>
                      </div>
                      <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(count / assessments.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Waste Type Distribution */}
            <Card className="p-6 border-border">
              <h3 className="text-lg font-bold text-foreground mb-6">Waste Stream Distribution</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(assessmentAnalytics.byWasteType).map(([wasteType, count]) => (
                  <div key={wasteType} className="p-4 bg-secondary rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2 capitalize">{wasteType.replace(/_/g, ' ')}</p>
                    <p className="text-2xl font-bold text-primary">{count}</p>
                    <p className="text-xs text-muted-foreground mt-1">assessments</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Assessments Tab */}
        {activeTab === 'assessments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Assessments</h2>
              <div className="flex gap-2">
                <Button
                  onClick={handleExportAssessments}
                  variant="outline"
                  className="border-primary text-primary hover:bg-secondary gap-2 bg-transparent"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
                <Button className="bg-primary hover:bg-primary/90 gap-2">
                  <Plus className="w-4 h-4" />
                  New Assessment
                </Button>
              </div>
            </div>

            {/* Filter */}
            <select
              value={assessmentFilter}
              onChange={(e) => setAssessmentFilter(e.target.value as typeof assessmentFilter)}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Assessments</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            {/* Assessments Table */}
            <div className="overflow-x-auto border border-border rounded-lg">
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Facility</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Waste Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Quantity</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((assessment) => {
                    const statusColor = getStatusColor(assessment.status)
                    const StatusIcon = statusColor.icon
                    return (
                      <tr key={assessment.id} className="border-b border-border hover:bg-secondary/30 transition">
                        <td className="px-6 py-4 text-sm font-mono text-primary">{assessment.id}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{assessment.facilityName}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground capitalize">
                          {assessment.wasteType.replace(/_/g, ' ')}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">{assessment.quantityAnnual}T</td>
                        <td className="px-6 py-4 text-sm">
                          <Badge className={`${statusColor.bg} ${statusColor.text} border-0 capitalize`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {assessment.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => setShowDeleteConfirm(assessment.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Facilities Tab */}
        {activeTab === 'facilities' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Processing Facilities</h2>
              <div className="flex gap-2">
                <Button
                  onClick={handleExportFacilities}
                  variant="outline"
                  className="border-primary text-primary hover:bg-secondary gap-2 bg-transparent"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
                <Button className="bg-primary hover:bg-primary/90 gap-2">
                  <Plus className="w-4 h-4" />
                  Add Facility
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {facilities.map(facility => {
                const statusColor = getStatusColor(facility.status)
                const StatusIcon = statusColor.icon
                return (
                  <Card key={facility.id} className="p-6 border-border">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{facility.name}</h3>
                        <p className="text-sm text-muted-foreground">{facility.location}, {facility.district}</p>
                      </div>
                      <Badge className={`${statusColor.bg} ${statusColor.text} border-0`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {facility.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-medium text-foreground">{facility.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capacity/Day</span>
                        <span className="font-medium text-foreground">{facility.capacityPerDay} tonnes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contact</span>
                        <span className="font-medium text-foreground">{facility.contactPerson}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {facility.wasteStreamsHandled.map(stream => (
                        <Badge key={stream} variant="outline" className="text-xs capitalize">
                          {stream.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-border">
                      <Button size="sm" variant="ghost" className="flex-1 text-primary hover:bg-primary/10">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="ghost" className="flex-1 text-primary hover:bg-primary/10">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="ghost" className="flex-1 text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Waste Streams Tab */}
        {activeTab === 'waste-streams' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Waste Streams</h2>
              <Button className="bg-primary hover:bg-primary/90 gap-2">
                <Plus className="w-4 h-4" />
                Add Stream
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {wasteStreams.map(stream => (
                <Card key={stream.id} className="p-6 border-border">
                  <h3 className="text-lg font-bold text-foreground mb-2">{stream.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{stream.description}</p>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual Qty</span>
                      <span className="font-medium text-foreground">{stream.quantityPerYear}T</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Avg</span>
                      <span className="font-medium text-foreground">{stream.quantityPerMonth}T</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-6">
                    {stream.primaryPathways.map(pathway => (
                      <Badge key={pathway} variant="outline" className="text-xs">
                        {pathway.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button size="sm" variant="ghost" className="flex-1 text-primary hover:bg-primary/10">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="ghost" className="flex-1 text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <Card className="p-6 border-border space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Platform Settings</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Platform Name</label>
                  <input
                    type="text"
                    defaultValue="CircularPath"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Support Email</label>
                  <input
                    type="email"
                    defaultValue="support@circularpath.in"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Default District</label>
                  <select className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Thanjavur</option>
                    <option>Tirunelveli</option>
                    <option>Chennai</option>
                  </select>
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-sm text-foreground">Enable email notifications</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button className="bg-primary hover:bg-primary/90">Save Settings</Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
