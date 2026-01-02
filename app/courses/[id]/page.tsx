'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiClock, FiBook, FiStar, FiUser, FiHeart, FiPlay } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Loading from '@/components/Loading';

export default function CoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;

  const [user, setUser] = useState(null);
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Get user data
    fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
          setIsFavorite(data.user.favorites.some((f: any) => (f._id || f) === courseId));
          
          if (!data.user.hasAccessToCourses) {
            router.push('/promo-access');
          }
        } else {
          router.push('/login');
        }
      })
      .catch(() => router.push('/login'));

    // Fetch course
    fetch(`/api/courses/${courseId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCourse(data.course);
          setLessons(data.course.lessons || []);
          if (data.course.lessons && data.course.lessons.length > 0) {
            setSelectedLesson(data.course.lessons[0]);
          }
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [courseId, router]);

  const toggleFavorite = async () => {
    const token = localStorage.getItem('token');
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
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error('Toggle favorite error:', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <p className="text-accent-secondary">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar user={user} />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Video Player */}
              {selectedLesson && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <VideoPlayer
                    url={selectedLesson.videoUrl}
                    thumbnail={course.thumbnail}
                  />
                  <div className="mt-4">
                    <h2 className="text-2xl font-bold text-white">
                      {selectedLesson.title}
                    </h2>
                    <p className="text-accent-secondary mt-2">
                      {selectedLesson.description}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Course Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <div className="p-6 space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                          {course.title}
                        </h1>
                        <p className="text-accent-secondary">
                          by <span className="text-white font-medium">{course.instructor}</span>
                        </p>
                      </div>
                      <motion.button
                        onClick={toggleFavorite}
                        className="p-3 rounded-full bg-dark-hover hover:bg-dark-border transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiHeart
                          className={`w-6 h-6 ${
                            isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
                          }`}
                        />
                      </motion.button>
                    </div>

                    <p className="text-accent-secondary leading-relaxed">
                      {course.description}
                    </p>

                    {/* Meta */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-dark-border">
                      <div className="flex items-center space-x-2 text-accent-secondary">
                        <FiClock className="w-5 h-5" />
                        <span>{course.duration}m</span>
                      </div>
                      <div className="flex items-center space-x-2 text-accent-secondary">
                        <FiBook className="w-5 h-5" />
                        <span>{lessons.length} lessons</span>
                      </div>
                      <div className="flex items-center space-x-2 text-accent-secondary">
                        <FiUser className="w-5 h-5" />
                        <span className="capitalize">{course.level}</span>
                      </div>
                      {course.rating > 0 && (
                        <div className="flex items-center space-x-2 text-yellow-400">
                          <FiStar className="w-5 h-5 fill-yellow-400" />
                          <span>{course.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Lessons Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Course Content
                    </h3>
                    <div className="space-y-2">
                      {lessons.map((lesson, index) => (
                        <motion.button
                          key={lesson._id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`w-full text-left p-4 rounded-lg transition-all ${
                            selectedLesson?._id === lesson._id
                              ? 'bg-white text-black'
                              : 'bg-dark-hover text-accent-secondary hover:bg-dark-border hover:text-white'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              selectedLesson?._id === lesson._id
                                ? 'bg-black text-white'
                                : 'bg-dark-card text-white'
                            }`}>
                              {selectedLesson?._id === lesson._id ? (
                                <FiPlay className="w-4 h-4" />
                              ) : (
                                <span className="text-sm">{index + 1}</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium line-clamp-2">
                                {lesson.title}
                              </p>
                              <p className="text-sm mt-1 opacity-70">
                                {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

