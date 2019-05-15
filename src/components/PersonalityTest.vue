<template>
	<div class="container">

		<transition name="fade">
			<div v-if="loading" id="loadingText">
				Loading questions...
			</div>
		</transition>

		<transition name="fade">
		<swiper 
		v-show="showTest"
		:options="swiperOption" 
		ref="mySwiper">
		  <swiper-slide class="swiper-no-swiping" v-for="(Question, index) in questions" :key="index">
			<h2 class="question">{{ Question.question }}</h2>
				<Question 
				v-bind:Question="Question"
				v-bind:questionsActive="questionsActive"
				v-on:answer-selected="onAnswerSelected"/>
		  </swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
		</transition>

	</div>
</template>


<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Question from '@/components/PT/Question.vue'
import axios from 'axios'

export default {
	name: 'PersonalityTest',
	components: {
		swiper,
		swiperSlide,
		Question
	},
	data() {
		return {
			showTest: true,
			swiperOption: {
				pagination: {
					el: '.swiper-pagination'
				}
			},
			questionsActive: false,
			score: {
				curiosity: 0,
				resilience: 0,
				compassion: 0,
				integrity: 0,
				empathy: 0
			},
			loading: true,
			questions: [],
		}
	},
	methods: {
		onAnswerSelected: function(index){
			var $this = this;
			$this.score[index]++
			$this.questionsActive = false

			setTimeout(function() {
				if ($this.swiper.isEnd) {
					$this.showTest = false;
					$this.$emit('test-end', $this.score);
				} else {
						$this.swiper.slideNext();
						$this.questionsActive = true
				}
			}, 500);

		}
	},
	computed: {
      swiper() {
        return this.$refs.mySwiper.swiper

      }
    },
	mounted() {
		 axios
	      .get('https://josephpleass.com/katapultDB/home.json?nocache=' + (new Date()).getTime())
	      .then(response => {
	        for (var i = response.data.longQuestions.length - 1; i >= 0; i--) {
	        	this.questions.push(response.data.longQuestions[i])
	        }
	        for (var i = response.data.mediumQuestions.length - 1; i >= 0; i--) {
	        	this.questions.push(response.data.mediumQuestions[i])
	        }
	        for (var i = response.data.shortQuestions.length - 1; i >= 0; i--) {
	        	this.questions.push(response.data.shortQuestions[i])
	        }
	      })
	      .catch(error => {
	        console.log(error)
	        this.errored = true
	      })
	      .finally(() => this.loading = false)
	      this.questionsActive = true
	}
}
</script>


<style scoped>
	
.swiper-container {
	position: absolute;
	top:0; left: 0;
	height: 100%;
	width: 100%;
}

.swiper-slide {
	color: #FF8458;
	/*padding: 1em;*/
	width: 100%;
	height: 100%;
	opacity: 0;
	transition: opacity 500ms ease-in-out;
	transition-delay: 500ms;
}
.swiper-slide-active {
	opacity: 1;
}

h2 {
	font-size: 1em;
	line-height: 1.4em;
	margin-top: 0;
	margin-bottom: 0;
	font-weight: normal;
	max-width: 80%;
	padding: 1em;
}

#loadingText {
  position: absolute;
  top:0;left:0;
  width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>