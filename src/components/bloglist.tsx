'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { useColor } from '@/context/color-context';
import { colorConfig } from '@/config/colors';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category?: string;
  date?: string;
  image?: string;
}

interface BlogListProps {
  posts: Post[];
}

const BlogList = ({ posts }: BlogListProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { colorScheme } = useColor();
  const colors = colorConfig[colorScheme];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' }
    })
  };

  return (
    <div ref={ref} className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={index}
            className="group relative overflow-hidden rounded-xl transition-all"
          >
            <Link 
              href={`/blog/${post.id}`} 
              className="flex h-full gap-4 bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/20 border border-white/5 hover:border-white/10"
            >
              {/* Image Section */}
              <div className="w-[25%] md:w-[30%]">
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-100/10 transition-all duration-300 group-hover:scale-[1.02]">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-r from-gray-100/10 to-gray-200/10" />
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex w-[75%] md:w-[70%] flex-col justify-center">
                <div className="space-y-2.5">
                  {/* Category Tag */}
                  {post.category && (
                    <span 
                      className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm bg-white/10 border border-white/10 hover:bg-white/20 hover:text-white`}
                    >
                      {post.category}
                    </span>
                  )}

                  {/* Title with subtle shadow */}
                  <h2 className={`text-lg font-bold text-white/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] group-hover:text-white`}>
                    {post.title}
                  </h2>

                  {/* Excerpt with improved contrast */}
                  <p className={`line-clamp-2 text-sm text-white/70 group-hover:text-white/80`}>
                    {post.excerpt}
                  </p>
                </div>

                {/* Date with clearer contrast */}
                <div className={`mt-3 text-xs text-white/60 group-hover:text-white/70`}>
                  <time>{post.date || 'Mar 15, 2024'}</time>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;