<template>
  <div>
    <div class="heading-container">
      <h2>Muuda võistleja tulemusi:</h2>
    </div>
    <h2>
      Võistleja: {{ athlete.name }}
    </h2>
    <h2>
      Sugu: {{ this.athlete.isMale ? 'Mees' : 'Naine' }}
    </h2>
    <div class="data-grid">
      <AthleteScoreComponent v-for="(score,index) in athlete.scores" :scoreProp="score" :key="index" @updateScore="handleUpdateScore" class="grid-item"/>
    </div>
    <div class="buttons-container">
      <button class="button cancel-button" @click="this.$router.push('/')">Tühista</button>
      <button class="button save-button" @click="save">Salvesta</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import AthleteScoreComponent from '@/components/athleteDetails/AthleteScoreComponent.vue';

export default {
  name: 'AthleteView',
  components: {
    AthleteScoreComponent
  },
  data() {
    return {
      athlete: {}
    }
  },
  mounted() {
    axios.get("http://localhost:8081/athlete/"+this.$route.params.id)
      .then((response) => {
        this.athlete = response.data
      })
      .catch(e => {
        this.$toast.open({message: "Viga andmete laadimisel!", type: 'error', duration:15000})
        console.log(e)
      })
  },
  methods: {
    handleUpdateScore(updatedScore) {
      let foundIndex = this.athlete.scores.findIndex(score => score.id === updatedScore.id)
      if(foundIndex === 1) {
        console.error("Sellise indexiga score ei leitud" + updatedScore)
      }
      else {
        this.athlete.scores[foundIndex] = updatedScore
      }
    },

    save() {
      let hasError = false
      let scoresList = []
      this.athlete.scores.forEach(score => {
        if(score.result < 0) {
          this.$toast.open({message: "Ükski tulemus ei tohi olla negatiivne!", type: 'error', duration:15000})
          hasError = true
        }
        else if(score.event.hasMinutes && score.result == null && score.resultMinutes != null) {
          this.$toast.open({message: "Kui minutid on täidetud, peavad olema ka sekundid täidetud!", type: 'error', duration:15000})
          hasError = true
        }
        else if(score.event.hasMinutes && score.result != null && score.resultMinutes == null) {
          this.$toast.open({message: "Kui sekundid on täidetud, peavad olema ka minutid täidetud!", type: 'error', duration:15000})
          hasError = true
        }
        //Minutid sekunditeks
        else if(score.event.hasMinutes && score.result != null && score.resultMinutes != null) {
          let resultWithMinutes = Number(score.result) + (Number(score.resultMinutes)*60)
          scoresList.push({'id':score.id,'result':resultWithMinutes})
        }
        else {
          scoresList.push({'id':score.id,'result':score.result})
        }
      })
      if(!hasError) {
        axios.put('http://localhost:8081/scores', scoresList)
          .then(() => {
            this.$toast.open({message: "Andmed salvestatud", type: 'success', duration:15000})
            this.$router.push('/')
          }).catch(e => {
            console.log(e)
            this.$toast.open({message: "Salvestamine ebaõnnestus!", type: 'error', duration:15000})
          })
      }
      
    }
  }
}
</script>

<style scoped>
.heading-container {
  display: flex;
  justify-content: flex-start;
  margin: 16px;
}

.data-grid {
  display: flex;
  flex-wrap: wrap;
}

.grid-item {
  flex: 1;
}

.button {
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 0px 8px 0px 8px;
}

.cancel-button {
  background-color: #ff4444;
}

.cancel-button:hover{
  background-color: #CC0000;
}

.save-button {
  background-color: #00C851;
}

.save-button:hover{
  background-color: #007E33;
}
</style>