class Form {

    constructor() {
        this.button = createButton('Play Again');
        this.button.position((width / 2), -25);
    }

    display() {
        this.button.position((width / 2), 250);
        this.button.velocityX = player.body.velocityX;
        this.button.mousePressed(() => {
            gameState = "play";
            im = 100;
            vaccine = 0;
            score = 0;
            resetButton.hide();
        })
    }

    hide() {
        this.button.position((width / 2), -25);
        this.button.visible = false;
        this.button.mousePressed(() => {
            gameState = "play";
            im = 100;
            immunity === im;
            vaccine = 0;
            score = 0;
            resetButton.hide();
        })
    }
}