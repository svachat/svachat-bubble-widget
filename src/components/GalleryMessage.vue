<template>
<div :style="cssProps">
  <div class="horizontal-container" ref="containerhor">
    <div v-for="item in items" :key="item.index" class="card">
      <div class="image">
        <img class="photo" :src="item.image" />
      </div>
      <div>
        <h1>{{item.title}}</h1>
      </div>
      <div>
          <p>{{item.body}}</p>
      </div>
      <div>
        <a class="link-btn" :href="item.url">More info...</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "GalleryMessage",
  data: function() {
    return {
      items: [
        {
          image: "https://static3.lasprovincias.es/www/multimedia/201910/29/media/cortadas/halloween-foto-kbxC-U90536088313mnH-624x385@Las%20Provincias.jpg",
          url: "#",
          title: "Dark pumpkin",
          body: "This is a scary pumking"
        },
        {
          image: "https://images-na.ssl-images-amazon.com/images/I/714NmRQaDML._UX395_.jpg",
          url: "#",
          title: "Great pumpkin",
          body: "This is a great pumpkin"
        },
        {
          image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffestival-collection.com%2Fwp-content%2Fuploads%2F05%2FCute-Halloween-Skeleton-Clip-Art-(10).png&f=1&nofb=1",
          url: "#",
          title: "Happy skeleton",
          body: "This is a happy skeleton"
        }
      ]
    };
  },
  props: {
    color: String
  },
  computed: {
    cssProps() { return {
        '--main-color': this.color
      }
    }
  },
  methods: {
      sideScroll: function(){
            this.$refs.containerhor.scrollLeft += 30;
        }
  }
};
</script>

<style scoped>
.horizontal-container {
    position:relative;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    margin-bottom: 1rem;
}
.card {
    display: inline-block;
    margin: 1rem;
    border-width: 1px;
    border-style: solid;
    border-color: lightgray;
    border-radius: 11px;

}
.link-btn {
    text-decoration-line: none;
    background-color: var(--main-color);
    left:0;
    right:0;
    width: auto;
    color: white;
    font-weight: bolder;
    display: block;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: .5rem;
}
img.photo {
    height: 10rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
h1 {
    font-size: 16px;
    margin: 5px;
}
p {
    margin: 5px;
}

.buttons {
  margin-bottom: 1rem;
}
</style>