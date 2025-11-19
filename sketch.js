let backgroundImg;
let gameStartSound;
let ambientSound;
let gameState = "start"; // "start", "menu", "play"

let fadeOpacity = 255;
let fadeDirection = -1;
let enterPressed = false;
let boldStartTime;
let fadeToBlack = false;
let blackOverlay = 0;

function preload() {
  backgroundImg = loadImage('images/background_menu.png');
  gameStartSound = loadSound('mp3/game_start.ogg');
  ambientSound = loadSound('mp3/01_amb_darkness.ogg');
}

function setup() {
  createCanvas(1920, 1080);
  textAlign(CENTER, CENTER);
  textSize(32);

  ambientSound.loop();
  ambientSound.setVolume(1); // Start at full volume
}

function draw() {
  background(0);

  if (gameState === "start") {
    // Initial screen with "Click to Start"
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Click to Start", width / 2, height / 2);
  }

  else if (gameState === "menu") {
    // Menu screen with background and pulsing Enter prompt
    image(backgroundImg, 0, 0, width, height);

    if (!enterPressed) {
      fill(255, fadeOpacity);
      text("Press Enter Key to begin", width / 2, height / 2 + 100);
      fadeOpacity += fadeDirection * 2;
      if (fadeOpacity <= 0 || fadeOpacity >= 255) {
        fadeDirection *= -1;
      }
    }

    if (enterPressed) {
      fill(255);
      textStyle(BOLD);
      text("Press Enter Key to begin", width / 2, height / 2 + 100);

      if (millis() - boldStartTime > 1000) {
        gameState = "transition";
      }
    }
  }

  else if (gameState === "transition") {
    // Fade to black and fade out ambient sound
    image(backgroundImg, 0, 0, width, height); // keep background visible during fade
    blackOverlay += 255 / (60 * 7); // 7-second fade
    let overlayAlpha = constrain(blackOverlay, 0, 255);
    fill(0, overlayAlpha);
    rect(0, 0, width, height);

    let fadeProgress = overlayAlpha / 255;
    ambientSound.setVolume(1 - fadeProgress);

    if (overlayAlpha >= 255) {
      ambientSound.stop();
      console.log("Scene 1 begins");
      // Call startScene1() or transition logic here
    }
  }
}

function mousePressed() {
  if (gameState === "start") {
    gameState = "menu";
  }
}

function keyPressed() {
  if (gameState === "menu" && keyCode === ENTER && !enterPressed) {
    enterPressed = true;
    fadeOpacity = 255;
    boldStartTime = millis();
    gameStartSound.play();
  }
}