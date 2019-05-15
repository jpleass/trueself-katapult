<template>

  <div id="mapWrapper">
    <div id="map">
      <img src="@/assets/images/map_white2.png">
    </div>
  </div>

</template>

<script>
export default {

  name: 'Map',
  data() {
    return {
    }
  },
  methods: {
    exitState: function(){
      this.$emit('exit-state');
    }
  }
}
</script>

<style scoped>

  #mapText {
    z-index: 99;
    padding: 1em;
    position: absolute;
    top:0;left:0;
  }
  #map {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    display: flex;
    background: rgba(0,0,0,0);
    align-items: center;
    justify-content: center;
  }

  img {
    max-width: 55%;
    padding: 2em;
    padding-left: 0em
  }

</style>