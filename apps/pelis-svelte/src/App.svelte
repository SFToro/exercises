<script>
  import { onDestroy } from 'svelte'
  import Movie from './components/Movie.svelte'
  import { getMovies } from './lib/getMovies'
  import { isSearchValid } from './lib/validation'

  let query, lastSearch
  let moviesPromise
  let timer, debouncedInput

  function handleSubmit(e) {
    e.preventDefault()
    const { query } = Object.fromEntries(new window.FormData(e.target))
    if (!isSearchValid({ query, lastSearch })) return

    moviesPromise = getMovies({
      query,
      lastSearch,
    })
  }

  const debounce = (query) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      debouncedInput = query
    }, 750)
  }

  $: if (isSearchValid({ query: debouncedInput, lastSearch })) {
    console.log(debouncedInput)
    moviesPromise = getMovies({
      query: debouncedInput,
      lastSearch,
    })
  }

  onDestroy(() => {
    clearTimeout(timer)
  })
</script>

<main>
  <form action="submit" on:submit={handleSubmit}>
    <label>
      Nombre de la peli:
      <input
        name="query"
        type="text"
        on:keyup={(e) => {
          debounce(e.target.value)
        }}
      />
    </label>
    <button type="submit">Buscar</button>

    {#if debouncedInput}
      <p>{debouncedInput}</p>
    {/if}
  </form>
  {#if moviesPromise}
    {#await moviesPromise}
      <h2>
        Loading movies...If it takes too long the API key might have got
        pwned...
      </h2>
    {:then movies}
      <section class="movies">
        {#each movies as movie (movie.id)}
          <Movie {movie} />
        {/each}
      </section>
    {:catch e}
      <h2>There is a problem: {e}</h2>
    {/await}
  {/if}
</main>
<footer>
  Github repo <a
    href="https://github.com/SFToro/exercises/tree/main/apps/pelis-svelte"
    >Here</a
  >
</footer>

<style>
  footer {
    position: fixed;
    background-color: rgba(255, 255, 255, 0.7);
    width: fit-content;
    padding: 1rem;
    border-radius: 0.5rem;
    bottom: 1rem;
    left: 1rem;
  }
</style>
