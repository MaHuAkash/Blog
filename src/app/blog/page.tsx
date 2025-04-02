import { getPosts, getCategories, getTags } from '@/lib/wordpress/api';
import BlogLayout from '@/components/blog/BlogLayout';

export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams?: { page?: string } 
}) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  const [postsResponse, categories, tags] = await Promise.all([
    getPosts(page), // Pass the page parameter here
    getCategories(),
    getTags()
  ]);

  return (
    <BlogLayout 
      posts={postsResponse.data}
      pagination={postsResponse.pagination}
      categories={categories}
      tags={tags}
      basePath="/blog" // Add basePath for pagination
    />
  );
}