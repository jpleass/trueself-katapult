<template>
  <div id="app">

    <div id="resetButton">
      <a href="#" @click="resetApp"><i class="fas fa-sync-alt"></i></a>
    </div>
    <transition name="fade">
    <div v-if="!appStart" id="nextCustomer">
      Waiting for next user...
    </div>
    </transition>

    <Video 
      ref="video" />

    <transition name="fade">

    <Dialogue 
      v-show="showDialogue"
      ref="dialogue" 
      v-on:typed-finished="instructions.canContinue = true"
      v-on:dialogue-finished="dialogueFinished" />
    </transition>

    <transition name="fade">
    <Instructions 
      v-show="instructions.canContinue" 
      v-bind:instructions="instructions" 
      v-on:change-message="onChangeMessage"/>
    </transition>

    <transition name="fade">
    <Forms 
      v-show="showForms" 
      v-bind:isMiniMode="isMiniMode"
      ref="forms"
      v-on:form-finished="onFormFinished"/>
    </transition>


    <transition name="fade">
      <PersonalityTest 
      v-if="showTest" 
      v-on:test-end="onTestEnd"/>
    </transition>

    <transition name="fade">
      <PhotoboothUpload 
      v-if="showPhotoboothUpload"
      v-on:image-taken="onImageTaken"/>
     </transition>

    <transition name="fade">
      <Calculating
        v-if="showCalculating" />
    </transition>
     
    <transition name="fade">
      <Results
        v-if="showResults"
        v-bind:image="image" 
        v-bind:result="testResult" 
        v-bind:user="user" 
        v-on:exit-state="onExitResults"
        v-on:image-generated="onImageGenerated"
        ref="results" />
    </transition>

    <transition name="fade">
      <Map
      v-if="showMap"
      v-bind:imageLink="imageLink"
      v-on:exit-state="onExitMap"
      ref="map" />
     </transition>

  </div>
</template>

<script>
import Katapult from '@/components/Katapult'
import Dialogue from '@/components/Dialogue'
import Instructions from '@/components/Instructions'
import Forms from '@/components/Forms'
import Video from '@/components/Video'
import PersonalityTest from '@/components/PersonalityTest'
import PhotoboothUpload from '@/components/PhotoboothUpload'
import Calculating from '@/components/Calculating'
import Results from '@/components/Results'
import Map from '@/components/Map'
import {mixin as VueTimers} from 'vue-timers'



