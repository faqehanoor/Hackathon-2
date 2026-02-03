'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <SignIn
        appearance={{
          elements: {
            card: 'shadow-glow-amber gradient-border w-full max-w-md',
            headerTitle: 'typo-h2 typo-gradient text-center',
            headerSubtitle: 'text-text-secondary typo-tech text-xs mt-1 text-center',
            socialButtons: 'gap-2',
            socialButtonsIconButton: 'border border-border hover:bg-accent',
            dividerRow: 'my-6',
            dividerText: 'bg-background text-text-secondary',
            formButtonPrimary: 'w-full h-12 text-base',
            footerActionText: 'text-text-secondary',
            footerActionLink: 'text-primary hover:text-primary-light font-medium typo-glow transition-all'
          }
        }}
      />
    </div>
  );
}