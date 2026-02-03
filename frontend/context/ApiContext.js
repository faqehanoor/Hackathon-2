// frontend/context/ApiContext.js
import React, { createContext, useContext, useReducer } from 'react';
import apiService from '../services/api';

// Define initial state
const initialState = {
  authToken: typeof window !== 'undefined' ? localStorage.getItem('authToken') : null,
  user: null,
  isLoading: false,
  error: null,
};

// Define reducer actions
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
  SET_USER: 'SET_USER',
  CLEAR_AUTH: 'CLEAR_AUTH',
  SET_TASKS: 'SET_TASKS',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

// Reducer function
const apiReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case ACTIONS.SET_AUTH_TOKEN:
      return { ...state, authToken: action.payload };
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    case ACTIONS.CLEAR_AUTH:
      return { ...initialState };
    case ACTIONS.SET_TASKS:
      return { ...state, tasks: action.payload, isLoading: false };
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...(state.tasks || []), action.payload],
        isLoading: false,
      };
    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: (state.tasks || []).map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        isLoading: false,
      };
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: (state.tasks || []).filter((task) => task.id !== action.payload),
        isLoading: false,
      };
    default:
      return state;
  }
};

// Create context
const ApiContext = createContext();

// Provider component
export const ApiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  // Helper function to save token to localStorage
  const saveToken = (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
    dispatch({ type: ACTIONS.SET_AUTH_TOKEN, payload: token });
  };

  // Helper function to clear auth
  const clearAuth = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
    dispatch({ type: ACTIONS.CLEAR_AUTH });
  };

  // Authentication methods
  const login = async (credentials) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });

    try {
      const response = await apiService.login(credentials);
      saveToken(response.access_token);
      dispatch({ type: ACTIONS.SET_USER, payload: response.user });

      return { success: true, user: response.user };
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });

    try {
      const response = await apiService.signup(userData);
      saveToken(response.access_token);
      dispatch({ type: ACTIONS.SET_USER, payload: response.user });

      return { success: true, user: response.user };
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    clearAuth();
  };

  // Task methods
  const getUserTasks = async (userId, completed = null) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });

    try {
      const tasks = await apiService.getUserTasks(userId, completed);
      dispatch({ type: ACTIONS.SET_TASKS, payload: tasks });
      return tasks;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const createTask = async (userId, taskData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });

    try {
      const newTask = await apiService.createTask(userId, taskData);
      dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });
      return newTask;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const updateTask = async (userId, taskId, taskData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });

    try {
      const updatedTask = await apiService.updateTask(userId, taskId, taskData);
      dispatch({ type: ACTIONS.UPDATE_TASK, payload: updatedTask });
      return updatedTask;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const deleteTask = async (userId, taskId) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });

    try {
      await apiService.deleteTask(userId, taskId);
      dispatch({ type: ACTIONS.DELETE_TASK, payload: taskId });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const toggleTaskCompletion = async (userId, taskId) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });

    try {
      const updatedTask = await apiService.toggleTaskCompletion(userId, taskId);
      dispatch({ type: ACTIONS.UPDATE_TASK, payload: updatedTask });
      return updatedTask;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
    getUserTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

// Custom hook to use the API context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};