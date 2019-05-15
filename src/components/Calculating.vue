<template>

	<div  id="calculatingWrapper">
		<vue-typer 
		:text = message
		:repeat='Infinity'
		:type-delay='70'
		caretAnimation='blink'
		:pre-erase-delay='1000'
		erase-style='clear'
		:erase-delay='0'
		></vue-typer>
	</div>

</template>

<script>

export default {
	name: 'Dialogue',
	data () {
		return {
			message: [
			'Decoding neural lace...', 
			'Aligning trait verticies...',
			'Calculating state...'
			]
		}
	},
	methods: {
	
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#calculatingWrapper {
	position: relative;
	z-index: 99;
	padding: 1em;
	text-align: left;
	opacity: 1;
	transition: opacity 500ms;
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

</style>
