<template>
  <div>
      <div>
          <img :src="this.image" />
      </div>
      <div>
          <h1>{{this.body}}</h1>
      </div>
      <div>
          <a :href="this.url">More info...</a>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ItemMessage',
    props: {
        image: String,
        url: String,
        body: String
    }
}
</script>

<style scoped>

</style>