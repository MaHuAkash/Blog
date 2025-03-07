import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Paintbrush, TerminalSquare, Briefcase } from 'lucide-react';

const iconMap = {
  Technology: Code2,
  Design: Paintbrush,
  Development: TerminalSquare,
  Career: Briefcase
};

export default function CategoriesMobile() {
  const categories = [
    { name: 'Technology', posts: 45 },
    { name: 'Design', posts: 28 },
    { name: 'Development', posts: 63 },
    { name: 'Career', posts: 32 }
  ];

  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="lg:hidden mb-6 px-4">
      <div className="space-y-2">
        {categories.map((category) => {
          const Icon = iconMap[category.name as keyof typeof iconMap];
          const isExpanded = expandedCategory === category.name;

          return (
            <div 
              key={category.name}
              className="rounded-lg bg-white/10 overflow-hidden"
            >
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category.name)}
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
                        {category.posts} posts available
                      </p>
                      <button className="mt-2 text-sm text-blue-400 hover:text-blue-300">
                        View all →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}