export default function SearchBar() {
  return (
    <div className="mb-10 max-w-2xl mx-auto">
      <div className="group relative">
        {/* Search Icon */}
        <svg 
          className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 
                     transition-colors duration-300 group-focus-within:text-blue-600
                     dark:text-gray-400 dark:group-focus-within:text-blue-500"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M21 21l-5.2-5.2m2.8 2.8a8 8 0 11-11.3-11.3 8 8 0 0111.3 11.3z" 
          />
        </svg>

        {/* Input Field */}
        <input 
          type="text" 
          placeholder="Search articles..." 
          className="w-full pl-14 pr-6 py-4 rounded-xl border-2 border-gray-200
                     bg-white/80 backdrop-blur-sm placeholder-gray-500/90
                     hover:border-blue-400/80 focus:border-blue-600/90
                     focus:outline-none focus:ring-4 focus:ring-blue-500/20
                     transition-all duration-300 shadow-sm hover:shadow-md
                     dark:bg-gray-900/80 dark:border-gray-700 dark:placeholder-gray-400
                     dark:hover:border-blue-500/90 dark:focus:border-blue-500
                     dark:focus:ring-blue-500/30 dark:text-gray-100"
          aria-label="Search articles"
        />

        {/* Microphone Icon (optional) */}
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                     hover:bg-gray-100/50 transition-colors duration-200
                     dark:hover:bg-gray-800"
          aria-label="Voice search"
        >
          <svg
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}