import { motion } from 'framer-motion';
import { useColor } from '@/context/color-context';
import { colorConfig } from '@/config/colors';
import { Code2, Paintbrush, TerminalSquare, Briefcase, ArrowRight } from 'lucide-react';
import {Cover} from '@/components/ui/cover';

export default function Categories() {
  const categories = [
    { name: 'Technology', posts: 45, icon: Code2 },
    { name: 'Design', posts: 28, icon: Paintbrush },
    { name: 'Development', posts: 63, icon: TerminalSquare },
    { name: 'Career', posts: 32, icon: Briefcase }
  ];
  const { colorScheme } = useColor();
  const colors = colorConfig[colorScheme];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
  <div className="flex items-center justify-between mb-4 md:mb-6 px-2">
        <h3>
          <Cover className={`text-lg md:text-xl font-semibold px-2  ${colors.textMuted}`}>Categories</Cover>
        </h3>
      </div>
      {/* Category List */}
      <nav className="space-y-1 md:space-y-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.name}
              whileHover={{ x: 9 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="group relative"
            >
              <a
                href="#"
                className="flex items-center space-x-3 p-2 md:p-3 rounded-lg hover:bg-white/80 transition-colors"
              >
                <div className="p-2 rounded-md bg-blue-50 group-hover:bg-blue-100">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-medium text-white group-hover:text-gray-800 truncate transition-colors">
                    {category.name}
                  </p>
                  <p className="text-xs md:text-sm text-white/80 group-hover:text-gray-600 transition-colors">
                    {category.posts} posts
                  </p>
                </div>
              </a>
            </motion.div>
          );
        })}
      </nav>

      {/* Trending Tags */}
      <div className="mt-6 pt-4 border-t border-blue-100/50">
  <h4 className="text-xs md:text-sm font-medium text-white/80 px-2 mb-2 md:mb-3">
    Trending Now
  </h4>
  <div className="flex flex-wrap gap-1.5 md:gap-2 px-2">
    {['AI', 'Web3', 'Figma', 'React', 'UX'].map((tag) => (
      <motion.span
        key={tag}
        whileHover={{ scale: 1.05 }}
        className="px-2 py-1 text-xs md:text-sm rounded-full bg-white/10 text-white 
                 hover:bg-white hover:text-gray-900 transition-colors duration-200"
      >
        #{tag}
      </motion.span>
    ))}
  </div>
</div>    </motion.div>
  );
}