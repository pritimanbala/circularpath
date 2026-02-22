// Authentication and Role-Based Access Control Service

export type UserRole = 'admin' | 'facility_operator' | 'researcher' | 'fpo_coordinator' | 'guest'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organization?: string
  district?: string
  phone?: string
  createdAt: string
  lastLogin?: string
  isActive: boolean
}

export interface AuthToken {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  role: UserRole
  organization?: string
  district?: string
  phone?: string
}

// Role permissions matrix
const RolePermissions: { [key in UserRole]: string[] } = {
  admin: [
    'view_all_assessments',
    'manage_facilities',
    'manage_users',
    'manage_waste_streams',
    'view_analytics',
    'export_data',
    'configure_system',
    'access_admin_dashboard'
  ],
  facility_operator: [
    'create_assessment',
    'view_own_assessments',
    'view_recommendations',
    'find_facilities',
    'contact_support',
    'download_reports'
  ],
  fpo_coordinator: [
    'create_assessment',
    'view_member_assessments',
    'manage_members',
    'view_recommendations',
    'find_facilities',
    'contact_support',
    'download_reports',
    'view_group_analytics'
  ],
  researcher: [
    'view_all_assessments',
    'view_analytics',
    'export_data',
    'download_reports',
    'access_research_tools'
  ],
  guest: ['view_landing_page', 'contact_support']
}

// Mock user database
const mockUsers: User[] = [
  {
    id: 'USR001',
    email: 'admin@circularpath.in',
    name: 'Admin User',
    role: 'admin',
    organization: 'CircularPath',
    createdAt: '2024-01-01',
    isActive: true
  },
  {
    id: 'USR002',
    email: 'operator@ricemill.in',
    name: 'Rajesh Kumar',
    role: 'facility_operator',
    organization: 'Tamil Nadu Rice Mills',
    district: 'Thanjavur',
    phone: '9876543210',
    createdAt: '2024-01-15',
    isActive: true
  },
  {
    id: 'USR003',
    email: 'fpo@coconut.in',
    name: 'Priya Nair',
    role: 'fpo_coordinator',
    organization: 'Coconut Processors Cooperative',
    district: 'Tirunelveli',
    phone: '9876543211',
    createdAt: '2024-02-01',
    isActive: true
  },
  {
    id: 'USR004',
    email: 'researcher@iit.ac.in',
    name: 'Dr. Anand Singh',
    role: 'researcher',
    organization: 'IIT Madras Research Group',
    createdAt: '2024-02-10',
    isActive: true
  }
]

// Mock sessions
const mockSessions = new Map<string, { userId: string; expiresAt: number }>()

export class AuthService {
  private users: User[] = mockUsers
  private sessions = mockSessions

  /**
   * Login user with email and password
   */
  async login(credentials: LoginCredentials): Promise<{ user: User; token: AuthToken }> {
    // Mock authentication - in production would use bcrypt for password verification
    const user = this.users.find(u => u.email === credentials.email && u.isActive)

    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Mock password validation (in production, use bcrypt)
    if (credentials.password !== 'password123') {
      throw new Error('Invalid email or password')
    }

    // Generate tokens
    const token = this.generateToken(user.id)

    // Update last login
    user.lastLogin = new Date().toISOString()

    return {
      user,
      token
    }
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<User> {
    // Check if user already exists
    if (this.users.find(u => u.email === data.email)) {
      throw new Error('User with this email already exists')
    }

    // Create new user
    const newUser: User = {
      id: `USR${String(this.users.length + 1).padStart(3, '0')}`,
      email: data.email,
      name: data.name,
      role: data.role,
      organization: data.organization,
      district: data.district,
      phone: data.phone,
      createdAt: new Date().toISOString(),
      isActive: true
    }

    this.users.push(newUser)
    return newUser
  }

  /**
   * Verify token and get user
   */
  async verifyToken(token: string): Promise<User> {
    const session = this.sessions.get(token)

    if (!session) {
      throw new Error('Invalid or expired token')
    }

    if (session.expiresAt < Date.now()) {
      this.sessions.delete(token)
      throw new Error('Token expired')
    }

    const user = this.users.find(u => u.id === session.userId)

    if (!user || !user.isActive) {
      throw new Error('User not found or inactive')
    }

    return user
  }

  /**
   * Logout user
   */
  async logout(token: string): Promise<void> {
    this.sessions.delete(token)
  }

  /**
   * Check if user has permission
   */
  hasPermission(role: UserRole, permission: string): boolean {
    return RolePermissions[role].includes(permission)
  }

  /**
   * Check if user has any of the required permissions
   */
  hasAnyPermission(role: UserRole, permissions: string[]): boolean {
    const userPermissions = RolePermissions[role]
    return permissions.some(p => userPermissions.includes(p))
  }

  /**
   * Check if user has all required permissions
   */
  hasAllPermissions(role: UserRole, permissions: string[]): boolean {
    const userPermissions = RolePermissions[role]
    return permissions.every(p => userPermissions.includes(p))
  }

  /**
   * Get user role
   */
  async getUserRole(token: string): Promise<UserRole> {
    const user = await this.verifyToken(token)
    return user.role
  }

  /**
   * Get all users (admin only)
   */
  getUsers(requesterRole: UserRole): User[] {
    if (requesterRole !== 'admin') {
      throw new Error('Unauthorized')
    }
    return this.users.filter(u => u.isActive)
  }

  /**
   * Get user by ID (admin only)
   */
  getUserById(id: string, requesterRole: UserRole): User | undefined {
    if (requesterRole !== 'admin') {
      throw new Error('Unauthorized')
    }
    return this.users.find(u => u.id === id && u.isActive)
  }

  /**
   * Update user (admin only)
   */
  updateUser(id: string, updates: Partial<User>, requesterRole: UserRole): User | null {
    if (requesterRole !== 'admin') {
      throw new Error('Unauthorized')
    }

    const userIndex = this.users.findIndex(u => u.id === id)
    if (userIndex === -1) return null

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      id: this.users[userIndex].id,
      createdAt: this.users[userIndex].createdAt
    }

    return this.users[userIndex]
  }

  /**
   * Deactivate user (admin only)
   */
  deactivateUser(id: string, requesterRole: UserRole): boolean {
    if (requesterRole !== 'admin') {
      throw new Error('Unauthorized')
    }

    const user = this.users.find(u => u.id === id)
    if (!user) return false

    user.isActive = false
    return true
  }

  /**
   * Get user permissions
   */
  getUserPermissions(role: UserRole): string[] {
    return RolePermissions[role]
  }

  /**
   * Get role description
   */
  getRoleDescription(role: UserRole): string {
    const descriptions: { [key in UserRole]: string } = {
      admin: 'Full system access - manage platform, users, and data',
      facility_operator: 'Manage your facility assessments and receive recommendations',
      fpo_coordinator: 'Coordinate waste management for multiple member facilities',
      researcher: 'Access platform data and analytics for research purposes',
      guest: 'Limited access to view landing page and contact support'
    }
    return descriptions[role]
  }

  /**
   * Generate auth token
   */
  private generateToken(userId: string): AuthToken {
    const accessToken = `token_${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const expiresIn = 86400 // 24 hours in seconds

    // Store session
    this.sessions.set(accessToken, {
      userId,
      expiresAt: Date.now() + expiresIn * 1000
    })

    return {
      accessToken,
      refreshToken: `refresh_${userId}_${Math.random().toString(36).substr(2, 9)}`,
      expiresIn,
      tokenType: 'Bearer'
    }
  }
}

// Export singleton instance
export const authService = new AuthService()
