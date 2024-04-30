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
}