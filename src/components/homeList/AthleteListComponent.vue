<template>
  <div class="container">
    <h3>{{data.name}}</h3>
      <div v-if="!data.isTop3">
        <AthleteListItemComponent v-for="(athlete,index) in athletesList" :athlete="athlete" :key="index"/>
        <div class="paginator">
          <a v-if="onPage != 1" @click="previousPage()">&laquo;</a>
          <p v-if="!(onPage == 1 && totalPages == 1)">{{ onPage }}</p>
          <a v-if="onPage!=totalPages" @click="nextPage()">&raquo;</a>
        </div>
    </div>
    <div v-else>
      <h4>Mehed</h4>
      <AthleteListItemComponent v-for="(athlete,index) in top3Men" :athlete="athlete" :key="index"/>
      <h4>Naised</h4>
      <AthleteListItemComponent v-for="(athlete,index) in top3Women" :athlete="athlete" :key="index"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AthleteListItemComponent from '@/components/homeList/AthleteListItemComponent.vue';

export default {
  name: 'AthleteListComponent',
  props: {
    data: Object
  },
  components: {
    AthleteListItemComponent
  },
  data() {
    return{
      onPage: 1,
      totalPages: 1,
      athletesList: [],
      top3Men: [],
      top3Women: []
    }
  },
  mounted() {
    if(this.data.isTop3) {
      this.getTop3()
    }else {
      this.getPage()
    }
  },
  methods: {
    getTop3() {
      this.$nextTick(function () {
        axios.get("https://proovitoo.inpropartner.ee/api/athletes/top3Men")
          .then((response) => {
            this.top3Men = response.data;
          }).catch(e => {
            this.$toast.open({message: "Viga andmete laadimisel!", type: 'error', duration:15000})
            console.error(e)
          })

        axios.get("https://proovitoo.inpropartner.ee/api/athletes/top3Women")
        .then((response) => {
          this.top3Women = response.data;
        }).catch(e => {
            this.$toast.open({message: "Viga andmete laadimisel!", type: 'error', duration:15000})
            console.error(e)
          })
      })
    },

    previousPage() {
      this.onPage -= 1
      this.getPage()
    },

    nextPage() {
      this.onPage += 1
      console.log(this.onPage)
      this.getPage()
    },

    getPage() {
      this.$nextTick(function () {
        axios.get(this.data.url+"?page="+this.onPage)
          .then((response) => {
            this.athletesList = response.data.athletes;
            this.totalPages = response.data.totalPages;
            this.onPage = response.data.currentPage;
          }).catch((error) => {
            this.$toast.open({message: "Viga andmete laadimisel!", type: 'error', duration:15000})
            console.error(error)
          })
      })
    }
  }
}
</script>


<style scoped>
.container {
  border: 2px solid #333;
  border-radius: 8px;
  padding: 20px 10px;
  margin: 8px;
}

.paginator {
  display: flex;
  justify-content: center;
  margin: 8px;
}

.paginator > p {
  margin: 0px;
  padding: 0px 4px;
}
</style>
