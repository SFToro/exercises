<script>
  export let movie
  let { title, year, poster } = movie
</script>

<article class="movie">
  <h3>{title}</h3>
  <p>{year}</p>
  <img src={poster} alt={title} />
</article>
