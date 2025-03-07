'use client';

import { useColor } from '@/context/color-context';
import { colorConfig } from '@/config/colors';
import FeaturedPosts from '@/components/blog/featurePost';


export default function Home() {
  const { colorScheme } = useColor();
  const colors = colorConfig[colorScheme];

  const heroVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className={`min-h-screen font-[family-name:var(--font-geist-sans)] bg-gradient-to-b ${colors.gradient}`}>
      <main className="pt-18 md:pt-18">


        {/* FeaturedPosts Section */}
        <FeaturedPosts />



      </main>
    </div>
  );
}





