//var character = document.getElementById("character");
var score = 0;



function moveLeft(){
    let left = 
    parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left -= 100;
    if(left>=0){
        character.style.left = left + "px";
    }
}

function moveRight(){
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left += 100;
    if(left < 300){
        character.style.left = left + "px";
    }
}

document.addEventListener("keydown", event => {
    if(event.key === "ArrowLeft"){moveLeft();
    document.getElementById("character").src="img/turtleLeft.png"
    turtleLeft = document.getElementById("character").src
}
    if(event.key === "ArrowRight"){moveRight();
    document.getElementById("character").src="img/turtleRight.png"
    turtleRight = document.getElementById("character").src}
});

block.addEventListener('animationiteration', ()=>{
    let randomNum = Math.floor(Math.random()*3);
    left = randomNum * 100;
    block.style.left = left + "px";
    score++;
    document.getElementById('score').innerText =  score;
    
})


//to check if block touches character
setInterval(function(){
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    var blockleft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    var blocktop = parseInt(window.getComputedStyle(block).getPropertyValue('top'));
    if(characterLeft === blockleft && blocktop < 400 && blocktop > 351 ){

        document.getElementById("character").src = "img/deadRight.png"
        document.getElementById("gameOver").innerText="Game Over"
        document.getElementById("retry").setAttribute("style","display:block;")
        block.style.animationPlayState = 'paused';
        
    }
},1);



//set new values block -> animation using getElementById.style.animation
setInterval(()=>{
    if(score > 5){ 
        document.getElementById('block').style.animation = 'slide 1.5s infinite';
    }
    if(score > 10){
        document.getElementById('block').style.animation = 'slide 1.3s infinite';
    }
    if(score > 20){
        document.getElementById('block').style.animation = 'slide 1.1s infinite';
    }
    if(score > 30){
        document.getElementById('block').style.animation = 'slide 0.9s infinite';
    }
    if (score > 40){
        document.getElementById('block').style.animation = 'slide 0.8s infinite';   
    }
    if(score > 50){
        document.getElementById('block').style.animation = 'slide 0.7s infinite';
    }
    if(score > 60){
        document.getElementById('block').style.animation = 'slide 0.6s infinite';
    }
},100);;
