'use client';

import { useSignUp } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { isValidEmail } from '@/lib/utils';

import { Mail, Lock, User, Sparkles } from 'lucide-react';

export default function SignupClient() {
  const { signUp, isLoaded } = useSignUp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !validateForm()) return;

    setIsLoading(true);

    try {
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' ') || undefined,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Redirect to verification page
      router.push('/verify-email');
    } catch (error: any) {
      setErrors({ form: error.errors?.[0]?.message || 'Signup failed. Please try again.' });
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
            <CardTitle className="typo-h2 typo-gradient">Create account</CardTitle>
            <CardDescription className='text-text-secondary typo-tech text-xs mt-1'>
              NEW CITIZEN REGISTRATION
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
                label="Name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                autoComplete="name"
                icon={<User className="w-4 h-4" />}
                className="bg-white/[0.02]"
              />

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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="new-password"
                icon={<Lock className="w-4 h-4" />}
                className="bg-white/[0.02]"
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                autoComplete="new-password"
                icon={<Lock className="w-4 h-4" />}
                className="bg-white/[0.02]"
              />

              <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-text-secondary">
              Already have an account?{' '}
              <Link href="/signin" className="text-primary hover:text-primary-light font-medium typo-glow transition-all">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}