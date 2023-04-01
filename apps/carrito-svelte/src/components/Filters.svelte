<script>
  import filters from "../stores/filters";
  let range = 500,
    cat = "all";

  $: filters.update(() => {
    return { price: range, category: cat };
  });
</script>

<header class="filters">
  <input
    type="range"
    min="0"
    max="1500"
    name="price"
    id="price"
    bind:value={range}
  /><span>${range}</span>
  <label for="category">
    <select name="category" id="category" bind:value={cat}>
      <option value="all">Todas</option>
      <option value="smartphones">Celulares</option>
      <option value="laptops">Portatiles</option>
    </select>
  </label>
</header>
