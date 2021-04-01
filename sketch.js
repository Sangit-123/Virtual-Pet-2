var dog,happyDog
var database
var foodS,foodStock
var feedPet,addFood
var fedTime,lastFed
var milk

function preload()
{
	dogImage=loadImage("Dog.png")
  happyImage=loadImage("happydog.png")
  milkImage=loadImage("Milk.png")
}

function setup() {
	createCanvas(1000,500);
  dog = createSprite(250,250,10,10)
  dog.scale=.3
  dog.addImage(dogImage)
  database=firebase.database()
  foodStock=database.ref("Food")
  foodStock.on("value",readStock,writeStock)

  feed=createButton("Feed the dog" );
  feed.position(600,450)
  feed.mousePressed(feedPet);

  addFood=createButton("Add Food");
  addFood.position(500,450);
  addFood.mousePressed(addFood);
}


function draw() {  
  background(46,139,87)
  displayMilk()
  foodObj=new Food()
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  fill(225,225,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
  } else if(lastFed==0){
    text("Last Feed : 12 AM",150,60);
  } else{
    text("Last Feed : "+ lastFed + " AM", 150,60);
  }
  drawSprites();
  textSize(17)
  stroke(5) 
  fill("white")
  text("Note : Press UP_ARROW Key to feed Drago Milk!",50,25)
  textSize(17)
  text("Food Remaining : " + foodS ,100,100)  

}

function readStock(data){
  foodS=data.val();
}
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }  

  database.ref('/').update({
    Food:x
  })
}
  function feedDog(){
    dog.addImage(happyDog);
  
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour() 
    })
  }

  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }
  function displayMilk(){
    var x = 450
    for(var i = 1;i<=foodS;i=i+1)
    {
      image(milkImage,x,200,100,100)
      x = x + 50
    }
  
}
