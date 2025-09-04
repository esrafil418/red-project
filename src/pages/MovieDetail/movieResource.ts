import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../services/movieService";

function wrapPromise<T>(promise: Promise<T>) {
  let status = "pending";
  let result: T;
  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );

  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result;
    },
  };
}

export function createMovieResource(id: string) {
  return wrapPromise(
    fetchMovies().then((movies) => {
      const movie = movies.find((m) => m.id === parseInt(id));
      if (!movie) throw new Error("Movie not found");
      return movie as Movie;
    })
  );
}
