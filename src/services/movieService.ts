// !This file contains API requests related to movies

// !Movie type for our components
export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  thumbnail: string;
  poster: string;
  description: string;
}

// !Fetch movies from local JSON (or replace URL with real API)
export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch("/data/movies.json");
    const data = await response.json();
    return data as Movie[];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
