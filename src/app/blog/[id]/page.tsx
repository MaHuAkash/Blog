import BlogDetail from '@/components/blogdetail';
import { Post } from '@/types';

// Mock data for now (replace with API call later)
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'First Blog Post',
    excerpt: 'This is the excerpt of the first blog post.',
    content: 'This is the full content of the first blog post.',
    readTime: "6 min read",
    category: 'gmu',
    date: ''
  },
  {
    id: '2',
    title: 'Second Blog Post',
    excerpt: 'This is the excerpt of the second blog post.',
    content: 'This is the full content of the second blog post.',
    readTime: "6 min read",
    category: 'tipu',
    date: ''
  },
  {
    id: '3',
    title: '3rd Blog Post',
    excerpt: 'This is the excerpt of the 3rd blog post.',
    content: 'This is the full content of the 3rd blog post.',
    readTime: "6 min read",
    category: 'land',
    date: ''
  },
];

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = mockPosts.find((post) => post.id === params.id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <BlogDetail post={post} />
    </div>
  );
}