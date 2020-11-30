var dog, happyDog, database, foodS=0, foodStock, feedBtn, addFoodBtn;

var fedTimeRef, lastFedTime;

var foodObj;

var gameState ="";


function preload()
{
	dogImg = loadImage('images/dogImg.png');
	happyDogImg = loadImage('images/dogImg1.png');
	washRommImg = loadImage("images/Wash Room.png");
	bedroomImg = loadImage("images/Bedroom.png");
	gardenImg = loadImage("images/Garden.png");
}

function setup() {
	createCanvas(600, 500);
	database = firebase.database();

	dog = createSprite(500,250,10,10);
	dog.addImage(dogImg);
	dog.scale = 0.4;

	//read the value of gameState 
	gameStateRef = database.ref('gameState').on("value", function(data){
		gameState = data.val();
		console.log(gameState)
	})

	//read the value of food from the database
	foodStock = database.ref('food');
	foodStock.on("value", function(data){
		foodS=data.val();	
		//console.log(foodS)	
	});

	
	//read the value of feedTime from the database
	fedTimeRef = database.ref('feedTime');
	fedTimeRef.on("value", function(data){
		lastFedTime=data.val();		
	});


	foodObj = new Food();
	

	feedBtn = createButton('Feed the Dog');
	feedBtn.position(600,130);
	feedBtn.mousePressed(feedDog);

	addFoodBtn = createButton('Add Food');
	addFoodBtn.position(710,130);
	
	addFoodBtn.mousePressed(addFoodStock); //cannot pass parameters in mousePressed for normal functions
	

	
  
}


function draw() {
 
  background(46, 139, 87);
   

 // if(foodS){	
	
		//assigning the food supply value to foodStock property of foodObj
		foodObj.foodStock = foodS ;
		foodObj.display();	

		textSize(20);
		fill("orange")

		currentTime = hour();
		console.log(currentTime + "--"+lastFedTime);
		
		if(currentTime==(lastFedTime+1)){
			updateGameState("Playing");
			foodObj.garden();
		 }else if(currentTime==(lastFedTime+2)){
			updateGameState("Sleeping");
			foodObj.bedroom();
		 }else if(currentTime>(lastFedTime+2) && currentTime<=(lastFedTime+4)){
			updateGameState("Bathing");
			foodObj.washroom();
		 }else{
			updateGameState("Hungry")
		  foodObj.display();
		 }
	
		
//	}	

	if(gameState === "Hungry"){
	
		feedBtn.show();
		addFoodBtn.show();
		dog.addImage(dogImg);
		text("Food Stock :"+foodS, 50,100);
	
	  }else {
	
		feedBtn.hide();
		addFoodBtn.hide();
		dog.remove();
	 }

 
  drawSprites();
 
}


function feedDog(){
	//get the current hour from system
	var currHour = new Date().getHours();

	//check to see whether food stock never goes below zero
	if(foodObj.foodStock >0){
		//update in database
		database.ref('/').update({
			feedTime : currHour,
			food : foodObj.foodStock -1
		})
	}

	//changed the dog image to a happy one
	dog.addImage(happyDogImg);

}

function addFoodStock(){
	//console.log(foodS)
	foodS++;
	database.ref('/').update({
		food : foodS
	})
} 

function updateGameState(state){
	database.ref('/').update({
		gameState : state
	})
}