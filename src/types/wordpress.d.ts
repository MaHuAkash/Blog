// types/wordpress.d.ts

/**
 * WordPress Post Interface
 * Includes all common fields from WP REST API
 */
export interface WPPost {
    id: number;
    slug: string;
    status: 'publish' | 'draft' | 'future' | 'pending' | 'private';
    type: string;
    link: string;
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
      protected: boolean;
    };
    excerpt: {
      rendered: string;
      protected: boolean;
    };
    date: string;
    modified: string;
    author: number;
    featured_media: number;
    comment_status: 'open' | 'closed';
    ping_status: 'open' | 'closed';
    sticky: boolean;
    template: string;
    format: 'standard' | 'aside' | 'gallery' | 'link' | 'image' | 'quote' | 'status' | 'video' | 'audio' | 'chat';
    meta: Record<string, any>;
    categories: number[];
    tags: number[];
    _embedded?: {
      author?: WPUser[];
      'wp:featuredmedia'?: WPMedia[];
      'wp:term'?: Array<WPCategory[] | WPTag[]>;
    };
  }
  
  /**
   * WordPress User Interface
   */
  export interface WPUser {
    id: number;
    name: string;
    url: string;
    description: string;
    link: string;
    slug: string;
    avatar_urls: {
      '24': string;
      '48': string;
      '96': string;
    };
    meta: Record<string, any>;
    _links?: Record<string, any>;
  }
  
  /**
   * WordPress Media Interface
   */
  export interface WPMedia {
    author_name: ReactNode;
    id: number;
    date: string;
    slug: string;
    type: string;
    link: string;
    title: {
      rendered: string;
    };
    author: number;
    caption: {
      rendered: string;
    };
    description: {
      rendered: string;
    };
    alt_text: string;
    media_type: 'image' | 'video' | 'audio' | 'application';
    mime_type: string;
    media_details: {
      mime_type: string | undefined;
      thumbnail: any;
      width: number;
      height: number;
      file: string;
      filesize: number;
      sizes: Record<string, {
        file: string;
        width: number;
        height: number;
        mime_type: string;
        source_url: string;
      }>;
      image_meta: Record<string, any>;
    };
    source_url: string;
    _links?: Record<string, any>;
  }
  
  /**
   * WordPress Category Interface
   */
  export interface WPCategory {
    id: number;
    count: number;
    description: string;
    link: string;
    meta: Record<string, any>;
    name: string;
    slug: string;
    taxonomy: 'category';
    parent: number;
    _links?: Record<string, any>;
  }
  
  /**
   * WordPress Tag Interface
   */
  export interface WPTag {
    id: number;
    count: number;
    description: string;
    link: string;
    meta: Record<string, any>;
    name: string;
    slug: string;
    taxonomy: 'post_tag';
    _links?: Record<string, any>;
  }
  
  /**
   * WordPress API Error Response
   */
  export interface WPError {
    code: string;
    message: string;
    data?: {
      status: number;
      params?: Record<string, any>;
      details?: Record<string, any>;
    };
  }
  
  /**
   * WordPress REST API Pagination Headers
   */
  export interface WPPagination {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  }
  
  /**
   * WordPress API List Response
   */
  export interface WPListResponse<T> {
    data: T[];
    pagination: WPPagination;
    error?: WPError;
  }
  
  // Additional utility types
  export type WPContentNode = WPPost | WPMedia | WPCategory | WPTag;
  export type WPContentType = 'post' | 'page' | 'media' | 'category' | 'tag';