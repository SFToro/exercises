<script lang="ts">
  import { img } from "./stores/imageStore";
  import { stepUploadOnMount } from "./hooks/stepUploadOnMount";

  stepUploadOnMount();
</script>

<form action="submit" id="dropzone">
  {#if $img.isReady}
    <button id="upload-button">Upload files</button>
    <strong>Or drop a file</strong>
  {/if}
  {#if $img.isUploading}
    <strong>Uploading</strong>
  {/if}
</form>

<style>
  button {
    margin-top: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 20px;
    background-color: black;
    border-radius: 10px;
    aspect-ratio: 16/9;
    box-shadow: 0 25px 50px -12px rgb(255 255 255 / 0.15);
  }
</style>
