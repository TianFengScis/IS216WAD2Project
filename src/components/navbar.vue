<template>
    <div id="navbar">
        <nav class="navbar navbar-expand-md navbar-light bg-dark">
            <div class="container-fluid">
            <a class="navbar-brand text-light" href="\">SCIS Reddit</a>
            <button class="navbar-toggler bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav" style="text-align: left;">
                    <a class="nav-link active text-light my-2" aria-current="page" href="\">Home</a>
                    <a class="nav-link text-light my-2" href="Community">Community</a>
                    <a class="nav-link text-light my-2" href="Messages">Messages</a>
                    <a class="nav-link text-light my-2" href=".\Games\Dodge the Anchor\ss.html">Games</a>
                </div>
                <div style="text-align: right;">
                    <a type="button" class="btn btn-outline-light my-2 mx-2" v-on:click="loginPage()" id="loginBtn">LogIn</a>
                    <a type="button" class="btn btn-outline-light my-2 mx-2" v-on:click="logout()" id="logoutBtn" style="display:none">LogOut</a>
                    <a type="button" class="btn btn-outline-light my-2 mx-2" v-on:click="registerPage()" id="registerButton">Register</a>
                </div>
            </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { getAuth  , signOut , onAuthStateChanged } from "firebase/auth";
export default {
  name: 'navbar',
  props: {
    msg: String
  },
  methods :{
    loginPage(){
        window.location.href = "Login";
    },
    registerPage(){
        window.location.href = "Register";
    },
    logout(){
        var auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            alert("successfully logged out")
            currentUserLogOut();
        }).catch((error) => {
            // An error happened.
            console.log(error);
    });
}
  }
}
function currentUserStatus(){
    //change login button to logout
    let loginbtn = document.getElementById("loginBtn");
    loginbtn.style.display = "none";

    //if user signed in, hide register button
    let registerBtn = document.getElementById("registerButton");
    registerBtn.style.display = "none";

    let logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.style.display = "block";
}
function currentUserLogOut(){
    //change logout button to login
    let loginbtn = document.getElementById("loginBtn");
    loginbtn.style.display = "";
    //if user logged out, show register button
    let registerBtn = document.getElementById("registerButton");
    registerBtn.style.display = "";

    let logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.style.display = "none";
    window.location.href = "/";
}

window.onload = function(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        currentUserStatus();
        //console.log(user.email);
        // ...
    }
    });
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
