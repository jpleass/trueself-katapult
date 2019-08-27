<template>

	<div  id="dialogueWrapper">
		<vue-typer 
		:text = message
		:repeat='0'
		:type-delay='15'
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
			state: 'introduction',
			message: ' ',
			username: 'String',
			canContinue: false,
			dialogues: {
				introduction: [
					'Welcome to your True Self. This is a self-\nreflective ritual that is required to obtain\nyour festival name badge.',
					"I am now going to decode your True Self\nNeural Lace. This reveals your exclusive neural\npotential, your unique trait.\n\nLet's begin...",
					'Before we start, I need some details\nfrom you.',
					// 'One'
				],
				personalityTest: [
					"Answer the following questions with honesty,\nI seek only to show you your true self."
					// 'Two'
				],
				photoboothUpload: [
					"Gaze upon me and focus on your strengths...\nI will capture your image."
					// 'Three'
				],
				calculating: [
					'Are you ready to discover your true self?',
				],
				map: [
					"Your True Self will be revealed at the photo\nkiosk located in the map below.\n\nEnjoy the festival!",

				]
			}
		}
	},
	methods: {
		changeMessage: function() {

			if (this.canContinue && this.count < this.dialogues[this.state].length) {
				this.message = this.dialogues[this.state][this.count];
				this.canContinue = false
				this.count++
			}

			if (this.canContinue && this.count == this.dialogues[this.state].length) {
				this.$emit('dialogue-finished')
				this.isDialogue = false
			}

		},
		onTyped: function(typedString){
			this.$emit('typed-finished');
			this.canContinue = true
			if (this.count == this.dialogues[this.state].length-1) {
				this.canContinue = true
			}
		}
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#dialogueWrapper {
	position: relative;
	z-index: 99;
	padding: 1em;
	text-align: left;
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
