<template>
  <div id="message-bubble" class="message-bubble" :class="mine ? 'mine' : 'they'">
      {{msg}}
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
	border-radius: .4em;
    margin-top:  .5rem;
    margin-bottom: .5rem;
    padding: 1rem;
    font-size: 16px;
    text-align: left;
}

.message-bubble.they {
	background: #e1e0e0;
    margin-left: 1rem;
    margin-right: 5rem;
}

.message-bubble.mine {
    background: #cce1ff;
    margin-left: 5rem;
    margin-right: 1rem;
}

</style>>