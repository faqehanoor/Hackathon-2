'use client';

import { useUser } from '@clerk/nextjs';
import { useState, useRef, useEffect } from 'react';
import { useTodos } from '@/hooks/useTodos';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const { user } = useUser();
  const { addTodo, updateTodo, deleteTodo, allTodos } = useTodos();
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you with your tasks today?',
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Process the user's request and generate a response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: await processUserRequest(inputValue),
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const processUserRequest = async (input: string): Promise<string> => {
    const lowerInput = input.toLowerCase();

    // Create a new todo
    if (lowerInput.includes('create') && (lowerInput.includes('todo') || lowerInput.includes('task'))) {
      const titleMatch = input.match(/(?:create|add|make)\s+(?:a\s+)?(?:new\s+)?(.+?)(?:\s+todo|\s+task|$)/i);
      if (titleMatch && titleMatch[1]) {
        const title = titleMatch[1].trim();
        try {
          await addTodo(title);
          return `I've created the task "${title}" for you. It's now on your todo list!`;
        } catch (error) {
          return "Sorry, I couldn't create that task. Please try again.";
        }
      } else {
        return "What would you like to name your new task?";
      }
    }

    // Update a todo
    else if ((lowerInput.includes('update') || lowerInput.includes('change') || lowerInput.includes('modify')) &&
             (lowerInput.includes('todo') || lowerInput.includes('task'))) {
      const updateMatch = input.match(/(?:update|change|modify)\s+(?:the\s+)?(.+?)\s+(?:to|as)\s+(.+)/i);
      if (updateMatch && updateMatch[1] && updateMatch[2]) {
        const oldTitle = updateMatch[1].trim();
        const newTitle = updateMatch[2].trim();

        // Find the todo with the old title
        const todoToUpdate = allTodos.find(todo =>
          todo.title.toLowerCase().includes(oldTitle.toLowerCase()) ||
          oldTitle.toLowerCase().includes(todo.title.toLowerCase())
        );

        if (todoToUpdate) {
          try {
            await updateTodo(todoToUpdate.id, { title: newTitle });
            return `I've updated the task "${oldTitle}" to "${newTitle}".`;
          } catch (error) {
            return "Sorry, I couldn't update that task. Please try again.";
          }
        } else {
          return `I couldn't find a task with "${oldTitle}". Here are your current tasks: ${allTodos.map(t => t.title).join(', ')}`;
        }
      } else {
        return "Please specify which task you'd like to update and what you'd like to change it to. For example: 'Update grocery shopping to buy groceries'";
      }
    }

    // Delete a todo
    else if ((lowerInput.includes('delete') || lowerInput.includes('remove') || lowerInput.includes('complete')) &&
             (lowerInput.includes('todo') || lowerInput.includes('task'))) {
      const titleMatch = input.match(/(?:delete|remove|complete|finish)\s+(?:the\s+)?(.+?)(?:\s+todo|\s+task|$)/i);
      if (titleMatch && titleMatch[1]) {
        const title = titleMatch[1].trim();

        // Find the todo with the title
        const todoToDelete = allTodos.find(todo =>
          todo.title.toLowerCase().includes(title.toLowerCase()) ||
          title.toLowerCase().includes(todo.title.toLowerCase())
        );

        if (todoToDelete) {
          try {
            if (lowerInput.includes('complete') || lowerInput.includes('finish')) {
              await updateTodo(todoToDelete.id, { completed: true });
              return `I've marked the task "${todoToDelete.title}" as completed.`;
            } else {
              await deleteTodo(todoToDelete.id);
              return `I've removed the task "${todoToDelete.title}" from your list.`;
            }
          } catch (error) {
            return "Sorry, I couldn't modify that task. Please try again.";
          }
        } else {
          return `I couldn't find a task with "${title}". Here are your current tasks: ${allTodos.map(t => t.title).join(', ')}`;
        }
      } else {
        return "Which task would you like to delete? Please specify the task name.";
      }
    }

    // Show current todos
    else if (lowerInput.includes('show') && lowerInput.includes('todo')) {
      if (allTodos.length > 0) {
        const activeTodos = allTodos.filter(todo => !todo.completed);
        const completedTodos = allTodos.filter(todo => todo.completed);

        let response = "Here are your current tasks:\n";

        if (activeTodos.length > 0) {
          response += "\nActive:\n";
          activeTodos.forEach(todo => response += `- ${todo.title}\n`);
        }

        if (completedTodos.length > 0) {
          response += "\nCompleted:\n";
          completedTodos.forEach(todo => response += `- ${todo.title}\n`);
        }

        return response;
      } else {
        return "You don't have any tasks on your list. Would you like to create one?";
      }
    }

    // Default response
    else {
      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        return "Hello there! How can I assist you with your tasks today? You can ask me to create, update, or delete tasks.";
      } else if (lowerInput.includes('todo') || lowerInput.includes('task')) {
        return "I can help you manage your tasks! You can ask me to create, update, or delete your todos. What would you like to do?";
      } else if (lowerInput.includes('help')) {
        return "I'm here to help! You can ask me to:\n- Create a new task (e.g., 'Create a task to buy milk')\n- Update an existing task (e.g., 'Update buy milk to buy whole milk')\n- Delete a task (e.g., 'Delete buy milk')\n- Show your tasks (e.g., 'Show my todos')";
      } else if (lowerInput.includes('productivity')) {
        return "Great question! Based on your activity, I suggest focusing on your most important task first thing in the morning when your energy levels are highest.";
      } else {
        return "That's interesting! I'm here to help with your tasks and productivity. You can ask me to create, update, or delete tasks. Type 'help' to see what I can do!";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-80' : 'w-96 h-[500px]'}`}>
      <div className="bg-surface border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">AI Assistant</h3>
              <p className="text-xs text-text-secondary">Always here to help</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMinimized ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 14 10 14 10 20" />
                  <polyline points="20 10 14 10 14 4" />
                  <line x1="14" x2="21" y1="10" y2="3" />
                  <line x1="3" x2="10" y1="21" y2="14" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 11L19 11" />
                  <path d="M5 15L19 15" />
                  <path d="M5 19L19 19" />
                </svg>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Container */}
        {!isMinimized && (
          <div className="flex-1 flex flex-col p-4 bg-panel">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-surface border border-border text-text-primary rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-primary/70' : 'text-text-secondary'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface border border-border text-text-primary rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me to create, update, or delete tasks..."
                className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-text-primary resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={`self-end px-4 py-3 rounded-xl ${
                  inputValue.trim() && !isLoading
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-surface text-text-secondary border border-border cursor-not-allowed'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Minimized View */}
        {isMinimized && (
          <div className="p-4 text-center">
            <p className="text-text-secondary text-sm">Chat minimized. Click to expand.</p>
          </div>
        )}
      </div>
    </div>
  );
}