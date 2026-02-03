'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUser, useAuth } from '@clerk/nextjs';
import { useChatBot } from '@/context/ChatBotContext';
import { MessageCircle } from 'lucide-react';

export function Navbar() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const { toggleChatBot } = useChatBot();
  const pathname = usePathname();

  const publicLinks = [
    { href: '/', label: 'Home' },
    { href: '/signin', label: 'Sign In' },
    { href: '/signup', label: 'Sign Up' },
  ];

  const authLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/todos', label: 'Todos' },
  ];

  const links = isSignedIn ? authLinks : publicLinks;
  const isLoggedIn = isSignedIn;

  const handleSignOut = async () => {
    await signOut({ redirectUrl: '/' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 premium-blur bg-background/60 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-black font-bold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span className="text-xl font-bold typo-gradient">TodoFlow</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
              />
            ))}

            {isLoggedIn && user && (
              <>
                <motion.button
                  onClick={toggleChatBot}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Open AI Assistant"
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
                <span className="px-3 py-1 text-sm text-text-secondary hidden sm:block">
                  {user.firstName || user.fullName || user.emailAddresses[0]?.emailAddress}
                </span>
                <motion.button
                  onClick={handleSignOut}
                  className="ml-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Logout
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <Link href={href}>
      <motion.span
        className={cn(
          'px-4 py-2 text-sm typo-tech font-medium rounded-lg transition-colors',
          isActive
            ? 'text-primary bg-primary/10'
            : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {label}
      </motion.span>
    </Link>
  );
}
