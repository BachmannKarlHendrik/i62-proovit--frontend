<template>
  <div class="home">
    <div class="lists-container">
      <AthleteListComponent class="list" v-for="(list,index) in lists" :data="list" :key="index"></AthleteListComponent>
    </div>
  </div>
</template>

<script>
import AthleteListComponent from '@/components/homeList/AthleteListComponent.vue'

export default {
  name: 'HomeView',
  components: {
    AthleteListComponent
  },
  data() {
    return {
      lists: 
      [{'name':'Hiljutiseimad võistlejad',
        'url':'http://localhost:8081/athletes/latest',
        'isTop3':false},
        
        {'name':'Pooleliolevad võistlejad',
        'url':'http://localhost:8081/athletes/inProgress',
        'isTop3':false},

        {'name':'Top 3',
        'isTop3':true}
      ],
    }
  }
}
</script>

<style scoped>
.lists-container {
  display: flex;
  justify-content: space-between;
}

.list {
  width: 32vw;
}
</style>