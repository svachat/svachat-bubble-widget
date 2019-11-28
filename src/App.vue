<template>
<div id="app">
    <ChatWidget :color="this.color" :icon="this.icon" :titleName="this.name" :client="this.client" />
</div>
</template>

<script>
import ChatWidget from './components/ChatWidget.vue'

export default {
  name: 'app',
  props: {
    color: String,
    icon: String,
    name: String,
    client: String,
  },
  components: {
    ChatWidget
  }
}
</script>

<style scoped>
* {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
