
class Kaeru{
  constructor(x,y){
    this.x = x<<4;
    this.y = y<<4;
    this.ay = 16;
    this.w = 16;
    this.h = 16;
    this.vx = 0;
    this.vy = 0;
    this.anim = 0;
    this.snum = 0;
    this.acou = 0;
    this.dirc = 0;
    this.jump = 0;
    this.spri = 0;
    this.kinoko = 0;
    this.kuri = 0;
    this.kuri2 = 0;
    this.kuribo = 0;
    this.gameover = 0;
    this.gameover2 = 0;
    this.type = TYPE_MINI;
    this.leg = 0;
  }

  checkFloor(){
    if(this.vy<=0){
      return;
    }
    let lx = ((this.x+this.vx)>>4);
    let ly = ((this.y+this.vy)>>4);

    let p = this.type == TYPE_MINI?2:0;

    if(field.isBlock(lx+1+p,ly+31) || field.isBlock(lx+14-p,ly+31)){
      if(this.anim == ANIME_JUMP){
        this.anim = ANIME_WALK;
      }
      this.jump = 0;
      this.vy = 0;
      this.y = ((((ly+31)>>4)<<4)-32)<<4;
    }
  }

  checkWall(){
    let lx = ((this.x+this.vx)>>4);
    let ly = ((this.y+this.vy)>>4);

    let p = this.type == TYPE_MINI?24:9;

    if(field.isBlock(lx+15,ly+p) || (this.type==TYPE_BIG && (field.isBlock(lx+15,ly+15) || field.isBlock(lx+15,ly+24)))){
      this.vx = 0;
      this.x -= 8;
    }else if(field.isBlock(lx,ly+p) || (this.type==TYPE_BIG && (field.isBlock(lx,ly+15) || field.isBlock(lx,ly+24)))){
      this.vx = 0;
      this.x += 8;
    }
  }

  checkCeil(){
    if(this.vy>=0){
      return;
    }

    let lx = ((this.x+this.vx)>>4);
    let ly = ((this.y+this.vy)>>4);

    let ly2 = ly + (this.type == TYPE_MINI?21:5);

    let bl;
    if(bl=field.isBlock(lx+8,ly2)){
      this.jump = 15;
      this.vy = 0;

      let x = ((lx+8)>>4);
      let y = ((ly2)>>4);

      if(bl !=371){
        block.push(new Block(bl,x,y));
        item.push(new Item(218,x,y,0,0));
      }else if(this.type==TYPE_MINI){
        block.push(new Block(bl,x,y));
      }else{
        block.push(new Block(bl,x,y,1,20,-60));
        block.push(new Block(bl,x,y,1,-20,-60));
        block.push(new Block(bl,x,y,1,20,-20));
        block.push(new Block(bl,x,y,1,-20,-20));
      }
    }
  }

  updateJump(){
    if(keyb.ABUTTON){
      if(this.jump == 0){
        this.anim = ANIME_JUMP;
        this.jump = 1;
      }
      if(this.jump<15){
        this.vy = -(64-this.jump);
      }
    }
    if(this.jump){
      this.jump++;
    }
  }

  updateWalkSub(dir){
    if(dir == 0 && this.vx<MAX_SPEED){
      this.vx++;
    }
    if(dir == 1 && this.vx>-MAX_SPEED){
      this.vx--;
    }
    if(!this.jump){
      if(this.anim == ANIME_STAND){
        this.acou = 0;
      }
      this.anim = ANIME_WALK;
      this.dirc = dir;
      if(dir == 0 && this.vx<0){
        this.vx++;
      }
      if(dir == 1 && this.vx>0){
        this.vx--;
      }
      if(dir == 1 && this.vx>8 || dir == 0 && this.vx<-8){
        this.anim = ANIME_BRAKE;
      }
    }
  }

  updateWalk(){
    if(keyb.Left){
      this.updateWalkSub(1);
    }else if(keyb.Right){
      this.updateWalkSub(0);
    }else{
      if(!this.jump){
        if(this.vx>0){
          this.vx--;
        }
        if(this.vx<0){
          this.vx++;
        }
        if(!this.vx){
          this.anim = ANIME_STAND;
        }
      }
    }
  }

  updateAnim(){
    switch(this.anim){
      case ANIME_STAND:
        this.snum = 0;
        break;
      case ANIME_WALK:
        this.snum = 2 + ((this.acou/6)%3);
        break;
      case ANIME_JUMP:
        this.snum = 6;
        break;
      case ANIME_JUMP2:
        this.snum = 14;
        this.vx = 0;
        break;
      case ANIME_BRAKE:
        this.snum = 5;
        break;
    }
    if(this.type == TYPE_MINI){
      this.snum += 32;
    }
    if(this.dirc){
      this.snum += 48;
    }
  }

  update(){
    if(this.kinoko){
      let anim = [32,14,32,14,32,14,0,32,14,0];
      this.snum = anim[this.kinoko>>2];
      this.h = this.snum == 32?16:32;
      if(this.dirc){
        this.snum += 48;
      }
      if(++this.kinoko == 40){
        this.type = TYPE_BIG;
        this.ay = 0;
        this.kinoko = 0;
      }
      return;
    }

    if(this.kuribo){
      let anim = [0,14,32,0,14,32,14,32,14,32];
      this.snum = anim[this.kuribo>>2];
      this.h = this.snum == 32?16:32;
      if(this.dirc){
        this.snum += 48;
      }
      if(++this.kuribo == 40){
        this.type = TYPE_MINI;
        this.ay = 16;
        this.kuribo = 0;
      }
      return;
    }

    if(this.kuri){
      this.anim = ANIME_JUMP;
      this.jump = 1;
      if(this.jump<15){
        this.vy = -(64-this.jump);
      }
      if(this.jump){
        this.jump++;
      }
      this.kuri = 0;
    }

    if(this.gameover){
      let anim = [94];
      this.snum = anim[this.kuribo>>2];
      this.h = 16;
      this.vx = 0;
      this.anim = ANIME_JUMP2;
      this.jump = 1;
      if(this.jump<15){
        this.vy = -(64-this.jump);
      }
      if(this.jump){
        this.jump++;
      }
      this.gameover = 0;
      this.gameover2 = 1;
      return;
    }
console.log(this.x);
    if(this.x%200 == 1){
      enemy.push(new Enemy(96,(kaeru.x>>8)+12,11,0,0));
    }

    this.acou++;
    if(Math.abs(this.vx)==MAX_SPEED){
      this.acou++;
    }
    this.updateJump();
    this.updateWalk();
    this.updateAnim();

    if(this.vy<64){
      this.vy+=GRAVITY;
    }
    if(this.gameover2 !== 1){
    this.checkFloor();
    }
    this.checkWall();

    this.checkCeil();

    this.x += this.vx;
    this.y += this.vy;

/*
    if(this.y>160<<4){

    }
  }
*/
  }

  draw(){
    let px = (this.x>>4)-field.scx;
    let py = (this.y>>4)-field.scy;
    let sx = (this.snum&15)<<4;
    let sy = (this.snum>>4)<<4;

    let w = this.w;
    let h = this.h;

    py += (32-h);

    vctx.drawImage(chImg,sx,sy,w,h,px,py,w,h);
  }
}