<template>

    <div id="formWrapper" class="show">
    <form id="signup-form" @submit.prevent="processForm">
      <input type="text" maxlength="30" :class="{checked:nameCheck}" @change="checkForm__Name" v-model="form.fullname" placeholder="Enter your full name...">
      <input maxlength="30" :class="{checked:organisationCheck}" @change="checkForm__Organisation" v-model="form.organisation" placeholder="Enter your organisation...">

      <div id="wristbandQuestions">
        What colour wristband?
        <div class="checkboxes">
          <div class="checkbox"><div v-on:click="wristbandSelect($event, 'Expert')" class="checkbox-select blue" :class="{active:form.wristbandColor == 'Expert'}"></div>Blue</div>
          <div class="checkbox"><div v-on:click="wristbandSelect($event, 'Startup')" class="checkbox-select pink" :class="{active:form.wristbandColor == 'Startup'}"></div>Pink</div>
          <div class="checkbox"><div v-on:click="wristbandSelect($event, 'Investor')" class="checkbox-select green" :class="{active:form.wristbandColor == 'Investor'}"></div>Green</div>
          <div class="checkbox"><div v-on:click="wristbandSelect($event, 'Festival')" class="checkbox-select orange" :class="{active:form.wristbandColor == 'Festival'}"></div>Orange</div>
          <div class="checkbox"><div v-on:click="wristbandSelect($event, 'Crew')"  class="checkbox-select purple" :class="{active:form.wristbandColor == 'Crew'}"></div>Purple</div>
        </div>
      </div>

      <div v-if="isMiniMode" id="resultsWrapper">
        What was your trait?
        <div class="results">
          <div class="checkbox"><div v-on:click="resultSelect($event, 'curiosity')" class="checkbox-select blue" :class="{active:form.result == 'curiosity'}"></div>Curiosity</div>
          <div class="checkbox"><div v-on:click="resultSelect($event, 'resilience')" class="checkbox-select pink" :class="{active:form.result == 'resilience'}"></div>Resilience</div>
          <div class="checkbox"><div v-on:click="resultSelect($event, 'compassion')" class="checkbox-select green" :class="{active:form.result == 'compassion'}"></div>Compassion</div>
          <div class="checkbox"><div v-on:click="resultSelect($event, 'integrity')" class="checkbox-select orange" :class="{active:form.result == 'integrity'}"></div>Integrity</div>
          <div class="checkbox"><div v-on:click="resultSelect($event, 'empathy')"  class="checkbox-select purple" :class="{active:form.result == 'empathy'}"></div>Empathy</div>
        </div>
      </div>

      <div class="button-wrapper">
        <button v-bind:class="{ active: form.canSubmit }" type="sumbit">Submit</button>
        <span class="form-warning"> {{ form.warningMessage }} </span>
      </div>
  </form>
    </div>
    
</template>

<script>

	export default {
	  name: 'Forms',
    props: ['isMiniMode'],
	  data () {
	    return {
	    	nameCheck: false,
	    	organisationCheck: false,
	      form: {
	        canSubmit: false,
	        fullname: '',
	        organisation: '',
	        wristbandColor: '',
          result: '',
	        warningMessage: ''
	      }
	    }
	  },
	  methods: {
	    wristbandSelect: function ($event, color) {
	      this.form.wristbandColor = color
	      if (this.form.fullname != '' && this.form.organisation != '') {
	        this.form.canSubmit = true;
	      }
	      // console.log(this.form.fullname, this.form.organisation, this.form.wristbandColor);
	    },
      resultSelect: function ($event, result) {
        this.form.result = result
        if (this.form.fullname != '' && this.form.organisation != '') {
          this.form.canSubmit = true;
        }
        console.log(this.form.result, this.form.organisation, this.form.wristbandColor);
      },
	    checkForm__Name: function(){
	    	if (this.form.fullname != '') {
	    		this.nameCheck = true
	    	} else {
	    		this.nameCheck = false
	    	}
	    },
	    checkForm__Organisation: function(){
	    	if (this.form.organisation != '') {
	    		this.organisationCheck = true
	    	} else {
	    		this.organisationCheck = false
	    	}
	    },
      formReset: function(){
        console.log('Resetting Forms');
        this.form.fullname = '',
        this.form.organisation = '',
        this.form.wristbandColor = ''
        this.nameCheck = false
        this.organisationCheck = false
        this.form.canSubmit = false
        document.getElementById('signup-form').reset();
        this.form.warningMessage = ''
      },
	    processForm: function (){
	      if (this.form.canSubmit && this.nameCheck && this.organisationCheck) {
	      	const user = {
	      		fullname: this.form.fullname,
	      		organisation: this.form. organisation,
	      		wristband: this.form.wristbandColor,
            result: this.form.result,
	      	}
	        this.form.canSubmit = false;
	        this.form.warningMessage = 'Processing...';
	        this.$emit('form-finished', user)
	      } else {
	        this.form.warningMessage = 'Please fill in all forms first.'
	      }
	    }
	  }
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#formWrapper {
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 100%;
  top: 0;
  left:0;
  padding: 2em 0em;
  text-align: center;
  /*opacity: 0;*/
  /*transition: opacity 500ms;*/
  /*pointer-events: none;*/
}
#formWrapper.show {
  /*pointer-events: auto;*/
  /*opacity: 1;*/
}

#formWrapper input {
  font-size: 1em;
  border: solid 2px #FF8458;
  border-radius: 6px;
  padding: 0.25em;
  display: block;
  margin: auto;
  width: 80%;
  margin-bottom: 1em;
  background: transparent;
  color: white;
}

#formWrapper input::placeholder {
  color: #FF8458;
}


#formWrapper input.checked {
	border: solid 2px #006CBB;
	color: #006CBB;
}


#formWrapper input:focus {
	 border: solid 2px white;
	 outline: none;
}

.button-wrapper {
  /*width: 82.5%;*/
  /*margin: auto;*/
  /*text-align: left;*/
}
#formWrapper button {
  /*width: 50%;*/
  padding: 0.5em 1em;
  color: white;
  font-size: 0.8em;
  text-align: left;
  border-radius: 6px;
  outline: none;
  border: none;
  opacity: 0.25;
  background: #FF8458;
}

#formWrapper button.active {
  opacity: 1;
}


#wristbandQuestions {
  padding-top: 0.5em;
  color: #FF8458;
}
.checkboxes {
  margin-top: 0.5em;
  margin-bottom: 1em;
}
.checkbox {
  display: inline-block;
  text-align: center;
  font-size: 0.75em;
  width: 4em;
  color: white;
}

.results {
  margin: auto;
  margin-top: 1em;
  max-width: 16em;
}

.results .checkbox {
  width: 6em;
  margin-bottom: 1em;
}
.checkbox-select {
  display: block;
  margin: auto;
  width: 1.25em;
  height: 1.25em;
  background: transparent;
  border: solid 2px white;
  border-radius: 50%;
}

.wristband {
  padding: 0.5em;
  color: white;
}


.checkbox-select.blue.active {
  background: #006CBB;
  border: solid 2px white;
}
.checkbox-select.pink.active {
  background: #FC64AE;
  border: solid 2px white;
}
.checkbox-select.green.active {
  background: #338F46;
  border: solid 2px white;
}
.checkbox-select.orange.active {
  background: #FF8458;
  border: solid 2px white;
}
.checkbox-select.purple.active {
  background: #6747B1;
  border: solid 2px white;
}

.form-warning {
  display: block;
  color: white;
  font-size: 0.7em;
  margin-top: 0.5em;
}

</style>
