<template>

  <div class="trueSelfWrapper">


  </div>

</template>

<script>


export default {
  name: 'Katapult',
  data () {
    return {
      isDialogue: true,
      isForms: false,
      isVideoPlaying: false,
      msg: 'Welcome to Your Vue.js App',
      button: {
        text: 'Print'
      },
      form: {
        canSubmit: false,
        fullname: '',
        organisation: '',
        wristbandColor: '',
        warningMessage: ''
      },
      dialogue: {
        count : 0,
        canContinue: false,
        message: dialogues[0]
      },
      video: {
        isActive: true,
        srcLink: 'http://192.168.178.164:8888/katapult/src/assets/video/breathe.mp4'
      },
      instructions: {
        message: 'Tap to continue'
      }
    }
  },
  methods: {
    sendPrintMessage: function () {
      console.log('sendPrintMessage')
      this.$socket.emit('sendPrint')
      this.button.text = 'Printing'
      
      // this.video.srcLink = 'http://techslides.com/demos/sample-videos/small.mp4'
    },
  },
  sockets: {
    connect: function () {
        console.log('Client Connected')
    },
    customEmitted: function () {
        console.log('this method was fired by the socket server')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/*
Blue: #006CBB;
Pink: #FC64AE;
Green: #338F46;
Orange: #FF8458
Purple: #6747B1
You: #6747B1
*/

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.trueSelfWrapper {
  /*max-width: 720px;*/
  position: absolute;
  top:0;left:0;
  height: 100%; width: 100%;
  margin: auto;
}

#printButton {
  background: red;
  padding: 0.5em 1em;
  color: white;
  border-radius: 10px;
  font-size: 2em;
}
#printButton:hover {
  background-color: maroon;
}


#instructionsWrapper {
  position: fixed;
  bottom: 0;
  left:0;
  color: #006CBB;
  padding: 0.5em 0em;
  width: 100%;
  text-align: center;
  opacity: 0;
  transition: opacity 0ms;
}
#instructionsWrapper.show {
  transition: opacity 500ms;
  opacity: 1;
}

#videoWrapper {
  position: fixed;
  top: 0;left: 0;
  width: 100%;
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


</style>
