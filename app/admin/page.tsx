'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiBook, FiGift, FiUsers, FiBarChart2 } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Loading from '@/components/Loading';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalUsers: 0,
    activeCodes: 0,
    totalLessons: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Check if user is admin
    fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
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

  if (loading) {
    return <Loading />;
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const adminSections = [
    {
      title: 'Courses',
      icon: FiBook,
      description: 'Manage all courses and lessons',
      href: '/admin/courses',
      color: 'bg-blue-500/20 text-blue-400',
      count: stats.totalCourses,
    },
    {
      title: 'Promo Codes',
      icon: FiGift,
      description: 'Create and manage promo codes',
      href: '/admin/promo-codes',
      color: 'bg-green-500/20 text-green-400',
      count: stats.activeCodes,
    },
    {
      title: 'Users',
      icon: FiUsers,
      description: 'View and manage users',
      href: '/admin/users',
      color: 'bg-purple-500/20 text-purple-400',
      count: stats.totalUsers,
    },
    {
      title: 'Analytics',
      icon: FiBarChart2,
      description: 'View platform statistics',
      href: '/admin/analytics',
      color: 'bg-orange-500/20 text-orange-400',
      count: '—',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar user={user} />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-accent-secondary text-lg">
              Manage your educational platform
            </p>
          </motion.div>

          {/* Admin Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => router.push(section.href)}
              >
                <Card hover className="cursor-pointer h-full">
                  <div className="p-6 space-y-4">
                    <div className={`inline-flex p-4 rounded-xl ${section.color}`}>
                      <section.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {section.title}
                      </h3>
                      <p className="text-accent-secondary text-sm">
                        {section.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-dark-border">
                      <p className="text-2xl font-bold text-white">
                        {section.count}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    fullWidth
                    onClick={() => router.push('/admin/courses/new')}
                  >
                    Create New Course
                  </Button>
                  <Button
                    fullWidth
                    variant="outline"
                    onClick={() => router.push('/admin/promo-codes/new')}
                  >
                    Generate Promo Code
                  </Button>
                  <Button
                    fullWidth
                    variant="secondary"
                    onClick={() => router.push('/admin/analytics')}
                  >
                    View Reports
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

