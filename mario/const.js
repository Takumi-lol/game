const GAME_FPS = 1000/60;
const SCREEN_SIZE_W = 256;
const SCREEN_SIZE_H = 224;

const MAP_SIZE_W = SCREEN_SIZE_W/16;
const MAP_SIZE_H = SCREEN_SIZE_H/16;

const FIELD_SIZE_W = 256;
const FIELD_SIZE_H = 14;

const ANIME_STAND = 1;
const ANIME_WALK = 2;
const ANIME_BRAKE = 4;
const ANIME_JUMP = 8;
const ANIME_JUMP2 = 16;
const GRAVITY = 4;
const MAX_SPEED = 32;
const TYPE_MINI = 1;
const TYPE_BIG = 2;
const TYPE_FIRE = 4;

class Sprite{
  constructor(sp,x,y,vx,vy){
    this.sp = sp;
    this.x = x<<8;
    this.y = y<<8;
    this.ay = 0;
    this.w = 16;
    this.h = 16;
    this.vx = vx;
    this.vy = vy;
    this.sz = 0;

    this.kill = false;
    this.count = 0;
    this.count2 = 0;
    this.count3 = 0;
    this.continue = 100;
    this.kr = 0;
  }

  checkHit(obj){
    let left1 = (this.x>>4) +2;
    let right1 = left1 + this.w -4;
    let top1 = (this.y>>4) +5 + this.ay;
    let bottom1 = top1 + this.h -7;

    let left2 = (obj.x>>4) +2;
    let right2 = left2 + obj.w -4;
    let top2 = (obj.y>>4) +5 +obj.ay;
    let bottom2 = top2 + obj.h -7;

    return (
      left1 <= right2 &&
      right1 >= left2 &&
      top1 <= bottom2 &&
      bottom1 >= top2
    );
  }

  checkHitTop(obj){
    let left1 = (this.x>>4) +2;
    let right1 = left1 + this.w -4;
    let top1 = (this.y>>4) +5 + this.ay;
    let bottom1 = top1 + this.h -7;

    let left2 = (obj.x>>4) +2;
    let right2 = left2 + obj.w -4;
    let top2 = (obj.y>>4) +5 +obj.ay;
    let bottom2 = top2 + obj.h -7;
    let center2 = left2 + (obj.w/2) -4;

    return (
      top1 <= bottom2&&
      bottom2 <= (top1+8)&&
      (left1-5)<=center2&&
      center2<=(right1+5)
    );
  }

  update(){
    if(this.vy<64){
      this.vy += GRAVITY;
    }
    this.x += this.vx;
    this.y += this.vy;
    if((this.y>>4)>FIELD_SIZE_H*16){
      this.kill = true;
    }
  }

  draw(){
    let an = this.sp;
    let sx = (an&15)<<4;
    let sy = (an>>4)<<4;
    let px = (this.x>>4) - (field.scx);
    let py = (this.y>>4) - (field.scy);
    let s;

    if(this.sz){
      s = this.sz;
    }else{
      s = 16;
    }
    vctx.drawImage(chImg,sx,sy,16,s,px,py,16,s);
  }


}

