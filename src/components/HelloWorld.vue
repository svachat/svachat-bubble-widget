<template>
  <div id="app">
    <div id="chat" class="chat">
      <div id="chat-box" class="chat-box closed">
        <div id="chat-content" class="chat-content hidden">
          <div class="close-icon" v-on:click="toggle">
          </div>
          <div class="chat-header">
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
        <div id="chat-button" class="chat-button opened" v-on:click="toggle"> 
          
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: function() {
    return {
      opened: false
    }
  },
  methods: {
    toggle: function () {
      if (this.opened) {
        document.getElementById("chat-button").className = "chat-button opened";
        
        document.getElementById("chat-box").className = "chat-box closed";
        document.getElementById("chat-content").className = "chat-content hidden";
        document.getElementById("chat").className = "chat";
      } else {
        document.getElementById("chat-button").className = "chat-button closed";

        document.getElementById("chat-box").className = "chat-box opened";
        document.getElementById("chat-content").className = "chat-content";
        document.getElementById("chat").className = "chat opened";
      }
      this.opened = !this.opened;
    }
  }
};
</script>

<style scoped>
.chat {
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  z-index: 9999;
  min-width: 400px;
}

.chat-button {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  padding: 1rem;
  background: rgb(0, 108, 255);
  color: rgb(255, 255, 255);
  margin-right: 0rem;
  margin-left: auto;
  background-image: url('../assets/chat.svg') ;
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;

  /* Styles due to remove the button from the chat-box */
  bottom: 2rem;
  right:2rem;
  position: absolute;
}

.chat-button.closed {
  transition: 0.5s;
  width: 0;
  padding: 0;
  height: 0;
}

.chat-button.opened {
  transition: 0.5s;
}

.chat-button:hover {
  /*border-radius: 50%;
  padding: 1rem;
  background: rgb(80, 148, 245);
  color: rgb(255, 255, 255);
  
  background-image: url('../assets/chat.svg') ;
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;*/
  background-color: rgb(80, 148, 245);
  cursor: pointer;
}

.bottom {
  width: 100%;
  text-align: right;
}

.chat-icon {
  margin: 0px;
  padding: 0px;
  vertical-align: text-bottom;
  width: 3rem;
}

.chat-box.opened {
  transition: 0.5s;
  height: 40rem;
  width: 20rem; /* Width of the chat-box */
  padding: 1rem;
  background-color: lavender;
  margin-left: auto;
  margin-right: 0;
}

.chat-box.closed {
  transition: 0.5s;
  visibility: hidden;
}

.hidden {
  display: none;
}

.close-icon {
  width: 1rem;
  height: 1rem;
  margin-top: 0;
  margin-right: 0rem;
  margin-left: auto;
  background-image: url('../assets/close.svg') ;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 30%;
  padding: 1rem;
  z-index: 9999;
  position: relative;
}

.close-icon:hover {
  cursor: pointer;
}

.chat-header {
  top: -4rem;
  left: -1rem;
  width: 110%;
  position: relative;
  height: 10rem;
  background-color: rgb(0, 108, 255);
}

@media (max-width: 450px) {
  .chat-box.opened {
    transition: 0.5s;
    height: 97vh;
    width: 100vw; /* Ancho del chat-box */
    padding: 1rem;
    background-color: lavender;
    margin-left: auto;
    margin-right: 0;
  }
  .chat.opened {
    transition: 0.5s;
    right: 0;
    bottom: 0;
  }
}

</style>
