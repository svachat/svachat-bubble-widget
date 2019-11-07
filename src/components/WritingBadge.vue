<template>
  <div class="writing-badge">
      <img class="writing-badge-gif" :src="this.url"/>
  </div>
</template>

<script>
import someImage from '../assets/writing.gif'
export default {
    name: 'WritingBadge',
    data() {
        return {
            url: process.env.VUE_APP_HOST + someImage
        }
    }
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