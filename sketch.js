//Create variables here
var dog, happydog;
var feed, add;
var Feedtime;
var Lastfeed;
var foodobject;

var database;
var foodS, foodStock, position;

function preload()
{
  dogImg = loadImage("Dog.png");
  dogHappy = loadImage("happydog.png")
}

function setup() {
	createCanvas(800, 500);

  foodobject=new Food();
  dog = createSprite(550,250,10,10);
  dog.addImage(dogImg)
  dog.scale = 0.4;

  database = firebase.database();
  console.log(database);

  foodStock = database.ref('Food');
  foodStock.on("value", readPosition, showError);
  feed = createButton("FEED DOG")
  feed.position(900,60)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(800,60)
  add.mousePressed(AddFood)
  
}


function draw() {  
  background(46, 139, 87);

  foodobject.display()

  fill(255,255,254);
 textSize(15);

drawSprites();
}

function readPosition(data){
  foodS=data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition (x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x 
  })
}

function AddFood(){
  position++
  database.ref('/').update({
    Food:position
  }
  
  )
  }
  function FeedDog(){
  
  dog.addImage(dogHappy)
  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
   database.ref('/').update({
     Food:foodobject.getFoodStock(),
     FeedTime:hour ()
   })
  }




