'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Paintbrush, TerminalSquare, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { ColourfulText } from "@/components/ui/colourful-text";
import type { WPCategory, WPTag } from '@/types/wordpress';

interface CategoriesMobileProps {
  categories: WPCategory[];
  tags: WPTag[];
}

const iconMap: Record<string, typeof Code2> = {
  technology: Code2,
  design: Paintbrush,
  development: TerminalSquare,
  career: Briefcase,
};

const tagColors = [
  'bg-blue-50 text-blue-700 border-blue-200',
  'bg-emerald-50 text-emerald-700 border-emerald-200',
  'bg-amber-50 text-amber-700 border-amber-200',
  'bg-rose-50 text-rose-700 border-rose-200',
  'bg-violet-50 text-violet-700 border-violet-200',
  'bg-cyan-50 text-cyan-700 border-cyan-200',
  'bg-lime-50 text-lime-700 border-lime-200',
  'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
  'bg-sky-50 text-sky-700 border-sky-200',
  'bg-teal-50 text-teal-700 border-teal-200',
  'bg-orange-50 text-orange-700 border-orange-200',
  'bg-indigo-50 text-indigo-700 border-indigo-200',
  'bg-pink-50 text-pink-700 border-pink-200',
  'bg-purple-50 text-purple-700 border-purple-200',
  'bg-yellow-50 text-yellow-700 border-yellow-200',
  'bg-green-50 text-green-700 border-green-200',
  'bg-red-50 text-red-700 border-red-200',
  'bg-slate-50 text-slate-700 border-slate-200',
  'bg-gray-50 text-gray-700 border-gray-200',
  'bg-stone-50 text-stone-700 border-stone-200'
];

export default function CategoriesMobile({ categories, tags }: CategoriesMobileProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [visibleTags, setVisibleTags] = useState(8); // Initial number of visible tags

  const loadMoreTags = () => {
    setVisibleTags(prev => prev + 8);
  };

  return (
    <div className="lg:hidden mb-6 px-4">
      {/* Categories accordion remains unchanged */}
      <div className="space-y-2">
        {/* Categories accordion remains the same */}
        {categories.map((category) => {
          const Icon = iconMap[category.slug] || Code2;
          const isExpanded = expandedCategory === category.slug;

          return (
            <div 
              key={category.id}
              className="rounded-lg bg-white/10 overflow-hidden"
            >
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category.slug)}
                className="w-full p-3 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">{category.name}</span>
                </div>
                <motion.span
                  initial={false}
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  className="text-white/80"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-3 pb-3"
                  >
                    <div className="pt-2 border-t border-white/20">
                      <p className="text-sm text-white/80">
                        {category.count} posts available
                      </p>
                      <Link 
                        href={`/blog/category/${category.slug}`}
                        className="mt-2 text-sm text-blue-400 hover:text-blue-300 block"
                      >
                        View all →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      {/* Enhanced Mobile Trending Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/80"
      >
        <div className="px-4 pt-5 pb-3">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-[1.2rem] font-bold">
              <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                <ColourfulText text="Trending Now" />
              </span>
            </h2>
          </div>

          <motion.div
            className="flex flex-wrap gap-2 justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.03 }
              }
            }}
          >
            {tags.slice(0, visibleTags).map((tag, index) => (
              <motion.span
                key={tag.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    transition: { type: 'spring', stiffness: 300 }
                  }
                }}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  backgroundColor: tagColors[index % tagColors.length].replace('bg-', 'bg-') + '90'
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-2.5 py-1 text-xs rounded-xl font-medium border-2
                  ${tagColors[index % tagColors.length]}
                  transition-all duration-200 active:scale-95
                  flex items-center justify-center space-x-1.5
                  shadow-sm hover:shadow-md`}
              >
                <span className="text-[0.7em] opacity-80">⚡</span>
                <span className="whitespace-nowrap">#{tag.name}</span>
              </motion.span>
            ))}
          </motion.div>

          {tags.length > visibleTags && (
            <motion.button
              onClick={loadMoreTags}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4 py-2 text-sm font-medium text-blue-600 
                rounded-lg bg-blue-50/50 hover:bg-blue-100/50 transition-colors"
            >
              Show More Tags
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}