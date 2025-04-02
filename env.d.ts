declare namespace NodeJS {
    interface ProcessEnv {
      readonly NEXT_PUBLIC_WORDPRESS_API_URL: string;
      readonly JWT_SECRET?: string;
    }
  }