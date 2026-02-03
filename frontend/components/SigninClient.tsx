'use client';

import { useSignIn } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { isValidEmail } from '@/lib/utils';

import { Mail, Lock, Sparkles } from 'lucide-react';

export default function SigninClient() {
  const { signIn, isLoaded } = useSignIn();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !validateForm()) return;

    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      if (result.status === 'complete') {
        router.push('/dashboard');
      } else {
        setErrors({ form: `Login failed: ${result.status}` });
      }
    } catch (err: any) {
      setErrors({ form: err.errors?.[0]?.message || 'Login failed. Please try again.' });
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
    if (errors.form) {
      setErrors((prev) => ({ ...prev, form: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="gradient-border shadow-glow-amber">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="typo-h2 typo-gradient">Welcome back</CardTitle>
            <CardDescription className='text-text-secondary typo-tech text-xs mt-1'>
              SECURE ACCESS PROTOCOL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.form && (
                <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
                  {errors.form}
                </div>
              )}

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
                icon={<Mail className="w-4 h-4" />}
                className="bg-white/[0.02]"
              />

              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="current-password"
                icon={<Lock className="w-4 h-4" />}
                className="bg-white/[0.02]"
              />

              <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-text-secondary">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary hover:text-primary-light font-medium typo-glow transition-all">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}