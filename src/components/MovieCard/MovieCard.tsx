import React from "react";
import { Link } from "react-router-dom";

// !Props for
type MovieCardProps = {
  id: number; // Movie ID for linking
  title: string;
  year: number;
  genre: string;
  thumbnail: string;
};
// !MovieCard component
const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  year,
  genre,
  thumbnail,
}) => {
  return (
    // !Card container with shadow and rounded corners
    <Link to={`/movie/${id}`}>
      <div className="bg-gray-900 text-white rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Movie poster image */}
        <img
          src={thumbnail}
          alt={title}
          className="w-full aspect-[2/3] object-cover rounded-t-lg"
        />

        {/* Movie details */}
        <div className="p-4">
          <h2 className="font-bold text-lg">{title}</h2>
          <p className="text-gray-400">
            {genre} | {year}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
