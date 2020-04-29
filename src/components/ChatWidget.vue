<template>
  <div id="chat-widget" :style="cssProps">
    <!--<div id="chat-box" class="chat-box closed">-->
      <div id="chat-box" class="'chat-box closed'">
      <div id="chat-content" class="chat-content hidden">
        <div class="chat-header" :class="[opened ? 'open' : 'hidden', this.look]">
          <div class="chat-profile-icon"></div>
          <!-- <img :src="icon" class="chat-profile-icon" style="marginLeft:5px"> -->
          <!-- <div class="chat-profile-status"></div> -->
          <h1 class="chat-profile-name">{{this.titleName}}</h1>
          <div class="close-icon" v-on:click="toggle"></div>
        </div>
        <div class="powered-badge" :class="[this.look]">
            <p class="statement">
              ⚡ Powered ⚡ by
              <a class="powered-link" href="https://svachat.com">Svachat</a>
            </p>
          </div>
        <div id="msg-container" :class="[this.look == 'sport' ? 'chat-message-container' : 'classic-text chat-message-container']" ref="container">

        </div>
        <div class="chat-footer" :class="[this.look]">
          <form autocomplete="off" action="#" v-on:submit="sendMessage">
            <input
              id="text-input"
              class="chat-text-input"
              :class="[this.look]"
              type="text"
              v-model="message"
              placeholder="Escribe una pregunta..."
            />
            <div class="send-button" v-on:click="sendMessage"></div>
          </form>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div id="chat-button" class="chat-button opened" v-on:click="toggle">
        <div class="sp"></div>
        <!-- <img :src="require('@/assets/chat.svg')" class="svgBubble">  -->
        <p id="bubbleText">Chat</p>
      </div>
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
  data() {
    return {
      opened: false,
      sessionStarted: false,
      message: '',
      writing: false,
      headerClasses: ""
    };
  },
  props: {
    welcome: String,
    look: String,
    color: String,
    icon: String,
    titleName: String,
    client: Number,
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
    setTimeout(() => { 
      if (!this.opened) {
        this.toggle() 
      }
    }, 30000);
  },
  methods: {
    toggle: function() {
      // If the chat-box is open, we want to close it
      if (this.opened) {
        document.getElementById("chat-button").className = "chat-button opened"; // Then, open the button
        document.getElementById("bubbleText").style.color = "white";
        document.getElementById("chat-box").className = "chat-box closed"; // And close the box and its content
        document.getElementById("chat-content").className =
          "chat-content hidden";
      } else {
        document.getElementById("chat-button").className = "chat-button closed";
        document.getElementById("bubbleText").style.color = "transparent";
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

        // TODO: Make env param friendly
        axios.get('https://svachat-backend.eu-de.mybluemix.net/bot/' + this.client + '/query?message=' + this.message).then(response => {
          this.receiveMessage(response.data.text);
        });

        this.message = "";
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

        if (this.writing) {
          this.$refs.container.removeChild(this.$refs.container.lastChild);
        }
      
        msgInstance.$mount();
        this.$refs.container.appendChild(msgInstance.$el);
        event.preventDefault();
        event.returnValue = false;

        var container = this.$el.querySelector("#msg-container");
        container.scrollTop = container.scrollHeight;
        this.writing = false;
      }
     } ,
    startSession: function () {
      if (!this.sessionStarted) {
        // TODO: Make env param friendly
        axios.get('https://svachat-backend.eu-de.mybluemix.net/bot/' + this.client).then(response => {
          this.receiveMessage(response.data.message);
          this.sessionStarted = true;
        });
      } 
    },
     beginWriting: function() {
      var WritingBadgeClass = Vue.extend(WritingBadge);
      var writingBadgeInstance = new WritingBadgeClass();
      writingBadgeInstance.$mount();
      this.$refs.container.appendChild(writingBadgeInstance.$el);
      this.writing = true;
    }
  }
};
</script>

<style scoped>

.chat-box {
  padding: 0;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 9999999999999999999999999999999999999999999999999999 !important;
  border-radius: 10px;
  background-color: white;
  -webkit-box-shadow: 2px 4px 32px -14px rgba(0, 0, 0, 0.45);
  -moz-box-shadow: 2px 4px 32px -14px rgba(0, 0, 0, 0.45);
  box-shadow: 2px 4px 32px -14px rgba(0, 0, 0, 0.45);
}

.chat-box.opened {
  transition: 0.5s;
  /* height: 75vh; */
  height: 565px ;
  /*width: 30rem;  Width of the chat-box */
  width: 340px; /* Width of the chat-box */
  background-color: white;
  margin-left: auto;
  margin-right: 20px;
  bottom: 50px;
}

.chat-box.closed {
  transition: 0.5s;
  visibility: hidden;
}

