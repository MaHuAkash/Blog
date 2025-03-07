'use client';

import { useColor } from '@/context/color-context';
import { colorConfig } from '@/config/colors';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Cover } from '@/components/ui/cover';
import { Post } from '@/types'; // Import the Post type

// Mock data for featured posts
const featuredPosts: Post[] = [
  {
    id: '1',
    title: 'First Blog Post',
    excerpt: 'This is the excerpt of the first blog post.',
    content: 'This is the full content of the first blog post.',
    readTime: "6 min read",
    category: 'gmu',
    date: '2024-01-01',
    author: 'Kry',
    slug: 'first-blog-post',
    image: '/images/first-blog-post.jpg',
  
  },
  {
    id: '2',
    title: 'Second Blog Post',
    excerpt: 'This is the excerpt of the second blog post.',
    content: 'This is the full content of the second blog post.',
    readTime: "6 min read",
    category: 'tipu',
    date: '2024-02-01',
    author: 'hehe',
    slug: 'first-blog-post',
    image: '/images/first-blog-post.jpg',
  
  },
  {
    id: '3',
    title: '3rd Blog Post',
    excerpt: 'This is the excerpt of the 3rd blog post.',
    content: 'This is the full content of the 3rd blog post.',
    readTime: "6 min read",
    category: 'land',
    date: '2024-03-01',
    author: 'kryanshi',
    slug: 'first-blog-post',
    image: '/images/first-blog-post.jpg',
  
  },
];

export default function FeaturedPosts() {
    const { colorScheme } = useColor();
    const colors = colorConfig[colorScheme];
  
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <Cover>
            <h2 className={`text-2xl md:text-3xl font-bold ${colors.textMuted}`}>
              Latest Writings
            </h2>
          </Cover>
          <Link
            href="/blog"
            className={`flex items-center gap-1.5 text-sm ${colors.iconColor} hover:${colors.accent} transition-colors`}
          >
            View All Articles
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
  
        <hr className={`h-px border-t ${colors.border} mb-16 mx-4 md:mx-auto w-full md:w-4/5`} />
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
          {featuredPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative rounded-xl p-6 ${colors.skillCard} hover:transform hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
            >
              <div className="absolute inset-0 rounded-xl border opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full ${colors.accent} text-white`}>
                    {post.category}
                  </span>
                  <span className={`text-xs ${colors.iconColor}`}>{post.readTime}</span>
                </div>
                <h3 className={`text-xl md:text-2xl font-semibold mb-3 ${colors.textPrimary}`}>
                  {post.title}
                </h3>
                <p className={`text-sm mb-4 flex-grow ${colors.iconColor} leading-relaxed`}>
                  {post.excerpt}
                </p>
                <div className={`flex items-center justify-between text-xs ${colors.iconColor}`}>
                  <time>{new Date(post.date).toLocaleDateString()}</time>
                  <Link 
                    href={`/blog/${post.id}`} 
                    className={`flex items-center gap-1 hover:${colors.accent} transition-colors`}
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
  
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="mt-24 relative h-px w-full"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-32 h-0.5 rounded-full opacity-75"
              style={{ background: colors.accent }}
            />
          </div>
        </motion.div>
      </section>
    );
  }
  