import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { createMovieResource } from "./movieResource";
import type { Movie } from "../../services/movieService";

// Component that shows the movie detail
const MovieDetailContent: React.FC<{
  resource: ReturnType<typeof createMovieResource>;
}> = ({ resource }) => {
  // Get the movie data (Suspense will wait if not ready)
  const movie: Movie = resource.read();

  return (
    <div className="bg-gray-900 min-h-screen relative text-white">
      <Navbar />

      {/* --- Blurred background as main hero section --- */}
      <div className="relative h-[80vh] flex items-center justify-center text-center">
        {/* Blurred poster background */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover blur-2xl z-0"
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

// Main component
const MovieDetail: React.FC = () => {
  const { id = "0" } = useParams<{ id: string }>();

  // Create a resource for this movie ID
  const resource = createMovieResource(id);

  return (
    <Suspense
      fallback={
        <p className="text-white text-center mt-10">Loading movie...</p>
      }
    >
      {/* Suspense shows fallback until resource is ready */}
      <MovieDetailContent resource={resource} />
    </Suspense>
  );
};

export default MovieDetail;
