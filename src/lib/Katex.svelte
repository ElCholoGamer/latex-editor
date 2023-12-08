<script lang="ts">
  import katex from 'katex';

  export let math: string;
  export let displayMode = false;
  export let error: string | null = null;

  let katexString = '';

  const options = {
    displayMode,
    throwOnError: true,
  };

  $: try {
    katexString = katex.renderToString(math, options);
    error = null;
  } catch (err: any) {
    error = err.message.toString();
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
    integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
    crossorigin="anonymous"
  />
</svelte:head>

{@html katexString}
