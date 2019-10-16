<template>
  <div id="app">
    <ChatWidget />
  </div>
</template>

<script>
import ChatWidget from './components/ChatWidget.vue'

export default {
  name: 'app',
  components: {
    ChatWidget
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  display: block;
  margin: 8px;
}

div {
    display: block;
}
</style>
