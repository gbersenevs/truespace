'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiGift, FiCheck } from 'react-icons/fi';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';

export default function PromoAccessPage() {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
          if (data.user.hasAccessToCourses) {
            router.push('/courses');
          }
        } else {
          router.push('/login');
        }
      })
      .catch(() => router.push('/login'));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/promo/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ code: promoCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/courses');
        }, 2000);
      } else {
        setError(data.error || 'Invalid promo code');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar user={user} />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-dark-card border border-dark-border"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FiGift className="w-12 h-12 text-white" />
            </motion.div>

            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Enter Your Promo Code
              </h1>
              <p className="text-accent-secondary text-lg">
                To access our premium courses, you need a valid promo code.
                Contact us to get your access code.
              </p>
            </div>

            {/* Form */}
            <motion.div
              className="bg-dark-card p-8 rounded-2xl border border-dark-border"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {success ? (
                <motion.div
                  className="text-center space-y-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20">
                    <FiCheck className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Access Granted!
                    </h3>
                    <p className="text-accent-secondary">
                      Redirecting you to courses...
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div
                      className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.div>
                  )}

                  <Input
                    type="text"
                    name="promoCode"
                    placeholder="Enter Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    required
                    icon={<FiGift />}
                    className="text-center text-lg tracking-wider"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    disabled={loading || !promoCode}
                  >
                    {loading ? 'Validating...' : 'Activate Promo Code'}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            {!success && (
              <motion.div
                className="text-sm text-accent-secondary space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p>Don't have a promo code?</p>
                <p>Contact us at <span className="text-white">support@truespace.com</span></p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

