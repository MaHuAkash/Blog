import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ 
  currentPage, 
  totalPages 
}: { 
  currentPage: number; 
  totalPages: number 
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === 1}
        className="p-2 rounded-full disabled:opacity-30 hover:bg-gray-100 disabled:hover:bg-transparent transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      <div className="flex items-center gap-1">
        <AnimatePresence initial={false}>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;
            const isCurrent = currentPage === pageNumber;
            
            return (
              <motion.button
                key={pageNumber}
                layout
                aria-current={isCurrent ? "page" : undefined}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors
                  ${isCurrent 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                    : 'hover:bg-gray-100 text-gray-600'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {pageNumber}
                {isCurrent && (
                  <motion.span
                    layoutId="pagination-active"
                    className="absolute inset-0 rounded-full border-2 border-white/30"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full disabled:opacity-30 hover:bg-gray-100 disabled:hover:bg-transparent transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}