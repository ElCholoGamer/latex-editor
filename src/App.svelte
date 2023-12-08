<script lang="ts">
  import { onMount } from 'svelte';
  import classNames from 'classnames';
  import Katex from './lib/Katex.svelte';
  import { options } from './lib/stores/options';
  import { autoCloseMappings, buttons } from './lib/constants';

  let inputField: HTMLTextAreaElement;
  let initialized = false;
  let input = '';
  let error: string | undefined = undefined;

  onMount(() => {
    const storedInput = localStorage.getItem('input');
    if (storedInput) {
      input = storedInput;
    }

    initialized = true;
  });

  $: if (initialized) {
    input;
    localStorage.setItem('input', input);
  }

  function handleKeyDown(
    ev: KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement },
  ) {
    if (!$options.autoClose) return;

    const inputElement = ev.currentTarget;
    const pos = inputElement.selectionStart;
    const pressedKey = ev.key;

    const match = autoCloseMappings.find((map) => pressedKey === map[0]);
    if (match) {
      inputElement.value =
        inputElement.value.substring(0, pos) +
        match[1] +
        inputElement.value.substring(pos);
      inputElement.setSelectionRange(pos, pos);
    }
  }

  function insert(str: string) {
    const pos = inputField.selectionStart;
    const newPos = pos + str.indexOf('{') + 1;

    input = input.substring(0, pos) + str + input.substring(pos);
    inputField.focus();

    setTimeout(() => inputField.setSelectionRange(newPos, newPos));
  }

  $: bgColor = $options.bgColorEnabled ? $options.bgColor : 'inherit';
</script>

<main class="p-12 bg-yellow-100 min-h-full text-center">
  <h1 class="text-3xl font-semibold">
    Yet Another <Katex math="\LaTeX" /> Editor
  </h1>

  <form class="mt-6 mb-2 inline-block" on:submit|preventDefault>
    <div class="p-2">
      {#each buttons as [latex, str, label]}
        <button
          class="mx-2 border border-neutral-400 rounded h-full py-2 px-2"
          on:click="{() => insert(str)}"
          title="{label}"
        >
          <Katex math="{latex}" />
        </button>
      {/each}
    </div>
    <div class="text-left mb-1">
      <label>
        <input type="checkbox" bind:checked="{$options.autoClose}" />
        Auto-close braces
      </label>
    </div>
    <textarea
      cols="80"
      rows="7"
      bind:value="{input}"
      placeholder="Type your LaTeX here"
      class="font-mono border border-black rounded px-2 py-1"
      autocorrect="off"
      spellcheck="{false}"
      on:keydown="{handleKeyDown}"
      bind:this="{inputField}"
    ></textarea>
    <div class="flex justify-between items-center">
      <span class="flex my-2 space-x-4">
        <label class="flex items-center space-x-2">
          <span>Background color:</span>
          <input type="checkbox" bind:checked="{$options.bgColorEnabled}" />
          <input
            type="color"
            disabled="{!$options.bgColorEnabled}"
            bind:value="{$options.bgColor}"
            class="rounded w-8 h-8"
            class:opacity-50="{!$options.bgColorEnabled}"
          />
        </label>
        <label class="flex items-center space-x-2">
          <span>Text color:</span>
          <input
            type="color"
            bind:value="{$options.textColor}"
            class="rounded w-8 h-8"
          />
        </label>
        <label class="flex items-center space-x-2">
          <span>Font size:</span>
          <input
            type="number"
            bind:value="{$options.fontSize}"
            step="0.1"
            min="0"
            class="w-20 h-8 border border-neutral-500 px-2"
          />
        </label>
      </span>
    </div>
  </form>
  <p
    class="{classNames(
      'text-center font-mono mb-4',
      error ? 'text-red-600' : 'text-transparent',
    )}"
  >
    {error}
  </p>

  {#if input}
    <div
      class=" inline-block mx-auto px-6 select-none"
      class:opacity-50="{error !== null}"
      style="font-size: {$options.fontSize}rem; background-color:{bgColor}; color:{$options.textColor}; line-height:2rem"
    >
      <Katex math="{input}" bind:error displayMode />
    </div>
  {:else}
    <p class="text-sm text-yellow-700 my-12">(Output goes here)</p>
  {/if}
</main>
