// lib/auth.ts
import type { AuthResponse, LoginData, RegisterData, User } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// LOGIN
export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    console.log("Attempting login with:", { username: data.username });

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
      mode: "cors",
    });

    console.log("Login response status:", response.status);
    
    let result: any = {};
    try {
      const responseText = await response.text();
      console.log("Login response text:", responseText);
      
      if (responseText) {
        result = JSON.parse(responseText);
      }
    } catch (parseError) {
      console.error("Error parsing login response:", parseError);
      return {
        success: false,
        message: "Invalid response from server",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Login failed",
      };
    }

    return {
      success: true,
      message: result.message,
      user: result.user,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Network error during login",
    };
  }
}

// REGISTER
export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    console.log("Attempting registration with:", { username: data.username });

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
      mode: "cors",
    });

    console.log("Registration response status:", response.status);
    const result = await response.json();
    console.log("Registration response data:", result);

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Registration failed",
      };
    }

    return {
      success: true,
      message: result.message,
      user: result.user,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Network error during registration",
    };
  }
}

// LOGOUT
export async function logout(): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
    });

    let result: { success?: boolean; message?: string } = {};
    try {
      result = await response.json();
    } catch (jsonError) {
      console.error("Failed to parse logout JSON:", jsonError);
      result.message = "Invalid response from server";
    }

    console.log("Logout response data:", result);

    if (response.ok && result.success) {
      return {
        success: true,
        message: result.message || "Logged out successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Logout failed",
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      message: "Network error during logout",
    };
  }
}

// GET CURRENT USER
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    console.log("Attempting to get current user");

    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const Data = await response.json();
    console.log("getCurrentUser response:", Data);
    console.log("Current user response status:", response.status);

    if (!response.ok) {
      console.log("Error fetching current user:", response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    console.log("Current user response data:", data);

    if (!data.success || !data.user) {
      console.log("Invalid user data:", data);
      return null;
    }

    return data.user;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
};
