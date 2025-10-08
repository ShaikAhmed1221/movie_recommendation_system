import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({
  movies,
  onLike,
  favorites,
  horizontal,
  onSelectMovie,
}) => {
  if (movies.length === 0) return null;

  return (
    <div
      className={
        horizontal
          ? "flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      }
    >
      {movies.map((movie) => (
        <div
          key={movie.id}
          className={horizontal ? "flex-shrink-0 w-80" : "h-full"}
        >
          <MovieCard
            movie={movie}
            onLike={onLike}
            liked={favorites.some((fav) => fav.id === movie.id)}
            onSelectMovie={onSelectMovie}
          />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
