import { Post } from '@/types';

interface BlogDetailProps {
  post: Post;
}

const BlogDetail = ({ post }: BlogDetailProps) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.content}</p>
    </div>
  );
};

export default BlogDetail;