// next.config.ts
import type { NextConfig } from "next";
import { getWordPressHost } from "@/lib/wordpress/utils";

const isDevelopment = process.env.NODE_ENV === 'development';
const wordpressBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost/wordpress';
const { protocol, hostname, port } = getWordPressHost(wordpressBaseUrl);
const wordpressHost = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

// Common security headers
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
];

// CSP configuration
const getCspPolicy = () => {
  const directives = [
    `default-src 'self'`,
    `script-src 'self' ${isDevelopment ? "'unsafe-eval' 'unsafe-inline'" : "'strict-dynamic'"} ${wordpressHost}`,
    `style-src 'self' 'unsafe-inline' ${wordpressHost}`,
    `img-src 'self' data: blob: ${wordpressHost} *.gravatar.com`,
    `connect-src 'self' ${wordpressHost} ${isDevelopment ? 'ws://localhost:3000' : ''}`,
    `font-src 'self' ${wordpressHost} data:`,
    `media-src 'self' ${wordpressHost} ${isDevelopment ? 'http://localhost:3000' : ''}`,
    `frame-src 'self' ${wordpressHost}`,
    `worker-src 'self' blob:`
  ];

  return directives.join('; ').replace(/\s+/g, ' ');
};

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  env: {
    NEXT_PUBLIC_WORDPRESS_URL: wordpressBaseUrl,
    NEXT_PUBLIC_WORDPRESS_API_URL: `${wordpressBaseUrl}/wp-json`,
    JWT_SECRET: process.env.JWT_SECRET
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        ...securityHeaders,
        { key: 'Content-Security-Policy', value: getCspPolicy() }
      ].filter(h => h.value)
    }];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wordpresscms-erg0acfeasfrbuhn.canadacentral-01.azurewebsites.net',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      }
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    dangerouslyAllowSVG: true,
  },
  publicRuntimeConfig: {
    wordpressUrl: wordpressBaseUrl,
    wordpressApiUrl: `${wordpressBaseUrl}/wp-json`,
  },
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-scroll-area',
    ],
    serverComponentsExternalPackages: ['dompurify'],
    turbo: process.env.TURBO ? {} : undefined
  },
  trailingSlash: process.env.NODE_ENV === 'production',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    if (isDevelopment) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-dom/client': 'react-dom/profiling'
      };
    }

    return config;
  }
};


export default nextConfig;