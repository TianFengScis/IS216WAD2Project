
<template>
  <div id="app" >
    <navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
// <template>
//   <div id="app">
//     <div id="nav">
//       <router-link to="/">Home</router-link> |
//       <router-link to="/about">About</router-link>
//     </div>
//     <router-view/>
//   </div>
// </template>
//<HelloWorld msg="Welcome to Your Vue.js App"/>
//import HelloWorld from './components/HelloWorld.vue'
import navbar from './components/navbar.vue'
export default {
  name: 'App',
  components: {
    //HelloWorld,
    navbar,
  }
}
</script>

<style>
body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: linear-gradient(to right, #5a5a5ab4,#000000 );
    height: 200vh;
    overflow-x:hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
