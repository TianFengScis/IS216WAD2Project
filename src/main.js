import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import { initializeApp } from "firebase/app"
//import { getFirestore } from "firebase/firestore"
//import { collection, getDocs } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyARuBWfojO1-x5xgQ7aV0VVG6a1T0G1vt4",
    authDomain: "wadproject-e347d.firebaseapp.com",
    projectId: "wadproject-e347d",
    storageBucket: "wadproject-e347d.appspot.com",
    messagingSenderId: "401322032845",
    appId: "1:401322032845:web:17138ae790a63c1d85b384",
    measurementId: "G-1CP5Y8HXTD"
};
if (!firebaseConfig.apiKey) throw new Error("Missing firebase credential: apikey");
if (!firebaseConfig.authDomain) throw new Error("Missing firebase credential: authDomain");
if (!firebaseConfig.projectId) throw new Error("Missing firebase credential: projectId");
if (!firebaseConfig.storageBucket) throw new Error("Missing firebase credential: storageBucket");
if (!firebaseConfig.messagingSenderId) throw new Error("Missing firebase credential: messagingSenderId");
if (!firebaseConfig.appId) throw new Error("Missing firebase credential: appId");
if (!firebaseConfig.measurementId) throw new Error("Missing firebase credential: measurementId");


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'


const firebaseApp = initializeApp(firebaseConfig);
if(firebaseApp){
  console.log("Db initialized");
}

// async function  getData(){
//     const querySnapshot = await getDocs(collection(db, "users"));
//     querySnapshot.forEach((doc) => {
//     //console.log(`${doc.id} => ${doc.data().email}`);
//     console.log(doc);
// });
// }
//getData();


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

