import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../services/movieService";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const getMovie = async () => {
      const movies = await fetchMovies();
      const selectedMovies = movies.find((m) => m.id === parseInt(id || "0"));
      setMovie(selectedMovies || null);
    };
    getMovie();
  }, [id]);

  if (!movie)
    return <p className="text-white text-center mt-10">Loading movie...</p>;

  return (
    <div className="bg-gray-900 min-h-screen relative text-white">
      <Navbar />

      {/* --- Blurred background as main hero section --- */}
      <div className="relative h-[80vh] flex items-center justify-center text-center">
        {/* Blurred poster background */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 z-0"
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/70 z-10" />

        {/* Foreground text */}
        <div className="relative z-20 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
          <p className="mt-3 text-lg text-gray-200">
            {movie.genre} • {movie.year}
          </p>
          <p className="mt-6 text-gray-100 leading-7">{movie.description}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetail;
