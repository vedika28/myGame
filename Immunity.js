class Immunity{

    constructor(x,y) {
        this.body=createSprite(x,y,10,10);
        this.body.addImage(boosterImg);
        this.body.scale=0.5;
        this.body.setCollider("rectangle", 0, 0, 70, 70);
    }

    behaviour() {
        if (player.body.isTouching(this.body)) {
            im+=20;
            immunity=Math.round(im);
            this.body.destroy();
            boost.play();
        }
    }
}