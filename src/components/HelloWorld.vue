<template>
  <div id="app">
    <div class="chat">
      <div class="chat-box">Hola</div>
      <div class="bottom">
        <div class="chat-button">
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 477.6 477.6"
            style="enable-background:new 0 0 477.6 477.6;"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M407.583,70c-45.1-45.1-105-70-168.8-70s-123.7,24.9-168.8,70c-87,87-93.3,226-15.8,320.2c-10.7,21.9-23.3,36.5-37.6,43.5
			c-8.7,4.3-13.6,13.7-12.2,23.3c1.5,9.7,8.9,17.2,18.6,18.7c5.3,0.8,11,1.3,16.9,1.3l0,0c29.3,0,60.1-10.1,85.8-27.8
			c34.6,18.6,73.5,28.4,113.1,28.4c63.8,0,123.7-24.8,168.8-69.9s69.9-105.1,69.9-168.8S452.683,115.1,407.583,70z M388.483,388.5
			c-40,40-93.2,62-149.7,62c-37.8,0-74.9-10.1-107.2-29.1c-2.1-1.2-4.5-1.9-6.8-1.9c-2.9,0-5.9,1-8.3,2.8
			c-30.6,23.7-61.4,27.2-74.9,27.5c16.1-12,29.6-30.6,40.9-56.5c2.1-4.8,1.2-10.4-2.3-14.4c-74-83.6-70.1-211,8.9-290
			c40-40,93.2-62,149.7-62s109.7,22,149.7,62C471.083,171.6,471.083,306,388.483,388.5z"
                />
                <path
                  d="M338.783,160h-200c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h200c7.5,0,13.5-6,13.5-13.5S346.183,160,338.783,160z"
                />
                <path
                  d="M338.783,225.3h-200c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h200c7.5,0,13.5-6,13.5-13.5S346.183,225.3,338.783,225.3z"
                />
                <path
                  d="M338.783,290.6h-200c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h200c7.5,0,13.5-6,13.5-13.5S346.183,290.6,338.783,290.6z"
                />
              </g>
            </g>
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat {
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  z-index: 9999;
  min-width: 400px;
  /*position: fixed;
  bottom: 0px;
  right: 0px;
  z-index: 9999;
  min-width: 400px;
  box-sizing: content-box;
  overflow: hidden;
  min-height: 120px;
  display: block;*/
}

.chat-button {
  width: 3rem;
  border-radius: 50%;
  padding: 1rem;
  background: rgb(0, 108, 255);
  color: rgb(255, 255, 255);
  margin-right: 0px;
}

.chat-button:hover {
  border-radius: 50%;
  padding: 1rem;
  background: rgb(80, 148, 245);
  color: rgb(255, 255, 255);
  cursor: pointer;
}
.bottom {
  width: 100%;
  text-align: right;
}

.chat-icon {
  margin: 0px;
  padding: 0px;
  vertical-align: text-bottom;
  width: 3rem;
}

.chat-box {
  height: 30rem;
  width: 10rem; /* Ancho del chat-box */
  padding: 3rem;
  background-color: aqua;
}
</style>
