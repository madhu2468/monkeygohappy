var backImage,backgr;
var player, player_running;
var ground,ground_img;
var obstacle,obstaclesGroup,obstacleimg;
var banana,FoodGroup,bananaImage;
var gameover,gameoverimg;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png",
"Monkey_03.png","Monkey_04.png","Monkey_05.png",
"Monkey_06.png","Monkey_07.png","Monkey_08.png",
"Monkey_09.png","Monkey_10.png");

bananaImage = loadImage("banana.png");
obstacleimg = loadImage("stone.png");
gameoverimg = loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup = createGroup();
  obstaclesGroup = createGroup();

}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }


    if( FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score= score + 2;
     
        player.scale += 0.1 ;
        
      }
  

    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObstacle();
  }


 if(obstaclesGroup.isTouching(player)){
gameState = END;
}
 else if(gameState === END){
  backgr.velocityX = 0;
  player.visible = false;


obstaclesGroup.destroyEach();
FoodGroup.destroyEach();

var gameover = createSprite(400,200,10,40)
gameover.addImage(gameoverimg);
  }

  drawSprites();

  textSize(15);
  stroke("red")
  fill("red");
  text("Socre:- " + score,700,50);
}

function spawnFood (){
  if(frameCount % 80 === 0){
      banana = createSprite(600,250,40,10);
     banana.y = random(120,200);
  banana.addImage(bananaImage);
  banana.scale = 0.05;
    banana.velocityX = -4;
    
    banana.lifetime = 300;  

      player.depth = banana.depth + 1;
    
    FoodGroup.add(banana);

     }
} 

function spawnObstacle (){
  if(frameCount % 200 === 0){
  obstacle = createSprite(400,340,10,20);
  obstacle.x = random(120,200);
   obstacle.addImage(obstacleimg);
  obstacle.scale = 0.12;
    obstacle.velocityX = -4;
    
    obstacle.lifetime = 300;
    
  obstaclesGroup.add(obstacle);
    
} 
}