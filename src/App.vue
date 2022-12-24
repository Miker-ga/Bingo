<template>
  <div id="app">
    <div id="mainstage" class="container is-fluid">
      <BingoGame />
    </div>
  </div>
</template>

<script>
import BingoGame from './components/BingoGame.vue'

export default {
  name: 'App',
  components: {
    BingoGame
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, Avenir, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#mainstage {
  padding: 3rem;
  border-radius: 10px;
  background-color: white;
}
</style>
