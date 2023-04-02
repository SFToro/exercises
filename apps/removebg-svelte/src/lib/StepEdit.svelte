<script lang="ts">
  import { img } from "./stores/imageStore";
  import "two-up-element";

  // Image polling because background removal takes time
  let modifiedImgReady = false;
  $: {
    if (!modifiedImgReady) {
      const intervalPolling = setInterval(() => {
        const modifiedImg = new Image();
        modifiedImg.src = $img.modified;
        modifiedImg.onload = () => {
          modifiedImgReady = true;
          clearInterval(intervalPolling);
        };
      }, 1000);
    }
  }
</script>

<two-up>
  <img src={$img.original} alt="Imagen original subida por el usuario" />
  {#if modifiedImgReady}
    <img src={$img.modified} alt="Imagen sin fondo procesada por IA" />
  {:else}
    <strong>Procesando imagen...</strong>
  {/if}
</two-up>

<a download href={$img.modified}>Descargas imagen sin fondo</a>
