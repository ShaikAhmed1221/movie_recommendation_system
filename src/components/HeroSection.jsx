import React from "react";

const HeroSection = ({
  query,
  onSearch,
  searchResults,
  onSelectMovie,
  isLoading,
}) => {
  return (
    <section className="text-center mb-16 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Discover Amazing Movies
        </h2>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Explore thousands of movies, get personalized recommendations, and
          build your ultimate watchlist. Your cinematic journey starts here.
        </p>

        {/* Centered Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for movies... (e.g., Inception, The Dark Knight)"
              value={query}
              onChange={onSearch}
              className="w-full p-5 pl-14 pr-6 rounded-2xl bg-gray-800/90 border-2 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 text-lg shadow-2xl backdrop-blur-sm transition-all duration-300"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl">
              🔍
            </div>
          </div>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="mt-3 bg-gray-800/95 backdrop-blur-lg rounded-2xl border border-gray-600 shadow-2xl max-h-80 overflow-y-auto">
              {searchResults.slice(0, 8).map((movie) => (
                <div
                  key={movie.id}
                  className="p-4 hover:bg-gray-700/80 cursor-pointer border-b border-gray-600 last:border-b-0 transition-all duration-200"
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
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-white text-lg">
                        {movie.title}
                      </h3>
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
              <div className="inline-flex items-center space-x-3 bg-gray-800/80 px-4 py-2 rounded-full">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-purple-500"></div>
                <span className="text-sm">Searching movies...</span>
              </div>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl group text-center">
            <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">
              🎯
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Smart Search</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Find exactly what you're looking for with instant results
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-pink-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl group text-center">
            <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">
              ❤️
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Save Favorites
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Build your personal collection of loved movies
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl group text-center">
            <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">
              🔥
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Smart Recommendations
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Discover new movies based on your tastes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
