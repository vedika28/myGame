//declaring variables:
var playerAnm, player, player_jump, player_duck;
var enemy1, enemy2, enemy3, enemy4, enemy = [], enemyGrp;
var gameState;
//vt=vaccnine token
var vt = [], vtImg, booster = [], boosterImg, immunity = 100, im = 100, vaccine = 0;
var score = 0;
var ground, groundImg, objectX, bgImg, bgImg2;
var resetButton;
var hr;
var gameEnd, boost, vaccineSound, enemySound, win;

//to load the images and sounds:
function preload() {
  playerAnm = loadAnimation("imgs/c1.png", "imgs/c7.png", "imgs/c5.png")
  enemy1 = loadImage("imgs/enemy1.png");
  enemy2 = loadImage("imgs/enemy2.png");
  enemy3 = loadImage("imgs/enemy3.png");
  enemy4 = loadImage("imgs/enemy4.png");
  player_jump = loadImage("imgs/cat_jump.png");
  player_duck = loadImage("imgs/cat_duck.png");
  vtImg = loadImage("imgs/vaccine.png");
  boosterImg = loadImage("imgs/Immunity_booster.png");
  bgImg = loadImage("imgs/bg.jpg");
  bgImg2 = loadImage("imgs/bg2.PNG");
  gameEnd = loadSound("sounds/game_over.mp3");
  boost = loadSound("sounds/booster.mp3");
  vaccineSound = loadSound("sounds/vaccine.mp3");
  enemySound = loadSound("sounds/enemyTouch.mp3");
  win = loadSound("sounds/win.mp3");
}

function setup() {
  createCanvas(displayWidth, displayHeight - 145);

  player = new Player();

  ground = createSprite(50, 482, width, 10);
  ground.visible = false;

  enemyX = (width / 2);
  boosterX = (width / 2);
  gameState = "play";

  resetButton = new Form();
}

function draw() {

  //to change bachground according to time:
  hr = hour();
  if (hr <= 19) {
    background(bgImg);
  } else if (hr > 19) {
    background(bgImg2);
  }

  objectX = player.body.x + 700
  player.body.collide(ground);

  if (gameState === "play") {
    //to add player's behaviour:
    player.behaviour();
    makeEnemies();

    //to make vt at random position and calling its behaviour:
    var rand4 = random(360, 440)
    if (frameCount % 700 === 0) {
      vt.push(new Vaccine(objectX, rand4));
    }
    if (vt) {
      for (var j = 0; j < vt.length; j++) {
        vt[j].behaviour();
      }
    }

    //to make booster at random position and calling its behaviour:
    var rand3 = random(350, 440)
    if (frameCount % 650 === 0 && immunity <= 140) {
      booster.push(new Immunity(objectX, rand3));
    }
    if (booster) {
      for (var i = 0; i < booster.length; i++) {
        booster[i].behaviour();
      }
    }

    //player wins game ince he collects 100 points of vaccine:
    if (vaccine >= 100) {
      win.play();
      gameState = "win";
    }

    //making the reset button outside canvas while gamestate=play:
    resetButton.hide();

    //scoring system:
    if (frameCount % 3 === 0 && frameCount > 100) {
      score += 1;
    }

    //to make camera follow player position to give real world effect
    camera.position.x = player.body.position.x;

    //to decrease immunity once player touches the virus:
    for (var i = 0; i < enemy.length; i++) {
      if (player.body.isTouching(enemy[i].body)) {
        im -= Math.round((5 + score / 150)) / 10;
        immunity = Math.round(im);
      }
    }

    //ending game once immunity of player reaches 0:
    if (im <= 0) {
      gameState = "end";
      gameEnd.play();
    }
  }

  if (gameState === "end") {
    stop();
  }

  drawSprites();

  //displaying player's score and immunity:
  textFont("BOLD");
  textSize(23);
  text("score: " + score, (player.body.position.x) + 400, 100);
  text("Immunity: " + immunity, (player.body.position.x) + 400, 150);
  text("Vaccine: " + vaccine, (player.body.position.x) + 400, 200);

  //instructions:
  text("Press up arrow to jump and down arrow to duck", (player.body.position.x) - 200, 50);
  text("Collect 10 vaccine tokens to win and try not to lose your immunity", (player.body.position.x) - 280, 80);

  //displaying game end message once game ends:
  if (gameState === "end") {
    textSize(40);
    text("GAME OVER", (player.body.position.x) - 110, 200);
  }
  //displaying victory message once player wins:
  if (gameState === "win") {
    textSize(40);
    text("YOU WIN", (player.body.position.x) - 50, 200);
    stop();
  }
}

//to stop ground, display button and destroy the other objects.
function stop() {
  player.body.velocityX = 0;
  for (var i = 0; i < enemy.length; i++) {
    enemy[i].body.destroy();
  }
  ground.velocityX = 0;
  for (var j = 0; j < vt.length; j++) {
    vt[j].body.destroy();
  }
  for (var k = 0; k < vt.length; k++) {
    booster[k].body.destroy();
  }
  resetButton.display();
}

function reset() {
  gameState === "play";
  im === 100;
  immunity = 100;
  vaccine === 0;
  score === 0;
  resetButton.hide();
  player = new Player();
}

//spawning enemies:
function makeEnemies() {
  //to make enemies at random positions:
  var rand2 = random(340, 440)
  if (frameCount % 65 === 0 && score <= 160) {
    enemy.push(new Enemy(objectX, rand2));
  }
  if (frameCount % 55 === 0 && score > 160 && score <= 500) {
    enemy.push(new Enemy(objectX, rand2));
  }
  if (frameCount % 40 === 0 && score > 500 && score <= 800) {
    enemy.push(new Enemy(objectX, rand2));
  }
  if (frameCount % 30 === 0 && score > 800) {
    enemy.push(new Enemy(objectX, rand2));
  }
}