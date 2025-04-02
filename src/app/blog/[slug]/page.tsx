import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/wordpress/api';
import BlogDetail from '@/components/blog/blogdetail';
import { normalizeSlug, validateSlug } from '@/lib/wordpress/utils';

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map(slug => ({ 
      slug: encodeURIComponent(slug) // Ensure proper URL encoding
    }));
  } catch (error) {
    console.error('Error generating static paths:', error);
    return [];
  }
}

export const revalidate = 3600;

export default async function BlogDetailPage({
  params
}: {
  params: { slug: string }
}) {
  try {
    // Decode before validation
    const decodedSlug = decodeURIComponent(params.slug);
    
    if (!validateSlug(decodedSlug)) {
      console.error('Invalid slug structure:', decodedSlug);
      return notFound();
    }

    const normalizedSlug = normalizeSlug(decodedSlug);
    const post = await getPostBySlug(normalizedSlug);

    if (!post) return notFound();

    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <BlogDetail post={post} />
      </main>
    );
  } catch (error) {
    console.error('Page rendering error:', error);
    return notFound();
  }
}
