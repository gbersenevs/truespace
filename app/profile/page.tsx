'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiBook, FiHeart, FiLogOut, FiEdit } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Loading from '@/components/Loading';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [favoriteCourses, setFavoriteCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'favorites' | 'saved'>('favorites');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Fetch user data
    fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
        } else {
          router.push('/login');
        }
      })
      .catch(() => router.push('/login'));

    // Fetch favorite courses
    fetch('/api/favorites', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFavoriteCourses(data.favorites);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar user={user} />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-32 h-32 rounded-full"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-white text-black flex items-center justify-center text-4xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {user.name}
                    </h1>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-accent-secondary">
                      <div className="flex items-center space-x-2">
                        <FiMail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                      {user.role === 'admin' && (
                        <span className="px-3 py-1 rounded-full bg-white text-black text-sm font-medium">
                          Admin
                        </span>
                      )}
                      {user.hasAccessToCourses && (
                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                          Premium Access
                        </span>
                      )}
                    </div>
                    {user.usedPromoCode && (
                      <p className="mt-2 text-sm text-accent-secondary">
                        Promo Code: <span className="text-white font-mono">{user.usedPromoCode}</span>
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => router.push('/profile/edit')}
                    >
                      <FiEdit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {[
              { icon: FiHeart, label: 'Favorites', value: favoriteCourses.length },
              { icon: FiBook, label: 'Courses', value: 0 },
              { icon: FiUser, label: 'Completed', value: 0 },
              { icon: FiBook, label: 'In Progress', value: 0 },
            ].map((stat) => (
              <Card key={stat.label}>
                <div className="p-6 text-center">
                  <stat.icon className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-accent-secondary text-sm mt-1">{stat.label}</p>
                </div>
              </Card>
            ))}
          </motion.div>

          {/* Tabs */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'favorites'
                    ? 'bg-white text-black'
                    : 'bg-dark-card text-accent-secondary hover:bg-dark-hover hover:text-white'
                }`}
              >
                <FiHeart className="inline-block w-4 h-4 mr-2" />
                Favorite Courses
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'saved'
                    ? 'bg-white text-black'
                    : 'bg-dark-card text-accent-secondary hover:bg-dark-hover hover:text-white'
                }`}
              >
                <FiBook className="inline-block w-4 h-4 mr-2" />
                Saved Lessons
              </button>
            </div>
          </motion.div>

          {/* Content */}
          {activeTab === 'favorites' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {favoriteCourses.length === 0 ? (
                <Card>
                  <div className="p-12 text-center">
                    <FiHeart className="w-16 h-16 text-accent-secondary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      No favorite courses yet
                    </h3>
                    <p className="text-accent-secondary mb-6">
                      Start exploring and add courses to your favorites
                    </p>
                    <Button onClick={() => router.push('/courses')}>
                      Browse Courses
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {favoriteCourses.map((course: any) => (
                    <CourseCard
                      key={course._id}
                      id={course._id}
                      title={course.title}
                      description={course.description}
                      thumbnail={course.thumbnail}
                      instructor={course.instructor}
                      duration={course.duration}
                      level={course.level}
                      rating={course.rating}
                      lessonsCount={course.lessons?.length || 0}
                      isFavorite={true}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'saved' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <div className="p-12 text-center">
                  <FiBook className="w-16 h-16 text-accent-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    No saved lessons yet
                  </h3>
                  <p className="text-accent-secondary">
                    Lessons you save will appear here
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

