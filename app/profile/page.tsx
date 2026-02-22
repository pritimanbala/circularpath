'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, LogOut, Edit, Shield, Lock, Mail, Phone, Building2, MapPin, Calendar } from 'lucide-react'
import Link from 'next/link'
import { authService, type User } from '@/lib/auth-service'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [permissions, setPermissions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [roleDescription, setRoleDescription] = useState('')

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/auth/login')
      return
    }

    try {
      const userData = JSON.parse(storedUser) as User
      setUser(userData)

      // Get permissions for this role
      const userPermissions = authService.getUserPermissions(userData.role)
      setPermissions(userPermissions)

      // Get role description
      const description = authService.getRoleDescription(userData.role)
      setRoleDescription(description)
    } catch (err) {
      router.push('/auth/login')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    const token = localStorage.getItem('authToken')
    if (token) {
      authService.logout(token)
    }
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const roleColors: { [key: string]: string } = {
    admin: 'bg-destructive/10 text-destructive',
    facility_operator: 'bg-primary/10 text-primary',
    fpo_coordinator: 'bg-accent/10 text-accent',
    researcher: 'bg-primary/10 text-primary',
    guest: 'bg-muted/10 text-muted-foreground'
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">User Profile</h1>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Card */}
        <Card className="p-8 border-border mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{user.name}</h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">User ID</p>
              <p className="font-mono text-foreground">{user.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Account Created</p>
              <p className="text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(user.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            {user.lastLogin && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Last Login</p>
                <p className="text-foreground">{new Date(user.lastLogin).toLocaleString('en-IN')}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Account Status</p>
              <Badge className={user.isActive ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}>
                {user.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Role and Permissions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Role Section */}
          <Card className="p-6 border-border">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              User Role
            </h3>
            <Badge className={`${roleColors[user.role]} mb-3 text-lg py-2 px-3 capitalize`}>
              {user.role.replace(/_/g, ' ')}
            </Badge>
            <p className="text-sm text-muted-foreground mt-4">{roleDescription}</p>
          </Card>

          {/* Account Security */}
          <Card className="p-6 border-border">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Security
            </h3>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Password last changed: 30 days ago</p>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-secondary bg-transparent">
                Change Password
              </Button>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-secondary bg-transparent">
                Two-Factor Authentication
              </Button>
            </div>
          </Card>
        </div>

        {/* Organization Information */}
        {(user.organization || user.district || user.phone) && (
          <Card className="p-6 border-border mb-8">
            <h3 className="text-lg font-bold text-foreground mb-6">Organization Information</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {user.organization && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Organization
                  </p>
                  <p className="font-medium text-foreground">{user.organization}</p>
                </div>
              )}
              {user.district && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    District
                  </p>
                  <p className="font-medium text-foreground">{user.district}</p>
                </div>
              )}
              {user.phone && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </p>
                  <p className="font-medium text-foreground">{user.phone}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Permissions */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-bold text-foreground mb-6">Access Permissions</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {permissions.map(permission => (
              <div key={permission} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground capitalize">
                  {permission
                    .replace(/_/g, ' ')
                    .replace(/([a-z])([A-Z])/g, '$1 $2')
                    .toLowerCase()
                    .replace(/^./, str => str.toUpperCase())}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
