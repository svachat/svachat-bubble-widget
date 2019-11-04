<template>
  <div id="app">
    <h1>This is Svachat's Widget!</h1>
    <a href=""><img class="github" src="https://img.shields.io/badge/-View%20code-lightgrey/?color=555&logo=github"></a>
    <a href="https://twitter.com/Svachat?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="true">Follow @Svachat</a>
    <br>
    <div class="features">
      <h2><p class="color">1.-</p> Open Source</h2>
      <h2><p class="color">2.-</p> Backend Agnostic</h2>
      <h2><p class="color">3.-</p> HTML/CSS/JS Exportable</h2>
    </div>
    <img class="click-demo" src="./assets/click.png">
    <ChatWidget class="chat" welcome="Hello! This is Svachat Technologies. Glad to meet you. We're a startup focused on smart virtual assistants." />
    <div class="footer">
      &copy; Svachat Technologies 2019
    </div>
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

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Pangolin&display=swap');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}

body {
  display: block;
  margin: 8px;
}

div {
    display: block;
}

h1 {
  margin-bottom: 10px;
}

h2 {
  font-family: 'Pangolin', cursive;
}

img.click-demo {
  position: absolute;
  width:  8rem;
  bottom: 3.5rem;
  right: 8rem;
}

img.github {
  margin-right: 1rem;
}

.features {
  margin-top: 1rem;
  text-align:left;
  display: inline-block;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 99vw;
  text-align: center;
}

.color {
  display: inline;
  color: #B36170;
}

</style>
