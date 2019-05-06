<template>

	<div  id="dialogueWrapper">
		{{stateCount}}{{count}}
		<vue-typer 
		:text = message
		:repeat='0'
		:type-delay='70'
		caretAnimation='blink'
		@typed='onTyped'
		></vue-typer>
	</div>

</template>

<script>

export default {
	name: 'Dialogue',
	props: ['dialogue'],
	data () {
		return {
			count: 0,
			stateCount: 0,
			message: ' ',
			username: 'String',
			canContinue: false,
			dialogues: [
				[
					' ',
					'Hey this is this.',
					'And this is this.'
				],
				[
					' ',
					'Whatever happens here.',
					'I Hope this works'
				],
				[
					' ',
					'The test is finished, now we are going to take your image'
				],
				[
					' ',
					'You took the image, thanks for that.',
					'Now we are going to start your true self thingy.'
				]
			]
		}
	},
	methods: {
		changeMessage: function() {

			if (this.canContinue && this.count < this.dialogues[this.stateCount].length-1) {
				this.count++
				this.message = this.dialogues[this.stateCount][this.count];
				this.canContinue = false
			}

			if (this.canContinue && this.count == this.dialogues[this.stateCount].length-1) {
				this.$emit('dialogue-finished')
				this.isDialogue = false
			}

		},
		onTyped: function(typedString){
			this.$emit('typed-finished');
			this.canContinue = true
			if (this.count == this.dialogues[this.stateCount].length-1) {
				this.canContinue = true
			}
		}
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#dialogueWrapper {
	position: relative;
	z-index: 99;
	padding: 1em;
	text-align: left;
	opacity: 1;
	transition: opacity 500ms;
}

</style>
