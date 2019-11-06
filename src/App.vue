<template>
    <ChatWidget class="chat" welcome="Hello! This is Svachat Technologies. Glad to meet you. We're a startup focused on smart virtual assistants." />
</template>

<script>
import ChatWidget from './components/ChatWidget.vue'

export default {
  components: {
    ChatWidget
  }
}
</script>

<style scoped>
.chat {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}

</style>
