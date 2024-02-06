/*
* author: beckaa
* version: 28.01.2020
*/

var startButton;
let colorIn;
let save = false;
let staticImg,redImg;
/*
* Source: https://www.freepik.com/free-photo/view-from-cave-design_879722.htm#page=1&query=cave&position=5
* Background photo created by kjpargeter - www.freepik.com
*/
let backgroundimage;
let fps = 25 ;
let bat;
let batimages =[];
let lifeimages =[];
let flap = false;
let death = false;
let endOfGame = false;
let hpBar;
let game;
let showmenu = false;
let pause = false;
let batimagesred = [];
let rockimages = [];
let rockimagesT = [];
let img;
let topObstacles = [];
let bottomObstacles = [];
let won = false;
//variables for the item images
let itemyellow = [];
let itemred = [];
let itemgreen = [];

let once = false;
let mode = 0;
let inputName;
//variables for sound
let hitRock;
let soundDie;
let specialSkillstart;
let backgroundSoundSpecial;
let backgroundmusic;
let collectSound;

let scoreResults;
let saveButton;
let scoreindex;
let slider;
let paused = false;

//Loads all the needed files before the game starts. So no File will be missing while playing the game.
function preload(){
	loadPictures();
	loadSoundFiles();
	scoreResults = loadStrings("highscore.txt");
}
//Function to load the needed soundfiles.
function loadSoundFiles(){
	
	hitRock = loadSound("sounds/StoneHit.mp3");
	soundDie = loadSound("sounds/die.mp3");
	specialSkillstart = loadSound("sounds/special_skill_start.mp3");
	backgroundSoundSpecial = loadSound("sounds/special_skill_background_musik.mp3");
	backgroundmusic = loadSound("sounds/background_music.mp3");
	collectSound = loadSound("sounds/Coins1.mp3");
}
//Function to load all the needed images for the game.
function loadPictures(){
	for(var i = 0; i<8;i++){
	img = loadImage('items/yellow'+i+'.png');
	itemyellow[i] = img;
}
for(var i = 0; i<8;i++){
	img = loadImage('items/red'+i+'.png');
	itemred[i] = img;
}
for(var i = 0; i<8;i++){
	img = loadImage('items/green'+i+'.png');
	itemgreen[i] = img;
}

//load obstacles top
for(var i = 0; i<6;i++){
	img = loadImage('rocks/rock'+i+'t'+'.png');
	rockimagesT[i] = img;
}
//load obstacles bottom
for(var i = 0; i<6;i++){
	img = loadImage('rocks/rock'+i+'.png');
	rockimages[i] = img;
}
//load bat images
for(var i = 0; i<6;i++){
	img = loadImage('Bat/bat'+i+'.png');
	batimages[i] = img;
}
//load red bat images
for(var i = 0; i<6;i++){
	img = loadImage('Bat/bat'+i+'red'+'.png');
	batimagesred[i] = img;
}
staticImg = loadImage('Bat/bat2t.png');
redImg = loadImage('Bat/bat2tred.png');
backgroundimage = loadImage('O7GZJG0.jpg');
//images life (heart bar)
for(var i = 0; i<3;i++){
	img = loadImage('Life/life'+i+'.png');
	lifeimages[i] = img;
}
hpBar = loadImage("hp-mp-bar.png");
}
//Will be run once when the browser is reloaded.
function setup() {
	startButton = createButton('Start');
		startButton.position(width/2-50, height*7/8);
		startButton.style('background-color','#F5F5F5');
		startButton.style('color','black');
		startButton.style('padding','10px 30px');
		startButton.style('font-size','15px');
		startButton.hide();
	writer = createWriter('newFile.txt');
	scoreindex = -2;
	inputName = createInput("Your Name","text");
	inputName.size(200);
	inputName.hide();
	saveButton = createButton("Save");
	slider = createSlider(1,3,1);
	slider.hide();
	slider.style("width","150px");
	saveButton.style('background-color','#F5F5F5');
	saveButton.style('color','black');
	saveButton.style('padding','10px 30px');
	saveButton.style('font-size','15px');
	saveButton.hide();
	createCanvas(windowWidth, windowWidth/16*9);
	bat = new Bat();
	frameRate(fps);
	game = new Game();
	game.createObstacles();
	game.drawObstacles();
	game.createItems();
	backgroundmusic.setVolume(0.4);
	backgroundSoundSpecial.setVolume(0.3);
	hitRock.setVolume(1);
	soundDie.setVolume(1);
	colorIn = color("black");
	colorIn.setAlpha(125);
	count = 0;
	mode = 0;
}
/*
*Saves the Highscore in a textfile which can be downloaded.
*/
function saveHighscore(){
	let str1 = join(scoreResults,',');
	let name = matchAll(str1,"[a-zA-Z]+[^Score:]");
	let score = matchAll(str1,"[0-9]+");
	let insertName = [inputName.value()+","];
	let insertScore =[game.playerscore];
	let newNames = splice(name,insertName,scoreindex);
	let newScores = splice(score,insertScore,scoreindex);
	newNames.pop();
	newScores.pop();
	let str2;
	let stringToSave = [];
	for(var i = 0; i <5;i++){
		str2 = newNames[i]+"Score:"+newScores[i];
		stringToSave.push(str2);
	}
	saveStrings(stringToSave,"highscore.txt");
	scoreResults = stringToSave;
	inputName.hide();
	saveButton.hide();
	scoreindex = -2;
	inputName.hide();
	frameRate(fps);
	save = true;
	once = false;
	mode = 3;
}
/*
* Changes the difficulty level in the game if the slider is changed. 
* The Obstacles and the items will move faster. Furthermore the distance between the obstacles (width and height) will be smaller.
*/
function difficulty(){
	game = new Game();
	game.createObstacles();
	bat = new Bat();
		if(slider.value() == 3){
			for(var i = 0; i< topObstacles.length;i++){
				topObstacles[i].set(12,width/5,staticImg.height+70,staticImg.height*5/2);	
				topObstacles[i].random(i);
			}
			
			
			for(var i = 0; i< bottomObstacles.length;i++){
				bottomObstacles[i].set(12,width/5,staticImg.height+70,staticImg.height*5/2);
				bottomObstacles[i].random(i);
			}
			game.drawObstacles();
			game.newItems();
			game.menu();
		}
		else if(slider.value() ==2){
			for(var i = 0; i< topObstacles.length;i++){
				topObstacles[i].set(11,width/4,staticImg.height+80,staticImg.height*3);	
				topObstacles[i].random(i);
			}
			for(var i = 0; i< bottomObstacles.length;i++){
				bottomObstacles[i].set(11,width/4,staticImg.height+80,staticImg.height*3);
				bottomObstacles[i].random(i);
			}
			game.drawObstacles();
			game.newItems();
			game.menu();
			}
			else{
			for(var i = 0; i< topObstacles.length;i++){
				topObstacles[i].set(9,width/3,staticImg.height+100,staticImg.height*4);	
				topObstacles[i].random(i);
			}
			for(var i = 0; i< bottomObstacles.length;i++){
				bottomObstacles[i].set(9,width/3,staticImg.height+100,staticImg.height*4);
				bottomObstacles[i].random(i);
			}
			game.drawObstacles();
			game.newItems();
			game.menu();
			}
		
		}
		
