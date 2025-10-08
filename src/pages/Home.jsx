import React, { useState, useEffect, useRef } from "react";
import HeroSection from "../components/HeroSection";
import SectionHeader from "../components/SectionHeader";
import MovieDetailView from "../components/MovieDetailView";

const API_KEY = "0f120aa84992c9f325ae032b17242821";

const Home = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavs);
    loadTrendingMovies();

    // Handle scroll effect for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const loadTrendingMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      );
      const data = await res.json();
      const formattedMovies = data.results.slice(0, 12).map((movie) => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "",
        rating: movie.vote_average.toFixed(1),
        genres: movie.genre_ids || [],
        cast: [],
        overview: movie.overview,
        backdrop: movie.backdrop_path
          ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
          : "",
      }));
      setTrendingMovies(formattedMovies);
      setFeaturedMovie(formattedMovies[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length < 2) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = async (movie) => {
    setIsLoading(true);
    setSelectedMovie(null);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=credits,recommendations`
      );
      const data = await res.json();

      setSelectedMovie({
        id: data.id,
        title: data.title,
        year: data.release_date ? data.release_date.split("-")[0] : "N/A",
        genres: data.genres.map((g) => g.name),
        rating: data.vote_average.toFixed(1),
        poster: data.poster_path
          ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
          : "",
        cast: data.credits.cast.slice(0, 6).map((c) => c.name),
        overview: data.overview,
        runtime: data.runtime,
        director:
          data.credits.crew.find((person) => person.job === "Director")?.name ||
          "Unknown",
        budget: data.budget,
        revenue: data.revenue,
      });

      const recs = data.recommendations.results.slice(0, 12).map((m) => ({
        id: m.id,
        title: m.title,
        year: m.release_date ? m.release_date.split("-")[0] : "N/A",
        poster: m.poster_path
          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
          : "",
        rating: m.vote_average.toFixed(1),
        genres: m.genre_ids || [],
        cast: [],
        overview: m.overview,
      }));
      setRecommendations(recs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = (movie) => {
    const isFav = favorites.some((fav) => fav.id === movie.id);
    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const clearSelection = () => {
    setSelectedMovie(null);
    setRecommendations([]);
    setSearchResults([]);
    setQuery("");
  };

  const scrollRow = (rowRef, direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -600 : 600;
      rowRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // MovieRow Component (Netflix-style horizontal scroll)
  const MovieRow = ({ title, movies }) => {
    const rowRef = useRef();

    if (!movies || movies.length === 0) return null;

    return (
      <div className="relative mb-12 w-full">
        <SectionHeader title={title} emoji="🎬" gradient={true} />
        <div className="relative group w-full">
          {/* Left Arrow - Show on hover */}
          <button
            className="absolute left-0 z-20 h-full px-4 bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 rounded-r-xl"
            onClick={() => scrollRow(rowRef, "left")}
          >
            ◀
          </button>

          {/* Movie Row - Completely hidden scrollbar */}
          <div
            ref={rowRef}
            className="flex space-x-6 overflow-x-auto px-8 py-4 scroll-smooth w-full"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="flex-none w-56 cursor-pointer transform hover:scale-110 transition-transform duration-300"
                onClick={() => handleSelectMovie(movie)}
              >
                <div className="relative">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-80 object-cover rounded-xl shadow-2xl"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/224x320/333333/FFFFFF?text=No+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent rounded-xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-white text-sm mb-1 line-clamp-1">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-gray-300">
                      {movie.year} • ⭐{movie.rating}
                    </p>
                  </div>
                  <button
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110 ${
                      favorites.some((fav) => fav.id === movie.id)
                        ? "bg-red-600"
                        : "bg-black/70 hover:bg-red-600"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(movie);
                    }}
                  >
                    {favorites.some((fav) => fav.id === movie.id) ? "❤️" : "🤍"}
                  </button>
                  <div className="absolute top-3 left-3">
                    <div className="bg-black/70 rounded-full px-2 py-1 text-xs text-white border border-white/20">
                      ⭐ {movie.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow - Show on hover */}
          <button
            className="absolute right-0 z-20 h-full px-4 bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 rounded-l-xl"
            onClick={() => scrollRow(rowRef, "right")}
          >
            ▶
          </button>
        </div>
      </div>
    );
  };

  if (selectedMovie) {
    return (
      <MovieDetailView
        movie={selectedMovie}
        onLike={handleLike}
        liked={favorites.some((fav) => fav.id === selectedMovie.id)}
        onBack={clearSelection}
        recommendations={recommendations}
        onSelectMovie={handleSelectMovie}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white w-full overflow-x-hidden">
      {/* Enhanced Netflix-style Navbar */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-red-600/20 shadow-2xl shadow-black/50"
            : "bg-gradient-to-b from-black via-black/90 to-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Left Section - Logo & Navigation */}
            <div className="flex items-center space-x-10">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/30">
                  <span className="text-white font-bold text-lg">CV</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent tracking-tight">
                  CineView
                </h1>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                <a
                  href="#trending"
                  className="text-white/90 hover:text-red-400 transition-all duration-300 font-semibold text-lg relative group"
                >
                  Trending
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a
                  href="#favorites"
                  className="text-white/90 hover:text-red-400 transition-all duration-300 font-semibold text-lg relative group"
                >
                  Favorites
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a
                  href="#search"
                  className="text-white/90 hover:text-red-400 transition-all duration-300 font-semibold text-lg relative group"
                >
                  Search
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </nav>
            </div>

            {/* Right Section - Favorites & Mobile Menu */}
            <div className="flex items-center space-x-6">
              {/* Favorites Counter */}
              <div className="flex items-center space-x-3 bg-gradient-to-r from-red-600/20 to-red-500/10 rounded-2xl px-4 py-2.5 border border-red-600/30 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 group cursor-pointer">
                <span className="text-red-400 text-xl group-hover:scale-110 transition-transform duration-300">
                  ❤️
                </span>
                <span className="text-white font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text ">
                  {favorites.length}
                </span>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex flex-col space-y-1.5 p-2 rounded-lg hover:bg-red-600/20 transition-colors duration-300"
              >
                <span
                  className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`lg:hidden transition-all duration-500 overflow-hidden ${
              isMobileMenuOpen
                ? "max-h-40 opacity-100 py-4"
                : "max-h-0 opacity-0"
            }`}
          >
            <nav className="flex flex-col space-y-4 border-t border-gray-800 pt-4">
              <a
                href="#trending"
                className="text-white/90 hover:text-red-400 transition-all duration-300 font-semibold text-lg py-2 px-4 rounded-lg hover:bg-red-600/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trending
              </a>
              <a
                href="#favorites"
                className="text-white/90 hover:text-red-400 transition-all duration-300 font-semibold text-lg py-2 px-4 rounded-lg hover:bg-red-600/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Favorites
              </a>
              <a
                href="#search"
                className="text-white/90 hover:text-red-400 transition-all duration-300 font-semibold text-lg py-2 px-4 rounded-lg hover:bg-red-600/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Search
              </a>
            </nav>
          </div>
        </div>

        {/* Decorative Gradient Line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-red-600/50 to-transparent w-full"></div>
      </header>

      {/* Add padding to account for fixed navbar */}
      <div className="pt-28 lg:pt-32">
        {/* Hero Section with Featured Movie */}
        {featuredMovie && (
          <div className="relative h-[70vh] min-h-[600px] bg-gradient-to-b from-gray-900 to-black w-full overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <img
                src={featuredMovie.backdrop || featuredMovie.poster}
                alt={featuredMovie.title}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            <div className="relative z-10 h-full flex items-end pb-20 w-full">
              <div className="container mx-auto px-8 w-full">
                <div className="max-w-3xl w-full">
                  <h1 className="text-6xl font-bold mb-6 text-white">
                    {featuredMovie.title}
                  </h1>
                  <div className="flex items-center space-x-6 mb-6">
                    <span className="text-green-400 font-semibold text-xl">
                      ⭐ {featuredMovie.rating}
                    </span>
                    <span className="text-gray-300 text-xl">
                      {featuredMovie.year}
                    </span>
                  </div>
                  <p className="text-gray-200 text-xl mb-8 line-clamp-3 leading-relaxed">
                    {featuredMovie.overview}
                  </p>
                  <div className="flex space-x-4">
                    <button
                      className="bg-red-600 text-white px-8 py-3 rounded font-semibold text-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105 w-48 shadow-lg shadow-red-600/25"
                      onClick={() => handleSelectMovie(featuredMovie)}
                    >
                      ℹ️ More Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Section */}
        <div id="search" className="relative z-20 -mt-16 mb-8 w-full">
          <div className="container mx-auto px-8 w-full">
            <HeroSection
              query={query}
              onSearch={handleSearch}
              searchResults={searchResults}
              onSelectMovie={handleSelectMovie}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Movie Rows */}
        <div className="relative z-10 -mt-8 w-full">
          <div className="space-y-16 pb-20 w-full">
            {/* Trending */}
            {trendingMovies.length > 0 && (
              <div id="trending" className="w-full">
                <MovieRow title="Trending Now" movies={trendingMovies} />
              </div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="w-full">
                <MovieRow
                  title="Recommended For You"
                  movies={recommendations}
                />
              </div>
            )}

            {/* Favorites */}
            {favorites.length > 0 && (
              <div id="favorites" className="w-full">
                <MovieRow title="Your Favorites" movies={favorites} />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black border-t border-gray-800 py-12 text-center w-full">
          <div className="container mx-auto w-full">
            <p className="text-lg text-red-600 mb-2">
              CineView • Powered by TMDB • Built with React
            </p>
            <p className="text-sm text-red-500">
              © {new Date().getFullYear()} CineView. All movie data provided by
              The Movie Database.
            </p>
          </div>
        </footer>
      </div>

      {/* Global CSS to hide scrollbars */}
      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .overflow-x-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Smooth scrolling for anchor links */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Home;
