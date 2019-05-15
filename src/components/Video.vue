<template>

    <div id="videoWrapper">

   
      <video 
      v-show="orbBreathe"
      id='orbVideo' 
      v-bind:class="{ active: isActive, invert: isInvert }"   
      :src="srcLink"
      autobuffer preload="auto" loop playsinline></video>

  
      <video 
      v-show="orbDivide"
      id='orbVideoDivide' 
      v-bind:class="{ active: isActive, invert: isInvert }"   
      :src="srcLinkDivide"
      autobuffer preload="auto" loop playsinline></video>


    </div>

</template>

<script>
  export default {
    name: 'Video',
    data () {
      return {
        isActive: true,
        isInvert: false,
        orbBreathe: true,
        orbDivide: false,
        srcLink: 'http://'+location.hostname+':8888/katapult/src/assets/video/breathe.mp4',
        srcLinkDivide: 'http://'+location.hostname+':8888/katapult/src/assets/video/divide.mp4'
      }
    },
    methods: {
      playVideo: function(){
          var orbVideoObject = document.getElementById('orbVideo');
          var orbVideoDivideObject = document.getElementById('orbVideoDivide');
          if (this.orbBreathe) {
            orbVideoObject.play();
            orbVideoDivideObject.pause();
          } else {
            orbVideoObject.pause();
            orbVideoDivideObject.play();
          }
      },
      swapVideo: function(){
          console.log('Orb Breathe:'+this.orbBreathe, this.orbDivide)
          this.orbBreathe = !this.orbBreathe;
          this.orbDivide = !this.orbDivide;
          console.log('Orb Breathe:'+this.orbBreathe, this.orbDivide)
      },
      blurVideo: function(){
        console.log('blurVideo')
        this.isActive = false
      },
      unblurVideo: function(){
        this.isActive = true
      },
      invertVideo: function(invertMode){
        if (invertMode) {
          this.isInvert = true;
        } else {
          this.isInvert = false;
        }
        console.log('invertingVideo', this.isInvert)
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
  transform: scale(1.5);
  margin: auto;
  filter: invert(0) blur(20px);
}

video.active {
  filter: blur(0px) invert(0);
  transform: scale(1.1);
}
video.invert {
  filter: invert(1) blur(20px);
  /*animation: invertChange 1s linear infinite alternate forwards;*/
}

video.active.invert {
  filter: invert(1) blur(0px);
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
