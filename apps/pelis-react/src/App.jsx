import "./App.css";
import Movie from "./components/Movie";
import { useMovies } from "./hooks/useMovies";
import { useDebouncer } from "./hooks/useDebouncer";

function App() {
  // Hook
  const {
    fetchedMovies,
    sortedMovies,
    isLoading,
    error,
    isSorted,
    getMappedMovies,
    sortMovies,
  } = useMovies();
  const { debounce, debouncedInput } = useDebouncer();

  let movies;
  if (isSorted === true) {
    movies = sortedMovies;
  } else {
    movies = fetchedMovies;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { query } = Object.fromEntries(new FormData(evt.target));
    getMappedMovies({ query });
  }

  return (
    <>
      <main>
        <form
          action="submit"
          onSubmit={(evt) => {
            handleSubmit(evt);
          }}
        >
          <label>
            Nombre de la peli:
            <input
              name="query"
              type="text"
              onKeyUp={(evt) => {
                const debouncePromise = async ({ query }) => {
                  const debouncedQuery = await debounce({ query });
                  getMappedMovies({ query: debouncedQuery });
                };
                debouncePromise({ query: evt.target.value });
                // debounce({ query: evt.target.value, cb: getMappedMovies });
              }}
            />
          </label>
          <label htmlFor="sort">
            Sort by title:
            <input
              type="checkbox"
              name="sort"
              id="sort"
              onChange={() => {
                sortMovies();
              }}
            />
          </label>
          <button type="submit">Buscar</button>

          <p>{debouncedInput}</p>
        </form>
        <section style={{ display: "flex", justifyContent: "center" }}>
          {error && <h2>There is a problem: {error}</h2>}
          {isLoading && (
            <h2>
              Loading movies...If it takes too long the API key might have got
              pwned...
            </h2>
          )}
        </section>
        {!error && !isLoading && (
          <section className="movies">
            {movies.map((movie, idx) => (
              <Movie key={idx} {...movie} />
            ))}
          </section>
        )}
      </main>
      <footer className="repo">
        Github repo{" "}
        <a href="https://github.com/SFToro/exercises/tree/main/apps/pelis-react">
          Here
        </a>
      </footer>
    </>
  );
}

export default App;
