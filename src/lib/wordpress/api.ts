// lib/wordpress/api.ts
import axios from 'axios';
import type {
  WPPost,
  WPCategory,
  WPTag,
  WPPagination,
  WPListResponse,
  WPMedia
} from '@/types/wordpress';
import { normalizeSlug, validateSlug } from './utils';

// Validate environment variables
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
if (!WORDPRESS_API_URL) {
  throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL environment variable is not defined');
}

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

// Configure axios client
const wpClient = axios.create({
  baseURL: WORDPRESS_API_URL,
  headers: JWT_SECRET ? { 'Authorization': `Bearer ${JWT_SECRET}` } : undefined,
  timeout: 15000,
  validateStatus: (status) => status >= 200 && status < 500
});

// Generic error handler
const handleApiError = (error: unknown, context: string): never => {
  console.error(`[WordPress API] Error in ${context}:`, error);
  throw new Error(`Failed to ${context}: ${error instanceof Error ? error.message : 'Unknown error'}`);
};

// Category API functions
export const getCategories = async (
  params: { 
    per_page?: number;
    orderby?: 'count' | 'name';
    order?: 'asc' | 'desc';
  } = {}
): Promise<WPCategory[]> => {
  try {
    const response = await wpClient.get<WPCategory[]>('/wp/v2/categories', {
      params: {
        per_page: 100,
        orderby: 'count',
        order: 'desc',
        ...params
      }
    });

    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    return handleApiError(error, 'fetch categories');
  }
};

export const getCategoryBySlug = async (slug: string): Promise<WPCategory | null> => {
  try {
    const response = await wpClient.get<WPCategory[]>('/wp/v2/categories', {
      params: {
        slug: normalizeSlug(slug),
        _embed: true,
        context: 'view'
      }
    });

    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.data?.[0] || null;
  } catch (error) {
    console.error(`Category fetch error for slug ${slug}:`, error);
    return null;
  }
};

// Tag API functions
export const getTags = async (
  params: {
    per_page?: number;
    orderby?: 'count' | 'name';
    order?: 'asc' | 'desc';
  } = {}
): Promise<WPTag[]> => {
  try {
    const response = await wpClient.get<WPTag[]>('/wp/v2/tags', {
      params: {
        per_page: 100,
        orderby: 'count',
        order: 'desc',
        ...params
      }
    });

    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    return handleApiError(error, 'fetch tags');
  }
};

// Post API functions
export const getPosts = async (
  page = 1,
  params: {
    search?: string;
    categories?: number | number[];
    per_page?: number;
    orderby?: 'date' | 'title';
    order?: 'asc' | 'desc';
  } = {}
): Promise<WPListResponse<WPPost>> => {
  try {
    const response = await wpClient.get<WPPost[]>('/wp/v2/posts', {
      params: {
        _embed: true,
        page,
        per_page: params.per_page || 10, // Use provided per_page or default to 10
        orderby: params.orderby || 'date', // Use provided orderby or default to 'date'
        order: params.order || 'desc', // Use provided order or default to 'desc'
        search: params.search || undefined, // Add search parameter
        ...params,
        categories: Array.isArray(params.categories) 
          ? params.categories
          : params.categories ? [params.categories] : undefined
      }
    });

    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return {
      data: response.data,
      pagination: {
        total: parseInt(response.headers['x-wp-total'], 10),
        totalPages: parseInt(response.headers['x-wp-totalpages'], 10),
        currentPage: page,
        perPage: params.per_page || 10
      }
    };
  } catch (error) {
    return handleApiError(error, 'fetch posts');
  }
};

export const getPostsByCategory = async (
  categoryId: number,
  page = 1,
  perPage = 10
): Promise<WPListResponse<WPPost>> => {
  return getPosts(page, {
    categories: categoryId,
    per_page: perPage
  });
};

export const getPostById = async (id: string): Promise<WPPost> => {
  try {
    if (!id || !/^\d+$/.test(id)) {
      throw new Error(`Invalid post ID: ${id}`);
    }

    const response = await wpClient.get<WPPost>(`/wp/v2/posts/${id}`, {
      params: { 
        _embed: true,
        context: 'view'
      }
    });

    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    return handleApiError(error, `fetch post ID ${id}`);
  }
};

// Slug-based post functions
export const getAllPostSlugs = async (): Promise<string[]> => {
  try {
    const response = await wpClient.get<WPPost[]>('/wp/v2/posts', {
      params: {
        per_page: 100,
        _fields: 'slug',
        context: 'embed'
      }
    });

    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.data
      .map(post => normalizeSlug(post.slug))
      .filter(validateSlug);
  } catch (error) {
    console.error('Slug fetch error:', error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<WPPost | null> => {
  if (!validateSlug(slug)) {
    console.error('Invalid slug format:', slug);
    return null;
  }

  try {
    const response = await wpClient.get<WPPost[]>('/wp/v2/posts', {
      params: {
        slug: normalizeSlug(slug),
        _embed: true,
        context: 'view'
      }
    });

    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.data?.[0] || null;
  } catch (error) {
    console.error('Post fetch error:', error);
    return null;
  }
};

// Media API functions
export const getMedia = async (
  params: {
    page?: number;
    per_page?: number;
    orderby?: 'date' | 'title';
    order?: 'asc' | 'desc';
    after?: string;
    before?: string;
    search?: string;
  } = {}
): Promise<WPListResponse<WPMedia>> => {
  try {
    const response = await wpClient.get<WPMedia[]>('/wp/v2/media', {
      params: {
        _embed: true,
        page: params.page || 1,
        per_page: params.per_page || 100,
        orderby: params.orderby || 'date',
        order: params.order || 'desc',
        after: params.after,
        before: params.before,
        search: params.search,
      }
    });

    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return {
      data: response.data,
      pagination: {
        total: parseInt(response.headers['x-wp-total'], 10),
        totalPages: parseInt(response.headers['x-wp-totalpages'], 10),
        currentPage: params.page || 1,
        perPage: params.per_page || 100
      }
    };
  } catch (error) {
    return handleApiError(error, 'fetch media');
  }
};

export const getMediaByFileName = async (
  filename: string,
  uploadDate: string
): Promise<WPMedia | null> => {
  try {
    // Calculate date range for upload date (UTC)
    const uploadDateObj = new Date(uploadDate);
    const startDate = new Date(uploadDateObj);
    startDate.setUTCHours(0, 0, 0, 0);
    
    const endDate = new Date(uploadDateObj);
    endDate.setUTCHours(23, 59, 59, 999);

    // First search by date range
    const response = await getMedia({
      after: startDate.toISOString(),
      before: endDate.toISOString(),
      per_page: 100
    });

    // Then filter by filename in the source_url
    const targetMedia = response.data.find(media => 
      media.source_url.toLowerCase().includes(filename.toLowerCase())
    );

    return targetMedia || null;
  } catch (error) {
    console.error('Media search error:', error);
    return null;
  }
};