<template>
  <div id="chat-widget" :style="cssProps">
    <div id="chat-box" class="chat-box closed">
      <div id="chat-content" class="chat-content hidden">
        <div class="chat-header" :class="opened ? 'open' : 'hidden'">
          <div class="chat-profile-icon"></div>
          <div class="chat-profile-status"></div>
          <h1 class="chat-profile-name">{{this.titleName}}</h1>
          <h2 class="chat-profile-status-text">Online</h2>
          <div class="close-icon" v-on:click="toggle"></div>
        </div>
        <div id="msg-container" class="chat-message-container" ref="container">
          <div class="powered-badge">
            <p class="statement">
              ⚡ Powered ⚡ by
              <a class="powered-link" href="https://svachat.com">Svachat</a>
            </p>
          </div>
          <MessageBubble v-bind:msg="this.welcome" :color="this.color"></MessageBubble>
        </div>
        <div class="chat-footer">
          <form autocomplete="off" action="#" v-on:submit="sendMessage">
            <input
              id="text-input"
              class="chat-text-input"
              type="text"
              v-model="message"
              placeholder="Start typing here..."
            />
            <div class="send-button" v-on:click="sendMessage"></div>
          </form>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div id="chat-button" class="chat-button opened" v-on:click="toggle"></div>
    </div>
  </div>
</template>

<script>
import MessageBubble from "./MessageBubble.vue";
import WritingBadge from "./WritingBadge.vue";
import GalleryMessage from "./GalleryMessage.vue";
import Vue from "vue";
import axios from 'axios'

export default {
  name: "ChatWidget",
  components: {
    MessageBubble,
    GalleryMessage
  },
  data: function() {
    return {
      opened: false,
      sessionStarted: false,
      message: ''
      writing: false,
    };
  },
  props: {
    welcome: String,
    color: String,
    icon: String,
    titleName: String
  },
  computed: {
    cssProps() { return {
        '--main-color': this.color,
        '--icon-url': "url(" + this.icon + ")"
      }
    }
  },
  mounted() {
    // This is to call the sendMessage function in the MessageBubble component
    // This creates coupling between the components, but it is acceptable and
    this.$root.$on("sendMessage", (e, message) => {
      this.sendMessage(e, message);
    });
  },
  methods: {
    toggle: function() {
      // If the chat-box is open, we want to close it
      if (this.opened) {
        document.getElementById("chat-button").className = "chat-button opened"; // Then, open the button

        document.getElementById("chat-box").className = "chat-box closed"; // And close the box and its content
        document.getElementById("chat-content").className =
          "chat-content hidden";
      } else {
        document.getElementById("chat-button").className = "chat-button closed";

        document.getElementById("chat-box").className = "chat-box opened";
        document.getElementById("chat-content").className = "chat-content";
      }
      this.opened = !this.opened;

      this.startSession();

    },
    sendMessage: function(event, message) {
      var inputString;

      if (message == null) {
        inputString = this.message;
      } else {
        inputString = message;
      }

      var validInput = inputString != "";

      if (validInput) {
        var MessageClass = Vue.extend(MessageBubble);
        var msgInstance = new MessageClass({
          propsData: {
            mine: true,
            msg: inputString,
            color: this.color
          }
        });
        this.message = "";

        if (this.writing) {
          this.$refs.container.removeChild(this.$refs.container.lastChild);
        }

        msgInstance.$mount();
        this.$refs.container.appendChild(msgInstance.$el);
        event.preventDefault();
        event.returnValue = false;

        this.beginWriting();

        var container = this.$el.querySelector("#msg-container");
        container.scrollTop = container.scrollHeight;

        setTimeout(() => {
          axios.post('http://localhost:8000/bot/13').then(response => {
            this.receiveMessage(response.data.message);
          });
        }, 1000);
      }

    },
    receiveMessage: function(text) {
      var inputString = text;
      

      var validInput = inputString != '';

      if (validInput) {
        var MessageClass = Vue.extend(MessageBubble);
        var msgInstance = new MessageClass({
          propsData: { 
            mine: false, 
            msg: inputString
          }
        });
        this.message = "";

        msgInstance.$mount();
        this.$refs.container.appendChild(msgInstance.$el);
        event.preventDefault();
        event.returnValue = false;

        var container = this.$el.querySelector("#msg-container");
        container.scrollTop = container.scrollHeight;
      }
     } ,
    startSession: function () {
      if (!this.sessionStarted) {
        axios.get('http://localhost:8000/bot/13').then(response => {
          this.receiveMessage(response.data.message);
          this.sessionStarted = true;
        });
      } 
    }
  }
};
</script>

