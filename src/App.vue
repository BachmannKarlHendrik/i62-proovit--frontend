<template>
  <nav class="navbar">
      <div class="logo">Dekatüleen</div>
      <button class="add-button">Lisa võistleja</button>
  </nav>
  <router-view/>
</template>

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
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 0px 8px 0px 8px;
}


.add-button:hover {
  background-color: #0056b3;
}
</style>
