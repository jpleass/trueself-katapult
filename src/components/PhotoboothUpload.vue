<template>

  <div id="photouploadWrapper">
    <div v-if="!imageTaken" class="box">
      <input type="file" @change="onFileChange" name="file-2[]" id="file-2" accept="image/*" class="inputfile inputfile-2" data-multiple-caption="{count} files selected" multiple capture="user" />
      <label for="file-2"><span>Take an image&hellip;</span></label>
    </div>
    <transition name="fade">
      <img v-if="imageTaken" :src=image alt="">
    </transition>
  </div>

</template>

<script>
import loadImage from 'blueimp-load-image';
export default {
  name: 'PhotoboothUpload',
  data() {
    return {
      image: '',
      imageTaken: false
    }
  },
  methods: {
    onFileChange: function(e) {
      var $this = this;
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;

      loadImage(e.target.files[0],function (img) {
          $this.createImage(img.toDataURL());
        }, {orientation: true}
      );

      
    },
    createImage: function(file) {
      var image = new Image();
      image.src = file;
      var vm = this;
      image.onload = function(){
        console.log('Image Loaded')
        vm.image = image.src;
        vm.imageTaken = true
        vm.$emit('image-taken', image);
      }
    },
    removeImage: function (e) {
      this.image = '';
    }
  }

}
</script>

<style scoped>
#photouploadWrapper {
  position: absolute;
  top:0; left:0;
  width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.js .inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputfile + label {
  max-width: 100%;
  font-size: 1.25rem;
  /* 20px */
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: 0.625rem 1.25rem;
  /* 10px 20px */
}

.no-js .inputfile + label {
  display: none;
}

.inputfile:focus + label,
.inputfile.has-focus + label {
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
}

.inputfile + label * {
  /* pointer-events: none; */
  /* in case of FastClick lib use */
}

.inputfile + label svg {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  margin-top: -0.25em;
  /* 4px */
  margin-right: 0.25em;
  /* 4px */
}

.inputfile-2 + label {
  color: #d3394c;
  border: 2px solid currentColor;
}

.inputfile-2:focus + label,
.inputfile-2.has-focus + label,
.inputfile-2 + label:hover {
  color: #722040;
}

img {
  /*max-width: 100%*/
  max-width: 66%;
  padding: 1em;
}

#myCanvas {
  max-width: 100%;
  padding: 1em;
}
</style>