'use client';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import type { WPPost, WPCategory, WPUser } from '@/types/wordpress';

interface PostCardProps {
  post: WPPost;
  category?: WPCategory;
}

const sanitizeHTML = (dirty: string) => ({
  __html: DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'target']
  })
});

export default function PostCard({ post, category }: PostCardProps) {
  const author = post._embedded?.author?.[0] as WPUser | undefined;

  // Memoized date formatting
  const postDate = useMemo(() =>
    new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    [post.date]
  );

  // Memoized read time calculation
  const readTime = useMemo(() => {
    const wordCount = post.content?.rendered?.split(/\s+/).length || 0;
    return Math.ceil(wordCount / 200);
  }, [post.content?.rendered]);

  // Truncate content to first 50 characters
  const truncatedContent = useMemo(() => {
    if (!post.content?.rendered) return '';
    const cleanText = DOMPurify.sanitize(post.content.rendered, {
      ALLOWED_TAGS: []
    });
    return cleanText.slice(0, 50).trim() + (cleanText.length > 50 ? '...' : '');
  }, [post.content?.rendered]);

  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="group relative bg-white/10 rounded-lg p-4 mb-4 flex items-center justify-between hover:bg-white transition-all duration-300 cursor-pointer"
      aria-labelledby={`post-${post.id}-title`}
      role="article"
    >
      {/* Content Section */}
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-2 mb-1">
          {category?.name && (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="px-2 py-1 text-xs font-medium bg-white/10 text-white rounded-full group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors duration-300"
            >
              {category.name}
            </motion.span>
          )}
          <span className="text-xs text-white/80 group-hover:text-gray-600 transition-colors duration-300">
            {postDate}
          </span>
        </div>

        <Link
          href={`/blog/${post.slug}`} // Remove any encodeURIComponent calls
          className="block"
          aria-label={`Read ${post.title.rendered}`}
        >
          <h3
            id={`post-${post.id}-title`}
            className="text-base font-semibold truncate text-white group-hover:text-gray-900 transition-colors duration-300"
            dangerouslySetInnerHTML={sanitizeHTML(post.title.rendered)}
          />
          {truncatedContent && (
            <div className="text-sm text-white/80 group-hover:text-gray-600 mt-1 transition-colors duration-300">
              {truncatedContent}
            </div>
          )}
        </Link>
      </div>

      {/* Meta Information */}
      <div className="flex flex-col items-end justify-between h-full">
        {author?.name && (
          <span className="text-xs text-white/80 group-hover:text-gray-600 transition-colors duration-300 mb-2">
            {author.name}
          </span>
        )}
        <span className="text-xs text-white/60 group-hover:text-gray-500 transition-colors duration-300">
          {readTime} min read
        </span>
      </div>
    </motion.article>
  );
}