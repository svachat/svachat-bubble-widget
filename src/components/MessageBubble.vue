<template>
<div class="container" :class="mine ? 'mine' : 'they'" :style="cssProps">
  <div id="message-bubble" class="message-bubble" :class="mine ? 'mine' : 'they'">
      <p v-html="msg" v-linkified:options="{target:'_blank'}">dsdsds{{msg}}</p>
  </div>
  <div class="options" v-if="optionClicked == false">
      <p v-for="option in options" :key="option" class="option" v-on:click="sendOption( $event, option)">{{option}}</p>
  </div>
</div>
</template>

<script>

import Vue from "vue";
import linkify from 'vue-linkify';
Vue.directive('linkified', linkify);


export default {
    name: 'MessageBubble',
    data: function() {
        return {
            optionClicked: false
        }
    },
    props: {
        msg: String,
        mine: Boolean,
        options: Array,
        color: String
    },
    computed: {
        cssProps() { 
            return {
            '--main-color': this.color,
            '--light-color': this.color
        }   
        }
    },
    methods: {
        sendOption: function (event, option) {
            this.$root.$emit('sendMessage', event, option);
            this.optionClicked = true;
        }
        
    }
}
</script>

<style scoped>

.container.mine {
    margin-right: 0;
}
.message-bubble {
	border-radius: 1rem;
    margin-top:  10px;
    margin-bottom: 10px;
    padding: 16px;
    font-size: .9rem;       
    white-space: pre-wrap;
    word-wrap: break-word;
    width: max-content;
    text-align:justify;
    max-width: 262px;
        /* max-width: 25rem; */
    text-align: left;
}
.message-bubble.they {
   background: #e8e8e8;
    margin-left: 20px;
    border-top-left-radius: 0px;
}
.message-bubble.mine {
    color: white!important;
    font-weight: 800;
    background: var(--light-color);/*rgb(217, 225, 242);*/
    margin-left: auto;
    margin-right: 20px;
    border-top-right-radius: 0px;
}
.message-bubble.mine a{
    background-color: white!important;
    padding: 0 5px!important;
}
p {
    margin: 0;
}
.options {
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: white;
    text-align: center;
}
.option {
    background-color: var(--main-color);
    border-radius: 30px;
    width: auto;
    display:inline-block;
    margin-left: .5rem;
    margin-bottom: .5rem;
    padding: 1rem;
    cursor: pointer;
    font-weight: bolder;
    min-width: 4rem;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  [class*="col-"] {
    width: 100%;
  }
  p {
      font-size: .9rem;
  }
  .message-bubble {
      max-width: 75%;
  }
}  
</style>
