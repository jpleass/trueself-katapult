<template>
  <div id="app">
    <Dialogue 
      v-show="showDialogue"
      ref="dialogue" 
      v-on:typed-finished="instructions.canContinue = true"
      v-on:dialogue-finished="dialogueFinished" />
    <Forms 
      v-show="showForms" 
      v-on:form-finished="formFinished"/>
    <Video 
      ref="video" />
    <PersonalityTest 
      v-if="showTest" 
      v-on:test-end="onTestEnd"/>
    <Photobooth 
      v-on:image-taken="onImageTaken" 
      v-if="showPhotobooth" />
    <Instructions 
      v-show="showInstructions" 
      v-bind:instructions="instructions" 
      v-on:change-message="changeMessage"/>
  </div>
</template>

<script>
import Katapult from '@/components/Katapult'
import Dialogue from '@/components/Dialogue'
import Instructions from '@/components/Instructions'
import Forms from '@/components/Forms'
import Video from '@/components/Video'
import PersonalityTest from '@/components/PersonalityTest'
import Photobooth from '@/components/Photobooth'
import axios from 'axios'
 

export default {
  name: 'App',
  components: {
    Dialogue,
    Forms,
    Video,
    PersonalityTest,
    Photobooth,
    Instructions
  },
  data() {
    return {
      user: {},
      image: null,
      showPhotobooth: true,
      showForms: false,
      showTest: false,
      showDialogue: false,
      showInstructions: true,
      dialogue: {
        stateCount: 0
      },
      video: {
        isPlaying: false
      },
      instructions: {
        message: 'Tap to continue',
        canContinue: true
      }
    }
  },
  mounted () {
    axios
      .post('http://192.168.178.164:8081/upload')
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  },
  methods: {
    changeMessage: function(){
      this.instructions.canContinue = false;
      this.$refs.dialogue.changeMessage();
      if (!this.video.isPlaying) {
        this.$refs.video.playVideo();
      }
    },
    dialogueFinished: function(){
      this.dialogue.stateCount++
      this.$refs.video.blurVideo();
      if (this.dialogue.stateCount == 1) {
        this.showForms = true
        this.showDialogue = false
      }
      if (this.dialogue.stateCount == 2) {
        this.showDialogue = false
        this.showTest = true
      }
      if (this.dialogue.stateCount == 3) {
        this.showDialogue = false
        this.showPhotobooth = true
      }
      if (this.dialogue.stateCount == 4) {
         this.$refs.video.invertVideo();
      }
    },
    onTestEnd: function(results){
      console.log(results.compassion);
      this.showTest = false
      this.$refs.dialogue.count = 0
      this.$refs.dialogue.stateCount++
      this.showDialogue = true
      this.$refs.video.unblurVideo();
      this.$refs.dialogue.changeMessage();
    },
    onImageTaken: function(image){
      this.image = image
      this.showPhotobooth = false
      this.$refs.dialogue.count = 0
      this.$refs.dialogue.stateCount++
      this.showDialogue = true
      this.$refs.video.unblurVideo();
      this.$refs.dialogue.changeMessage();
    },
    formFinished: function(user){
      this.user = user
      console.log(this.user.fullname)
      this.showForms = false
      this.$refs.dialogue.count = 0
      this.$refs.dialogue.stateCount++
      this.showDialogue = true
      this.$refs.video.unblurVideo();
      this.$refs.dialogue.changeMessage();
    }
  }
}


</script>

<style>

* {
  -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
   -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

@font-face {
    font-family: 'Favorit';
    src: url('assets/favorit-dinamo-webfont.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }


body {
  font-size: 2em;
  line-height: 1.4em;
  background: #03070B;
}

#app {
  font-family: 'Favorit';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  width: 100%;
  top: 0;
  left:0;
  position: absolute;
  display: block;
  height: 100%;

}


.vue-typer .custom.char.typed {
  color: #FF8458;
}

.vue-typer .custom.caret {
  width: 0.125em;
  background-color: #FF8458!important;
}
.vue-typer .custom.caret.pre-type {
  width: 0.125em;
  background-color: #FF8458!important;
}
.vue-typer .custom.caret.idle {
  width: 0.125em;
  background-color: #FF8458!important;
}
.vue-typer .custom.caret.typing {
  width: 0.125em;
  background-color: #FF8458;
}

.vue-typer .custom.caret.complete {
  width: 0.125em;
  display: inline-block;
  background-color: #FF8458;
}

.swiper-pagination-bullet {
  background: white;
}

button {
  font-size: 1em;
}

@media screen and (max-width: 576px) {
  #app {
    font-size: 1.4em;
  }
}
</style>
