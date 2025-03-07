import { motion } from 'framer-motion';
import { Post } from '@/types';

export default function PostCard({ post }: { post: Post }) {
  return (
    <motion.article 
      whileHover={{ y: -5 }}
      className="group relative bg-white/10 rounded-lg p-4 mb-4 flex items-center justify-between hover:bg-white transition-all duration-300 cursor-pointer"
    >
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-2 mb-1">
          {post.category && (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="px-2 py-1 text-xs font-medium bg-white/10 text-white rounded-full group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors duration-300"
            >
              {post.category}
            </motion.span>
          )}
          <span className="text-xs text-white/80 group-hover:text-gray-600 transition-colors duration-300">
            {post.date}
          </span>
        </div>
        
        <a 
          href={`/blog/${post.slug}`} 
          className="block"
        >
          <h3 className="text-base font-semibold truncate text-white group-hover:text-gray-900 transition-colors duration-300">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-white/80 group-hover:text-gray-600 truncate-2-lines mt-1 transition-colors duration-300">
              {post.excerpt}
            </p>
          )}
        </a>
      </div>

      <div className="flex flex-col items-end justify-between h-full">
        <span className="text-xs text-white/80 group-hover:text-gray-600 transition-colors duration-300 mb-2">
          {post.author} Author
        </span>
        <span className="text-xs text-white/60 group-hover:text-gray-500 transition-colors duration-300">
          {post.author}
        </span>
      </div>
    </motion.article>
  );
}