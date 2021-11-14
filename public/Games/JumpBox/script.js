var character = document.getElementById("character");
var block = document.getElementById("block");
var block2 = document.getElementById("block2");
var counter=0;

var start=false;
function btnStart(){
    start=true;
    document.getElementById("start").setAttribute("class","container d-inline");
    document.getElementById("startBtn").setAttribute("style","display:none");
}

function jump(){
    if(character.classList == "animate"){return}
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },500);
}
var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    let blockLeft2=parseInt(window.getComputedStyle(block2).getPropertyValue("left"));
    if(start){
    if(blockLeft<35 && blockLeft>-35 && characterTop>=100){
        block.style.animationPlayState = 'paused';
        block2.style.animationPlayState = 'paused';
        character.style.animationPlayState = 'paused';
        document.getElementById("gameOver").innerText="Game Over"
        document.getElementById("retry").setAttribute("style","display:block;")
        
        counter=0;
        
        start=false;
        
    }
    else if(blockLeft2<30 && blockLeft2>-30 && characterTop>=115){
        block.style.animationPlayState = 'paused';
        block2.style.animationPlayState = 'paused';
        character.style.animationPlayState = 'paused';
        document.getElementById("gameOver").innerText="Game Over"
        document.getElementById("retry").setAttribute("style","display:block;")
        
        counter=0; 
        
        start=false;
        
    }
    else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor((counter)/100);
    }}
}, 10);