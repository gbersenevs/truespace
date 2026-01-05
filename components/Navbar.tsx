'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiUser, FiMenu, FiX, FiHome, FiBook, FiHeart, FiSettings } from 'react-icons/fi';

interface NavbarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: FiHome },
    { href: '/courses', label: 'Courses', icon: FiBook },
    ...(user ? [{ href: '/favorites', label: 'Favorites', icon: FiHeart }] : []),
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-xl' : 'bg-white/80 backdrop-blur-sm shadow-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              TrueSpace
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-accent-primary'
                    : 'text-gray-600 hover:text-accent-primary'
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              className="p-2 rounded-lg hover:bg-light-hover text-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/search')}
            >
              <FiSearch className="w-5 h-5" />
            </motion.button>

            {user ? (
              <Link href="/profile">
                <motion.div
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-light-card hover:bg-light-hover border border-light-border transition-colors text-gray-800"
                  whileHover={{ scale: 1.05 }}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-accent-primary text-white flex items-center justify-center font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium">{user.name}</span>
                </motion.div>
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <motion.button
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-accent-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link href="/register">
                  <motion.button
                    className="px-4 py-2 text-sm font-medium bg-accent-primary text-white rounded-lg hover:bg-accent-hover transition-colors shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-light-border shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    pathname === link.href
                      ? 'bg-accent-primary text-white'
                      : 'text-gray-700 hover:bg-light-hover'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {!user && (
                <>
                  <Link
                    href="/login"
                    className="block w-full px-4 py-3 text-center rounded-lg bg-light-hover text-gray-800 hover:bg-light-border transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full px-4 py-3 text-center rounded-lg bg-accent-primary text-white hover:bg-accent-hover transition-colors shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

