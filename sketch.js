
var monkey , monkey_running, monkeyCollide;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  

  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(600,300);
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
 
  monkey = createSprite(80,230,10,10);
  monkey.addAnimation("sprite0", monkey_running);
  monkey.scale = 0.12;
    
  ground = createSprite(300,250,1200,10);
  ground.velocityX= 3;

  
}

function draw(){
  background("skyblue");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("BANANAS COLLECTED: "+bananaScore,300,20);
  
  if (gameState === PLAY){
    obstacles();
    spawnbananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 208) {
      monkey.velocityY = -13; 
    }
  console.log (monkey.y);
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (bananaGroup.isTouching(monkey)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
    monkey.collide(ground);
  
  drawSprites(); 
  
}

  function spawnbananas() {
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.y = Math.round(random(70,170))
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);

    
  } 
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    obstacle = createSprite(620,225 ,50,50);
    obstacle.addImage("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}






