<template>
	<div class="container">
		<swiper :options="swiperOption" ref="mySwiper">
		  <swiper-slide class="swiper-no-swiping" v-for="(longQuestion, index) in longQuestions" :key="index">
			<h2 class="question">{{ longQuestion.question }}</h2>
			<ul>
				<li><div @click="answerSelect(0)" class="bubble">{{ longQuestion.curiosity }}</div></li>
				<li><div  @click="answerSelect(1)" class="bubble">{{ longQuestion.resilience }}</div></li>
				<li><div  @click="answerSelect(2)" class="bubble">{{ longQuestion.compassion }}</div></li>
				<li><div @click="answerSelect(3)" class="bubble">{{ longQuestion.integrity }}</div></li>
				<li><div  @click="answerSelect(4)" class="bubble">{{ longQuestion.empathy }}</div></li>
			</ul>
		  </swiper-slide>
		  <swiper-slide class="swiper-no-swiping" v-for="(mediumQuestion, index) in mediumQuestions" :key="index + longQuestions.length">
			<h2 class="question">{{ mediumQuestion.question }}</h2>
			<ul>
				<li><div @click="answerSelect(0)" class="bubble">{{ mediumQuestion.curiosity }}</div></li>
				<li><div  @click="answerSelect(1)" class="bubble">{{ mediumQuestion.resilience }}</div></li>
				<li><div  @click="answerSelect(2)" class="bubble">{{ mediumQuestion.compassion }}</div></li>
				<li><div @click="answerSelect(3)" class="bubble">{{ mediumQuestion.integrity }}</div></li>
				<li><div  @click="answerSelect(4)" class="bubble">{{ mediumQuestion.empathy }}</div></li>
			</ul>
		  </swiper-slide>
		  <swiper-slide class="swiper-no-swiping" v-for="(shortQuestion, index) in shortQuestions" :key="index + (mediumQuestions.length + longQuestions.length)">
			<h2 class="question">{{ shortQuestion.question }}</h2>
			<ul>
				<li><div @click="answerSelect(0)" class="bubble">{{ shortQuestion.curiosity }}</div></li>
				<li><div  @click="answerSelect(1)" class="bubble">{{ shortQuestion.resilience }}</div></li>
				<li><div  @click="answerSelect(2)" class="bubble">{{ shortQuestion.compassion }}</div></li>
				<li><div @click="answerSelect(3)" class="bubble">{{ shortQuestion.integrity }}</div></li>
				<li><div  @click="answerSelect(4)" class="bubble">{{ shortQuestion.empathy }}</div></li>
			</ul>
		  </swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>


<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import axios from 'axios'

export default {
	name: 'PersonalityTest',
	components: {
		swiper,
		swiperSlide
	},
	data() {
		return {
			swiperOption: {
				pagination: {
					el: '.swiper-pagination'
				}
			},
			score: {
				curiosity: 0,
				resilience: 0,
				compassion: 0,
				integrity: 0,
				empathy: 0
			},
			loading: true,
			longQuestions: null,
			mediumQuestions: null,
			shortQuestions: null
		}
	},
	methods: {
		answerSelect: function(index){
			switch(index) { 
			   case 0: { 
			      this.score.curiosity++
			      break; 
			   } 
			   case 1: { 
			      this.score.resilience++
			      break; 
			   }
			   case 2: { 
			      this.score.compassion++
			      break;    
			   } 
			   case 3: { 
			      this.score.integrity++
			      break; 
			   }
			   case 4: { 
			      this.score.empathy++
			      break; 
			   } 
			   default: { 
			      console.log("Invalid choice"); 
			      break;              
			   } 
			} 
			if (this.swiper.isEnd) {
				console.log('End');
				console.log(this.score);
				this.$emit('test-end', this.score);
			} else {
				this.swiper.slideNext();
			}
		}
	},
	computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
	mounted() {
		 axios
	      .get('https://josephpleass.com/katapultDB/home.json')
	      .then(response => {
	        this.longQuestions = response.data.longQuestions
	        this.mediumQuestions = response.data.mediumQuestions
	        this.shortQuestions = response.data.shortQuestions
	      })
	      .catch(error => {
	        console.log(error)
	        this.errored = true
	      })
	      .finally(() => this.loading = false)
	}
}
</script>


<style scoped>
	
.swiper-container {
	position: fixed;
	top:0; left: 0;
	height: 100%;
	width: 100%;
}

.swiper-slide {
	color: #FF8458;
	padding: 1em;
	opacity: 0;
	transition: opacity 500ms ease-in-out;
	transition-delay: 500ms;
}
.swiper-slide-active {
	opacity: 1;
}

ul {
	list-style-type: none;
	padding-left: 0;
	position: absolute;
	bottom: 2em;
	left: 0;
	text-align: center;
}

li {
	margin: 0 0.5em;
	display: inline-block;
}


h2 {
	font-size: 1em;
	line-height: 1.4em;
	margin-top: 0;
	margin-bottom: 0;
	font-weight: normal;
	max-width: 80%;
}

.bubble {
	color: white;
	width: 8em;
	font-size: 0.75em;
	line-height: 1.3;
	height: 8em;
	padding: 1em;
	background: orange;
	border-radius: 50%;
	padding-top: 1.35em;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
}
	
</style>