var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running, ground, InvisibleGround;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;

  var survivalTime = 0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

// corrected the canvas size
  createCanvas(600,600);
  
//creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  
  
  ground = createSprite(400,350,600,10);
// added the velocity here to make ground move
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  // not required
 // InvisibleGround=createSprite(400,340,900,20);
 // InvisibleGround.visible = false;
  
  monkey.setCollider("rectangle",10,10,monkey.width,monkey.height);
  monkey.debug = true;
  
  obstaclesGroup = new Group();
  bananaGroup = new Group();
}


function draw() {
background("white");
  
   monkey.collide(ground); 
  if(gameState === PLAY)
 { 
   
 
    if (ground.x < 0){
      ground.x = ground.width/2;
    } 
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
       // monkey.velocityY = monkey.velocityY + 0.8;
    }
  
 monkey.velocityY = monkey.velocityY + 0.8;
   
 Obstacles();
 Bananas();

   if(bananaGroup.isTouching(monkey)){
    score = score + 1;
  }
// recheck this entire condition i have changed it
  if(obstaclesGroup.isTouching(monkey)){
    gameState = END;
  }
 }
   if(gameState === END){
    score = 0;
    monkey.velocityY = 0;
    ground.velocityX = 0;

        obstaclesGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        obstaclesGroup.destroyEach();
        bananaGroup.destroyEach();
  }
  
 
  
  
  drawSprites();
  
  stroke("black");
 textSize(20);   
 fill("black");
 text("Score = "+score,400,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/60);
  text("Survival time "+ survivalTime,100,50);
  
  
}

function Obstacles(){
 if(frameCount % 60 === 0){
   
    obstacle = createSprite(260,325,20,20);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
   
   //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 
   
 }
 
}

function Bananas(){
  
  if (frameCount % 60 === 0){
  banana = createSprite(350,150,10,20);
  banana.velocityX = -4;
  banana.addImage(bananaImage);
  banana.scale = 0.1;
 
   //add each banana to the group
    bananaGroup.add(banana); 
  }
}


