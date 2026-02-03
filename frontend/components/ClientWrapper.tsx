'use client';

import { Navbar } from '@/components/Navbar';
import { ChatBotProvider } from '@/context/ChatBotContext';
import ChatBot from '@/components/ChatBot';
import { useChatBot } from '@/context/ChatBotContext';
import { ReactNode, useState } from 'react';

function ChatBotContainer() {
  const { isChatBotOpen, closeChatBot } = useChatBot();

  return <ChatBot isOpen={isChatBotOpen} onClose={closeChatBot} />;
}

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <ChatBotProvider>
      <div className="relative z-0 min-h-screen">
        {/* Premium Background Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-[20%] right-[10%] w-[15%] h-[15%] bg-primary/10 blur-[80px] rounded-full animate-float" />
        </div>

        <Navbar />
        <main className="pt-16 min-h-screen">{children}</main>
        <ChatBotContainer />
      </div>
    </ChatBotProvider>
  );
}