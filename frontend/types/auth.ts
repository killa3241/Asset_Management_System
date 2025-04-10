export interface LoginData {
    username: string
    password: string
  }
  
  export interface RegisterData {
    username: string
    password: string
    email?: string
  }
  
  export interface User {
    id: string
    username: string
    email: string
    roles?: string[]
  }
  
  export interface AuthResponse {
    success: boolean
    message?: string
    user?: User
    token?: string
  }
  