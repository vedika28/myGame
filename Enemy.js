class Enemy {

    constructor(x, y) {
        this.body = createSprite(x, y, 10, 10);
        this.body.velocityX = -1;

        var rand = Math.round(random(1, 4));
        switch (rand) {
            case 1: this.body.addImage(enemy1);
                break;
            case 2: this.body.addImage(enemy2);
                break;
            case 3: this.body.addImage(enemy3);
                break;
            case 4: this.body.addImage(enemy4);
                break;
            default: break;
        }
        this.body.scale = 0.17;
    }
}