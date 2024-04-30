class Enemy extends Sprite{
  checkFloor(){
    if(this.vy<=0){
      return;
    }
    let lx = ((this.x+this.vx)>>4);
    let ly = ((this.y+this.vy)>>4);
    if(field.isBlock(lx+1,ly+15) || field.isBlock(lx+14,ly+15)){
      this.vy = 0;
      this.y = ((((ly+15)>>4)<<4)-16)<<4;
    }
  }

  checkWall(){
    let lx = ((this.x+this.vx)>>4);
    let ly = ((this.y+this.vy)>>4);

    if(field.isBlock(lx+15,ly+3) || field.isBlock(lx+15,ly+12) || field.isBlock(lx,ly+3) || field.isBlock(lx,ly+12)){
      this.vx *= -1;
    }
  }

  update(){
    if(this.kill){
      return;
    }
    if(kaeru.kuri){
      return;
    }

    if(this.checkHitTop(kaeru) && kaeru.gameover2 !== 1){
      kaeru.kuri = 1;
      //kaeru.kuri2 = 1;
      this.kill = 1;
    }else if(this.checkHit(kaeru) && this.continue>=100){
      if(kaeru.type == TYPE_BIG){
        kaeru.kuribo = 1;
        this.continue = 0;
      }else if(kaeru.type == TYPE_MINI){
        kaeru.gameover = 1;
      }
    }

    if(++this.count2 <= 32){
      this.vx = -6;
      return;
    }

    this.continue++;
    this.checkWall();
    this.checkFloor();
    super.update();
  }
}