'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiClock, FiBook, FiStar, FiHeart } from 'react-icons/fi';
import Card from './Card';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: number;
  level: string;
  rating: number;
  lessonsCount: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export default function CourseCard({
  id,
  title,
  description,
  thumbnail,
  instructor,
  duration,
  level,
  rating,
  lessonsCount,
  isFavorite = false,
  onToggleFavorite,
}: CourseCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggleFavorite?.();
  };

  const levelColors = {
    beginner: 'bg-green-500/20 text-green-400',
    intermediate: 'bg-yellow-500/20 text-yellow-400',
    advanced: 'bg-red-500/20 text-red-400',
  };

  return (
    <Link href={`/courses/${id}`}>
      <Card className="group relative h-full">
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Favorite Button */}
          {onToggleFavorite && (
            <motion.button
              className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
              onClick={handleFavoriteClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiHeart
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
                }`}
              />
            </motion.button>
          )}

          {/* Level Badge */}
          <div className="absolute bottom-3 left-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                levelColors[level as keyof typeof levelColors]
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-accent-hover transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-accent-secondary line-clamp-2">
            {description}
          </p>

          {/* Instructor */}
          <p className="text-sm text-accent-secondary">
            by <span className="text-white font-medium">{instructor}</span>
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between pt-3 border-t border-dark-border">
            <div className="flex items-center space-x-4 text-sm text-accent-secondary">
              <div className="flex items-center space-x-1">
                <FiClock className="w-4 h-4" />
                <span>{duration}m</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiBook className="w-4 h-4" />
                <span>{lessonsCount} lessons</span>
              </div>
            </div>

            {rating > 0 && (
              <div className="flex items-center space-x-1 text-sm text-yellow-400">
                <FiStar className="w-4 h-4 fill-yellow-400" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

