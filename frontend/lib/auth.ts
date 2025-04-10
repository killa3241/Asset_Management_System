import type { AuthResponse, LoginData, RegisterData, User } from "@/types/auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    console.log("Attempting login with:", { username: data.username });
    
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include", // Important for cookies
      mode: "cors" // Ensure CORS mode
    })

    console.log("Login response status:", response.status);
    
    const result = await response.json();
    console.log("Login response data:", result);

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Login failed",
      }
    }

    return {
      success: true,
      message: result.message,
      user: result.user, // { id, username }
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "Network error during login",
    }
  }
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    console.log("Attempting registration with:", { username: data.username });
    
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
      mode: "cors"
    })

    console.log("Registration response status:", response.status);
    
    const result = await response.json();
    console.log("Registration response data:", result);

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Registration failed",
      }
    }

    return {
      success: true,
      message: result.message,
      user: result.user,
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: "Network error during registration",
    }
  }
}

export async function logout(): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      mode: "cors"
    })
    
    const result = await response.json();
    
    return { 
      success: response.ok,
      message: result.message || "Logout successful" 
    }
  } catch (error) {
    console.error("Logout error:", error)
    return { 
      success: false,
      message: "Error during logout"
    }
  }
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    console.log("Attempting to get current user");
    
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include", // Critical for sending session cookie
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors"
    })

    console.log("Current user response status:", response.status);
    
    // If not OK, return null immediately
    if (!response.ok) {
      console.log("Error fetching current user:", response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    console.log("Current user response data:", data);
    
    // Handle success/failure from backend
    if (!data.success || !data.user) {
      console.log("Invalid user data:", data);
      return null;
    }
    
    return data.user;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}