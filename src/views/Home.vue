<template>
    <div id="indexbg">
        <h1 class="title">Singapore<br>Management University</h1>
         <div id="background">
            <span>SCIS</span>
        </div>
        <h2 class="placeholdertext">
The BSc (Computer Science) degree equips students with an understanding of the interplay between computing theory and practice and the essential links between them, as well as fundamental business innovation and IT solution development and management skills.</h2>
    </div>
</template>

<script>
    export default {
    name: 'indexbg'
    }
    
    document.addEventListener('scroll', () => {
        const scrollY = window.scrollY
        const background = document.getElementById("background");
        if(background != null){
          if (scrollY !== 0) {
            background.style.backgroundPosition = `calc(50% + ${scrollY}px) calc(50% + ${scrollY}px)`
          }else{
            background.style.backgroundPosition = ''
        }
        }

    })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
    #background {
        background-image: url("../assets/background.jpg");
        background-size: cover;
        background-position: 50% 50%;
        height: 200vh;
        font: 500 25rem '';
        line-height: 130vh;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: relative;
        text-align: center;
        overflow: hidden;
    }

    #background::before {
        content: '';
        background-size: cover;
        background-image: inherit;
        background-position: 50% 50%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -99;
    }
    .title {
        position: absolute;
        text-align: center;
        width: 100%;
        letter-spacing: 2px;
        color: white;
        font-size: 60px;
        padding-top: 100px;
        background: -webkit-linear-gradient(rgb(1, 1, 87),rgb(14, 76, 190));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .placeholdertext {
        position: absolute;
        letter-spacing: 2px;
        top: 120vh;
        width: 60%;
        color: #fff;
        left: 50%;
        transform: translateX(-50%);
        padding: 30px;
        background-color: rgba(0, 0, 0, .3);
    }
    @media only screen and (max-width: 800px) {
        #background {
            background-image: url("../assets/background.jpg");
            background-size: cover;
            background-position: 50% 50%;
            height: 200vh;
            font: 250 15rem '';
            line-height: 100vh;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
            text-align: center;
            overflow: hidden;
        }
    }
</style>