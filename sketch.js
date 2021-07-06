var PLAY =1;
var END = 0;
var tower, towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var invisibleBlock, invisibleBlockGroup;
var ghost, ghostImg;
var gameState = PLAY; 

function preload() {
towerImg = loadImage("tower.png");
climberImg = loadImage("climber.png")
doorImg = loadImage("door.png");
ghostImg = loadImage("ghost-standing.png");
spookySound = loadSound("spooky.wav");
}

function setup(){
createCanvas(600,600)
spookySound.loop();
tower = createSprite(300,300);
tower.addImage ("tower",towerImg);
tower.velocityY = 5;

ghost = createSprite(300,300,30,30);
ghost.addImage("ghost",ghostImg);
ghost.scale = 0.3
doorsGroup = new Group();
climbersGroup= new Group();
invisibleBlockGroup = new Group();
}





function draw() {
background (0);

if(gameState === PLAY) {


if (keyDown("right_arrow")) {
ghost.x = ghost.x + 3
}

if (keyDown("left_arrow")) {
ghost.x = ghost.x - 3
}

if (keyDown("space")) {
ghost.velocityY = -10;
}

ghost.velocityY = ghost.velocityY + 0.8;

if (tower.y > 400) {
tower.y = 300;
}
spawnDoors();
if (climbersGroup.isTouching(ghost)) {
ghost.velocityY = 0;
}
if(invisibleBlockGroup.isTouching("ghost") || ghost.y>600){
gameState = END;
}
drawSprites();
}
if (gameState === END) {
fill("Red");
textSize(40);
text("Game Over" , 200,300);
}}


function spawnDoors () {
if (frameCount%200 === 0) {
 door = createSprite(Math.round(random(120,500)),80,10,10);
 door.addImage(doorImg);
 door.velocityY = 3;
 door.lifetime = 800;
 doorsGroup.add(door);
 
 climber = createSprite(2,140,10,10);
 climber.x = door.x;
 climber.velocityY = 3;
 climber.addImage(climberImg);
 climbersGroup.add(climber);
 climber.lifetime = 800;
 
 invisibleBlock = createSprite(climber.x,160,80,10);
 invisibleBlock.debug = true;
 invisibleBlock.velocityY = 3;
 invisibleBlock.lifetime = 800;
 invisibleBlockGroup.add(invisibleBlock);
 invisibleBlock.visible = false;
 door.depth = ghost.depth
   ghost.depth = ghost.depth + 1;
  
  }
   
  
  
}
 

