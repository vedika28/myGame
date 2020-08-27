class Vaccine {

    constructor(x, y) {
        this.body = createSprite(x, y, 10, 10);
        this.body.addImage(vtImg);
        this.body.scale = 0.1;
    }

    behaviour() {
        if (player.body.isTouching(this.body)) {
            vaccine += 10;
            this.body.destroy();
            vaccineSound.play();
        }
    }
}