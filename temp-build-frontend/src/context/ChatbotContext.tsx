'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ChatBotContextType {
  isChatBotOpen: boolean;
  openChatBot: () => void;
  closeChatBot: () => void;
  toggleChatBot: () => void;
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

export function ChatBotProvider({ children }: { children: ReactNode }) {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const openChatBot = () => setIsChatBotOpen(true);
  const closeChatBot = () => setIsChatBotOpen(false);
  const toggleChatBot = () => setIsChatBotOpen(!isChatBotOpen);

  const value = {
    isChatBotOpen,
    openChatBot,
    closeChatBot,
    toggleChatBot,
  };

  return (
    <ChatBotContext.Provider value={value}>
      {children}
    </ChatBotContext.Provider>
  );
}

export function useChatBot() {
  const context = useContext(ChatBotContext);
  if (context === undefined) {
    throw new Error('useChatBot must be used within a ChatBotProvider');
  }
  return context;
}