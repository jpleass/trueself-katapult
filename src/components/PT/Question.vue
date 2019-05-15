<template>
	<ul ref="question" class="question">
		<li 
		v-for="(item, index) in Question"
		v-bind:item="item"
		v-bind:index="index"
		v-if="index != 'question'" 
		v-bind:key="item.id">
			<div 
			@click="answerSelect(index)" 
			class="bubble"
			v-bind:class="{ active: questionsActive, selected: isSelected == index}"
			>
			{{ item }}
		</div>
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'Question',
		props: ['Question', 'questionsActive'],
		data() {
			return {
				isSelected: ''
			}
		},
		methods: {
			answerSelect: function(index){
				this.$emit('answer-selected', index);
				this.isSelected = index;
			}
		},
		mounted() {
			var ul = this.$refs.question;
			for (var i = ul.children.length; i >= 0; i--) {
			    ul.appendChild(ul.children[Math.random() * i | 0]);
			}
		}
	}
</script>

<style>

	.bubble {
		color: white;
		font-size: 3.25vw;
		line-height: 1.2em;
		height: 27vw;
		width: 27vw;
		padding: 4vw;
		background: orange;
		border-radius: 50%;
		/*padding-top: 1.35em;*/
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: transparent;
		transition: all 250ms;
		transform: scale(0);
		transition-delay: 0ms;
		text-transform: lowercase;
	}
	.bubble.hide {
		display: none;
	}

	.bubble.active {
		transform: scale(1);
		color: white;
		transition-delay: 750ms;
	}
	.bubble.selected {
		transform: scale(1.25);
		color: white;
	}


	ul {
		list-style-type: none;
		padding-left: 0em;
		position: absolute;
		bottom: 4em;
		/*margin: auto;*/
		text-align: center;
	}

	li {
		vertical-align: top;
		padding-left: 0.5em;
		padding-right: 0.5em;
		padding-bottom: 0.5em;
		/*margin: 0 0.5em;*/
		display: inline-block;
	}

</style>