<style scoped>
.chat-box {
  padding: 0;
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  z-index: 9999;
  border-radius: 10px;
  background-color: white;
  -webkit-box-shadow: 2px 4px 32px -14px rgba(0, 0, 0, 0.45);
  -moz-box-shadow: 2px 4px 32px -14px rgba(0, 0, 0, 0.45);
  box-shadow: 2px 4px 32px -14px rgba(0, 0, 0, 0.45);
}

.chat-box.opened {
  transition: 0.5s;
  height: 80vh;
  width: 38rem; /* Width of the chat-box */
  background-color: white;
  margin-left: auto;
  margin-right: 0;
}

.chat-box.closed {
  transition: 0.5s;
  visibility: hidden;
}

.chat-button {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  padding: 1rem;
  background: var(--main-color);
  color: rgb(255, 255, 255);
  margin-right: 0rem;
  margin-left: auto;
  background-image: url("../assets/chat.svg");
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 999;
}

.chat-button.closed {
  transition: 0.5s;
  width: 0;
  padding: 0;
  height: 0;
}

.bottom {
  width: 100%;
  text-align: right;
}

.chat-button.opened {
  transition: 0.5s;
}

.chat-button:hover {
  transition: 1s;
  opacity: 0.6; 
  cursor: pointer;
}

.chat-icon {
  display: inline-block;
  margin: 0px;
  padding: 0px;
  vertical-align: text-bottom;
  width: 3rem;
}

.chat-message-container {
  transition: 0.5s;
  position: absolute;
  max-height: calc(80vh - 11.5rem);
  right: 0;
  left: 0;
  bottom: 4.5rem;
  overflow: scroll;
  vertical-align: bottom;
}

.chat-message-container::-webkit-scrollbar {
  width: 0 !important;
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
  background-image: url("../assets/close.svg");
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
  top: 0;
  right: auto;
  left: 0;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  z-index: 9999;
}

.chat-header.open {
  transition: 0.5s;
  width: 100%;
  height: 7rem;
  background-color: var(--main-color);
}

.chat-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  text-align: left;
}

.chat-text-input {
  height: 3rem;
  width: 18rem;
  padding: 1rem;
  font-size: 18px;
  outline: none;
  color: rgb(67, 67, 67);
  border: 0;
  border-bottom-left-radius: 10px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.send-button {
  position: absolute;
  height: 3rem;
  padding: 1rem;
  right: 15px;
  display: inline-block;
  background-image: url("../assets/send-button.svg");
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.chat-profile-icon {
  position: absolute;
  margin-top: 1.5rem;
  margin-left: 2rem;
  width: 4rem;
  height: 4rem;
  background-color: white;
  border-radius: 50%;
  background-image: var(--icon-url);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.chat-profile-name {
  position: absolute;
  padding: 0;
  margin-left: 7rem;
  margin-top: 2rem;
  font-size: 26px;
  color: white;
}

.chat-profile-status {
  position: absolute;
  margin-top: 4.3rem;
  margin-left: 4.7rem;
  width: 1rem;
  height: 1rem;
  background-color: rgb(0, 211, 0);
  border-radius: 50%;
  border-width: 2px;
  border-color: var(--main-color);
  border-style: solid;
}

h2.chat-profile-status-text {
  position: absolute;
  margin-top: 4rem;
  margin-left: 7.2rem;
  font-size: 16px;
  color: #eee;
}

.powered-badge {
  color: lightslategray;
  font-size: 12px;
  text-align: center;
}

.statement {
  margin-bottom: 0;
}

.bullet {
  margin-top: 0;
  font-size: 9px;
}

.powered-link {
  color: lightslategray;
}

@media (max-width: 700px) {
  .bottom {
    position: fixed;
    bottom: 0vh;
    left: auto;
    right: 2rem;
    bottom: 2rem;
  }

  .chat-box {
    position: fixed;
    right: 0;
    bottom: 0;
    border-radius: 0px;
  }
  .chat-box.opened {
    transition: 0.5s;
    top: 0;
    bottom: 0;
    height: auto;
    width: 100vw; /* Ancho del chat-box */
    background-color: rgb(255, 255, 255);
    margin-left: auto;
    margin-right: 0;
  }
  .chat-header {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
  .chat-footer {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
  .chat-message-container {
    overflow-x: hidden;
    transition: 0s;
    max-height: calc(100% - 11.5rem);
    /*max-height: calc(100vh - 12.5rem);*/
  }
}

@media (min-width: 700px) {
  #chat-widget {
    position: fixed;
    bottom: 0vh;
    left: auto;
    right: 2rem;
    bottom: 2rem;
  }
}

/* Mozilla Firefox only*/
@-moz-document url-prefix() {
  .chat-message-container {
    scrollbar-width: none;
  }
}
</style>
