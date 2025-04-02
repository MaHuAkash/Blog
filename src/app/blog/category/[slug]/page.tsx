// src/app/blog/category/[slug]/page.tsx
import { getPosts, getCategories, getTags, getCategoryBySlug } from '@/lib/wordpress/api';
import BlogLayout from '@/components/blog/BlogLayout';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ 
  params,
  searchParams
}: { 
  params: { slug: string },
  searchParams?: { page?: string }
}) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const { slug } = params;

  // Fetch category data
  const category = await getCategoryBySlug(slug);
  if (!category) return notFound();

  // Correctly call getPosts with parameters
  const postsResponse = await getPosts(page, {
    categories: category.id,
    per_page: 10
  });
  
  // Fetch sidebar data
  const [categories, tags] = await Promise.all([
    getCategories(),
    getTags()
  ]);

  return (
    <BlogLayout 
      posts={postsResponse.data}
      pagination={postsResponse.pagination}
      categories={categories}
      tags={tags}
      basePath={`/blog/category/${slug}`}
    />
  );
}