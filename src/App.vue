<template>
<div id="app">
    <ChatWidget :color="this.color" :icon="this.icon" :titleName="this.name" welcome="Hello! This is Svachat Technologies. Glad to meet you. We're a startup focused on smart virtual assistants." />
</div>
</template>

<script>
import ChatWidget from './components/ChatWidget.vue'

export default {
  name: 'app',
  props: {
    color: String,
    icon: String,
    name: String
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
