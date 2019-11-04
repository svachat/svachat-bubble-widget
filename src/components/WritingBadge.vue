<template>
  <div class="writing-badge">
      <img class="writing-badge-gif" src='../assets/writing.gif'/>
  </div>
</template>

<script>
export default {
    name: 'WritingBadge'
}
</script>

<style scoped>
.writing-badge {
    position: relative;
    text-align: left;
    left: 20px;
}

.writing-badge-gif {
    margin-left: 0; 
    width: 3rem;
    height: 3rem;
}
</style>