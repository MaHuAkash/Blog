'use client';
import { Creepster } from 'next/font/google';
import { motion } from 'framer-motion';
import { useColor } from '@/context/color-context';
import { colorConfig } from '@/config/colors';
import { Code2, TerminalSquare, TestTube2, Hash, Book } from 'lucide-react';
import { Cover } from '@/components/ui/cover';
import { ColourfulText } from "@/components/ui/colourful-text";
import Link from 'next/link';
import type { WPCategory, WPTag } from '@/types/wordpress';

interface CategoriesProps {
  categories: WPCategory[];
  tags: WPTag[];
}

const iconMap: Record<string, React.ComponentType> = {
  'dotnet-development': Code2,
  'javascript': TerminalSquare,
  'test': TestTube2,
  'numero': Hash,
  'default': Book
};

const creepster = Creepster({
  weight: '400',
  subsets: ['latin'],
  adjustFontFallback: false, // Disable automatic fallback sizing
});

// Color variations for tags
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
export default function Categories({ categories, tags }: CategoriesProps) {
  const { colorScheme } = useColor();
  const colors = colorConfig[colorScheme];

  const getIcon = (slug: string) => {
    return iconMap[slug] || iconMap.default;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center justify-between mb-4 md:mb-6 px-2">
        <h3>
          <Cover className={`text-lg md:text-xl font-semibold px-2 ${colors.textMuted}`}>
            Categories
          </Cover>
        </h3>
      </div>

      {/* Category List */}
      <nav className="space-y-1 md:space-y-2">
        {categories.map((category) => {
          const Icon = getIcon(category.slug);
          return (
            <motion.div
              key={category.id}
              whileHover={{ x: 9 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="group relative"
            >
              <Link
                href={`/blog/category/${category.slug}`}
                className="flex items-center space-x-3 p-2 md:p-3 rounded-lg hover:bg-white/80 transition-colors"
              >
                <div className="p-2 rounded-md bg-blue-50 group-hover:bg-blue-100">
                  <span className="w-4 h-4 md:w-5 md:h-5 text-blue-600">
                    <Icon />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-medium text-white group-hover:text-gray-800 truncate transition-colors">
                    {category.name}
                  </p>
                  <p className="text-xs md:text-sm text-white/80 group-hover:text-gray-600 transition-colors">
                    {category.count} items
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Trendy Tags Component - Seamless Integration */}
      <div className="mt-6 px-4">
        <div className="mb-4 flex justify-center">
          <h1 className="text-[1.15rem] md:text-[1.6rem] font-medium text-gray-700">
            <span className={`
      bg-gradient-to-r from-pink-400 to-blue-400 
      bg-clip-text text-transparent 
      ${creepster.className}
      inline-block
      tracking-[0.5em]     /* Custom letter spacing */
      scale-y-125         /* Tailwind's vertical stretch */
      origin-bottom
      whitespace-nowrap
    `}>
              <ColourfulText text="T R E N D I N G  Now" />
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
          {tags.map((tag, index) => (
            <motion.span
              key={tag.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04 }}
              whileHover={{
                scale: 1.03,
                y: -2,
                boxShadow: '0 2px 8px -1px rgba(0,0,0,0.08)'
              }}
              className={`flex items-center justify-center px-3 py-1.5
                    text-xs md:text-[0.85rem] rounded-xl font-medium
                    border-2 transition-all duration-250 cursor-pointer
                    ${tagColors[index % tagColors.length]}
                    hover:shadow-sm hover:border-transparent
                    active:scale-[0.98] whitespace-nowrap`}
            >
              <span className="mr-1.5 text-[0.7em] opacity-70">⚡</span>
              #{tag.name}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}