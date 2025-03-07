import { Post } from '@/types';

export default function BlogDetail({ post }: { post: Post }) {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex gap-4 text-sm text-gray-500 mb-8">
        <span>{post.category}</span>
        <span>{post.readTime}</span>
        <span>{post.date}</span>
      </div>
      <div className="prose lg:prose-xl">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}