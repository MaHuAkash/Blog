// lib/cookies.ts
export function getColorSchemeCookie(): string | null {
    if (typeof document !== 'undefined') {
      return document.cookie
        .split('; ')
        .find(row => row.startsWith('colorScheme='))
        ?.split('=')[1] || null;
    }
    return null;
  }