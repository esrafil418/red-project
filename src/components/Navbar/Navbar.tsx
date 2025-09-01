import React from "react";

// ?Navbar component
const Navbar: React.FC = () => {
  return (
    // !Navigation bar container with dark background and padding
    <nav className="g-gray-900 text-white p-4 flex justify-between items-center">
      {/* Logo / site name */}
      <div className="text-xl font-bold">RedFilm</div>
      {/* Navigation menu items */}
      <ul className="flex space-x-4">
        {/* Each li is a menu item */}
        <li className="hover:text-gray-400 cursor-pointer">Home</li>
        <li className="hover:text-gray-400 cursor-pointer">Movies</li>
        <li className="hover:text-gray-400 cursor-pointer">Genres</li>
        <li className="hover:text-gray-400 cursor-pointer">Search</li>
      </ul>
    </nav>
  );
};

export default Navbar;
