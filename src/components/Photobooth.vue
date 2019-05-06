<template>

  <div>
    <p>Capture Image: <input id="" type="file" accept="image/*" id="capture" capture="user"> 
    <Timer v-on:timer-finished="capture" ref="timer" />
    <div @click="timerStart" id="videoWrapper">
      <video v-show="!imageTaken"  ref="video" id="video" width="720" height="720" autoplay></video>
      <canvas v-show="imageTaken" ref="canvas" id="canvas" width="720" height="720"></canvas>
    </div>
    <div id="imageCapture" v-bind:class="{ show: imageTaken }">
      <div v-for="c in captures">
        <img v-bind:src="c" />
      </div>
    </div>
  </div>

</template>

<script>

import Timer from '@/components/Timer'

export default {
  name: 'Photobooth',
  components: {
    Timer
  },
  data() {
    return {
      imageTaken: false,
      video: {},
      canvas: {},
      captures: [],
      constraints: {
        audio: false,
        video: {
         facingMode: 'user',
         width: { min: 720, max: 720 },
         height: { min: 720, max: 720},
       }
     }
   }
 },
 mounted() {
   this.video = this.$refs.video;
   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
     navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
      this.$refs.video.srcObject = stream;
	            // this.video.play();
           });
   }
 },
 methods: {
   capture() {
     this.canvas = this.$refs.canvas;
     var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 720, 720);
     this.captures.push(canvas.toDataURL("image/png"));
     this.imageTaken = true
     this.$emit('image-taken', canvas.toDataURL("image/png"))
   },
   timerStart: function(){
    this.$refs.timer.startTimer()
  }
}
}
</script>

<style scoped>
input {
  position: fixed;
  z-index: 99999999;
}
#videoWrapper {
  position: absolute;
  top:0;left:0;
  width: 100%; height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}
#video {
  /*background-color: #000000;*/
  max-width: 100%;
  transform: scale(-1, 1)
  /*transform: rotate(90deg); */
}
#canvas {
  display: none;
  width: 100%;
  height: 100%;

}
#imageCapture {
  position: absolute;
  top:0;left:0;
  width: 100%; height:100%;
  display: flex;
  pointer-events: none;
  align-items: center;
  transform: scale(-1, 1);
  justify-content: center;
  opacity:0;
  transition: opacity 1000ms;
}
#imageCapture.show {
  opacity: 1;
}
</style>