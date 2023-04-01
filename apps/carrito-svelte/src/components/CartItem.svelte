<script>
  import { customCart } from "../stores/cart";
  import { afterUpdate } from "svelte";

  import flash from "../utils/flash";
  let cantidad;

  export let id, title, price, qty;

  afterUpdate(() => {
    flash(cantidad);
  });
</script>

<div style="border: 1px solid red; padding:0.25rem;margin:0.25rem">
  <h3>{title}</h3>
  <h4>${price}</h4>
  <h5 bind:this={cantidad}>Qty: {qty}</h5>
  <button
    style="color: #000;background-color: #ccc;"
    on:click={() => {
      customCart.remove(id);
    }}>remove</button
  >
  <button
    style="color: #000;background-color: #ccc;"
    on:click={() => {
      customCart.incrementQty(id);
    }}>add</button
  >
</div>
