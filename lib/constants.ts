// Application Constants

export const APP_NAME = 'TrueSpace';
export const APP_DESCRIPTION = 'Modern educational platform with premium video courses';

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;

// Course Levels
export const COURSE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

export const LEVEL_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
} as const;

// Course Categories
export const CATEGORIES = [
  'Programming',
  'Design',
  'Business',
  'Marketing',
  'Data Science',
  'Photography',
  'Music',
  'Language',
] as const;

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

// File Upload Limits
export const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// JWT
export const JWT_EXPIRES_IN = '7d';

// Promo Codes
export const PROMO_CODE_LENGTH = 8;
export const UNLIMITED_USES = -1;

// API Rate Limiting
export const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 100;

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You must be logged in to access this resource',
  FORBIDDEN: 'You do not have permission to access this resource',
  NOT_FOUND: 'The requested resource was not found',
  INVALID_INPUT: 'Invalid input data',
  SERVER_ERROR: 'An unexpected error occurred',
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_EXISTS: 'A user with this email already exists',
  INVALID_PROMO: 'Invalid or expired promo code',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  REGISTRATION: 'Account created successfully',
  LOGIN: 'Logged in successfully',
  PROMO_ACTIVATED: 'Promo code activated successfully',
  COURSE_CREATED: 'Course created successfully',
  COURSE_UPDATED: 'Course updated successfully',
  COURSE_DELETED: 'Course deleted successfully',
} as const;

