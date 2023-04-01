<!-- <svelte:options immutable={true} /> -->
<script>
  import { customCart } from "../stores/cart";
  import { afterUpdate } from "svelte";
  import flash from "../utils/flash";

  let cantidad;
  export let title, description, id, thumbnail, stock, isInCart;

  afterUpdate(() => {
    if (isInCart) flash(cantidad);
  });
</script>

<article class="product">
  <h3>{title}</h3>
  <p>{description}</p>
  <p bind:this={cantidad}>stonk: {stock}</p>
  {#if !isInCart}
    <button
      on:click={() => {
        customCart.addToCart(id);
      }}
      style="height: 40px;width: 150px;margin-inline:auto">Al carro</button
    >
  {/if}
  <img src={thumbnail} alt={description} />
</article>
