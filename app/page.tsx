'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay, FiStar, FiUsers, FiBook } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import Button from '@/components/Button';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUser(data.user);
          }
        })
        .catch(console.error);
    }

    // Fetch featured courses
    fetch('/api/courses?limit=6')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFeaturedCourses(data.courses);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome to TrueSpace
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-accent-secondary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Master new skills with premium video courses. Learn at your own pace from industry experts.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/courses">
                <Button size="lg" className="group">
                  Explore Courses
                  <FiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              {!user && (
                <Link href="/register">
                  <Button size="lg" variant="outline">
                    Get Started Free
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: FiBook, label: 'Courses', value: '100+' },
              { icon: FiUsers, label: 'Students', value: '10K+' },
              { icon: FiPlay, label: 'Video Hours', value: '500+' },
              { icon: FiStar, label: 'Rating', value: '4.9' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center space-y-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-dark-card flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-accent-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center space-y-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white">Featured Courses</h2>
            <p className="text-accent-secondary text-lg">
              Discover our most popular courses
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-dark-card rounded-xl shimmer" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course: any, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <CourseCard
                    id={course._id}
                    title={course.title}
                    description={course.description}
                    thumbnail={course.thumbnail}
                    instructor={course.instructor}
                    duration={course.duration}
                    level={course.level}
                    rating={course.rating}
                    lessonsCount={course.lessons?.length || 0}
                  />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/courses">
              <Button variant="outline" size="lg">
                View All Courses
                <FiArrowRight className="inline-block ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-8 p-12 rounded-2xl glass"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-accent-secondary">
            Join thousands of students already learning on TrueSpace
          </p>
          {!user && (
            <Link href="/register">
              <Button size="lg">
                Create Free Account
                <FiArrowRight className="inline-block ml-2" />
              </Button>
            </Link>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-dark-border">
        <div className="max-w-7xl mx-auto text-center text-accent-secondary">
          <p>&copy; 2026 TrueSpace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

