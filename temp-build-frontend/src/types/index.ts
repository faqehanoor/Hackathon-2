// Core Types for Todo Application

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

// Lightweight user info for auth state (excludes sensitive data)
export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

export type TodoColumnId = 'backlog' | 'todo' | 'in_progress' | 'completed';
export type TodoPriority = 0 | 1 | 2; // 0: Low, 1: Medium, 2: High

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  columnId: TodoColumnId;
  priority: TodoPriority;
  order: number;
  isFocused?: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export type FilterOption = 'all' | 'active' | 'completed';

export interface SettingsState {
  theme: 'dark' | 'light';
  filter: FilterOption;
}

// Chatbot Types for Todo Assistant

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: number;
}

export interface ChatbotState {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
}

export interface QuickTopic {
  id: string;
  label: string;
  keywords: string[];
  response: string;
}

export interface KnowledgeEntry {
  id: string;
  category: 'create' | 'edit' | 'delete' | 'filter' | 'dashboard' | 'auth' | 'general';
  keywords: string[];
  response: string;
}

export interface ChatbotContextType {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
  sendMessage: (text: string) => void;
  selectTopic: (topic: QuickTopic) => void;
}
