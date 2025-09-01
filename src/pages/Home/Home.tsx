import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchMovies, Movie } from "../../services/movieService";

// !Home page component
const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  //   !Fetch movies when component mounts
  useEffect(() => {
    const getMovies = async () => {
      const movieData = await fetchMovies();
      setMovies(movieData);
      setLoading(false);
    };
    getMovies();
  });

  return (
    // ! Main container with dark background
    <div className="bg-gray-900 min-h-screen">
      {/* Navbar */}
      <Navbar />
      {/* Movie list grid */}
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
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
