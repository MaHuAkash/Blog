import BlogDetail from '@/components/blog/blogdetail';
import { Post } from '@/types';
import { notFound } from 'next/navigation';

const mockPosts: Post[] = [
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
];


// Simulate proper async data fetching
async function getPost(id: string): Promise<Post> {
  // Return a promise that immediately resolves with mock data
  return Promise.resolve().then(() => {
    const post = mockPosts.find(post => post.id === id);
    if (!post) throw new Error('Post not found');
    return post;
  });
}

export async function generateStaticParams() {
  return mockPosts.map(post => ({ id: post.id }));
}

export default async function BlogDetailPage({
  params
}: {
  params: { id: string }
}) {
  const post = await getPost(params.id);

  return (
    <main className="container mx-auto px-4 py-8">
      <BlogDetail post={post} />
    </main>
  );
}

// Add this export to handle static generation properly
export const dynamicParams = false;

