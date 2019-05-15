<template>

  <div v-bind:class="{show: showImage}" id="resultsWrapper">
    <transition name="fade">
    <div v-if="showResults" id="resultsText">
      {{results[result]}}
    </div>
    </transition>
    <transition name="fade">
    <div v-show="!showImage" id="loadingText">
      Generating Image...
    </div>
    </transition>
    <transition name="fade">
    <div v-show="showImage" id="canvasWrapper">
      <canvas id="canvas"> </canvas>
    </div>
    </transition>
     <div v-show="showImage" id="canvasWrapper2">
      <canvas id="printCanvas"> </canvas>
    </div>
    <div v-if="showImage" @click="exitState" id="instructionsWrapper" class="show">
      <p>Tap to continue</p>
    </div>
  </div>


</template>

<script>
import axios from 'axios'
export default {

  name: 'Results',
  props: ['image', 'result', 'user'],
  data() {
    return {
      showResults: false,
      showImage: false,
      loadCount: 0,
      quest: '',
      imageData: '',
      results: {
        compassion: '',
        curiosity: '',
        empathy: '',
        integrity: '',
        resilience: ''
      },
      images: {
        multiply: new Image(),
        normal: new Image(),
        difference: new Image(),
        background: new Image(),
        canvasImage: new Image()
      }
    }
  },
  mounted () {
    axios
        .get('https://josephpleass.com/katapultDB/home.json?nocache=' + (new Date()).getTime())
        .then(response => {
          this.results = response.data.results;
          this.showResults = true
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)

    var result = this.result;
    var $this = this;

    axios
        .get('https://josephpleass.com/katapultDB/images.json?nocache=' + (new Date()).getTime())
        .then(response => {
          console.log('somethign!!!');
          var result = this.result;
          console.log(result);
          var keys = Object.keys(response.data);
          keys.forEach(function(key) { //loop through keys array
            if (key == result) {
              $this.images.multiply.crossOrigin = 'anonymous'
              $this.images.multiply.src = response.data[key].multiply
              $this.images.normal.crossOrigin = 'anonymous'
              $this.images.normal.src = response.data[key].normal
              $this.images.difference.crossOrigin = 'anonymous'
              $this.images.difference.src = response.data[key].difference
      
              console.log(response.data);

              $this.images.multiply.onload = function(){
                console.log('Image Loaded')
                $this.loadCount++
                if ($this.loadCount == 3) {
                  console.log('All Loaded');
                  $this.renderCanvas($this.image, response.data[key])
                }
              }
              $this.images.normal.onload = function(){
                console.log('Image Loaded')
                $this.loadCount++
                if ($this.loadCount == 3) {
                  console.log('All Loaded');
                  $this.renderCanvas($this.image,  response.data[key])
                }
              }
              $this.images.difference.onload = function(){
                console.log('Image Loaded')
                $this.loadCount++
                if ($this.loadCount == 3) {
                  console.log('All Loaded');
                  $this.renderCanvas($this.image, response.data[key])
                }
              }


            }
          });

        })
        .catch()
        .finally(() => this.loading = false)

  },
  methods: {
    exitState: function(){
      console.log('Exit State');
      this.$emit('exit-state');
      this.showImage = false;
    },
    renderCanvas: function(img, responseData){
        function grayScale(context, canvas) {
          var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
          var pixels  = imgData.data;
          for (var i = 0, n = pixels.length; i < n; i += 4) {
            var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
            pixels[i  ] = grayscale; // Red
            pixels[i+1] = grayscale; // Green
            pixels[i+2] = grayscale; // Blue
          }
          context.putImageData(imgData, 0, 0);
        }
      var canvas = document.getElementById('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      grayScale(ctx, canvas)
      ctx.globalCompositeOperation = 'multiply';
      ctx.drawImage(this.images.multiply, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'normal';
      ctx.drawImage(this.images.normal, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'difference';
      ctx.drawImage(this.images.difference, 0, 0, canvas.width, canvas.height);
      
      this.imageData = canvas.toDataURL();
      
      var $this = this;
      this.images.canvasImage.src = canvas.toDataURL();
      this.images.canvasImage.onload = function(){
        $this.renderPrint(responseData)
      }
    },
    renderPrint: function(responseData){
      var $this = this;
      this.images.background.crossOrigin = 'anonymous'
      this.images.background.src = responseData.background
      this.images.background.onload = function(){
        console.log('Background Loaded')
        var canvas = document.getElementById('printCanvas');
        canvas.width = 1050;
        canvas.height = 1500;
        var ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'normal';
        ctx.drawImage($this.images.background, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          $this.images.canvasImage,
          345/8,
          389/2.5,
          345*2.65, 
          389*2.65, 
          canvas.width * 0.115,
          canvas.height * 0.1475,
          canvas.width * 0.77,
          canvas.height * 0.61
        )
        ctx.font = "50px Favorit";
        ctx.fillStyle = "white";
        ctx.fillText($this.user.fullname, 50, canvas.height-130);
        ctx.fillText($this.user.organisation, 50, canvas.height-75);

        ctx.font = "30px Favorit";
        ctx.textAlign = "right";
        ctx.fillText($this.user.wristband, canvas.width-50, canvas.height-75);

        ctx.font = "30px Favorit";
        
        $this.getQuest(ctx, canvas);
      }
    },
    getQuest: function(ctx, canvas){
      function wrapText(ctx, text, maxWidth){
         var words = text.split(" ");
          var lines = [];
          var currentLine = words[0];

          for (var i = 1; i < words.length; i++) {
              var word = words[i];
              var width = ctx.measureText(currentLine + " " + word).width;
              if (width < maxWidth) {
                  currentLine += " " + word;
              } else {
                  lines.push(currentLine);
                  currentLine = word;
              }
          }
          lines.push(currentLine);
          return lines;
      }
      axios
        .get('https://josephpleass.com/katapultDB/quests.json?nocache=' + (new Date()).getTime())
        .then(response => {
          var result = this.result;
          var keys = Object.keys(response.data);
          keys.forEach((key) => {
            if(key == result){
              this.quest = `${response.data[key]} ${response.data.subject} ${response.data.locations}`;
              ctx.textAlign = "center";
              ctx.fillText("YOUR QUEST:", canvas.width/2, canvas.height-310);

              var lines = wrapText(ctx, this.quest, canvas.width*0.725);
              
              for (var i = lines.length - 1; i >= 0; i--) {
                 ctx.fillText(
                  lines[i], 
                  canvas.width/2, 
                  canvas.height - (270 - i*35)
                );
              }

              var $this = this;
              canvas.toBlob(function(blob){
                $this.$emit('image-generated', [$this.imageData, blob]);
              }, 'image/jpeg', 0.95); // JPEG at 95% quality
              setTimeout(function() {
                
                $this.showImage = true
              }, 5000);

            }
          })
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
        
    }
  }
}
</script>

<style scoped>
#resultsWrapper {
  padding: 1em;
  color: #FF8458;
  opacity: 0;
  transition: opacity 500ms;
  transition-delay: 0s;
  
}
#resultsWrapper.show {
  opacity: 1;
  transition-delay:  1s;
}

#instructionsWrapper {
  position: fixed;
  bottom: 0;
  left:0;
  color: #006CBB;
  padding: 0.5em 0em;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
  text-align: center;
  opacity: 0;
  transition: opacity 0ms;
}
#instructionsWrapper.show {
  transition: opacity 500ms;
  opacity: 1;
}
#canvasWrapper {
  position: absolute;
  top:0; left:0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#canvas {
  max-width: 75%;
  max-height: 500px;
}
#canvasWrapper2 {
  position: absolute;
  top:0; left:0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 99;
  display: none;
  align-items: center;
  justify-content: center;
}
#printCanvas {
  max-width: 75%;
  /*max-height: 500px;*/
}
#loadingText {
  position: absolute;
  top:0;left:0;
  color: white;
  width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  max-width: 100%;
}

@media screen and (orientation: portrait) {
  #canvas {
    /*transform: rotate(90deg);*/
  }
}

</style>