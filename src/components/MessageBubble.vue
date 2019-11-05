<template>
<div class="container" :class="mine ? 'mine' : 'they'">
  <div id="message-bubble" class="message-bubble" :class="mine ? 'mine' : 'they'">
      <p>{{msg}}</p>
  </div>
  <div class="options" v-if="optionClicked == false">
      <p v-for="option in options" :key="option" class="option" v-on:click="sendOption( $event, option)">{{option}}</p>
  </div>
</div>
</template>

<script>
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
        options: Array
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
    margin-top:  .5rem;
    margin-bottom: .5rem;
    padding: 1rem;
    font-size: 16px;   
    width: fit-content;
    max-width: 25rem;
    text-align: left;
}

.message-bubble.they {
   
	background: #e8e8e8;
    margin-left: 1rem;
    margin-right: 8rem;
    border-top-left-radius: 0px;
}

.message-bubble.mine {
    
    background: rgb(217, 225, 242);
    margin-left: auto;
    margin-right: 1rem;
    border-top-right-radius: 0px;
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
    background-color: rgb(87,120,180); 
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
</style>