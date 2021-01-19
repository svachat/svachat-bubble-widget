<template>
  <div id="chat-widget" :style="cssProps">
    <!--<div id="chat-box" class="chat-box closed">-->
      <div id="chat-box" class="'chat-box closed'">
      <div id="chat-content" class="chat-content hidden">
        <div class="chat-header" :class="[opened ? 'open' : 'hidden', currentLook]">
          <div class="chat-profile-icon"></div>
          <h1 class="chat-profile-name">{{currentTitleName}}</h1>
          <div class="close-icon" v-on:click="toggle"></div>
        </div>
        <div class="powered-badge" :class="[currentLook]">
            <p class="statement">
              {{poweredByText}}
              <a class="powered-link" href="https://svachat.com" target="_blank">Svachat</a>
            </p>
          </div>
        <div id="msg-container" :class="[currentLook == 'sport' ? 'chat-message-container' : 'classic-text chat-message-container']" ref="container">

        </div>
        <div class="chat-footer" :class="[currentLook]">
          <form autocomplete="off" action="#" v-on:submit="sendMessage">
            <input
              id="text-input"
              class="chat-text-input"
              :class="[currentLook]"
              type="text"
              v-model="message"
              :placeholder="placeHolder" />
            <div class="send-button" v-on:click="sendMessage"></div>
          </form>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div id="chat-button" class="chat-button opened" v-on:click="toggle">
        <div id="sp" class="sp"></div>
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
import axios from 'axios';
import VueCryptojs from 'vue-cryptojs';
Vue.use(VueCryptojs);

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
      placeHolder: "Escribe una pregunta...",
      poweredByText : '⚡ Accionado ⚡ por ',
      message: '',
      writing: false,
      assitent:{},
      headerClasses: "",
      currentWelcome: String,
      currentLook: String,
      currentColor: String,
      currentIcon: String,
      //currentTitleName: String,
      currentClient: Number,
      userLang: String,
      startChatText: 'Chat',
      apiUrl: 'https://87b61e0e2ce6.ngrok.io/bot/',
      welcomeMessageCount : 0,
      userMessageCount : 0
     
    };
  },
  props: {
    // welcome: String,
    // look: String,
    // color: String,
    // icon: String,
    // titleName: String,
    // client: Number,
    token: String,
    currentTitleName: String
  },
  computed: {
    cssProps() { 
      return {
        '--main-color': this.currentColor,
        '--icon-url': "url(" + this.currentIcon + ")"
      }
    }
  },
  mounted() {    
    this.chargeAgent();
    this.userLang = navigator.language || navigator.userLanguage;      
    console.log('Browser Language: '+this.userLang )
    
    if ("es-ES" != this.userLang) {      
         this.placeHolder = "Write your question";
         this.startChatText="Chat";
         this.poweredByText="⚡ Powered ⚡ by ";       
    }   
  
    
    this.$root.$on("sendMessage", (e, message) => {
      this.sendMessage(e, message);
    });
    setTimeout(() => { 
      if (!this.opened) {
        this.toggle() 
      }
    }, 30000);
   // this.translateTrigger();   
  },
  methods: {
    chargeAgent() {
      axios.get('https://87b61e0e2ce6.ngrok.io/chatbot/' + this.token).then(response => {
          console.log(response.data);
          this.assitent = response.data;
          this.currentLook=  response.data.look;
          this.currentColor=  response.data.brand_color;
          this.currentIcon=  response.data.logo;
          this.currentTitleName=  response.data.name;
          this.currentClient=  response.data.user;
        });
    },
    toggle: function() {
      // If the chat-box is open, we want to close it
      if (this.opened) {
        document.getElementById("chat-button").className = "chat-button opened"; // Then, open the button
        document.getElementById("bubbleText").style.color = "white";
        document.getElementById("sp").style.display = "flex";
        document.getElementById("chat-box").className = "chat-box closed"; // And close the box and its content
        document.getElementById("chat-content").className = "chat-content hidden";
      } else {
        document.getElementById("chat-button").className = "chat-button closed";
        document.getElementById("bubbleText").style.color = "transparent";
        document.getElementById("sp").style.display = "none";
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
        userMsgSessionCount = sessionStorage.getItem('user_msg_count');
        sessionStorage.setItem('userMsgSessionCount',userMsgSessionCount);        
        this.userMessageCount += sessionStorage.getItem('user_msg_count')==null?1: parseInt(sessionStorage.getItem('user_msg_count')); 
        console.log('this.userMessageCount:'+  this.userMessageCount);
        sessionStorage.setItem('user_msg_count',this.userMessageCount.toString());
        
        var isUserLeadDataSaved = (sessionStorage.getItem('is_user_lead_data_saved')==null||sessionStorage.getItem('is_user_lead_data_saved')=='null')?false:true;
               
        //Save name as session value only for multiple welcome messages       
        console.log('session_user_name: '+sessionStorage.getItem('user_name'));
        if(parseInt(sessionStorage.getItem('user_msg_count'))==1 && this.welcomeMessageCount>1 && sessionStorage.getItem('user_name')==null)
        {
           sessionStorage.setItem('user_name', inputString);    
           console.log('session_user_name_updated: '+ sessionStorage.getItem('user_name'));
        }
        
         //Save name as session value only for multiple welcome messages 
        console.log('session_user_email: '+sessionStorage.getItem('user_email'));
        if(parseInt(sessionStorage.getItem('user_msg_count'))==2 && this.welcomeMessageCount>1 && sessionStorage.getItem('user_email')==null)
        {
           sessionStorage.setItem('user_email', inputString);    
           console.log('session_user_email_updated: '+ sessionStorage.getItem('user_email'));
        }       
      
        
        var MessageClass = Vue.extend(MessageBubble);
        var msgInstance = new MessageClass({
          propsData: {
            mine: true,
            msg: inputString,
            color: this.currentColor
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
        
        console.log('this.userMessageCount just before response:'+sessionStorage.getItem('user_msg_count'));
        if(parseInt(sessionStorage.getItem('user_msg_count'))==1 && this.welcomeMessageCount>1)
        {
          console.log('Inside sendMessage()=>if(this.userMessageCount==1 && this.welcomeMessageCount>1)');
          let askForEmailMsg =this.userLang!="en-US"?"¡Gracias,"+inputString+"! ¿Cuál es la dirección de correo electrónico de tu empresa?":"Thanks,"+inputString+"! What is your business email address?";
            // TODO: Make env param friendly
          axios.get(this.apiUrl + this.currentClient + '/query?message=' + this.message).then(response => {
          this.receiveMessage(askForEmailMsg);    
        });           
        }
        else if(parseInt(sessionStorage.getItem('user_msg_count'))==2 && this.welcomeMessageCount>1){
         console.log('Inside sendMessage()=> else if(this.userMessageCount==2 && this.welcomeMessageCount>1)');
         let initiateChatMsg = this.userLang!="en-US"?"Hola!":"Hi!";         
         axios.get(this.apiUrl + this.currentClient + '/query?message=' + initiateChatMsg).then(response => {
          this.receiveMessage(response.data.text);    
        });          
        }
        else{
        console.log('Inside sendMessage()=> else)');
        axios.get(this.apiUrl + this.currentClient + '/query?message=' + this.message).then(response => {
          this.receiveMessage(response.data.text);    
        });    
        }              
        this.message = "";
        
        //Save the user name and email only once in DB and if both are not empty only
        console.log('Save User Lead in DB=>this.welcomeMessageCount:'+this.welcomeMessageCount+',sessionUserName:'+sessionStorage.getItem('user_name')+',sessionUserEmail:'+sessionStorage.getItem('user_email')+',isUserLeadDataSaved:'+isUserLeadDataSaved);
        if(this.welcomeMessageCount>1 && sessionStorage.getItem('user_name')!=null && sessionStorage.getItem('user_email')!=null && isUserLeadDataSaved==false)
        {
          console.log('Just before save user lead..');
          this.saveLeadData(sessionStorage.getItem('user_name'),sessionStorage.getItem('user_email'));
        }      
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
        axios.get(this.apiUrl + this.currentClient).then(response => {
          var welcome_msg = response.data.message;
          console.log('startSession,message='+welcome_msg);          
          if(welcome_msg.indexOf('primary_msg')!=-1)
          {
             var json_parsed_wm = JSON.parse(welcome_msg);
             console.log(json_parsed_wm);
             this.sendPrimaryWelcomeMsg(json_parsed_wm);
             this.sendAdditionalWelcomeMsgs(json_parsed_wm);
             this.showAvlLeadData();
          }
          else
          {
              this.receiveMessage(response.data.message);
          }          
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
    },
    translateTrigger:function(){
      try{
       var siteURL = window.location.href;
       if(siteURL.indexOf("https://svachat.com") >= 0) //spanish
      {
           this.placeHolder = "Escribe una pregunta...";
           this.startChatText="Chat";
           this.poweredByText="⚡ Powered ⚡ by ";   
      }
    }
    catch(err){
      localStorage.setItem("errorForTranslation: ", err.message);
    }   
    },
    getDecryptedMessage:function(encryptedMessage){
    try{
     console.log("Inside  getDecryptedMessage()=>encryptedMessage:"+ encryptedMessage);
     var decryptedMsg= this.CryptoJS.AES.decrypt(encryptedMessage, "EncSvachat@2021").toString(this.CryptoJS.enc.Utf8); 
     console.log("Decrypted Text : "+ decryptedMsg);
     return decryptedMsg;    
      }
    catch(err){
      console.log("getDecryptedMessage()=>Error: "+ err);
    } 
    },
    sendPrimaryWelcomeMsg:function(parsedJSON){
       try{          
           console.log("Inside sendPrimaryWelcomeMsg(),parsedJSON="+ parsedJSON);
           var primary_welcome_msg =parsedJSON["primary_msg"];
           var decrypted_wm = this.getDecryptedMessage(primary_welcome_msg);
           this.welcomeMessageCount+=1;
           console.log('primary_welcome_msg_encrypted=>'+ primary_welcome_msg+'\n'+'primary_welcome_msg_decrypted=>'+ decrypted_wm);
           this.receiveMessage(decrypted_wm);          
       }
       catch(err){
          console.log("sendPrimaryWelcomeMsg()=>Error: "+ err);
       }
    },
    sendAdditionalWelcomeMsgs:function(parsedJSON){
      try
      {      
           var additional_msgs=[];
           console.log("Inside sendAdditionalWelcomeMsgs(),parsedJSON="+ parsedJSON);
           additional_msgs=parsedJSON["additional_msgs"];          
           console.log("additional_msgs: "+ additional_msgs,"\nadditional_msgs_length:"+additional_msgs.length+"\nCurrent Welocome message count:"+ this.welcomeMessageCount);
           this.welcomeMessageCount +=  additional_msgs.length;          
           console.log("Updated welcome message count:"+ this.welcomeMessageCount);
           
           for(var i=0;i<additional_msgs.length;i++)
           {
              console.log("Encrypted message at "+i+"=>"+ additional_msgs[i]);
              var decrypted_msg = this.getDecryptedMessage(additional_msgs[i]);
              console.log("Decrypted message at "+i+"=>"+ decrypted_msg);
              this.receiveMessage(decrypted_msg);     
           }           
           
      }
      catch(err){
          console.log("sendAdditionalWelcomeMsgs()=>Error: "+ err);
      }
    
    },
    saveLeadData:function(userName,userEmail)
    {
     try{
       console.log('Inside saveLeadData()=>userName='+userName+',userEmail='+userEmail);
       var loggedUserId = parseInt(this.currentClient);
       var leadDataObj = {"user_name":userName,"user_email":userEmail,"logged_user_id":loggedUserId};
       axios.put('https://87b61e0e2ce6.ngrok.io/user_lead/' + this.token+'/'+loggedUserId,leadDataObj).then(response => {
          console.log(response);         
          sessionStorage.setItem('is_user_lead_data_saved','true');
        },error=>{
         console.log('saveLeadData()=>PUT error occurred:'+ error);
          sessionStorage.setItem('is_user_lead_data_saved',null);
        });
     }
      catch(err){
          console.log("saveLeadData()=>Error: "+ error);
          sessionStorage.setItem('is_user_lead_data_saved',null);
      }    
    },
    showAvlLeadData:function(){
        console.log('Inside showAvlLeadData()=>user_name='+sessionStorage.getItem('user_name')+',user_email:'+sessionStorage.getItem('user_email'));
        //Display user name and email messages if available in session to prevent from re-entry of name and email in same session
        if(sessionStorage.getItem('user_name')!=null && this.welcomeMessageCount>1)
        {
           var MessageClass = Vue.extend(MessageBubble);
            var msgInstance = new MessageClass({
              propsData: {
                mine: true,
                msg: sessionStorage.getItem('user_name'),
                color: this.currentColor
              }
            });
        

          if (this.writing) {
            this.$refs.container.removeChild(this.$refs.container.lastChild);
          }

          msgInstance.$mount();
          this.$refs.container.appendChild(msgInstance.$el);    
          
         let askForEmailMsg =this.userLang!="en-US"?"¡Gracias,"+sessionStorage.getItem('user_name')+"! ¿Cuál es la dirección de correo electrónico de tu empresa?":"Thanks,"+sessionStorage.getItem('user_name')+"! What is your business email address?";
         this.receiveMessage(askForEmailMsg);  
         
         if(sessionStorage.getItem('user_email')!=null){
          var msgInstance = new MessageClass({
              propsData: {
                mine: true,
                msg: sessionStorage.getItem('user_email'),
                color: this.currentColor
              }
            });
        

          if (this.writing) {
            this.$refs.container.removeChild(this.$refs.container.lastChild);
          }

          msgInstance.$mount();
          this.$refs.container.appendChild(msgInstance.$el);  
          
          let initiateChatMsg = this.userLang!="en-US"?"Hola!":"Hi!";         
          axios.get(this.apiUrl + this.currentClient + '/query?message=' + initiateChatMsg).then(response => {
          this.receiveMessage(response.data.text);    
         });     
           }        
        }
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
  z-index: 99999 !important;
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
  width: 340px; /* Width of the chat-box */
  background-color: white;
  margin-left: auto;
  margin-right: 20px;
  bottom: 50px;
  z-index: 99999 !important;
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
  z-index: 99999 !important;
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
  z-index: 999999 !important;
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
  z-index: 999999 !important;
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
  /* bottom: 3rem; TODO: quitado para que las burbujas salgan arriba del chat*/ 
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
  font-size: 22px;
  margin: 0;
  margin-top: 14px;
  color: white;
}
.powered-badge {
  padding-top:2px ;
  z-index: 9;
  background-color: white;
  color: lightslategray;
  font-size: 12px;
  text-align: center;
}

.statement {
  margin-bottom: 0;
  margin-top: 3px;
}

.bullet {
  margin-top: 0;
  font-size: 9px;
}

.powered-link {
  color: #008afe;
  text-decoration: none;
}


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

  .chat-message-container {
    bottom: 8%;
    z-index: -1;
    max-height: 80%;    
     /*z-index: -1;  
     max-height: 216px;*/
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
