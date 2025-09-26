// src/pages/Home/Home.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../services/movieService";

type ContentFilter = "all" | "movie" | "series";

const Home: React.FC = () => {
  //! State
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  const [filter, setFilter] = useState<ContentFilter>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [genreFilter, setGenreFilter] = useState<string>("all");
  const [genreOpen, setGenreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const genres = Array.from(new Set(movies.map((m) => m.genre)));

  //! Fetch movies
  useEffect(() => {
    const getMovies = async () => {
      const movieData = await fetchMovies();
      setMovies(movieData);
      setLoading(false);
    };
    getMovies();
  }, []);

  //! Filter & Sort
  const filteredMovies = movies
    .filter((m) => filter === "all" || m.type === filter)
    .filter((m) => genreFilter === "all" || m.genre === genreFilter);

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    return sortOrder === "newest" ? b.year - a.year : a.year - b.year;
  });

  //! Pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(sortedMovies.length / moviesPerPage);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />

      {/* Filter + Sort section */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
        {/* Desktop Filters */}
        <div className="hidden sm:flex flex-wrap items-center gap-2">
          {(["all", "movie", "series"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md text-sm transition min-w-[80px] text-center ${
                filter === f
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {f === "all" ? "All" : f === "movie" ? "Movies" : "Series"}
            </button>
          ))}

          <button
            onClick={() => setSortOrder("newest")}
            className={`px-4 py-2 rounded-md text-sm transition min-w-[80px] text-center ${
              sortOrder === "newest"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortOrder("oldest")}
            className={`px-4 py-2 rounded-md text-sm transition min-w-[80px] text-center ${
              sortOrder === "oldest"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Oldest
          </button>

          {/* Genre Filter */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => setGenreOpen((prev) => !prev)}
              className="px-4 py-2 rounded-md text-sm min-w-[80px] text-center bg-gray-800 text-white shadow hover:bg-gray-700 focus:outline-none"
            >
              {genreFilter === "all" ? "All Genres" : genreFilter}
            </button>

            {genreOpen && (
              <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setGenreFilter("all");
                      setGenreOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  >
                    All Genres
                  </button>
                  {genres.map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setGenreFilter(g);
                        setGenreOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="px-4 py-2 rounded-md bg-gray-800 text-white text-sm shadow hover:bg-gray-700 focus:outline-none"
          >
            Filters
          </button>

          {mobileMenuOpen && (
            <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-50 flex flex-col gap-2 p-2">
              {(["all", "movie", "series"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-md text-sm text-left ${
                    filter === f
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {f === "all" ? "All" : f === "movie" ? "Movies" : "Series"}
                </button>
              ))}

              <button
                onClick={() => {
                  setSortOrder("newest");
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-md text-sm text-left ${
                  sortOrder === "newest"
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Newest
              </button>
              <button
                onClick={() => {
                  setSortOrder("oldest");
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-md text-sm text-left ${
                  sortOrder === "oldest"
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Oldest
              </button>

              <button
                onClick={() => setGenreOpen((prev) => !prev)}
                className="px-4 py-2 rounded-md text-sm text-left bg-gray-800 text-white hover:bg-gray-700"
              >
                {genreFilter === "all" ? "All Genres" : genreFilter}
              </button>

              {genreOpen && (
                <div className="flex flex-col gap-1 mt-1">
                  <button
                    onClick={() => {
                      setGenreFilter("all");
                      setGenreOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-sm text-left text-gray-200 hover:bg-gray-700 rounded-md"
                  >
                    All Genres
                  </button>
                  {genres.map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setGenreFilter(g);
                        setGenreOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-left text-gray-200 hover:bg-gray-700 rounded-md"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Movies Grid */}
      <main className="p-8">
        <div className="mx-auto max-w-[1400px]">
          <div
            className="grid gap-6
                   grid-cols-2
                   sm:grid-cols-2
                   md:grid-cols-5
                   lg:grid-cols-5"
          >
            {loading ? (
              <p className="text-white text-center col-span-full">
                Loading movies...
              </p>
            ) : (
              currentMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  year={movie.year}
                  genre={movie.genre}
                  thumbnail={movie.thumbnail}
                />
              ))
            )}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {/* دسکتاپ - نمایش همه دکمه‌ها */}
          <div className="hidden sm:flex space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-red-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* موبایل - نمایش فقط چند دکمه */}
          <div className="flex sm:hidden space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 || // همیشه اول
                  page === totalPages || // همیشه آخر
                  (page >= currentPage - 2 && page <= currentPage + 2) // نزدیک فعلی
              )
              .map((page, idx, arr) => (
                <React.Fragment key={page}>
                  {/* نقطه‌چین بین فاصله‌ها */}
                  {idx > 0 && page - arr[idx - 1] > 1 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}

                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded cursor-pointer ${
                      currentPage === page
                        ? "bg-red-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
