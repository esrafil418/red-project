// !This file contains API requests related to movies

export type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  cover: string;
};

// ?Example function to fetch movies from WordPress API
export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(
      "https://your-wordpress-site.com/wp-json/wp/v2/movies"
    );
    const data = await response.json();

    // ?Map WordPress data to our Movie type
    return data.map((item: any) => ({
      id: item.id,
      title: item.title.rendered,
      year: parseInt(item.meta.year) || 2023,
      genre: item.meta.genre || "Unknown",
      cover: item.featured_media_url || "https://via.placeholder.com/300x400",
    }));
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
