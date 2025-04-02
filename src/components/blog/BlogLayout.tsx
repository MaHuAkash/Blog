'use client';
import { useColor } from '@/context/color-context';
import SearchBar from '@/components/blog/SearchBar';
import PostCard from '@/components/blog/PostCard';
import Pagination from '@/components/blog/Pagination';
import Categories from '@/components/sideBar/Categories';
import CategoriesMobile from '@/components/sideBar/CategoriesMobile';
import { colorConfig } from '@/config/colors';
import type { WPPost, WPCategory, WPTag, WPPagination, WPMedia } from '@/types/wordpress';

interface BlogLayoutProps {
  posts: WPPost[] | null;
  pagination: WPPagination | null;
  categories: WPCategory[] | null;
  tags: WPTag[] | null;
  error?: string;
  basePath?: string;
}

export default function BlogLayout({ 
  posts,
  pagination,
  categories,
  tags,
  error,
  basePath
}: BlogLayoutProps) 

{
  const { colorScheme } = useColor();
  const colors = colorConfig[colorScheme];

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${colors.gradient}`}>
        <div className="text-center p-8 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Error Loading Content</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <p>Please check your network connection and try again.</p>
        </div>
      </div>
    );
  }

  if (!posts || !pagination || !categories || !tags) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${colors.gradient}`}>
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-300 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-[family-name:var(--font-geist-sans)] bg-gradient-to-b ${colors.gradient}`}>
      <main className="pt-20 md:pt-24">
        <CategoriesMobile categories={categories} tags={tags} />
        
        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 xl:gap-12">
            <div className="lg:col-span-3">
              <div className="max-w-4xl mx-auto">
                <SearchBar />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {posts.map((post) => {
                    const category = post._embedded?.['wp:term']
                      ?.flat()
                      ?.find((term: any) => term.taxonomy === 'category') as WPCategory | undefined;
                    
                    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0] as WPMedia | undefined;

                    return (
                      <PostCard 
                        key={post.id}
                        post={post}
                        category={category}
                      />
                    );
                  })}
                </div>
                <Pagination 
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  basePath={basePath}
                />
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-1">
              <div className="lg:pl-8 xl:pl-12">
                <Categories 
                  categories={categories}
                  tags={tags}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}