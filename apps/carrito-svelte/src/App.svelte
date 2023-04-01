<!-- <svelte:options immutable={true} /> -->
<script>
  import CartItem from "./components/CartItem.svelte";
  import Filters from "./components/Filters.svelte";
  import Product from "./components/Product.svelte";
  import filters from "./stores/filters";
  import { products } from "./stores/products";
  import { customCart } from "./stores/cart";
  import { filterProducts } from "./utils/productsUtils";

  let carroDisplay = "block";
  $: filteredProducts = filterProducts({
    products: $products,
    filters: $filters,
  });
</script>

<div class="wrapper">
  <div>
    <main class="shopping">
      <header>
        <h1>Svelte Store</h1>
        <button
          on:click={() => {
            carroDisplay = carroDisplay === "none" ? "block" : "none";
          }}>Carro</button
        >
      </header>
      <Filters />
      <section class="product-list">
        {#each filteredProducts as product (product.id)}
          <Product {...product} />
        {/each}
      </section>
    </main>
  </div>
  <aside class="carro" style={`display:${carroDisplay}`}>
    <h1>Carro</h1>
    {#each $customCart as cp (cp.id)}
      <CartItem {...cp} />
    {/each}
  </aside>
</div>