// Draws the game on the canvas.
function draw() {
  if(mode == 0){
	  //mode for menu (in the beginning)
	backgroundmusic.pause();  
	image(backgroundimage,0,0,width,height);  
	showmenu = true;
	game.menu();

  }else if(mode ==2){
	  //popup if new highscore reached
	  fill("grey");
	 rect(width/3,height/4,280,250); 
	 fill(255);
	 textSize(30);
		textAlign(LEFT);
	 text("Congratulations!",width/3+20,height/4+50);
	 text("New Highscore!",width/3+20,height/4+100);
	 saveButton.position(width/3+90, height/4+180);
	 inputName.position(width/3+50,height/4+130);
	 inputName.show();
	 saveButton.show();
	 saveButton.mouseClicked(saveHighscore);
  }else if(mode ==3){
	  if(endOfGame){
		  game.endOfGame();
		  noLoop();
	  }else{
		  game.won();
		  noLoop();
	  }
  }else{
	  //running game
	  image(backgroundimage,0,0,width,height);
	  game.drawObstacles();
	  bat.bars();
	  bat.lifes(); 
	  bat.update();
	  game.update();

  }
  
}
/*
* This Function will be executed every time, when the Window Size is changed.
* It resizes the Canvas and also updates the game.
*/
function windowResized(){
	collectSound.stop();
	hitRock.stop();
	let life = bat.amountOfLife;
	let score = game.playerscore;
	game.amountOfObstacles = topObstacles.length;
	resizeCanvas(windowWidth, windowWidth/16*9);
	bat.y = height/2;
	bat.immortal = new Immortal();
	soundDie.stop();
	
	if(mode ==1){
			game.createObstacles();
			game.drawObstacles();
			game.createItems();
			difficulty();
			
}
			if(mode ==0){
			game.menu();
			game.createObstacles();
			game.drawObstacles();
			game.createItems();
			difficulty();
			}
			game.endOfGame();
			game.won();
			if(paused){
				image(backgroundimage,0,0,width,height);
				textSize(40);
				fill(255);
				textAlign(CENTER);
				text("Game paused", width/2,height/2);
				textSize(30);
				fill("red");
				text('Press "o" to continue the Game',width/2+5,height/2+30);
			}
			bat.amountOfLife = bat.amountOfLife;
			game.playerscore = score;
}
/*
* Handles the events with the keyBoard for the game.
*/
function keyPressed(){
	if(!(mode ==2)){
	if(keyCode === 32){ //Space
	flap = true;
	
	}else if(keyCode === ESCAPE){
		noLoop();
		
	}else if(keyCode === 80){ //key p
		game.pause();
	}else if(keyCode ===79){ //key o
		game.start();
		paused = false;
	}	
	else{
		return false;
	}
	}
}
function keyReleased(){
	if(!(mode ==2)){
	if(keyCode === 32){ //Space
		flap = false;
	}
	
	if(keyCode == 80){//P
	paused = true;
		image(backgroundimage,0,0,width,height);
		textSize(40);
		fill(255);
		textAlign(CENTER);
		text("Game paused", width/2,height/2);
		textSize(30);
		fill("red");
		text('Press "o" to continue the Game',width/2+5,height/2+30);
	}
	
	if(keyCode == ESCAPE){
		image(backgroundimage,0,0,width,height);
		backgroundmusic.pause();
			if(backgroundSoundSpecial.isPlaying()){
				backgroundSoundSpecial.pause();
			}
		showmenu = true;
		game.menu();
	}
	if(keyCode == ENTER){
		if(endOfGame||won){
			mode=1;
			bat.resetBat();
			backgroundmusic.play();
			game = new Game();
			flap = false;
			save = false;
			death = false;
			game.createObstacles();
			game.drawObstacles();
			game.createItems();
			if(!(slider.value==1)){
				difficulty();
			}
			endOfGame = false;
			inputName.hide();
			won = false;
			frameRate(fps);
			
			slider.hide();
			loop();
			
		}
	}
	
		if(key == "b"){
		if(bat.skill == 100){
		specialSkillstart.play();
		bat.skillActivation = true;
		}
		}
	
	}	
	

	
}	
	
