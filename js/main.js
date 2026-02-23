// ================= RANDOM GAME =================
function randomGame(){

  // 1 op 20 secret game
  if(Math.random() < 0.05){
    window.location.href="games/secret/";
    return;
  }

  const games=[
    "games/pong/",
    "games/dvd/",
    "games/aim/",
    "games/clicker/"
  ];

  const random = games[Math.floor(Math.random()*games.length)];
  window.location.href = random;
}

// button click koppelen
const randomBtn = document.getElementById("randomBtn");
if(randomBtn){
  randomBtn.addEventListener("click", randomGame);
}

// ================= 1. TITLE 5x CLICK =================
let titleClicks = 0;
let titleTimer;
const title = document.getElementById("title");

if(title){
title.addEventListener("click",()=>{
  titleClicks++;

  clearTimeout(titleTimer);
  titleTimer=setTimeout(()=>titleClicks=0,1500);

  if(titleClicks>=5){
    chaosMode();
    titleClicks=0;
  }
});
}

function chaosMode(){
  document.body.style.animation="shake .15s 8";
  document.body.style.filter="hue-rotate(180deg)";

  setTimeout(()=>{
    document.body.style.filter="none";
    randomGame();
  },700);
}

// ================= 2. RAGE CLICK =================
let rageClicks = 0;

if(randomBtn){
randomBtn.addEventListener("click",()=>{
  rageClicks++;

  if(rageClicks>=10){
    document.body.style.filter="invert(1)";
    setTimeout(()=>{
      document.body.style.filter="none";
      randomGame();
    },400);
    rageClicks=0;
  }
});
}

// ================= 3. HOLD SCREEN (MOBILE) =================
let holdTimer;

document.addEventListener("touchstart",()=>{
  holdTimer=setTimeout(()=>{
    ghostMode();
  },3000);
},{passive:true});

document.addEventListener("touchend",()=>{
  clearTimeout(holdTimer);
});

function ghostMode(){
  document.body.style.filter="invert(1)";
  setTimeout(()=>{
    document.body.style.filter="none";
    randomGame();
  },600);
}

// ================= 4. KONAMI CODE =================
let konami = [
  "ArrowUp","ArrowUp",
  "ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight",
  "ArrowLeft","ArrowRight"
];

let konamiIndex = 0;

document.addEventListener("keydown",(e)=>{
  if(e.key === konami[konamiIndex]){
    konamiIndex++;

    if(konamiIndex === konami.length){
      devMode();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function devMode(){
  document.body.style.filter="invert(1)";
  setTimeout(()=>{
    alert("DEV MODE UNLOCKED 😈");
    randomGame();
  },400);
}

// ================= 5. RANDOM COIN SPAWN =================
setInterval(()=>{
  spawnCoin();
},30000);

function spawnCoin(){
  if(document.getElementById("secretCoin")) return;

  const coin = document.createElement("div");
  coin.id="secretCoin";
  coin.innerHTML="🪙";

  coin.style.position="fixed";
  coin.style.fontSize="42px";
  coin.style.left=Math.random()*80+"vw";
  coin.style.top=Math.random()*80+"vh";
  coin.style.cursor="pointer";
  coin.style.zIndex="9999";
  coin.style.filter="drop-shadow(0 0 12px gold)";
  coin.style.transition="transform .2s";

  document.body.appendChild(coin);

  coin.onclick=()=>{
    window.location.href="games/secret/";
  };

  coin.onmouseover=()=>{
    coin.style.transform="scale(1.3)";
  };

  setTimeout(()=>{
    coin.remove();
  },6000);
}

// ================= SHAKE CSS INJECT =================
const style=document.createElement("style");
style.innerHTML=`
@keyframes shake{
  0%{transform:translate(0)}
  25%{transform:translate(4px,0)}
  50%{transform:translate(-4px,0)}
  75%{transform:translate(4px,0)}
  100%{transform:translate(0)}
}`;
document.head.appendChild(style);