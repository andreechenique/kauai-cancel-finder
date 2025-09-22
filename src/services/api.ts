import { 
  User, 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  Property, 
  Monitor, 
  Stats 
} from '@/types/api';

const API_BASE_URL = 'https://zmhqivc51edl.manus.space/api/v1';

class ApiService {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Authentication methods
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  }

  async logout(): Promise<void> {
    await this.request('/auth/logout', {
      method: 'POST',
    });
    
    localStorage.removeItem('auth_token');
  }

  async getCurrentUser(): Promise<User> {
    return this.request('/auth/me');
  }

  async getStats(): Promise<Stats> {
    return this.request('/stats');
  }

  async getRecentProperties(): Promise<Property[]> {
    return this.request('/properties/recent');
  }

  async getMonitors(): Promise<Monitor[]> {
    return this.request('/monitors');
  }

  async createMonitor(data: any): Promise<Monitor> {
    return this.request('/monitors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteMonitor(id: number): Promise<void> {
    return this.request(`/monitors/${id}`, {
      method: 'DELETE',
    });
  }

  async forgotPassword(email: string): Promise<void> {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password: newPassword }),
    });
  }
}

export const apiClient = new ApiService();
export const apiService = apiClient; // Keep backward compatibility

// Re-export types for convenience
export type { User, AuthResponse, LoginRequest, RegisterRequest, Property, Monitor, Stats } from '@/types/api';