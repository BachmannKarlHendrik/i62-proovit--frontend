<template>
  <div class="score-container" :class="scoreFill">
    <h3>{{ score.event.nameEst}}</h3>
    <div class="input-container" v-if="score.event.hasMinutes == false">
      <input v-model="score.result" type="number" placeholder="Tulemus.." @input="emitUpdatedScore"/>
      <span class="unit">{{ score.event.unit }}</span>
    </div>
    <div v-else>
      <div class="input-container" >
        <input v-model="score.resultMinutes" type="number" placeholder="Minutid" @input="emitUpdatedScore"/>
        <span class="unit">min</span>
      </div>
      <div class="input-container" >
        <input v-model="score.result" type="number" placeholder="Sekundid" @input="emitUpdatedScore"/>
        <span class="unit">{{ score.event.unit }}</span>
      </div>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: 'AthleteScoreComponent',
    props: {
      scoreProp: Object
    },
    data() {
      return {
        score: this.scoreProp
      }
    },
    computed: {
      scoreFill() {
        if(this.score.event.hasMinutes) {
          return {'filled':this.score.result!==null && this.score.resultMinutes !== null,
                'not-filled':this.score.result === null || this.score.resultMinutes === null}
        }
        return {'filled':this.score.result!=null,
                'not-filled':this.score.result == null}
      }
    },
    mounted() {
      this.$nextTick(function() {
        if(this.score.event.hasMinutes && this.score.result !== null) {
          this.score.resultMinutes = Math.floor(this.score.result/60)
          this.score.result = this.score.result-(this.score.resultMinutes*60)
        }
      })
    },
    methods: {
      emitUpdatedScore() {
        if(this.score.result === "") {
          this.score.result = null
        }
        if(this.score.event.hasMinutes && this.score.resultMinutes === "") {
          this.score.resultMinutes = null
        }
        this.$emit("updateScore",this.score)
      }
    }
}
</script>
  
<style scoped>
  .score-container {
    justify-content: space-between;
    border-radius: 8px;
    padding: 10px;
    margin: 16px;
    text-align: left;
    
    max-width: 20%;
    min-width: 250px;
  }

.not-filled {
  background-color: #ffbb33;
}

.filled {
  background-color: #00C851;
}

input {
  padding: 12px 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.unit {
  margin-left: 4px;
}

.input-container {
  display: flex;
  align-items: center;
}
</style>
  