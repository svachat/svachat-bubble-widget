<template>
  <div id="message-bubble" class="message-bubble" :class="mine ? 'mine' : 'they'">
      <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
    name: 'MessageBubble',
    props: {
        msg: String,
        mine: Boolean
    }
}
</script>

<style scoped>
.message-bubble {
    position: relative;
	border-radius: 1rem;
    margin-top:  .5rem;
    margin-bottom: .5rem;
    padding: 1rem;
    font-size: 16px;
    text-align: left;
}

.message-bubble.they {
	background: #e8e8e8;
    margin-left: 1rem;
    margin-right: 5rem;
    border-top-left-radius: 0px;
}

.message-bubble.mine {
    background: rgb(217, 225, 242);
    margin-left: 5rem;
    margin-right: 1rem;
    border-top-right-radius: 0px;
}

p {
    margin: 0;
}

</style>