let backgroundImg;
let gameStartSound;
let ambientSound;

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
  image(backgroundImg, 0, 0, width, height);

  // Dimming text loop
  if (!enterPressed) {
    fill(255, fadeOpacity);
    text("Press Enter Key to begin", width / 2, height / 2 + 100);
    fadeOpacity += fadeDirection * 2;
    if (fadeOpacity <= 0 || fadeOpacity >= 255) {
      fadeDirection *= -1;
    }
  }

  // After Enter is pressed
  if (enterPressed) {
    fill(255);
    textStyle(BOLD);
    text("Press Enter Key to begin", width / 2, height / 2 + 100);

    // Start fade to black after 1 second
    if (millis() - boldStartTime > 1000) {
      fadeToBlack = true;
    }
  }

  // Fade to black over 5 seconds
  if (fadeToBlack) {
    blackOverlay += 255 / (60 * 7); // Assuming 60 FPS
    let overlayAlpha = constrain(blackOverlay, 0, 255);
    fill(0, overlayAlpha);
    rect(0, 0, width, height);

    // Fade ambient sound volume
    let fadeProgress = overlayAlpha / 255;
    ambientSound.setVolume(1 - fadeProgress);

    if (overlayAlpha >= 255) {
      ambientSound.stop();
      console.log("Scene 1 begins");
      // Call startScene1() or transition logic here
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER && !enterPressed) {
    enterPressed = true;
    fadeOpacity = 255;
    boldStartTime = millis();
    gameStartSound.play();
  }
}