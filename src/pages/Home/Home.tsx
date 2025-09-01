// src/pages/Home/Home.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../services/movieService"; // type-only import

const Home: React.FC = () => {
  // State to store fetched movies
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch movies on component mount
  useEffect(() => {
    const getMovies = async () => {
      const movieData = await fetchMovies();
      setMovies(movieData);
      setLoading(false);
    };
    getMovies();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />

      <main className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-white text-center col-span-3">Loading movies...</p>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              genre={movie.genre}
              cover={movie.cover}
            />
          ))
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
