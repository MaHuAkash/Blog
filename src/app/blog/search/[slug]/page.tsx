// src/app/blog/search/page.tsx
import { getPosts } from '@/lib/wordpress/api';
import BlogLayout from '@/components/blog/BlogLayout';

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q || '';
  const postsResponse = await getPosts(1, { search: query });

  return (
    <BlogLayout
      posts={postsResponse.data}
      pagination={postsResponse.pagination}
      categories={[]} // Pass empty arrays for categories and tags
      tags={[]}
      basePath={`/blog/search?q=${encodeURIComponent(query)}`}
    />
  );
}