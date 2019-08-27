<template>

  <div id="mapWrapper">
    <p v-if="!isDownloading">Please return this iPad to a True Self crew member to recieve your print.</p>
   
    <div id="imageWrapper">
      <img v-if="isDownloading" :src=imageLink>
    </div>

    <div id="downloadButton">
      <a @click="downloadImage"> Download Image </a>
    </div>
  </div>

</template>

<script>
export default {

  name: 'Map',
  props: ['imageLink'],
  data() {
    return {
      isDownloading: false,
    }
  },
  methods: {
    exitState: function(){
      this.$emit('exit-state');
    },
    downloadImage: function(){
      this.isDownloading = true
      // var reader = new FileReader();
      // var out = this.imageLink([this.response], {type: 'application/pdf'});
      // reader.onload = function(e){
      //   window.location.href = reader.result;
      // }
      // reader.readAsDataURL(out);
    }
  }
}
</script>

<style scoped>

#mapWrapper {
  padding: 2rem;
  font-size: 2em;
  line-height: 1.3;
}

  #mapText {
    z-index: 99;
    padding: 1em;
    position: absolute;
    top:0;left:0;
  }
  #imageWrapper {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    display: flex;
    background: rgba(0,0,0,0);
    align-items: center;
    justify-content: center;
  }

  #downloadButton {
    position: fixed;
    bottom: 1rem;
    left: 0rem;
  }
  #downloadButton a {
    color: white;
    padding: 1em;
    font-size: 2rem;
    text-decoration: none;
  }



  img {
    max-width: 66%;
    transform: translateY(-1rem);
  }

</style>