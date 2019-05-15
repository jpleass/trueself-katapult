<template>

    <div v-on:click="changeMessage"  id="instructionsWrapper" v-bind:class="{ show: instructions.canContinue }">
      <p>{{ instructions.message }}</p>
    </div>
    
</template>

<script>

	export default {
	  name: 'Instructions',
	  props: ['instructions'],
	  data () {
	    return {
	    }
	  },
	  methods: {
	   changeMessage: function(){
	   	this.$emit('change-message');
	   }
	  }
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

	#instructionsWrapper {
	  position: fixed;
	  bottom: 0;
	  left:0;
	  z-index: 99;
	  color: #006CBB;
	  padding: 0.5em 0em;
	  width: 100%;
	  display: flex;
	  align-items: flex-end;
	  justify-content: center;
	  height: 100%;
	  text-align: center;
	  /*animation: pulse 0.75s infinite alternate;*/
	}




</style>
