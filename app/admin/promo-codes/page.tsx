'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiPlus, FiGift, FiCheck, FiX } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Loading from '@/components/Loading';

export default function PromoCodesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    maxUses: -1,
    expiresAt: '',
    description: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data.user.role !== 'admin') {
            router.push('/');
            return;
          }
          setUser(data.user);
        } else {
          router.push('/login');
        }
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/admin/promo-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowCreateForm(false);
        setFormData({
          code: '',
          maxUses: -1,
          expiresAt: '',
          description: '',
        });
        // Refresh list here
      }
    } catch (error) {
      console.error('Create promo code error:', error);
    }
  };

  if (loading) return <Loading />;
  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar user={user} />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Promo Codes
              </h1>
              <p className="text-accent-secondary">
                Manage access codes for your platform
              </p>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>
              <FiPlus className="w-5 h-5 mr-2" />
              Create Promo Code
            </Button>
          </motion.div>

          {/* Create Form Modal */}
          {showCreateForm && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setShowCreateForm(false)}
            >
              <motion.div
                className="w-full max-w-md"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Card>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Create New Promo Code
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        type="text"
                        placeholder="Promo Code (e.g., WELCOME2024)"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                        required
                        icon={<FiGift />}
                      />
                      <Input
                        type="number"
                        placeholder="Max Uses (-1 for unlimited)"
                        value={formData.maxUses}
                        onChange={(e) => setFormData({ ...formData, maxUses: parseInt(e.target.value) })}
                      />
                      <Input
                        type="date"
                        placeholder="Expiration Date (optional)"
                        value={formData.expiresAt}
                        onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                      />
                      <Input
                        type="text"
                        placeholder="Description (optional)"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <Button type="submit" fullWidth>
                          Create
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          fullWidth
                          onClick={() => setShowCreateForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {/* Promo Codes List */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <div className="p-6 text-center">
                <FiGift className="w-16 h-16 text-accent-secondary mx-auto mb-4" />
                <p className="text-accent-secondary">
                  Create your first promo code to get started
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

