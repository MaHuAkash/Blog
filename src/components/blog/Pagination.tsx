import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({ 
  currentPage, 
  totalPages,
  basePath = '/blog'
}: PaginationProps) {
  // Generate previous and next hrefs
  const prevHref = currentPage > 2 
    ? `${basePath}?page=${currentPage - 1}` 
    : currentPage === 2 ? basePath : '';
    
  const nextHref = `${basePath}?page=${currentPage + 1}`;

  return (
    <div className="flex items-center justify-center gap-4 mt-8 sm:mt-12">
      {/* Previous Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="group rounded-full hover:bg-gray-100 transition-colors"
      >
        <Link
          href={prevHref}
          aria-disabled={currentPage === 1}
          className={`p-2 rounded-full ${
            currentPage === 1 ? 'opacity-30 pointer-events-none' : ''
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5 text-white group-hover:text-black" />
        </Link>
      </motion.div>

      {/* Current Page Number */}
      <motion.div
        layout
        key={currentPage} // Add key to animate page number changes
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium"
      >
        {currentPage}
      </motion.div>

      {/* Next Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="group rounded-full hover:bg-gray-100 transition-colors"
      >
        <Link
          href={nextHref}
          aria-disabled={currentPage === totalPages}
          className={`p-2 rounded-full ${
            currentPage === totalPages ? 'opacity-30 pointer-events-none' : ''
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5 text-white group-hover:text-black" />
        </Link>
      </motion.div>
    </div>
  );
}