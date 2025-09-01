import React from "react";

// !Props for
type MovieCardProps = {
  title: string;
  year: number;
  genre: string;
  cover: string;
};
// ?MovieCard component
const MovieCard: React.FC<MovieCardProps> = ({ title, year, genre, cover }) => {
  return (
    // !Card container with shadow and rounded corners
    <div className="bg-gray-900 text-white rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {/* Movie poster image */}
      <img src={cover} alt={title} className="w-full h-60 object-cover" />

      {/* Movie details */}
      <div className="p-4">
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-gray-400">
          {genre} | {year}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
