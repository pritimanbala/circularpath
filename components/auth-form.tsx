'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Lock, AlertCircle, CheckCircle, User, Phone, Building2, MapPin, ArrowRight, Loader2 } from 'lucide-react'
import type { UserRole, LoginCredentials, RegisterData } from '@/lib/auth-service'

interface AuthFormProps {
  mode: 'login' | 'register'
  onSubmit: (data: LoginCredentials | RegisterData) => void
  isLoading?: boolean
  error?: string
}

export function AuthForm({ mode, onSubmit, isLoading = false, error }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<UserRole>('facility_operator')
  const [organization, setOrganization] = useState('')
  const [district, setDistrict] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (mode === 'register') {
      if (!name.trim()) {
        newErrors.name = 'Name is required'
      }
      if (mode === 'register' && (role === 'facility_operator' || role === 'fpo_coordinator') && !organization.trim()) {
        newErrors.organization = 'Organization name is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (mode === 'login') {
      onSubmit({ email, password } as LoginCredentials)
    } else {
      onSubmit({
        email,
        password,
        name,
        role,
        organization: organization || undefined,
        district: district || undefined,
        phone: phone || undefined
      } as RegisterData)
    }
  }

  const districts = [
    'Thanjavur',
    'Tirunelveli',
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Salem',
    'Erode',
    'Villupuram'
  ]

  return (
    <Card className="p-8 border-border max-w-md w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {mode === 'login' ? 'Sign in to access your assessments' : 'Join CircularPath to get started'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Name Field (Register Only) */}
        {mode === 'register' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name}</p>
            )}
          </div>
        )}

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {errors.password && (
            <p className="text-sm text-destructive mt-1">{errors.password}</p>
          )}
        </div>

        {/* Role Field (Register Only) */}
        {mode === 'register' && (
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
              I am a... *
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="facility_operator">Food Processing Unit Operator</option>
              <option value="fpo_coordinator">FPO / Farmer Cooperative Coordinator</option>
              <option value="researcher">Researcher / Policy Evaluator</option>
              <option value="guest">Guest (View Only)</option>
            </select>
          </div>
        )}

        {/* Organization Field (Register Only) */}
        {mode === 'register' && (role === 'facility_operator' || role === 'fpo_coordinator') && (
          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-foreground mb-2">
              Organization Name *
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                id="organization"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g., Tamil Nadu Rice Mills"
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {errors.organization && (
              <p className="text-sm text-destructive mt-1">{errors.organization}</p>
            )}
          </div>
        )}

        {/* District Field (Register Only) */}
        {mode === 'register' && (role === 'facility_operator' || role === 'fpo_coordinator') && (
          <div>
            <label htmlFor="district" className="block text-sm font-medium text-foreground mb-2">
              District (Optional)
            </label>
            <select
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select district</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        )}

        {/* Phone Field (Register Only) */}
        {mode === 'register' && (
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
            </>
          ) : (
            <>
              {mode === 'login' ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>

        {/* Demo Credentials */}
        {mode === 'login' && (
          <div className="p-4 bg-secondary rounded-lg text-xs">
            <p className="font-semibold text-foreground mb-2">Demo Credentials:</p>
            <p className="text-muted-foreground">Email: <span className="font-mono">admin@circularpath.in</span></p>
            <p className="text-muted-foreground">Password: <span className="font-mono">password123</span></p>
          </div>
        )}
      </form>
    </Card>
  )
}
