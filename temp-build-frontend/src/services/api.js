// frontend/services/api.js
import API_CONFIG from '../config/api';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.defaultOptions = API_CONFIG.DEFAULT_OPTIONS;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  // Helper method to get auth token from wherever it's stored
  getAuthToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      ...this.defaultOptions,
      ...options,
      headers: {
        ...this.defaultOptions.headers,
        ...options.headers,
        ...(this.getAuthToken() && {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }),
      },
    };

    try {
      // Implement timeout using AbortController
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // Authentication methods
  async login(credentials) {
    try {
      const response = await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Store the token in localStorage
      if (typeof window !== 'undefined' && data.access_token) {
        localStorage.setItem('authToken', data.access_token);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async signup(userData) {
    try {
      const response = await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.SIGNUP}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Store the token in localStorage
      if (typeof window !== 'undefined' && data.access_token) {
        localStorage.setItem('authToken', data.access_token);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Task methods
  async getUserTasks(userId, completed = null) {
    let endpoint = API_CONFIG.ENDPOINTS.TASKS.GET_USER_TASKS(userId);
    if (completed !== null) {
      endpoint += `?completed=${completed}`;
    }
    return this.request(endpoint);
  }

  async getTaskById(userId, taskId) {
    const endpoint = API_CONFIG.ENDPOINTS.TASKS.GET_TASK_BY_ID(userId, taskId);
    return this.request(endpoint);
  }

  async createTask(userId, taskData) {
    const endpoint = API_CONFIG.ENDPOINTS.TASKS.CREATE_TASK(userId);
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(userId, taskId, taskData) {
    const endpoint = API_CONFIG.ENDPOINTS.TASKS.UPDATE_TASK(userId, taskId);
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(userId, taskId) {
    const endpoint = API_CONFIG.ENDPOINTS.TASKS.DELETE_TASK(userId, taskId);
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  async toggleTaskCompletion(userId, taskId) {
    const endpoint = API_CONFIG.ENDPOINTS.TASKS.TOGGLE_COMPLETION(userId, taskId);
    return this.request(endpoint, {
      method: 'PATCH',
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;