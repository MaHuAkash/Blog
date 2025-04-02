'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import DOMPurify from 'dompurify';
import { WPPost, WPMedia, WPUser } from '@/types/wordpress';
import SocialMediaShare from './socialmedia';

export default function BlogDetail({ post }: { post: WPPost }) {
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0] as WPMedia | undefined;
  const author = post._embedded?.author?.[0] as WPUser | undefined;
  
  // Generate clean metadata
  const postExcerpt = post.excerpt?.rendered 
    ? DOMPurify.sanitize(post.excerpt.rendered, { ALLOWED_TAGS: [] }).substring(0, 160)
    : 'Check out this interesting post!';

  // Build absolute post URL
  const postUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/blog/${post.slug}`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;

  // WordPress gallery styling fix
  useEffect(() => {
    const convertGalleries = () => {
      document.querySelectorAll('.wp-block-gallery').forEach(gallery => {
        gallery.classList.add('gallery-grid');
        gallery.querySelectorAll('.wp-block-image').forEach(img => {
          img.classList.add('gallery-item');
          const imgElement = img.querySelector('img');
          if (imgElement) {
            imgElement.style.position = 'static';
          }
        });
      });
    };

    convertGalleries();
  }, [post.content.rendered]);

  return (
    <main className="w-full">
      <Head>
        <title>{post.title.rendered}</title>
        
        {/* Open Graph Meta */}
        <meta property="og:title" content={post.title.rendered} />
        <meta property="og:description" content={postExcerpt} />
        <meta property="og:image" content={featuredMedia?.source_url || '/default-social.jpg'} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title.rendered} />
        <meta name="twitter:description" content={postExcerpt} />
        <meta name="twitter:image" content={featuredMedia?.source_url || '/default-social.jpg'} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={postUrl} />
      </Head>

      {/* Article Header */}
      <header className="mx-auto max-w-4xl px-4 mb-10 pt-19">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {post.title.rendered}
          </h1>

          <div className="flex items-center justify-center gap-4 text-sm text-white/80">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-white/60" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            {author && (
              <div className="flex items-center gap-1.5">
                <UserIcon className="w-4 h-4 text-white/60" />
                <span>{author.name}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {featuredMedia && (
        <figure className="featured-image-container">
          <Image
            src={featuredMedia.source_url}
            alt={featuredMedia.alt_text || post.title.rendered}
            width={featuredMedia.media_details?.width || 1200}
            height={featuredMedia.media_details?.height || 630}
            className="featured-image"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </figure>
      )}

      {/* Article Content */}
      <article className="post-content mx-auto max-w-4xl px-4">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content.rendered)
          }}
          className="prose dark:prose-invert prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-white prose-blockquote:text-gray-300 prose-code:text-gray-300 max-w-none"
        />
      </article>

      {/* Social Sharing Component */}
      <SocialMediaShare
        postTitle={post.title.rendered}
        postUrl={postUrl}
        postExcerpt={postExcerpt}
      />
    </main>
  );
}