.chat-button.opened {
  transition: 0.5s;
  width: 110px;
  height: 45px;
  border-radius: 999rem;
  /* padding: 1rem; */
  background: var(--main-color);
  color: rgb(255, 255, 255);
  margin-right: 0rem;
  margin-left: auto;
  display: flex;
  justify-content: center;
  /* background-image: url('../assets/chat.svg');
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center; */
  z-index: 99999999999;
}
.sp {
  height: 2px;
  margin-left:-3px ;
  margin-top: 6px;
  padding: 1rem;
  background: var(--main-color);
  color: rgb(255, 255, 255);
  background-image: url('../assets/chat.svg');
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 99999999999;
}
.svgBubble {
  height: 26px;
  margin-top: 9px;
}

#bubbleText {
  color: white;
  font-weight: 600;
  font-size: 18px;
  margin-top: 12px;
  margin-left: 2px;
}

.chat-button.closed {
  transition: 0.5s;
  width: 0;
  height: 0;
  border-radius: 50%;
  }

.bottom {
  position: fixed;
  right: 20px;
  bottom: 50px;
  text-align: right;
}

.chat-button:hover {
  transition: 0.5s;
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
  max-height: 445px;
  /* max-height: calc(75vh - 11.5rem); */
  right: 0;
  left: 0;
  bottom: 3rem;
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
  /* width: 1rem;
  height: 1rem; */
  margin-top: 0px;
  margin-right: 15px;
  margin-left: auto;
  background-image: url("../assets/line.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 85%;
  padding: 0.5rem;
  z-index: 9999;
  transition: 0.3s;
  position: relative;
}

.close-icon:hover {
  /* border: 1px solid white;
  border-radius: 10px; */
  cursor: pointer;
}

.chat-header {
  top: 0;
  right: auto;
  left: 0;
  display: flex;
  justify-content: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  z-index: 9999;
}

.chat-header.open {
  transition: 0.5s;
  width: 100%;
  height: 50px;
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
  height: 15px;
  width: 250px;
  border: 1px solid #d8dcde;
  padding: 1rem;
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: 1rem;
  outline: none;
  color: rgb(67, 67, 67);
  border-bottom-left-radius: 10px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.chat-text-input:hover {
  transition: 0.5s;
  border-color: rgb(104, 115, 125) !important;
}

.send-button {
  position: absolute;
  height: 22px;
  /* height: 3rem; */
  padding: 1rem;
  right: 11px;
  /* right: 15px; */
  display: inline-block;
  background-image: url("../assets/send-button.svg");
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.chat-profile-icon, .chat-profile-icon2 {
  width: 35px;
  height: 35px;
  margin: 0 9px;
  margin-top: 7px;
  border-radius: 50%;
  background-image: var(--icon-url);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.chat-profile-name {
  /* position: absolute;
  padding: 0;
  margin-left: 7rem;
  margin-top: 2rem;
  font-size: 26px; */
  font-size: 22px;
  margin: 0;
  margin-top: 14px;
  color: white;
}

/* .chat-profile-status {
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
} */

/* h2.chat-profile-status-text {
  position: absolute;
  margin-top: 4rem;
  margin-left: 7.2rem;
  font-size: 16px;
  color: #eee;
} */

.powered-badge {
  padding-top:2px ;
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
  color: #008afe;
  text-decoration: none;
}

/*@media (max-width: 700px) {
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
  }*/
  /*.chat-box.opened {
    transition: 0.5s;
    top: 0;
    bottom: 0;
    height: auto;
    width: 100vw; /* Ancho del chat-box *//*
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
    /*max-height: calc(100vh - 12.5rem);
  } 
}*/

/*@media (min-width: 700px) {

   #chat-widget {
    position: fixed;
    bottom: 0vh;
    left: auto;
    right: 2rem;
    bottom: 2rem;
  }

  div.container {
    width: 60% !important;
  } 

}*/

/* Mozilla Firefox only*/
@-moz-document url-prefix() {
  .chat-message-container {
    scrollbar-width: none;
  }
}


@media only screen and (max-width: 478px) {
  /* For mobile phones: */
  [class*="col-"] {
    width: 100%;
  }

  /* .chat-button.opened {
    width: 2rem;
    height: 2rem;
  } */
  .chat-message-container {
    bottom: 8%;
    max-height: 80%;
  }
.send-button {
  right: 2.5%;
}
  .chat-box.opened {
    transition: 0.5s;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%; /* Ancho del chat-box */
    background-color: rgb(255, 255, 255);
    margin-left: 0;
    margin-right: 0;
    margin: 0;
    position: fixed;
    top: 0%;
  }

  .chat-header {
    border-radius: 0;
  }

  


  /* .chat-profile-status {
      position: absolute;
      margin-top: 2.7rem;
      margin-left: 3rem;
      width: .7rem;
      height: 0.7rem;
      background-color: rgb(0, 211, 0);
      border-radius: 50%;
      border-width: 2px;
      border-color: var(--main-color);
      border-style: solid;
  } */
  
  /* .chat-profile-name {
      margin-left: 6rem;
      margin-top: 1rem;
  } */

  /* .chat-profile-status-text {
    margin-top: 3rem !important;
    margin-left: 7.2rem !important;
  } */
  
}
.classic {
  border-radius: 0px !important;
  font-family: "Times New Roman", Times, serif;
}

.classic-text {
    font-family: "Times New Roman",Times,serif;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
}

</style>
