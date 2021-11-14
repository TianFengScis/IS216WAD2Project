<template>
  <div class="Login">
    <div class="container">
        <div class="row" >
            <div class="col-md-12">
                <div class="card">
                    <div class="box" >
                        <h1>Login</h1>
                        <p class="text-muted"> Please enter your Email and password!</p>
                        <input type="text" id="email" placeholder="Email" v-on:keyup.enter="loginUser();logInError=''">
                        <input type="password" id="pwd" placeholder="Password" v-on:keyup.enter="loginUser();logInError=''">
                        <span v-if="logInError !=''" class="text-danger">{{logInError}}</span>
                        <button type="submit" id="logIn" value="Login" @click="loginUser();logInError=''">Login</button>
                        <hr>
                        <a class="text-muted" href="#" ><u @click="showForgetPassword = true">Forgot password?</u></a>
                        <br>
                        <a class="text-info" href="/register"><u>Register</u></a>
                    </div>
                </div>
            </div>
                 <transition name="fade" appear>
                      <div class="modal-overlay" v-if="showForgetPassword" >
                        <div class="popUp">
                          <div class="card-header">
                            Forget Password
                          </div>
                          <div class="card-body">
                            <h5 class="card-title">Please Enter your Email</h5>
                            <input class="card-text" type="text" id="email" placeholder="Email" v-model="userEmail">
                            <button class="button p-2 my-3" @click="sendResetPasswordEmail" >Reset Password</button>
                            <br>
                            <span v-if="emailSent" class="text-muted">Email Sent! Please Check Your Email</span>
                            <span v-if="emailError" class="text-danger">{{errorMsg}}</span>
                          </div>
                          
                          <hr>
                            <button class="button px-4" @click="showForgetPassword=false">Close</button>
                        </div>     
                      </div>
                </transition>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getAuth, signInWithEmailAndPassword , onAuthStateChanged, sendPasswordResetEmail} from "firebase/auth";
export default {
  name: 'Login',
  data(){
    return {
      showForgetPassword: false,
      userEmail : "",
      emailSent : false,
      emailError : false,
      errorMsg : "",
      logInError: "",
    }
  },
  components: {
  },
  methods:{
    loginUser(){
      var authenticate = getAuth();
      var email = document.getElementById("email").value;
      var password = document.getElementById("pwd").value;
      signInWithEmailAndPassword(authenticate, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log(user);
        window.location.href='/';
      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
        console.log(error);
        this.logInError = error.message;
        // ..
  });
    },
    sendResetPasswordEmail(){
        var auth =  getAuth();
        sendPasswordResetEmail(auth,this.userEmail).then(()=>{
            this.emailSent = true;
            setTimeout(0,3000);
            this.showForgetPassword = false;
        }).catch((e)=>{
          this.emailError = true;
          this.errorMsg = e.message;
        })
    }
  },
  beforeCreate(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user.email);
        window.location.href="/";
        // ...
    }else{
      console.log("No user");
    }
    });
  }
}

</script>

<style>
.card {
    margin-bottom: 20px;
    border: none;
    background-color: transparent;
    margin-top: 10%;
}

.modal-overlay{
  position:fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}

.popUp{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 99;

  width: 100%;
  max-width: 400px;
  background-color:#fff;
  border-radius: 16px;

  padding: 25px;
}
</style>