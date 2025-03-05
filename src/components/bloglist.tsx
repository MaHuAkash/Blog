'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useColor } from '@/context/color-context';
import { colorConfig } from '@/config/colors';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category?: string;
  date?: string;
}

interface BlogListProps {
  posts: Post[];
}

const BlogList = ({ posts }: BlogListProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { colorScheme } = useColor();
  const colors = colorConfig[colorScheme];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: 'backOut' }
    })
  };

  const hoverVariants = {
    hover: { 
      y: -10,
      scale: 1.02,
      boxShadow: `0 25px 50px -12px ${colors.gradient}`,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div ref={ref} className="relative px-4 sm:px-6 lg:px-8">
      {/* Desktop Grid Layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={index}
            whileHover="hover"
            className="relative h-[400px] perspective-1000"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black via-${colors.primary} to-${colors.secondary} rounded-3xl shadow-2xl transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:rotate-x-6 hover:rotate-y-6">
              <Link 
                href={`/blog/${post.id}`}
                className="absolute inset-0 p-8 flex flex-col justify-between group"
              >
                <div>
                  <span className={`text-sm ${colors.accent} font-semibold`}>
                    {post.category || 'Article'}
                  </span>
                  <motion.h2 
                    className="text-2xl font-bold mt-4 text-white"
                    transition={{ duration: 0.3 }}
                  >
                    {post.title}
                  </motion.h2>
                </div>
                
                <motion.div
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  className="relative"
                >
                  <p className="text-gray-200 text-lg line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                <div className="flex justify-between items-center text-gray-300">
                  <time className="text-sm">
                    {post.date || 'Mar 15, 2024'}
                  </time>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Read</span>
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <svg 
                        className="w-4 h-4 text-white"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Stack Layout */}
      <div className="md:hidden space-y-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={index}
            className="relative bg-gradient-to-br from-black via-${colors.primary} to-${colors.secondary} rounded-2xl shadow-xl"
          >
            <Link 
              href={`/blog/${post.id}`}
              className="block p-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <span className={`text-sm ${colors.accent} font-semibold`}>
                    {post.category || 'Article'}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <svg 
                      className="w-4 h-4 text-white"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white">
                  {post.title}
                </h2>

                <p className="text-gray-200 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex justify-between items-center text-gray-300 text-sm">
                  <time>{post.date || 'Mar 15, 2024'}</time>
                  <span className="flex items-center gap-1">
                    3 min read
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Floating Particles Background */}
      <div className="absolute inset-0 -z-10 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: 0
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;