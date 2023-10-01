<template>
  <nav class="navbar">
      <div class="logo">Dekatüleen</div>
      <button class="add-button button" @click="showModal = true">Lisa võistleja</button>
  </nav>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Lisa võistleja</h2>
      <input v-model="athleteName" placeholder="Võistleja nimi.."/>
      <div class="gender-container">
        <label for="male">
            <input type="radio" id="male" value="M" v-model="gender">Mees
        </label>
        <label for="female">
            <input type="radio" id="female" value="F" v-model="gender">Naine
        </label>
      </div>
      <div class="buttons-container">
        <button class="button cancel-button" @click="showModal = false; athleteName = ''; gender = ''">Tühista</button>
        <button class="button save-button" @click="save">Salvesta</button>
      </div>
    </div>
  </div>
  <router-view/>
</template>
<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return{
      showModal: false,
      athleteName: "",
      gender: ""
    }
  },
  methods: {
    save() {
      if(this.athleteName.trim(" ") == "") {
        this.$toast.open({message: "Võistleja nimi peab olema täidetud!", type: 'error', duration:15000})
        return;
      }
      else if(this.gender.trim(" ") == "") {
        this.$toast.open({message: "Võistleja sugu pole valitud!", type: 'error', duration:15000})
        return;
      }
      axios.post('http://localhost:8081/athlete',{'name':this.athleteName,'isMale':this.gender=='M'?true:false})
        .then(response => {
          this.showModal = false;
          this.athleteName = '';
          this.gender = '';
          this.$toast.open({message: "Uus võistleja on loodud.", type: 'success', duration:15000})
          this.$router.push("/athlete/"+response.data.id)
        }).catch(e => {
            console.log(e)
            this.$toast.open({message: "Salvestamine ebaõnnestus!", type: 'error', duration:15000})
        })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body, html {
  margin: 0;
  padding: 0;
}

.navbar {
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: #333;
  padding: 10px 20px; 
  color: #fff; 
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin: 0px 8px 0px 0px;
}

.add-button {
  background-color: #007bff;
}


.add-button:hover {
  background-color: #0056b3;
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}

input {
  padding: 12px 10px;
  margin: 8px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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

.gender-container {
  margin: 4px;
}
</style>
