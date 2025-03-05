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
    category: 'Technology',
    readTime: '5 min read',
    date: '2024-01-01',
  },
  {
    id: '2',
    title: 'Second Blog Post',
    excerpt: 'This is the excerpt of the second blog post.',
    content: 'This is the full content of the second blog post.',
    category: 'Design',
    readTime: '7 min read',
    date: '2024-01-15',
  },
  {
    id: '3',
    title: 'Third Blog Post',
    excerpt: 'This is the excerpt of the third blog post.',
    content: 'This is the full content of the third blog post.',
    category: 'Development',
    readTime: '10 min read',
    date: '2024-02-01',
  },
];

export default function Home() {
  const { colorScheme } = useColor();
  const colors = colorConfig[colorScheme];

  return (
    <div className={`min-h-screen font-[family-name:var(--font-geist-sans)] bg-gradient-to-b ${colors.gradient}`}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-16">
          <Cover>
            <h2 className={`text-3xl font-bold `}>Latest Writings</h2>
          </Cover>
          <Link href="/blog" className="text-blue-500 hover:underline">
            Visit Blog
          </Link>
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
              key={post.id} // Use post.id as the key
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
                <h3 className={`text-2xl font-semibold mb-4 ${colors.textPrimary}`}>
                  {post.title}
                </h3>
                <p className={`mb-6 flex-grow ${colors.iconColor}`}>{post.excerpt}</p>
                <div className={`flex items-center justify-between text-sm ${colors.iconColor}`}>
                  <time>{new Date(post.date).toLocaleDateString()}</time>
                  <Link href={`/blog/${post.id}`} className="flex items-center gap-1 hover:underline">
                    Read Article
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <footer className={`py-12 text-center ${colors.iconColor}`}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="mb-4">Built with Next.js and Tailwind CSS</p>
          <p className="text-sm">© 2024 DevChronicles · All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}