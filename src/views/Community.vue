<template>
<div id=app class="container-fluid">
          <div class="row my-3">
              <!--api messages-->
              <div id="joke" class="col-12 text-light" @click="newJoke"><marquee behavior="scroll" direction="left">{{apiContent.joke}}<strong> (Click Me for New Jokes!)</strong></marquee></div>

          </div>
          
          <div class="row text-center justify-content-md-center">
              <!--To do list-->
              <div id="taskList" class="col-xl-3 col-lg-3 order-lg-1 col-md-5 order-md-1">
                <div class="my-3">
                    <button class="button my-3" @click="showModal = true">New Task</button>
                    <transition name="fade" appear>
                      <div class="modal-overlay" v-if="showModal" >
                        <div class="popUp">
                            <h3>Add a New Task</h3>
                            <hr>
                            <div class="mb-4">
                              <label for="exampleFormControlInput1" class="form-label">Description</label>
                              <input type="text" id="" class="form-control" placeholder="Task Description" v-model="newTaskItem.newTaskDesc">
                            </div>
                            <div class="mb-4">
                              <label for="exampleFormControlInput1" class="form-label">Due Date</label>
                              <input type="date" id="" class="form-control" v-model="newTaskItem.newTaskDueDate">
                            </div>
                            <div class="mb-4">
                              <label for="exampleFormControlInput1" class="form-label">Time (Optional)</label>
                              <input type="time" id="" class="form-control" v-model="newTaskItem.newTaskDueTime">
                            </div>
                            <p v-if="newTaskError" class="text-danger">The please provide the task description and the duedate !</p>
                            <hr>
                            <button class="button mx-3" @click="showModal = false; newTaskError =false">Close</button>
                            <button v-if="newTaskItem.newTaskDueDate != ''" class="button mx-3" @click="addNewTask">Add Task</button>
                            <button v-else class="button mx-3" @click="showNewTaskError">Add Task</button>
                        </div>     
                      </div>
                    </transition>
                </div>
                <h3 class="text-light">Your Task List</h3>
                <hr class="border border-light">
                <div v-for="(task,key) in taskItem" v-bind:key="task.taskId" >
                    <div id ="tasks" class="card mx-auto" style="max-width: 75%;">
                        <div class="card-body text-secondary">
                          <p class="card-text" >{{task.taskDesc}}</p>
                          <p class="card-text" >{{task.taskDue}}</p>
                          <p v-if="task.taskTime != ''">{{task.taskTime}}</p>
                          <button type="button" class="btn btn-success" @click="removeTask(key)">Completed</button>
                        </div>
                    </div>
                </div>
                  
              </div>

              <!--Community Post-->
              <div class="col-xl-6 col-lg-5 order-lg-2 col-md-6 order-md-3">
                <h1 class="text-light">SCIS Reddit Community</h1>
                <div class="bg-white p-3 rounded-3 bg-opacity-75">
                  <div class="form-group text-start mt-3">
                    <label for="exampleInputEmail1">Share your thoughts</label>
                    <textarea type="text" class="form-control mt-1" v-model="postMessage" placeholder="Type here..."></textarea>
                    <img class="my-2" style="dispay:none" id="myimg" src="" alt="">

                    <button type="button" class="btn btn-secondary mt-2" @click="selectImg">Upload Photo</button>
                    <button v-if="photoPath" type="button" class="btn btn-secondary mx-2 mt-2" @click="removePhoto">Remove Photo</button>
                    <input type="file" id="hiddenSelectImg" style="display:none">
                    <br>
                    <small>Note: Photo file size must be smaller than 2mb !!!</small>
                  </div>
                  <hr>
                  <p v-if="noPublishContent"><small class="text-danger">Please share your thoughts...</small></p>
                  <button v-if="postMessage.trim()==''" class="button " @click="noPublishContent = true">Publish</button>
                  <button v-else class="button " @click="publishPost();noPublishContent =false">Publish</button>
                 
                </div>
                
                <div v-if="allPost != []" class="card mb-3 rounded-5">
                  <div v-for="(post,key) in allPost" v-bind:key="key" class="bg-white p-3 rounded-3 my-2 bg-opacity-75">
                    <div class="card-body text-start">
                      <h5 v-if="post.email != user.email" class="card-title">
                      <img :src="post.profilePic" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">{{post.username}}</h5>
                      <h5 v-else class="card-title"><img :src="user.profilePic" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">My post</h5>
                      <img v-if="post.downloadUrl != ''" :src="post.downloadUrl" class="card-img-top mb-3" alt="...">
                      <p class="card-text">{{post.postMessage}}</p>
                      <p class="card-text"><small class="text-muted">Published on: {{post.date.toString()}}</small></p>
                      <ul v-for="(comment,ckey) in post.comments"  v-bind:key="ckey" class="list-group">
                        <li class="list-group-item">{{comment}}</li>
                      </ul>   
                    </div>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Your Comment..." v-model="newComment">
                      <div class="input-group-append">
                        <button v-if="newComment.trim() != ''" class="btn btn-outline-secondary" type="button" @click="processComment(key)">Comment</button>
                        <button v-else class="btn btn-outline-secondary" type="button" disabled>Comment</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!--Friend List-->
              <div id="friendlisthide" class="col-xl-3 col-lg-4 order-lg-3 col-md-5 order-md-2">
              <div class="container d-flex justify-content-center align-items-center">
                  <div class="card bg-white bg-opacity-75 px-5 py-2 mx-2 w-100">
                      <div class="text-center">
                          <h4 v-if="user != null" class="my-1">
                            <img :src="user.profilePic" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"> {{user.username}}</h4>
                          <button class="button p-2" @click="showProfile=true">Profile</button>
                          <div class="justify-content-between align-items-center mt-4 px-4 w-100">
                              <div>
                                  <h6>Tasks: {{taskItem.length}}</h6>
                                  <h6>Friends: {{myFriends.length}} Request: {{myFriendRequest.length}}</h6>
                              </div>
                        </div>
                        <transition name="fade" appear>
                              <div class="modal-overlay" v-if="showProfile" >
                                <div class="popUp">
                                  <div class="card-header">
                                    Profile
                                  </div>
                                  <div v-if="edit == false" class="card-body">
                                       <h5 class="card-title">{{user.email}}</h5>
                                      <p class="card-text">{{user.username}}</p>
                                  </div>
                                  <div v-else class="card-body">
                                       <h5 class="card-title">{{user.email}}</h5>
                                       <hr>
                                       Username :
                                      <input class="card-text mb-2" v-model="newUsername"><br>
                                      <span v-if="newUsernameError" class="text-danger">Invalid username</span>
                                      <p>Profile Picture</p>
                                      <img v-for="(url,key) in photoLink" v-bind:key="key" :src="url" class="editProfile rounded-circle mx-1 mt-0" alt="Chris Wood" width="40" height="40"
                                      @click="selectedImg = url"><br>
                                      <div v-if="selectedImg != ''">
                                        <h5>New Profile Picture</h5><img :src="selectedImg" class="rounded-circle my-1" alt="Chris Wood" width="40" height="40">
                                      </div>
                                      <button type="button" class="btn btn-primary" @click="updateUsername">Update</button>
                                      <hr>
                                      Change Password (Optional)
                                      <br>
                                      <input class="my-2" type="password" v-model="oldPw" placeholder="Old Password">
                                      <input class="mb-2" type="password" v-model="newPw" placeholder="New Password"><br>
                                      <span v-if="updatePasswordError" class="text-danger">Wrong Password</span><br>
                                      <button type="button" class="btn btn-primary" @click="changePassword">Change Password</button>
                                  </div>
                                  
                                  <hr>
                                  <button class="button px-4 mx-4" @click="edit=true">Edit</button>
                                  <button class="button px-4 mx-4" @click="showProfile=false;newUsernameError=false;updatePasswordError=false">Close</button>
                                </div>     
                              </div>
                        </transition>
                      </div>
                  </div>
              </div>
                <h3 class="text-light fw-bold">Friends</h3>
                <hr class="border border-light">
                <ul v-if="myFriends.length !=0" class="list-group">
                    <li v-for="(friend,key) in myFriends" class="list-group-item list-group-item-info text-start" id="listfriend" v-bind:key="key" @click="showFriendInfo=true;getFriendInfo(friend)">
                      <img :src="friend.profilePic" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
                        {{friend.username}}</li>
                </ul>
                <p v-else class="text-light">Add your first friend!</p>
                 <transition name="fade" appear>
                      <div class="modal-overlay" v-if="showFriendInfo" >
                        <div class="popUp">
                          <div class="card-header">
                            Friend Info
                          </div>
                          <div class="card-body">
                            <h5 class="card-title">{{friendInfo.username}}</h5>
                            <p class="card-text">{{friendInfo.email}}</p>
                            <button type="button" class="btn btn-primary m-1" @click="toMessage">Message</button>
                            <button type="button" class="btn btn-outline-danger m-1" @click="deleteFriend(friendInfo);friendInfo=null;showFriendInfo=false" >Delete</button>
                          </div>
                          
                          <hr >
                            <button class="button mx-3" @click="showFriendInfo = false;">Close</button>
                        </div>     
                      </div>
                </transition>
                <hr class="border border-light">
                <p class="text-light fw-bold">Friend Request</p>
                <ul v-if="myFriendRequest.length != 0" class="list-group">
                    <li v-for="(request,key) in myFriendRequest" class="list-group-item list-group-item-info" v-bind:key="key">{{request.username}}
                      <br>
                      <button type="button" class="btn btn-outline-danger m-1" @click="processFriendRequest(request,key,false)">Reject</button>
                      <button type="button" class="btn btn-outline-success m-1" @click="processFriendRequest(request,key,true)">Accept</button>
                    </li>
                </ul>
                <p v-else class="text-light">No request...</p>
                <hr class="border border-light">
                <button class="button my-3" @click="showSearchFriend=true">New Friend</button>
                <transition name="fade" appear>
                      <div class="modal-overlay" v-if="showSearchFriend" >
                        <div class="popUp">
                            <h3 class="text-dark">Search for a Friend</h3>
                            <hr>
                            <div class="input-group mb-3">
                              <input type="text" class="form-control" placeholder="Enter an email" v-model="searchEmail">
                              <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="findUser">Search</button>
                            </div>
                            
                            <div v-if="searchUser != null && searchUser !=false" class="card">
                              <hr>
                                <div class="card-header">
                                  Result
                                </div>
                                <div class="card-body">
                                  <h5 class="card-title">{{searchUser.username}}</h5>
                                  <p class="card-text">{{searchUser.email}}</p>
                                  <button v-if="searchUser.email == user.email" class="button mx-3" disabled>Yourself</button>
                                  <button v-else-if="(myFriends.filter((item,key)=>item.email == searchUser.email)).length != 0" class="btn btn-outline-danger m-3" @click="deleteFriend(searchUser)">Delete Friend</button>
                                  <button v-else class="button mx-3" @click="sendFriendRequest">Add Friend</button>
                                </div>
                            </div>
                            <p v-if="searchUser ==false">No such user...</p>
                            <hr>
                            <button class="button mx-3" @click="showSearchFriend = false; searchUser=null; searchEmail=''">Close</button>
                        </div>     
                      </div>
                </transition>
              </div>
          </div>
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
import { getAuth , onAuthStateChanged, signInWithEmailAndPassword,updatePassword} from "firebase/auth";
import { getDocs ,getFirestore ,collection, setDoc ,doc,onSnapshot} from "firebase/firestore"; 
import {getStorage , ref, uploadBytes, getDownloadURL} from "firebase/storage";
import axios from "axios";
export default {
  name: 'app',
  data(){
    return {
      taskItem:[
          // {
          //   taskId : 1,
          //   taskDesc: "This is task 1",
          //   taskDue: "11/8/2021",
          //   taskTime: ""
          // },
          // {
          //   taskId : 2,
          //   taskDesc: "This is task 2",
          //   taskDue: "11/8/2021",
          //   taskTime: ""
          // }
      ],
      newTaskItem:{

        newTaskDesc : "",
        newTaskDueDate : "",
        newTaskDueTime : "",
        
      },
      //modals 
      showModal : false, //for new task
      showSearchFriend : false,
      showFriendInfo: false,
      showProfile :false,

      //search
      searchEmail : "",
      searchUser : null,

      //errors
      newTaskError: false,

      //friends
      myFriends: [],
      myFriendRequest :[],
      friendInfo : null,
      photoLink : [
      "https://bootdey.com/img/Content/avatar/avatar1.png",
      "https://bootdey.com/img/Content/avatar/avatar2.png",
      "https://bootdey.com/img/Content/avatar/avatar3.png",
      "https://bootdey.com/img/Content/avatar/avatar4.png",
      "https://bootdey.com/img/Content/avatar/avatar5.png",
      "https://bootdey.com/img/Content/avatar/avatar6.png",
      "https://bootdey.com/img/Content/avatar/avatar7.png",
      "https://bootdey.com/img/Content/avatar/avatar8.png"
      ],
      //currentUser
      user : null,

      //community post
      photoPath : null,
      postMessage : "",
      allPost : [],
      myPost: 0,
      pictUrl : "",
      noPublishContent: false,
      //Comment
      newComment : "",

      //changePassword
      edit : false,
      saveBtn : false,
      oldPw : "",
      newPw : "",
      newUsername : "",
      newUsernameError : false,
      updatePasswordError : false,
      selectedImg : "",

      //api content
      apiContent : ""
    }
  },
  components: {
    //HelloWorld,
  },
  methods:{
    addNewTask(){
      console.log(this.newTaskItem)
      var item = {
            //taskId : this.taskItem.length + 1,
            taskDesc: this.newTaskItem.newTaskDesc,
            taskDue: this.newTaskItem.newTaskDueDate,
            taskTime: this.newTaskItem.newTaskDueTime
      }

      this.taskItem.push(item)
      this.showModal = false;

      //update the database
      var updatedItem = Object.assign({}, this.taskItem);
      //console.log(updatedItem);
      var promise = updateDbTaskItem(this.userUid,updatedItem);
      promise.then(()=>{
        console.log("Success");
        this.newTaskItem.newTaskDesc = "";
        this.newTaskItem.newTaskDueDate = "";
        this.newTaskItem.newTaskDueTime = "";
        this.newTaskError = false;
      })
      
    },
    removeTask(id){
      this.taskItem = this.taskItem.filter((item,key)=>key != id);
            //update the database
      var updatedItem = Object.assign({}, this.taskItem);
      //console.log(updatedItem);
      var promise = updateDbTaskItem(this.userUid,updatedItem);
      promise.then(()=>{
        console.log("Success");
        this.newTaskItem.newTaskDesc = "";
        this.newTaskItem.newTaskDueDate = "";
        this.newTaskItem.newTaskDueTime = "";
        this.newTaskError = false;
      })
    },
    showNewTaskError(){
      this.newTaskError = true;
    },
    findUser(){
      console.log(this.searchEmail);
      var userInfo = getSearchUser(this.searchEmail);
      userInfo.then((user)=>{
        if(user){
          this.searchUser = user;
        }else{
          this.searchUser = false;
        }
        
      });
    },
    sendFriendRequest(){
      // console.log(this.searchUser);
      // console.log(this.user)
      var updatedRequest = [];
      var allRequest = getData(this.searchUser.uid,"friendrequest");
        allRequest.then((result)=>{
          if(result != null){
            if(result.length != 0){
              result = Object.values(result);
              console.log(result);
              for(let item of result){
                //console.log(item)
                var temp = {
                  uid : item.uid,
                  email : item.email,
                  username : item.username
                }
                updatedRequest.push(temp);
              }
              updatedRequest.push(this.user);
            }else{
              updatedRequest.push(this.user);
              console.log("No request")
            } 
          }else{
            updatedRequest.push(this.user);
            console.log("No request list");
          }
          var response = sendDbFriendRequest(updatedRequest,this.searchUser);
          response.then(()=>{
              console.log("friend request send");
          });
        }); 

    },
    processFriendRequest(friend,id,action){
      //action true -> accept
      //action false -> reject
      this.myFriendRequest = this.myFriendRequest.filter((request,key)=>key != id);

      //update the database
      //var updateRequest = Object.assign({},this.myFriendRequest);
      var promise = sendDbFriendRequest(this.myFriendRequest,this.user);
      promise.then(()=>{
        if(action == true){
          console.log("Friend Request accepted !");
          this.myFriends.push(friend);

          //update database friend list for current user
          var items = updateDbFriends(this.user.uid,this.myFriends);
          items.then(()=>{
            console.log("Friend list updated!");
          });
          //update database friend list for friend
          var updatedFriendListItems =[];
          var friendListItems = getData(friend.uid,"friends");
          friendListItems.then((result)=>{
          if(result != null){
            if(result.length != 0){
              result = Object.values(result);
              //console.log(result);
              for(let item of result){
                //console.log(item)
                var temp = {
                  uid : item.uid,
                  email : item.email,
                  username : item.username,
                  profilePic : item.profilePic
                }
                updatedFriendListItems.push(temp);
              }
              updatedFriendListItems.push(this.user)
            }else{
              updatedFriendListItems.push(this.user)
              console.log("No Friends")
            }
            
          }else{
            updatedFriendListItems.push(this.user)
            console.log("No Friendlist");
          }
          items = updateDbFriends(friend.uid,updatedFriendListItems);
          items.then(()=>{
            console.log("Friend list updated!");
          });
        }); 

        }else{
          console.log("Friend Request rejected !");
        }
      });
    },
    deleteFriend(unfriend){
      this.myFriends = this.myFriends.filter((friend)=>friend.email != unfriend.email);

      //delete for current user
      var promise = updateDbFriends(this.user.uid,this.myFriends);
      promise.then(()=>{
        console.log("Friend list updated!");

          //get target unfriend
          var updatedFriendListItems =[];
          var friendListItems = getData(unfriend.uid,"friends");
          friendListItems.then((result)=>{
          if(result != null){
            if(result.length != 0){
              result = Object.values(result);
              //console.log(result);
              for(let item of result){
                //console.log(item)
                if(item.email != this.user.email){
                  var temp = {
                    uid : item.uid,
                    email : item.email,
                    username : item.username
                  }
                  updatedFriendListItems.push(temp);
                }
              }
            }
          }
          var items = updateDbFriends(unfriend.uid,updatedFriendListItems);
          items.then(()=>{
            console.log("Friend list updated!");
          });
        });
      });
    },
    getFriendInfo(friend){
        this.friendInfo = friend;
    },
    selectImg(){
      // var ImgName, ImgUrl;
    
      // var reader = new FileReader();
      var input = document.getElementById("hiddenSelectImg");
      
      input.onchange = e =>{
        var files = e.target.files;
        var reader = new FileReader();
        reader.onload = function(){
          document.getElementById("myimg").src = reader.result;
          document.getElementById("myimg").style = "display:block;height:100px;width:100px; border:1px solid black";
        }
        //console.log(files[0].name);
        this.photoPath = files[0];
        reader.readAsDataURL(files[0]);
      }
      input.click();
    },
    publishPost(){

      var downloadUrl = "";
      var storage = getStorage();
      if(this.photoPath != null){
        
        downloadUrl = "images/"+this.photoPath.name;
        var photoRef = ref(storage,downloadUrl);
        
        uploadBytes(photoRef,this.photoPath).then((snapshot)=>{
          console.log(snapshot);
        });

      }
      var getUrl = getDownloadURL(ref(storage,downloadUrl));
      getUrl.then((url)=>{
          var newPost = {
          downloadUrl : url,
          postMessage : this.postMessage,
          uid : this.user.uid,
          email : this.user.email,
          username : this.user.username,
          date : new Date().toDateString(),
          comments : [],
          profilePic : this.user.profilePic
        }
        this.processPublish(newPost);
      }).catch(()=>{
          var newPost = {
          downloadUrl : "",
          postMessage : this.postMessage,
          uid : this.user.uid,
          email : this.user.email,
          username : this.user.username,
          date : new Date().toDateString(),
          comments : [],
          profilePic : this.user.profilePic
        }
        this.processPublish(newPost);
      });     
    },
    removePhoto(){
      this.photoPath = null;
      this.pictUrl = "";
      document.getElementById("myimg").src = "";
      document.getElementById("myimg").style = "display:none;";
    },
    processPublish(newPost){
      var updatePost = []
      var items = getData("allpost","post");
      items.then((result)=>{
          if(result != null){
            if(result.length != 0){
              result = Object.values(result);
              //console.log(result);
              for(let item of result){
                //console.log(item)
                var temp = {
                  downloadUrl : item.downloadUrl,
                  postMessage : item.postMessage,
                  uid : item.uid,
                  email : item.email,
                  username : item.username,
                  date : item.date,
                  profilePic : item.profilePic
                }
                updatePost.push(temp);
              }
            }else{
              console.log("No Friends")
            }
            
          }else{
            console.log("No Friendlist");
          }
          updatePost.push(newPost);
          var promise = updateDbPost(updatePost);
          promise.then(()=>{
            console.log("Post Updated");
          })
      }); 
      this.photoPath = null;
      this.postMessage  = "";
      this.pictUrl = "";
      //this.allPost.unshift(newPost);
      document.getElementById("myimg").src = "";
      document.getElementById("myimg").style = "display:none;";
    },
    processComment(key){
      this.allPost[key].comments.push(this.newComment);
      var temp = this.allPost;
      updateDbPost(temp).then(()=>{
        console.log("Comment updated");
      });
      this.newComment = "";
    },
    updateUsername(){
      this.newUsernameError = false;
      var db = getFirestore();
      var userRef = doc(db,"users",this.user.uid);

      if(this.newUsername.trim()==""){
        if(this.selectedImg != ""){
            setDoc(userRef,{profilePic:this.selectedImg},{merge:true}).then(()=>{
            console.log("Username updated");
            this.user.profilePic = this.selectedImg;
            this.selectedImg = "";
            this.showProfile = false;
          });
          return;
        }
        this.newUsernameError = true;
        return;
      }


        setDoc(userRef,{username:this.newUsername},{merge:true}).then(()=>{
        console.log("Username updated");
        this.user.username = this.newUsername;
        this.newUsername = "";
        this.showProfile = false;
      });

    },
    changePassword(){
      var auth = getAuth();
      signInWithEmailAndPassword(auth,this.user.email,this.oldPw).then(()=>{
          //correct password
          var user = auth.currentUser;
          updatePassword(user,this.newPw).then(()=>{
            console.log("Password updated");
            this.newPw = "";
            this.oldPw = "";
          });
      }).catch(()=>{
          this.updatePasswordError = true;
          this.newPw = "";
          this.oldPw = "";
      })
    },
    toMessage(){
        window.location.href = "Messages";
    },
    newJoke(){
      axios.get("https://geek-jokes.sameerkumar.website/api?format=json")
      .then(resp=>{
        this.apiContent = resp.data
      }).catch(e=>{
        this.apiContent = e;
      });
    }
  },
  beforeCreate(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //console.log(user.email);
        var userInfo = getSearchUser(user.email);
        userInfo.then((user)=>{
          this.user=user;
        });
        this.userUid = user.uid; //log the uid in vue

        //Start getting tasklist
        var items = getData(this.userUid,"tasklist"); 
        items.then((result)=>{ //handles the promise
          //console.log(result);
          if(result != null){
            if(result.length !=0){
              result = Object.values(result);
              //console.log(result);
              for(let item of result){
              //console.log(item);
              var temp = {
                taskDesc: item.taskDesc,
                taskDue: item.taskDue,
                taskTime: item.taskTime
              }
              this.taskItem.push(temp); // push the item into vue data
            }
            }else{
              console.log("No Item")
            }
          }else{
            console.log("no task yet");
          }

         });//end get tasklist items

         //start getting friend list
        // items = getData(user.uid,"friends");
        // items.then((result)=>{
        //   if(result != null){
        //     if(result.length != 0){
        //       result = Object.values(result);
        //       //console.log(result);
        //       for(let item of result){
        //         //console.log(item)
        //         getSearchUser(item.email).then((user)=>{
        //             var temp = {
        //             uid : user.uid,
        //             email : user.email,
        //             username : user.username,
        //             profilePic : user.profilePic
        //             }
        //             console.log("Updating friend list")
        //             this.myFriends.push(temp);
        //         });
        //       }
        //     }else{
        //       console.log("No Friends")
        //     }
            
        //   }else{
        //     console.log("No Friendlist");
        //   }
        // }); //end getting friend list
        
        //start getting friend request
        // items = getData(this.userUid,"friendrequest");
        // items.then((result)=>{
        //   if(result != null){
        //     if(result.length != 0){
        //       result = Object.values(result);
        //       //console.log(result);
        //       for(let item of result){
        //         //console.log(item)
        //         getSearchUser(item.email).then((user)=>{
        //             var temp = {
        //             uid : user.uid,
        //             email : user.email,
        //             username : user.username,
        //             profilePic : user.profilePic
        //             }
        //             this.myFriendRequest.push(temp);
        //         });

        //       }
        //     }else{
        //       console.log("No Request")
        //     }
            
        //   }else{
        //     console.log("No request list");
        //   }
        // });
        //start getting all post
        items = getData("allpost","post");
        items.then((result)=>{
          if(result != null){
            if(result.length != 0){
              result = Object.values(result);
              //console.log(result);
              for(let item of result){
                //console.log(item)
                var comment = [];
                if(item.comments != null){
                    comment = Object.values(item.comments);
                }
                var temp = {
                  downloadUrl : item.downloadUrl,
                  postMessage : item.postMessage,
                  uid : item.uid,
                  email : item.email,
                  username : item.username,
                  date : item.date,
                  comments : comment,
                  profilePic:item.profilePic
                }
                this.allPost.unshift(temp);

              }
            }else{
              console.log("No Post")
            }
            
          }else{
            console.log("No post list");
          }
        });
        // ...
        //real time lsiten to friends list
        var db = getFirestore();
        onSnapshot(doc(db, "friends",user.uid),(doc)=>{
            //console.log("Current Data: ",doc.data());
            if(doc.data()){
                this.myFriends = [];
                var temp = doc.data().myFriends
                for(let f of temp){
                  getSearchUser(f.email).then((user)=>{
                      this.myFriends.push(user)
                  });
                }
            }
        });
        //real time listen to friendrequest 
        onSnapshot(doc(db, "friendrequest",user.uid),(doc)=>{
            //console.log("Current Data: ",doc.data());
            if(doc.data()){
                this.myFriendRequest = [];
                var temp = doc.data().request
                for(let f of temp){
                  getSearchUser(f.email).then((user)=>{
                      this.myFriendRequest.push(user)
                  });
                }
            
            }
        });
        //real time listen to post
        onSnapshot(doc(db, "post","allpost"),(doc)=>{
            //console.log("Current Data: ",doc.data());
            if(doc.data().allPostItems.length !=0){
                if(this.allPost.length != doc.data().allPostItems.length){
                  var temp = doc.data().allPostItems.pop()
                  this.allPost.unshift(temp);
                }else{
                  this.allPost = doc.data().allPostItems;
                }
            }
        });
        document.getElementById("joke").click()
    }else{
      console.log("No user");
      window.location.href="Login";
    }
    });
  },
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
      if(source == "tasklist"){
        return Object.values(result.taskItem);
      }else if(source == "friends"){
        console.log(result+"Imhere!")
        return Object.values(result.myFriends);
      }else if(source == "friendrequest"){
        return Object.values(result.request);
      }else if(source == "post"){
        return Object.values(result.allPostItems);
      }
    
    }
    else{
      return result;
    }
  
}
async function updateDbTaskItem(uid,items){
    //user to update the Task items to the uid given
    var db = getFirestore();
    console.log(items)
    await setDoc(doc(db,"tasklist",uid),{
      taskItem : items
    });
}
async function updateDbFriends(uid,items){
    //update user's friend list
    var db = getFirestore();
    console.log(items)
    await setDoc(doc(db,"friends",uid),{
      myFriends : items
    });
}
async function sendDbFriendRequest(updatedRequest,friend){
    var db = getFirestore();
    console.log(friend);
    await setDoc(doc(db,"friendrequest",friend.uid),{
      request : updatedRequest
    });
}
async function updateDbPost(post){
    var db = getFirestore();
    console.log(post)
    await setDoc(doc(db,"post","allpost"),{
      allPostItems : post
    });
    
}
</script>
<style>
#tasks{
  background-image: linear-gradient(to right, #ffc107,#f5d77c);
}
#listfriend:hover{
  background-color: aqua;
}
.button{
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;

  display: inline-block;
  padding: 15px 25px;
  background-image: linear-gradient(to right, #20c997,#16e6a7);
  border-radius: 8px;
  color: rgb(83, 72, 72);
  font-size: 19px;
  font-weight: 700;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;

}
.button:hover{
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
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
.editProfile:hover{
  border: 3px solid greenyellow;
  width: 50px;
  height: 50px;
}
@media only screen and (max-width: 789px) {
  #friendlisthide{
    display: none;
  }
}
#joke:hover{
  font-size: 20px;
}

</style>