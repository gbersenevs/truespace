'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import Input from '@/components/Input';
import Loading from '@/components/Loading';

export default function CoursesPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = ['all', 'AI & Automation', 'No-Code Tools', 'Data Science', 'Business Automation'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Get user data
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUser(data.user);
            setFavorites(data.user.favorites.map((f: any) => f._id || f));
            if (!data.user.hasAccessToCourses) {
              router.push('/promo-access');
            }
          }
        })
        .catch(console.error);
    }

    // Fetch courses
    fetchCourses();
  }, []);

  const fetchCourses = (category = 'all', level = 'all', search = '') => {
    setLoading(true);
    let url = '/api/courses?limit=50';
    
    if (category !== 'all') url += `&category=${category}`;
    if (level !== 'all') url += `&level=${level}`;
    if (search) url += `&search=${search}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCourses(data.courses);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCourses(selectedCategory, selectedLevel, searchQuery);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    fetchCourses(category, selectedLevel, searchQuery);
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    fetchCourses(selectedCategory, level, searchQuery);
  };

  const toggleFavorite = async (courseId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();
      if (data.success) {
        setFavorites(data.favorites.map((f: any) => f._id || f));
      }
    } catch (error) {
      console.error('Toggle favorite error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar user={user} />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center space-y-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text">
              Explore AI & Automation Courses
            </h1>
            <p className="text-gray-600 text-lg">
              Master no-code tools and AI automation from industry experts
            </p>
          </motion.div>

          {/* Search */}
          <motion.form
            onSubmit={handleSearch}
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<FiSearch />}
              />
            </div>
          </motion.form>

          {/* Filters */}
          <motion.div
            className="mb-8 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-accent-secondary mb-3 flex items-center">
                <FiFilter className="w-4 h-4 mr-2" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-white text-black'
                        : 'bg-dark-card text-accent-secondary hover:bg-dark-hover hover:text-white'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Levels */}
            <div>
              <h3 className="text-sm font-medium text-accent-secondary mb-3">Level</h3>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleLevelChange(level)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedLevel === level
                        ? 'bg-white text-black'
                        : 'bg-dark-card text-accent-secondary hover:bg-dark-hover hover:text-white'
                    }`}
                  >
                    {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Courses Grid */}
          {loading ? (
            <Loading />
          ) : courses.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-12 border border-light-border">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiSearch className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Coming Soon!
                </h3>
                <p className="text-gray-600 mb-6">
                  We're preparing amazing courses on <strong>N8n, Make, Zapier, AI Automation</strong>, and more no-code tools. 
                  Stay tuned for updates!
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>📚 N8n Automation Mastery</p>
                  <p>🤖 Make.com Workflows</p>
                  <p>⚡ Zapier Pro Tips</p>
                  <p>🧠 AI Tools Integration</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course: any, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
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
                    isFavorite={favorites.includes(course._id)}
                    onToggleFavorite={() => toggleFavorite(course._id)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