export default {
  name: 'App',
  mixins: [VueTimers],
  components: {
    Dialogue,
    Forms,
    Video,
    PersonalityTest,
    PhotoboothUpload,
    Calculating,
    Results,
    Map,
    Instructions
  },
  timers: {
    startApp: { time: 2000, autostart: true },
  },
  data() {
    return {
      user: {},
      image: null,
      generatedImage: '',
      testResult: '',
      appStart: false,
      useFakeResults: false,
      isMiniMode: false,
      imageLink: '',

      // Shows
      showInstructions: false,
      showDialogue: false,
      showForms: false,
      showTest: false,
      showPhotoboothUpload: false,
      showCalculating: false,
      showResults: false,
      showMap: false,
      video: {
        isPlaying: false
      },
      instructions: {
        message: 'Tap to continue',
        canContinue: false
      }
    }
  },
  mounted() {

       this.$socket.emit('Test', 'Is this working')
  
      if (window.location.pathname == '/mini') {
        this.isMiniMode = true
        this.$refs.dialogue.state = 'introduction';
        // const sample = arr => arr[Math.floor(Math.random() * arr.length)];
        // var results = ['curiosity', 'resilience', 'compassion', 'integrity', 'empathy']
        // this.testResult = sample(results)
        // console.log(this.testResult)

      }

      if (this.useFakeResults) {


        this.$refs.forms.form.fullname = 'Joseph The Long Name Pleass';
        this.$refs.forms.form.organisation = 'Orginisation.io';
        this.testResult = 'empathy'
        this.user = {
          fullname: 'Joseph The Long Name Pleass',
          organisation: 'New Company',
          wristband: 'Staff'
        }
      }
  },
  methods: {
    startApp: function(){
      this.appStart = true
      this.showInstructions = true
      this.showDialogue = true
      this.$timer.stop('startApp')
      this.$refs.dialogue.changeMessage();
    },
    onChangeMessage: function(){
      this.showDialogue = true
      this.instructions.canContinue = false;
      if (this.$refs.dialogue.state == 'calculating') {
        this.showPhotoboothUpload = false;
      } 

      this.$refs.dialogue.changeMessage();

      if (!this.video.isPlaying) {
        this.$refs.video.playVideo();
      }
    },
    dialogueFinished: function(){
      var $this = this;
      this.$refs.video.blurVideo();
      this.showDialogue = false

      if (this.$refs.dialogue.state == 'introduction') {
        this.showForms = true
      }
      if (this.$refs.dialogue.state == 'personalityTest') {
        this.showTest = true
      }
      if (this.$refs.dialogue.state == 'photoboothUpload') {
        this.showPhotoboothUpload = true
      }
      if (this.$refs.dialogue.state == 'calculating') {
        this.showResults = true
        this.$refs.video.invertVideo(true);
        this.$refs.video.unblurVideo();
        setTimeout(function() {
          $this.showCalculating = true
        }, 1000);
      }
      if (this.$refs.dialogue.state == 'map') {
        this.showMap = false;
        
        setTimeout(function() {
          $this.restart()
        }, 1000);
      }
      if (this.$refs.dialogue.state == 'exit') {

      }
    },
    onTestEnd: function(results){
      this.calculateTest(results)
      var $this = this;
      setTimeout(function() {
        $this.showTest = false
      }, 1000);

      this.$refs.dialogue.count = 0
      this.$refs.dialogue.state = 'photoboothUpload'
      this.showDialogue = true
      this.$refs.video.unblurVideo();
      this.$refs.dialogue.changeMessage();
    },
    shuffleAray: function(array){
      var currentIndex = array.length;
      var temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },
    calculateTest: function(results){
      var resultCat = [];
      var topScore = 1;
      for (var key in results) {
        var obj = results[key];
        if (obj >= topScore) {
          if (obj > topScore) {
            resultCat = [];
          }
          topScore = obj;
          resultCat.push(key)
        }
        if (resultCat.length > 1) {
          this.shuffleAray(resultCat);
          this.testResult = resultCat[0]
        } else {
          this.testResult = resultCat[0]
        }
      }
      console.log(this.testResult);
    },
    onFormFinished: function(user){
      this.user = user;
      this.testResult = this.user.result;
      this.showForms = false
      this.$refs.dialogue.count = 0
      this.$refs.dialogue.state = 'personalityTest';
      if (this.isMiniMode) {
        this.$refs.dialogue.state = 'photoboothUpload';
      }
      this.showDialogue = true
      this.$refs.video.unblurVideo();
      this.$refs.dialogue.changeMessage();
      console.log('Form Finished')
      console.log(this.user, this.result)
    },
    onExitResults: function(){
      console.log('Hide Results')
      var $this = this;
      $this.showDialogue = false
      $this.$refs.video.invertVideo(false);

      setTimeout(function() {
        $this.$refs.dialogue.count = 0
        $this.$refs.dialogue.state = 'map'
        // $this.$refs.dialogue.changeMessage();
        $this.showResults = false;
        $this.showMap = true
      }, 2000);

    },
    onExitMap: function(){
      this.showMap = false;
      this.restart();
    },
    onImageTaken: function(image){
      this.image = image
      // this.showPhotoboothUpload = false
      this.$refs.dialogue.count = 0
      this.$refs.dialogue.state = 'calculating'
      // this.showDialogue = true
      this.showInstructions = true
      this.instructions.canContinue = true
      this.$refs.video.swapVideo();
      this.$refs.video.playVideo();
      this.$refs.video.blurVideo();
      // this.$refs.dialogue.changeMessage();
    },
    onImageGenerated: function(image){
      this.imageLink = image;
      this.showCalculating = false;
      this.$refs.video.blurVideo();
  
    },
    restart: function(){
      this.$refs.forms.formReset()
      this.showDialogue = false
      this.showInstructions = false
      this.$refs.dialogue.count = 0
      this.$refs.dialogue.state = 'introduction'
      this.$refs.dialogue.message = ' '
      this.$refs.video.invertVideo(false);
      this.$refs.video.unblurVideo();
      this.appStart = false
      this.$refs.video.swapVideo();
      this.$refs.video.playVideo();
      this.$timer.start('startApp')
    },
    resetApp: function(){
      document.location.reload(false)
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
  font-size: 32px;
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

#resetButton {
  position: fixed;
  top: 1em;
  right: 1em;
  font-size: 0.8em;
  z-index: 9999999;
}

#resetButton a {
  display: block;
  margin-top: 0.5em;
  color: white;
  text-decoration: none;
}

#nextCustomer {
  padding: 1em;
  position: absolute;
  top:0;left:0;
  z-index: 9999999999999;
  width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-pagination-bullet {
  background: white;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

button {
  font-size: 1em;
}

@media screen and (max-width: 576px) {
  #app {
    font-size: 24px;
  }
}
</style>
