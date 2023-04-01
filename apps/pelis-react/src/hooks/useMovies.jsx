import { useRef, useState } from "react";
import { getMovies } from "../utils";

export const useMovies = () => {
  const [fetchedMovies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const lastSearch = useRef("");
  const [sortedMovies, setSortedMovies] = useState([]);
  const [isSorted, setSorted] = useState(false);

  // Hook
  async function getMappedMovies({ query }) {
    if (query === lastSearch.current) return;
    if (query === "") return;

    setLoading(true);
    setError("");
    try {
      const mappedMovies = await getMovies({
        query,
      });
      if (mappedMovies) setMovies(mappedMovies);
      lastSearch.current = query;
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  function sortMovies() {
    setSorted(!isSorted);
    if (fetchedMovies.at(-1) === sortedMovies.at(0)) return;
    const newList = [...fetchedMovies].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    setSortedMovies(newList);
  }

  return {
    fetchedMovies,
    isLoading,
    error,
    getMappedMovies,
    sortMovies,
    sortedMovies,
    isSorted,
    setSorted,
  };
};
