'use client';

import { useColor } from '@/context/color-context';
import { colorConfig } from '@/config/colors';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const { colorScheme } = useColor();
  const colors = colorConfig[colorScheme];

  const featuredPosts = [
    {
      title: "Next.js 14: Mastering the App Router",
      excerpt: "Deep dive into the latest App Router features and best practices...",
      date: "2024-03-20",
      readTime: "8 min read",
      category: "Web Dev"
    },
    {
      title: "UI Design Fundamentals",
      excerpt: "Essential principles for creating modern user interfaces...",
      date: "2024-03-18",
      readTime: "6 min read",
      category: "Design"
    },
    {
      title: "TypeScript Pro Tips",
      excerpt: "Advanced TypeScript patterns for better code quality...",
      date: "2024-03-15",
      readTime: "10 min read",
      category: "Programming"
    }
  ];

  return (
    <div className={`min-h-screen font-[family-name:var(--font-geist-sans)] bg-gradient-to-b ${colors.gradient}`}>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              <span className={`bg-clip-text text-transparent ${colors.textGradient}`}>
                Insights
              </span>{' '}
              <br />for Modern Developers
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-12 ${colors.iconColor}`}>
              Exploring the intersection of technology, design, and modern web development.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className={`px-8 py-4 rounded-full text-lg font-semibold ${colors.accent} text-white shadow-lg hover:shadow-xl transition-all`}
            >
              Start Exploring →
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-16">
          <h2 className={`text-3xl font-bold ${colors.textGradient}`}>Latest Writings</h2>
          <Link href="/archive" className={`flex items-center gap-2 ${colors.iconColor} hover:${colors.accent}`}>
            View All Articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.article 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative rounded-2xl p-8 ${colors.skillCard} hover:transform hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
            >
              <div className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm px-3 py-1 rounded-full ${colors.accent} text-white`}>
                    {post.category}
                  </span>
                  <span className={`text-sm ${colors.iconColor}`}>{post.readTime}</span>
                </div>
                <h3 className={`text-2xl font-semibold mb-4 `}>
                  {post.title}
                </h3>
                <p className={`mb-6 flex-grow ${colors.iconColor}`}>{post.excerpt}</p>
                <div className={`flex items-center justify-between text-sm ${colors.iconColor}`}>
                  <time>{new Date(post.date).toLocaleDateString()}</time>
                  <span className="flex items-center gap-1">
                    Read Article
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>


      {/* Footer */}
      <footer className={`py-12 text-center ${colors.iconColor}`}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="mb-4">Built with Next.js and Tailwind CSS</p>
          <p className="text-sm">© 2024 DevChronicles · All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}