'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { getPosts } from '@/lib/wordpress/api';
import { PlaceholdersAndVanishInput } from '../ui/placeholders-and-vanish-input';
import type { WPPost } from '@/types/wordpress';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [searchResults, setSearchResults] = useState<WPPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeholders = [
    "Search for articles...",
    "What are you looking for?",
    "Type your query here...",
    "Find articles by keyword...",
    "Explore our blog content...",
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setError(null);
  };

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsLoading(true);
      getPosts(1, { search: debouncedQuery, per_page: 100 })
        .then((response) => {
          setSearchResults(response.data);
          setError(null);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setError('Failed to fetch search results. Please try again.');
          setSearchResults([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [debouncedQuery]);

  // Modified handleSubmit to only prevent default form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No redirection logic here
  };

  return (
    <div className="mb-10 max-w-2xl mx-auto">
      <div className="group relative">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleSearch}
          onSubmit={handleSubmit} // Still prevent default form submission
        />
      </div>

      {/* Search results display remains unchanged */}
      {isLoading && (
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-500 dark:text-red-400">
          {error}
        </div>
      )}

      {!isLoading && searchResults.length > 0 && (
        <div className="mt-2 bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-semibold mb-2">Search Results</h3>
          <ul className="space-y-2">
            {searchResults.map((post) => (
              <li key={post.id}>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  {post.title.rendered}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isLoading && debouncedQuery.trim() && searchResults.length === 0 && !error && (
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
          No results found for "{debouncedQuery}".
        </div>
      )}
    </div>
  );
}