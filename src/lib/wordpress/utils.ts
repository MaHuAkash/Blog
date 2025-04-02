export const normalizeSlug = (slug: string): string => {
    try {
      return decodeURIComponent(slug)
        .toLowerCase()
        .normalize('NFD') // Normalize diacritics
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-{2,}/g, '-')
        .replace(/^-+|-+$/g, '');
    } catch (error) {
      console.error('Slug normalization error:', error);
      return slug;
    }
  };
  
  export const validateSlug = (slug: string): boolean => {
    return /^[a-z0-9-]{1,200}$/.test(slug);
  };
  
  export const getWordPressHost = (url: string) => {
    try {
      const { protocol, hostname, port } = new URL(url);
      return { protocol, hostname, port };
    } catch (error) {
      console.error('Invalid WordPress URL:', url);
      return { protocol: 'http:', hostname: 'localhost', port: '' };
    }
  };