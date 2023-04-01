const OMDB_API = "http://www.omdbapi.com/?apikey=3a902638&s=";

export async function getMovies({ query, lastSearch, moviesPromise }) {
  const res = await fetch(OMDB_API + query);
  const results = await res.json();
  if (results.Error) throw new Error(results.Error);
  const mappedMovies = results.Search.map((movie) => {
    return {
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
      id: movie.imdbID,
    };
  });

  return mappedMovies;
}
