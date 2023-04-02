<script lang="ts">
  import StepEdit from "./lib/StepEdit.svelte";
  import StepUpload from "./lib/StepUpload.svelte";
  import { img } from "./lib/stores/imageStore";
</script>

<main>
  {#if $img.isReady || $img.isUploading}
    <StepUpload />
  {:else if $img.isDone}
    <StepEdit />
  {/if}
</main>
