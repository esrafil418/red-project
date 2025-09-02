import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../services/movieService";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ حالا moviesPerPage دیگه state هست
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getMovies = async () => {
      const movieData = await fetchMovies();
      setMovies(movieData);
      setLoading(false);
    };
    getMovies();
  }, []);

  // Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />

      {/* ✅ Dropdown برای انتخاب تعداد آیتم‌ها */}
      <div className="flex justify-end px-8 pt-4">
        <select
          value={moviesPerPage}
          onChange={(e) => {
            setMoviesPerPage(Number(e.target.value));
            setCurrentPage(1); // وقتی تغییر دادیم برگرده به صفحه 1
          }}
          className="bg-gray-800 text-white rounded px-2 py-1"
        >
          <option value={5}>5 per page</option>
          <option value={8}>8 per page</option>
          <option value={10}>10 per page</option>
          <option value={12}>12 per page</option>
        </select>
      </div>

      {/* Grid of movies */}
      <main className="p-8">
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

        {/* Pagination controls */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
