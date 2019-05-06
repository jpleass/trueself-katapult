<template>

    <div id="videoWrapper">
      <video 
      class=""
      id='orbVideo' 
      v-bind:class="{ active: isActive, invert: isInvert }"   
      :src="srcLink"
      autobuffer loop playsinline></video>
    </div>

</template>

<script>
  export default {
    name: 'Video',
    data () {
      return {
        isActive: true,
        isInvert: false,
        srcLink: 'http://192.168.178.164:8888/katapult/src/assets/video/breathe.mp4'
      }
    },
    methods: {
      playVideo: function(){
          var orbVideoObject = document.getElementById('orbVideo');
          orbVideoObject.play();
      },
      blurVideo: function(){
        this.isActive = false
      },
      unblurVideo: function(){
        this.isActive = true
      },
      invertVideo: function(){
        this.isInvert = !this.isInvert
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#videoWrapper {
  position: fixed;
  top: 0;left: 0;
  width: 100%;
  z-index: -1;
  height: 100%;
  /*background: #D6D6D7;*/
  text-align: center;
}
video {
  object-fit: cover;
  max-width: 100%;
  width: 720px;
  height:100%;
  transition: all 500ms;
  filter: blur(20px);
  transform: scale(1.5);
  margin: auto;
}

video.active {
  filter: blur(0px);
  transform: scale(1);
}
video.invert {
  filter: invert(1);
  animation: invertChange 1s linear infinite alternate forwards;
}

@keyframes invertChange {
  from {
    filter: invert(0);
  }
  to {
    filter: invert(1);
  }
}

</style>
