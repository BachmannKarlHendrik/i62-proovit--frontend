<template>
    <div class="athlete-container" :class="{'isReady':isReady}" @click="$router.push({name: 'athlete', params: {id:athlete.id}})">
        <p>{{athlete.name}} ({{ gender }})</p>
        <p>{{athlete.points}}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AthleteListComponent',
    props: {
      athlete: Object
    },
    data() {
        return{
            isReady: false,
            gender: this.athlete.isMale ? 'M': 'N'
        }
    },
    mounted() {
        let isReady = true;
        this.athlete.scores.forEach((score) => {
            if(score.result == null) {
                isReady = false;
            }
        })
        this.isReady = isReady;
    }
  }
  </script>
  
  <style scoped>
  .athlete-container {
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    padding: 10px;
    margin: 8px;
    text-align: left;
    background-color: #ffbb33;
  }

.isReady{
    background-color: #00C851;
}
  
p {
    padding: 0px;
    margin: 0px;
}
  </style>
  