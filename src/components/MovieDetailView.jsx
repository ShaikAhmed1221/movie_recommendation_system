import React, { useRef } from "react";
import SectionHeader from "./SectionHeader";
import { useEffect } from "react";

const MovieDetailView = ({
  movie,
  onLike,
  liked,
  onBack,
  recommendations,
  onSelectMovie,
}) => {
  const recRowRef = useRef();

  const scrollRow = (rowRef, direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -600 : 600;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [movie]);

  const handleRecommendationClick = (recMovie) => {
    if (onSelectMovie) {
      onSelectMovie(recMovie);
    }
  };

  // Format large numbers with commas
  const formatNumber = (num) => {
    return num ? `$${num.toLocaleString()}` : "N/A";
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Back button */}
      <header className="sticky top-0 z-50 bg-gradient-to-b from-black to-transparent p-6 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center space-x-3 px-6 py-3 bg-black/70 hover:bg-red-600 rounded-full transition-all duration-300 transform hover:scale-105 border border-gray-700"
        >
          <span className="text-xl">←</span>
          <span className="font-semibold">Back to Browse</span>
        </button>
        <h1 className="text-4xl font-bold text-red-600">CineView</h1>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Poster Section */}
          <div className="lg:w-2/5 xl:w-1/3">
            <div className="relative group">
              <img
                src={movie.poster}
                alt={movie.title}
                className="rounded-2xl w-full h-auto object-cover shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x600/333333/FFFFFF?text=No+Image";
                }}
              />
              <button
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 transform hover:scale-110 ${
                  liked ? "bg-red-600" : "bg-black/70 hover:bg-red-600"
                }`}
                onClick={() => onLike(movie)}
              >
                {liked ? "❤️" : "🤍"}
              </button>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  ⭐ {movie.rating}
                </div>
                <div className="text-sm text-gray-400 mt-1">Rating</div>
              </div>
              {movie.runtime && (
                <div className="bg-gray-900/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">
                    ⏱️ {movie.runtime}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">Minutes</div>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-3/5 xl:w-2/3 flex flex-col justify-start space-y-8">
            {/* Title and Basic Info */}
            <div>
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {movie.title}
              </h2>

              <div className="flex items-center space-x-6 text-gray-300 text-lg">
                <span className="font-semibold">{movie.year}</span>
                {movie.runtime && (
                  <>
                    <span className="text-gray-500">•</span>
                    <span>⏱️ {movie.runtime} min</span>
                  </>
                )}
                {movie.director && movie.director !== "Unknown" && (
                  <>
                    <span className="text-gray-500">•</span>
                    <span>🎬 {movie.director}</span>
                  </>
                )}
              </div>
            </div>

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-3 text-red-500">Genres</h3>
                <div className="flex flex-wrap gap-3">
                  {movie.genres.map((genre, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-red-600 rounded-full text-white font-semibold transform hover:scale-105 transition-transform cursor-default"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div>
              <h3 className="text-3xl font-bold mb-4 text-red-500">Synopsis</h3>
              <p className="text-gray-200 text-lg leading-relaxed bg-gray-900/30 rounded-2xl p-6">
                {movie.overview || "No synopsis available."}
              </p>
            </div>

            {/* Cast */}
            {movie.cast?.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold mb-4 text-red-500">Cast</h3>
                <div className="flex flex-wrap gap-3">
                  {movie.cast.map((actor, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-800/50 rounded-xl px-4 py-3 text-sm hover:bg-red-600 transition-all duration-300 transform hover:scale-105 cursor-default border border-gray-700"
                    >
                      {actor}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Financial Info */}
            {(movie.budget > 0 || movie.revenue > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movie.budget > 0 && (
                  <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
                    <h4 className="text-lg font-bold text-red-500 mb-2">
                      Budget
                    </h4>
                    <p className="text-2xl font-bold text-white">
                      {formatNumber(movie.budget)}
                    </p>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
                    <h4 className="text-lg font-bold text-red-500 mb-2">
                      Revenue
                    </h4>
                    <p className="text-2xl font-bold text-white">
                      {formatNumber(movie.revenue)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-16 relative">
            <SectionHeader
              title="More Like This"
              emoji="🎬"
              subtitle="Similar movies you might enjoy"
            />

            <div className="relative flex items-center group">
              {/* Left Arrow */}
              <button
                className="absolute left-0 z-20 h-full px-4 bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 rounded-r-xl"
                onClick={() => scrollRow(recRowRef, "left")}
              >
                ◀
              </button>

              {/* Recommendations Row */}
              <div
                ref={recRowRef}
                className="flex space-x-6 overflow-x-auto px-2 py-6 scroll-smooth w-full"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="flex-none w-56 cursor-pointer transform hover:scale-110 transition-transform duration-300"
                    onClick={() => handleRecommendationClick(rec)}
                  >
                    <div className="relative">
                      <img
                        src={rec.poster}
                        alt={rec.title}
                        className="w-full h-80 object-cover rounded-xl shadow-2xl"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/224x320/333333/FFFFFF?text=No+Image";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent rounded-xl" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-bold text-white text-sm mb-1 line-clamp-1">
                          {rec.title}
                        </h3>
                        <p className="text-xs text-gray-300">
                          {rec.year} • ⭐{rec.rating}
                        </p>
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="bg-black/70 rounded-full px-2 py-1 text-xs text-white border border-white/20">
                          ⭐ {rec.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                className="absolute right-0 z-20 h-full px-4 bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 rounded-l-xl"
                onClick={() => scrollRow(recRowRef, "right")}
              >
                ▶
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 text-center mt-12">
        <div className="container mx-auto">
          <p className="text-red-600 mb-2">
            CineView • Powered by TMDB • Built with React
          </p>
          <p className="text-red-500 text-sm">
            © {new Date().getFullYear()} CineView. All movie data provided by
            The Movie Database.
          </p>
        </div>
      </footer>

      {/* Global CSS to hide scrollbars */}
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .overflow-x-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MovieDetailView;
