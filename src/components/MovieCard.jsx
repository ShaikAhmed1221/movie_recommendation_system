import React from "react";

const MovieCard = ({ movie, onLike, liked, onSelectMovie }) => {
  const handleCardClick = () => {
    if (onSelectMovie) {
      onSelectMovie(movie);
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onLike(movie);
  };

  return (
    <div
      className="group relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 flex flex-col h-full cursor-pointer hover:scale-105 hover:shadow-2xl"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden h-80 flex-shrink-0">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjM0Y0QTUwIi8+CjxwYXRoIGQ9Ik04MCAxMjBIMTIwVjE4MEg4MFYxMjBaIiBmaWxsPSIjNkI3MjgwIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjkwIiByPSIyMCIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">🎬</div>
              <div className="text-sm">No Image</div>
            </div>
          </div>
        )}
        {/* Gradient overlay for better text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent" />

        {/* Rating Badge */}
        {movie.rating && (
          <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-500/30">
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="text-white font-bold text-sm">{movie.rating}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5 min-h-48">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-3 flex-shrink-0">
          <h3 className="font-bold text-white flex-1 pr-2 line-clamp-2 text-lg leading-tight">
            {movie.title}
            {movie.year && (
              <span className="text-gray-400 font-normal block text-sm mt-1">
                ({movie.year})
              </span>
            )}
          </h3>
        </div>

        {/* Movie Details */}
        <div className="space-y-3 mb-4 flex-1 min-h-0">
          {movie.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {movie.genres.slice(0, 2).map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30"
                >
                  {genre}
                </span>
              ))}
              {movie.genres.length > 2 && (
                <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded-full text-xs">
                  +{movie.genres.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Overview */}
          {movie.overview && (
            <div className="mt-2">
              <p className="text-gray-300 leading-relaxed text-sm line-clamp-3">
                {movie.overview.slice(0, 120)}
                {movie.overview.length > 120 ? "..." : ""}
              </p>
            </div>
          )}
        </div>

        {/* Like Button - Separate from card hover */}
        <div className="flex-shrink-0 mt-2">
          <button
            onClick={handleLikeClick}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 border-2 ${
              liked
                ? "bg-gradient-to-r from-pink-600 to-red-600 border-transparent shadow-lg shadow-pink-500/25 hover:from-pink-700 hover:to-red-700"
                : "bg-gray-800 border-gray-600 hover:border-purple-500 hover:bg-gray-700"
            }`}
          >
            <span className="text-lg">{liked ? "❤️" : "🤍"}</span>
            <span className="text-sm">
              {liked ? "Favorited" : "Add to Favorites"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
