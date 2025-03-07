'use client';
import { Post } from '@/types';
import HeroSection from '@/components/blog/HeroSection';
import SearchBar from '@/components/blog/SearchBar';
import PostCard from '@/components/blog/PostCard';
import Pagination from '@/components/blog/Pagination';
import Categories from '@/components/sideBar/Categories';
import CategoriesMobile from '@/components/sideBar/CategoriesMobile';
import { useColor } from '@/context/color-context';
import { colorConfig } from '@/config/colors';


// Mock data - replace with real data fetching
const posts: Post[] = [ 
  {
    id: '1',
    title: 'First Blog Post',
    excerpt: 'This is the excerpt of the first blog post.',
    content: 'This is the full content of the first blog post.',
    readTime: "6 min read",
    category: 'gmu',
    date: '2024-01-01',
    author: 'Kry',
    slug: 'first-blog-post',
    image: '/images/first-blog-post.jpg',
  
  },
  {
    id: '2',
    title: 'Second Blog Post',
    excerpt: 'This is the excerpt of the second blog post.',
    content: 'This is the full content of the second blog post.',
    readTime: "6 min read",
    category: 'tipu',
    date: '2024-02-01',
    author: 'hehe',
    slug: 'first-blog-post',
    image: '/images/first-blog-post.jpg',
  
  },
  {
    id: '3',
    title: '3rd Blog Post',
    excerpt: 'This is the excerpt of the 3rd blog post.',
    content: 'This is the full content of the 3rd blog post.',
    readTime: "6 min read",
    category: 'land',
    date: '2024-03-01',
    author: 'kryanshi',
    slug: 'first-blog-post',
    image: '/images/first-blog-post.jpg',
  
  },
]; // Your posts array

export default function BlogPage() {
  const { colorScheme } = useColor();
  const colors = colorConfig[colorScheme];

  const heroVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };
  return (
<div className={`min-h-screen font-[family-name:var(--font-geist-sans)] bg-gradient-to-b ${colors.gradient}`}>
  <main className="pt-20 md:pt-24"> {/* Increased top padding */}

    <CategoriesMobile />
    
    <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16"> {/* Responsive padding */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 xl:gap-12"> {/* Increased gap on xl screens */}
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="max-w-4xl mx-auto"> {/* Constrain content width */}
            <SearchBar />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <Pagination currentPage={1} totalPages={5} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="lg:pl-8 xl:pl-12">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  </main>
</div>  );
}