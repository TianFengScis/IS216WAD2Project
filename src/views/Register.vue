<template>
<div id="register">
    <div class="container">
        <div class="row" >
            <div class="col-md-12">
                <div class="card">
                    <div class="box">
                        <h1>Register</h1>
                        <p class="text-muted"> Please enter your Email and password!</p>
                        <input type="text" v-model="email" placeholder="Email">
                        <input type="text" v-model="username" placeholder="Username(Optional)">
                        <p v-if="error != null" style="color:red">{{error}}</p>
                        <input type="password" v-model="password" placeholder="Password">
                        <input type="password" v-model="cPassword" placeholder="Confirm Password">
                        <p v-if="password != cPassword" style="color:red">Password does not match</p>
                        <button v-if="password == cPassword" type="submit" @click="registerNewUser">Register</button>
                        <hr>
                        <p class="text-muted">
                            Have an account? <a href="login.html" class="text-reset">LogIn</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore, doc, setDoc} from "firebase/firestore"
export default {
  name: 'register',
  data() {
        return {
            email : "",
            password: "",
            cPassword: "",
            username:"",
            error: null,
        }
    },
  components: {

  },
  methods :{
      registerNewUser(){
        if(this.username ==""){
            this.username = this.email;
        }
        var auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
        // Signed in 
            var user = userCredential.user;
            console.log(user.uid);
            // ...
            this.error = null;
            //Add a new document in collection "user"
            var db = getFirestore();
            try {
                setDoc(doc(db,  "users",user.uid), {
                    email:this.email,
                    username:this.username,
                    profilePic: "https://bootdey.com/img/Content/avatar/avatar1.png"
                }).then(()=>{
                    console.log("UserCreated");
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            this.email = "";
            this.password = "";
            this.cPassword = "";
            this.username = "";
            setTimeout(() => this.$router.push({ path: '/login'}), 3000);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            this.error = errorCode;
            console.log(errorCode);
            console.log(errorMessage);
        });
      },
  },
  compute:{

  }
}

</script>
