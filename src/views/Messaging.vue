<template>
    <div id="app" class="container p-0" style="width: 75%;">
		<div class="card m-3">
			<div class="row g-0">
				<div class="chat-messages col-12 col-lg-5 col-xl-3 border bg-light">
					<div class="px-4 d-none d-md-block">
						<div class="d-flex align-items-center">
							<div class="flex-grow-1">
								<p>Chats</p>
							</div>
						</div>
					</div>

					<a v-for="(friend,key) in myFriends" v-bind:key="key" class="list-group-item list-group-item-action border">
						<div class="d-flex align-items-start">
							<div class="flex-grow-1 ml-3 text-start" @click="getMessage(friend);">
								<img :src="friend.profilePic" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">{{friend.username}}
							</div>
						</div>
					</a>
					<hr class="d-block d-lg-none mt-1 mb-0">
				</div>
				<div class="col-12 col-lg-7 col-xl-9 bg-light" style="height:600px">
					<div class="py-2 px-4 border-bottom d-none d-lg-block">
						<div class="d-flex align-items-center py-1">
							<div class="flex-grow-1 pl-3">
								<strong v-if="currentChatFriend != null">{{currentChatFriend.username}}</strong>
							</div>
						</div>
					</div>
                    <div id="chatHistory" class="chat-messages" style="height:500px" @click="scrollToBottom">
                        <div v-for="(msg,key) in showMessage" v-bind:key="key" class="position-relative">
                            <div  class="chat-messages p-4">
                                <div v-if="msg.sender == user.uid " class="chat-message-right pb-4">
                                    <div>
                                        <img :src="user.profilePic" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
                                        <br>
                                        <small class="text-muted small text-nowrap mt-2 text-end">{{msg.date}}</small>
                                    </div>
                                    <div class="flex-shrink-1 bg-primary text-light rounded px-2 mr-3 w-50 h-50" >
                                        <div class=" font-weight-bold text-end">You</div>
                                        <p class="text-start">{{msg.message}}</p>
                                    </div>
                                    
                                </div>
                                <div v-else class="chat-message-left pb-4">
                                    <div>
                                        <img :src="currentChatFriend.profilePic" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
                                        <br>
                                        <small class="text-muted small text-nowrap mt-2 text-start">{{msg.date}}</small>
                                    </div>
                                    <div class="flex-shrink-1 bg-success text-light rounded px-2 ml-3 w-50">
                                        <div class=" font-weight-bold text-start">{{currentChatFriend.username}}</div>
                                        <p class="text-start">{{msg.message}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
				</div>
                <div v-if ="currentChatFriend != null" class="flex-grow-0 py-3 px-4 border-top bg-light">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Type your message" v-model="inputMessage" v-on:keyup.enter="sendMessage">
                        <button v-if="inputMessage.trim() ==''" class="btn btn-primary" disabled>Send</button>
                        <button v-else class="btn btn-primary" @click="sendMessage()">Send</button>
                    </div>
                </div>
			</div>
		</div>
	</div>
</template>
<script>
import { getAuth , onAuthStateChanged} from "firebase/auth";
import { getFirestore, doc, getDocs, collection , onSnapshot, setDoc} from '@firebase/firestore';
export default{
    name: 'app',
    data(){
        return{
            user:{
                uid : "",
                email : "",
                username : "",
                profilePic : "",
            },
            myFriends : [],

            inputMessage : "",
            showMessage :[],
            currentChatFriend : null,
        }
    },
    methods:{
        getMessage(friend){
            this.showMessage =[];
            this.currentChatFriend = friend;
            var db = getFirestore();
            console.log(this.user.uid)
            onSnapshot(doc(db, "messages",this.user.uid+friend.uid),(doc)=>{
                console.log("Current Data: ",doc.data());
                if(doc.data()){
                    this.showMessage = doc.data().chats;
                    setTimeout(this.scrollToBottom,1000);
                }
            });
            
        },
        sendMessage(){
            if(this.inputMessage.trim() == ""){
                return
            }
            //var db = getFirestore();
            var newAllMessage =[];
            
            var newMsg = {
                sender : this.user.uid,
                message : this.inputMessage,
                date : new Date().toDateString()
            };
            console.log("New message:",newMsg)
            var allMessage = getData(this.user.uid+this.currentChatFriend.uid,"messages");
            allMessage.then((result)=>{
                if(result != null){
                    if(result.length != 0){
                    result = Object.values(result);
                    //console.log(result);
                    for(let item of result){
                        //console.log(item)
                        var temp = {
                            sender : item.sender,
                            message : item.message,
                            date : item.date
                        }
                        newAllMessage.push(temp);
                    }
                    }else{
                        
                        console.log("No chat")
                    }
                    
                }else{
                    console.log("No chat list");
                }
                newAllMessage.push(newMsg);
                var update = sendMessage(this.currentChatFriend,this.user,newAllMessage);
                update.then(()=>{
                    console.log("chat updated");
                    var updateFriend = sendMessage(this.user,this.currentChatFriend,newAllMessage);
                    updateFriend.then(()=>{
                        console.log("friend chat updated");
                        this.inputMessage="";
                    })
                });
            });

        },
        scrollToBottom(){
            var myDiv = document.getElementById("chatHistory");
            myDiv.scrollTop = myDiv.scrollHeight;
        }
    },
    beforeCreate(){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            //console.log(user.uid);
            getSearchUser(user.email).then((currentUser)=>{
                this.user = currentUser;
            });

        //start getting friend list
        var items = getData(user.uid,"friends");
        items.then((result)=>{
          if(result != null){
            if(result.length != 0){
              result = Object.values(result);
              //console.log(result);
              for(let item of result){
                //console.log(item)
                getSearchUser(item.email).then((user)=>{
                    var temp = {
                    uid : user.uid,
                    email : user.email,
                    username : user.username,
                    profilePic : user.profilePic
                    }
                    this.myFriends.push(temp);
                });
              }
            }else{
              console.log("No Friends")
            }
            
          }else{
            console.log("No Friendlist");
          }
        }); //end getting friend list
            // ...
        }else{
        console.log("No user");
        window.location.href="Login";
        }
        });
    }
}
// async function getUser(uid){
//     var db = getFirestore();
//     var docRef = doc(db,"users",uid);
//     var docSnap = await getDoc(docRef);
//     if(docSnap.exists()){
//         return docSnap.data();
//     }else{
//         return false;
//     }
// }
async function  getData(uid,source){
    //get all task that a uid have and return an array of taskitem objects
    //if user yet to have any task, null will be returned 
    var db = getFirestore();
    var result = null;
    const querySnapshot = await getDocs(collection(db, source));
    querySnapshot.forEach((doc) => {
    //console.log(doc.data());
    if(doc.id == uid){
        result = doc.data();
        //console.log(result);
    }

    });
    if(result != null && Object.values(result).length != 0){
      if(source == "friends"){
        return Object.values(result.myFriends);
      }else if(source == "messages"){
        return Object.values(result.chats);
      }
    }
    else{
      return result;
    }
  
}
async function sendMessage(friend,user,message){
    var db = getFirestore();
    console.log(message)
    await setDoc(doc(db,"messages",user.uid+friend.uid),{
      chats : message
    });
}
async function getSearchUser(email){
    var db = getFirestore();
    var user
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    //console.log(`${doc.id} => ${doc.data().email}`);
    if(doc.data().email == email){
      //console.log(doc.id);
      user = {
        uid : doc.id,
        email : doc.data().email,
        username : doc.data().username,
        profilePic : doc.data().profilePic
      }
      //console.log(temp);
      
    }
});
    return user;
}

</script>
<style>
.chat-messages {
    display: flex-box;
    flex-direction: row-reverse;
    max-height: 800px;
    overflow: auto;
}

.chat-message-left,
.chat-message-right {
    display: flex;
    flex-shrink: 0
}

.chat-message-left {
    margin-right: auto
}

.chat-message-right {
    flex-direction: row-reverse;
    margin-left: auto
}
.py-3 {
    padding-top: 1rem!important;
    padding-bottom: 1rem!important;
}
.px-4 {
    padding-right: 1.5rem!important;
    padding-left: 1.5rem!important;
}
.flex-grow-0 {
    flex-grow: 0!important;
}
.border-top {
    border-top: 1px solid #dee2e6!important;
}
</style>