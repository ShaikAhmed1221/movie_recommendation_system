import React from "react";

const SearchSection = ({
  query,
  onSearch,
  searchResults,
  onSelectMovie,
  isLoading,
}) => {
  return (
    <section className="mb-12">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            id="search"
            type="text"
            placeholder="Search for movies... (e.g., Inception, The Dark Knight)"
            value={query}
            onChange={onSearch}
            className="w-full p-4 pl-12 rounded-2xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg shadow-lg"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="mt-2 bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl max-h-80 overflow-y-auto">
            {searchResults.slice(0, 8).map((movie) => (
              <div
                key={movie.id}
                className="p-4 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0 transition-colors duration-200"
                onClick={() => onSelectMovie(movie)}
              >
                <div className="flex items-center space-x-4">
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{movie.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                      <span>
                        {movie.release_date
                          ? movie.release_date.split("-")[0]
                          : "N/A"}
                      </span>
                      {movie.vote_average > 0 && (
                        <span className="flex items-center space-x-1">
                          <span>⭐</span>
                          <span>{movie.vote_average.toFixed(1)}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-2xl text-gray-500">→</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isLoading && query.length >= 2 && (
          <div className="mt-4 text-center text-gray-400">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-purple-500"></div>
              <span>Searching movies...</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchSection;
