class Player {

    constructor() {
        this.body = createSprite(50, 105, 10, 10);
        this.body.scale = 0.7;
        this.body.setCollider("rectangle", 10, 15, 90, 145);
        //this.body.debug = true;
        this.body.addAnimation("walk", playerAnm);
        this.body.addImage("jump", player_jump);
        this.body.addImage("duck", player_duck);
    }

    behaviour() {
        this.body.velocityX = Math.round((5 + score / 150));
        if (this.body.y > 385) {
            if (keyDown("UP_ARROW") || keyDown("space")) {
                this.body.velocityY = -16;
                this.body.changeImage("jump", player_jump);
                this.body.scale = 0.7;
            } else if (this.body.collide(ground)) {
                this.body.changeAnimation("walk", playerAnm);
                this.body.scale = 0.7;
            }
        }
        if (keyDown("DOWN_ARROW")) {
            this.body.changeImage("duck", player_duck);
            this.body.scale = 1;
            this.body.setCollider("rectangle", 0, 0, 100, 70);
        } else {
            this.body.changeAnimation("walk", playerAnm);
            this.body.scale = 0.7;
            this.body.setCollider("rectangle", 10, 15, 90, 145);
        }

        this.body.velocityY += 1;
        ground.velocityX = this.body.velocityX;
    }
}