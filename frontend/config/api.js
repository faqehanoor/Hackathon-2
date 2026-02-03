// frontend/config/api.js
const API_CONFIG = {
  // Backend API base URL
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000',

  // API endpoints
  ENDPOINTS: {
    // Authentication endpoints
    AUTH: {
      LOGIN: '/api/auth/login',
      SIGNUP: '/api/auth/signup',
      REFRESH: '/api/auth/refresh',
    },

    // Task endpoints
    TASKS: {
      GET_USER_TASKS: (userId) => `/api/${userId}/tasks`,
      GET_TASK_BY_ID: (userId, taskId) => `/api/${userId}/tasks/${taskId}`,
      CREATE_TASK: (userId) => `/api/${userId}/tasks`,
      UPDATE_TASK: (userId, taskId) => `/api/${userId}/tasks/${taskId}`,
      DELETE_TASK: (userId, taskId) => `/api/${userId}/tasks/${taskId}`,
      TOGGLE_COMPLETION: (userId, taskId) => `/api/${userId}/tasks/${taskId}/complete`,
    }
  },

  // Default request options
  DEFAULT_OPTIONS: {
    headers: {
      'Content-Type': 'application/json',
    },
  },

  // Timeout settings (in milliseconds)
  TIMEOUT: 10000, // 10 seconds
};

export default API_CONFIG;