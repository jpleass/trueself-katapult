<template>
  <div v-show="isTimer" id="countdown"
    @timer-start:log="timerStarted"
    @timer-stop:log="timerStopped"
    @timer-tick:log="timerTicked">

    <div id="countdown-number"></div>
    <svg>
      <circle r="18" cx="20" cy="20"></circle>
    </svg>
  </div>
</template>

<script>
import {mixin as VueTimers} from 'vue-timers'

export default {
	name: 'Timer',
  mixins: [VueTimers],
  data(){
    return {
      isTimer: false,
      countdown: 5
    }
  },
  timers: {
    log: { time: 5000, autostart: false }
  },
  methods: {
    log () {
      console.log('Hello world')
      this.isTimer = false
      this.countdown = 5
      this.$emit('timer-finished')
    },
    timerStarted: function(){
      console.log('Timer Started') 
    },
    timerStopped: function(){
      console.log('Timer Stopped')
    },
    timerTicked: function(){
      console.log('Timer Ticked')
    },
    startTimer: function(){
      console.log('Hey');
      this.$timer.start('log')
      this.isTimer = true
      var countdownNumberEl = document.getElementById('countdown-number');
      var countdown = this.countdown;

      countdownNumberEl.textContent = countdown;

      setInterval(function() {
        countdown = --countdown <= 0 ? 5 : countdown;

        countdownNumberEl.textContent = countdown;
      }, 1000);
    }
  },
}

</script>

<style scoped>
#countdown {
  position: relative;
  margin: auto;
  margin-top: 100px;
  height: 40px;
  width: 40px;
  text-align: center;
  transform: scale(2);
}

#countdown-number {
  color: white;
  display: inline-block;
  line-height: 0px;
  font-size: 0.75em;
}

svg {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

svg circle {
  stroke-dasharray: 113px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 2px;
  stroke: white;
  fill: none;
  animation: countdown 5s linear forwards;
}

@keyframes countdown {
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 113px;
  }
}
</style>