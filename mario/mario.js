let vcanvas = document.createElement("canvas");
let vctx = vcanvas.getContext('2d');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

vcanvas.width = SCREEN_SIZE_W;
vcanvas.height = SCREEN_SIZE_H;

canvas.width = SCREEN_SIZE_W*2;
canvas.height = SCREEN_SIZE_H*2;

ctx.mozimageSmoothingEnabled = false;
ctx.msimageSmoothingEnabled = false;
ctx.webkitimageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

let frameCount = 0;
let startTime;
let chImg = new Image();
chImg.src = "sprite.png";
let keyb = {};

let kaeru = new Kaeru(100,100);
let field = new Field();

let block = [];
let item = [];
let enemy = [];

function updateObj(obj){
  for(let i=obj.length-1; i>=0; i--){
    obj[i].update();
    if(obj[i].kill){
      obj.splice(i,1);
    }
  }
}

function update(){
  field.update();

  updateObj(block);
  updateObj(item);
  updateObj(enemy);

  kaeru.update();
}

function drawSprite(snum,x,y){
  let sx = (snum&15)*16;
  let sy = (snum>>4)*16;
  vctx.drawImage(chImg,sx,sy,16,32,x,y,16,32);
}

function drawObj(obj){
  for(let i=0;i<obj.length;i++){
    obj[i].draw();
  }
}

function draw(){
  vctx.fillStyle = '#66AAFF';
  vctx.fillRect(0,0,SCREEN_SIZE_W,SCREEN_SIZE_H);

  field.draw();

  drawObj(block);
  drawObj(item);
  drawObj(enemy);

  kaeru.draw();

  vctx.fillStyle = '#FFFFFF';
  //vctx.fillText(frameCount,10,10);

  ctx.drawImage(vcanvas,0,0,SCREEN_SIZE_W,SCREEN_SIZE_H,0,0,SCREEN_SIZE_W*2,SCREEN_SIZE_H*2);
}

//setInterval(mainloop,1000/60);
window.onload = function(){
  startTime = performance.now();
  mainloop();
}

function mainloop(){
  let nowTime = performance.now();
  let nowFrame = (nowTime-startTime) / GAME_FPS;
  if(nowFrame > frameCount){
    let c = 0;
    while( nowFrame > frameCount){
      frameCount++;
      update();
      if(++c>=4)break;
    }
    draw();
  }
  requestAnimationFrame(mainloop);
}

// ボタンがクリックされたときに呼び出される関数
//function handleRightButtonClick() {
    // 変数をtrueに設定
    //keyb.Right = true;
//}
/*
// タッチ開始
document.getElementById("content").addEventListener('touchstart', logTouchStart);
document.getElementById("content2").addEventListener('touchstart', logTouchStart2);
document.getElementById("content3").addEventListener('touchstart', logTouchStart3);

// タッチ終了
document.getElementById("content").addEventListener('touchend', logTouchEnd);
document.getElementById("content2").addEventListener('touchend', logTouchEnd2);
document.getElementById("content3").addEventListener('touchend', logTouchEnd3);

function logTouchStart() {
  keyb.Left = true;
}

function logTouchEnd() {
  keyb.Left = false;
}

function logTouchStart2() {
  keyb.Right = true;
}

function logTouchEnd2() {
  keyb.Right = false;
}

function logTouchStart3() {
  keyb.ABUTTON = true;
}

function logTouchEnd3() {
  keyb.ABUTTON = false;
}*/

// 複数のコンテンツを対象としたタッチイベント
const touchTargets = ["content1", "content2", "content3"];

// タッチ開始イベントを設定
touchTargets.forEach((target, index) => {
  const element = document.getElementById(target);
  // タッチ開始イベント
  element.addEventListener('touchstart', () => {
    if (index === 0) keyb.Left = true;
    if (index === 1) keyb.Right = true;
    if (index === 2) keyb.ABUTTON = true;
  });

  // タッチ終了イベント
  element.addEventListener('touchend', () => {
    if (index === 0) keyb.Left = false;
    if (index === 1) keyb.Right = false;
    if (index === 2) keyb.ABUTTON = false;
  });
});

/*
document.onkeydown = function(e){
  if(kaeru.gameover2 !== 1){
  if(e.keyCode == 37)keyb.Left = true;
  if(e.keyCode == 39)keyb.Right = true;
  }
  if(e.keyCode == 90)keyb.BBUTTON = true;
  if(e.keyCode == 88)keyb.ABUTTON = true;

  if(e.keyCode == 65){
    //block.push(new Block(368,5,5));
    //enemy.push(new Enemy(96,(kaeru.x>>8)+12,11,0,0));
  }
  //if(e.keyCode == 65)field.scx--;
  //if(e.keyCode == 83)field.scx++;
}

document.onkeyup = function(e){
  if(e.keyCode == 37)keyb.Left = false;
  if(e.keyCode == 39)keyb.Right = false;
  if(e.keyCode == 90)keyb.BBUTTON = false;
  if(e.keyCode == 88)keyb.ABUTTON = false;
}*/
/*
document.querySelectorAll('.no-select').forEach(element => {
  element.addEventListener('touchstart', (event) => {
    event.preventDefault(); // 長押しによるテキスト選択を防ぐ
  });
});*/

document.body.addEventListener("touchstart", function(e){
  e.preventDefault();
});
document.body.addEventListener("touchmove", function(e){
  e.preventDefault();
});
