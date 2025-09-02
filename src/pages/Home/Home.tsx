// src/pages/Home/Home.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../services/movieService"; // type-only import

type ContentFilter = "all" | "movie" | "series";

const Home: React.FC = () => {
  // State to store fetched movies
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;
  // !Filter
  const [filter, setFilter] = useState<ContentFilter>("all");

  // !Fetch movies on component mount
  useEffect(() => {
    const getMovies = async () => {
      const movieData = await fetchMovies();
      setMovies(movieData);
      setLoading(false);
    };
    getMovies();
  }, []);

  const filteredMovies =
    filter === "all" ? movies : movies.filter((m) => m.type === filter);

  // !Pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />

      {/* Filter section */}
      <div className="mb-4 flex items-center justify-center">
        <div className="flex gap-2">
          {(["all", "movie", "series"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded text-sm transition ${
                filter === f
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {f === "all" ? "All" : f === "movie" ? "Movies" : "Series"}
            </button>
          ))}
        </div>
      </div>

      {/* Wrapper div to center content and limit max width */}
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
        <div className="flex justify-center space-x-2 mt-6">
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
      </main>

      <Footer />
    </div>
  );
};

export default Home;
