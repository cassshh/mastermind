<script>
  import { onMount } from "svelte";
  import init, { GameState } from "mastermind-rs";

  onMount(async () => {
    await init(); // Init Rust WASM
    const game = GameState.new();
    console.log(game.tries);
    console.log(game.get_game_options());
  });

  let count = 0;

  function increment() {
    // count = add(count, 1);
    count++;
  }

  function decrement() {
    // count = add(count, -1);
    count++;
  }
</script>

<div class="counter">
  <button on:click={decrement}>-</button>
  <pre>{count}</pre>
  <button on:click={increment}>+</button>
</div>
<div class="message">
  <slot />
</div>

<style>
  .counter {
    display: grid;
    font-size: 2em;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 2em;
    place-items: center;
  }
  .message {
    text-align: center;
  }
</style>
