<template>
<div id="app">
<!-- <div id="app" style="min-height:250px !important"> -->
    <ChatWidget :token="this.token" />
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
    client: Number,
    look: String,
    token: String
  },
  components: {
    ChatWidget
  }
}
</script>

<style scoped>
* {
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
