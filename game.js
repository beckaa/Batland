/*
* Includes the different game scenes. 
* Gives Feedback to the player for example if the game ends.
*/
class Game{
	constructor(){
		this.amountOfObstacles = 30;
		this.amountOfItems = 10;
		this.playerscore =0;
		this.itemListgreen = [];
		this.itemListred = [];
		this.itemListyellow = [];
	}
	/*
	* Checks if the items collide with other items or obstacles and replaces the items if they collide.
	*/
	collidingItems(){
		let items = this.itemListgreen.concat(this.itemListred,this.itemListyellow);
		let obstacles = topObstacles.concat(bottomObstacles);
		let temp,temp2;
		let finaltemp = [];

		if(items.length >0){
		for(var i = 0; i<items.length;i++){
			if(i==0){
			 temp = items.slice(i+1,items.length);}
			else{
			 temp = items.slice(i+1,items.length);
			 temp2 = items.slice(0,i-1);
			 finaltemp = temp.concat(temp2);
			for(var j = 0; j< temp2.length;j++){
				finaltemp.push(temp2[j]);
			}
			}
			
			while(items[i].trackingRec.overlaps(finaltemp)
				||items[i].trackingRec.overlaps(obstacles)){
				items[i].randomPosition();
			}	
		}
		}
			} 
	/*
	* Deletes the Obstacle from the array if they are already off screen. 
	*(If the position of x < 0)
	*/
	deleteObstacles(){
		if(topObstacles.length >0&&topObstacles[0].x+topObstacles[0].imageO.width < 0  ){
			topObstacles.reverse();
			topObstacles.pop();
			topObstacles.reverse();
		}
		if(bottomObstacles.length >0&&bottomObstacles[0].x + bottomObstacles[0].imageO.width < 0){
			bottomObstacles.reverse();
			bottomObstacles.pop();
			bottomObstacles.reverse();
		}
		
	}
	/*
	* Creates new Items if no Items are on the canvas and the game is not over yet.
	*/
	newItems(){
		if(topObstacles.length > 0&&bottomObstacles.length>0&&topObstacles[topObstacles.length-1].x  <width && bottomObstacles[bottomObstacles.length-1].x < width
		||topObstacles.length==0 && bottomObstacles.length==0){
		return;
		}else{
			if(this.itemListgreen.length == 0 && this.itemListred.length ==0 && this.itemListyellow.length ==0){
				game.createItems();
			}
		}	
	}
	
	/*
	* Deletes the items which are off screen (x<0).
	*/
	itemsLessZero(itemlist){
		if(!(itemlist.length == 0)){
			if(itemlist[0].x +itemlist[0].width < 0){
				itemlist.reverse();
				itemlist.pop();
				itemlist.reverse();
			}
		}
	}
	/*
	* Creates items and calls collidingItems() to check for collisions with other objects in the game.
	* Also sets the speed of the Items if neccessary.
	*/
	createItems(){
		for(var i = 0; i<this.amountOfItems;i++){
			this.itemListgreen[i] = new SpecialItems("green");
			this.itemListgreen[i].randomPosition();
			if(slider.value()==3){
				this.itemListgreen[i].setSpeed(12);
			}else if(slider.value()==2){
				this.itemListgreen[i].setSpeed(11);
			}else{
				this.itemListgreen[i].setSpeed(9);
			}
		}	
		for(var i = 0; i<this.amountOfItems; i++){
			this.itemListred[i] = new SpecialItems("red");
			this.itemListred[i].randomPosition();
if(slider.value()==3){
				this.itemListred[i].setSpeed(12);
			}else if(slider.value()==2){
				this.itemListred[i].setSpeed(11);
			}else{
				this.itemListred[i].setSpeed(9);
			}			
		}	
		for(var i = 0; i<this.amountOfItems;i++){
			this.itemListyellow[i] = new SpecialItems("yellow");
			this.itemListyellow[i].randomPosition();
			if(slider.value()==3){
				this.itemListyellow[i].setSpeed(12);
			}else if(slider.value()==2){
				this.itemListyellow[i].setSpeed(11);
			}else{
				this.itemListyellow[i].setSpeed(9);
			}
		}
		this.collidingItems();
	}
	
	//Will draw the items on the canvas
	drawItems(){
		for(var i = 0; i< this.itemListgreen.length;i++){
			this.itemListgreen[i].moveItem();
			this.itemListgreen[i].draw();
			
		}
		for(var i = 0; i< this.itemListred.length;i++){
			this.itemListred[i].moveItem();
			this.itemListred[i].draw();
		}
		for(var i=0; i< this.itemListyellow.length;i++){
			this.itemListyellow[i].moveItem();
			this.itemListyellow[i].draw();
		}
	}
		//Will create random rock obstacles.
createObstacles(){
	let randomNumber=0;
	let secondN=0;
	
	for(var i = 0 ; i<this.amountOfObstacles;i++){
		randomNumber = round(random(0,5));
		secondN = round(random(0,5));
		topObstacles[i] = new Obstacle(rockimagesT[randomNumber]);
		topObstacles[i].obstacleWidth = rockimagesT[randomNumber].width;
		bottomObstacles[i] = new Obstacle(rockimages[secondN]);
		bottomObstacles[i].obstacleWidth = rockimages[secondN].width;
	}
}
	//Draws the Obstacles to the scene
drawObstacles(){
   for(var i = 0; i < bottomObstacles.length;i++){
	
	if(bottomObstacles[i].obstacleHeight == 0 ){
		bottomObstacles[i].random(i);
	}
	bottomObstacles[i].moveObstacle();
	bottomObstacles[i].drawObstacle(true);
   }
	for(var i = 0; i<topObstacles.length;i++){
	topObstacles[i].moveObstacle();
	topObstacles[i].drawObstacle(false);
	}
   
}	
	/*
	* Displays the current playerscore on the screen.
	*/
	score(){
		textSize(50);
		textAlign(CENTER);
		fill(255);
		text(this.playerscore,width-100,height-50);
		if(!(mode ==2)){
		if(this.playerscore == 0 && millis() >0){
		this.playerscore = 1;
		}else{
		this.playerscore = round(this.playerscore+100/fps);
		}
		}
	}
	/*
	* Method displays the game menu. It includes the design of the menu.
	*/
	menu(){	
		if(showmenu){
			image(backgroundimage,0,0,width,height);
		textSize(40);
		textAlign(CENTER);
		fill(255);
		text("Main menu",width/2,70);
		textSize(25);
		fill(255);
		textAlign(LEFT);
		text("Level of Difficulty",width/8,125);
		if(mode ==1){
		textSize(15);
		textStyle(BOLD);
		fill("red");
		text("(WARNING: If changed new game will start!)",width/8,145);
		textStyle(NORMAL);
		}
		textSize(25);
		fill(255);
		if(230+24*5>height){
			text("Highscore",width/2,130);
		}else{
			text("Highscore",width/8,230);	
		}
		textSize(16);
		//calls function difficulty in batland.js if the slider is changed		
		slider.changed(difficulty);
	
		for(var i = 0; i<5;i++){
			if(230+24*5>height){
				text(i+1+"."+scoreResults[i],width/2,155+i*24);
			}else{
			text(i+1+"."+scoreResults[i],width/8,255+i*24);
			}
		}
		textSize(15);
		text("Easy",width/8,190);
		text("Medium",width/8+50,190);
		text("Hard ",width/8+120,190);
		startButton.position(width/2-50, height*7/8);
		slider.position(width/8,150);
		startButton.show();
		slider.show();
		flap = false;
		startButton.mouseClicked(this.closeMenu);
		}else{
		startButton.hide();
		slider.hide();
		}
		
		
	}
	/*
	* It will close the main menu and go back to the game or it will start a new game.
	*/
	closeMenu(){
		if(showmenu){
			backgroundmusic.loop();	
		showmenu = false;
		if(!(mode==1)){
		mode = 1;
		}
		loop();
		}
	}
	/*
	* Shows the winner screen if the player won the game.
	*/
	won(){
		if(won){
		slider.hide();		
		backgroundmusic.pause();
		backgroundSoundSpecial.stop();
		soundDie.stop();
		specialSkillstart.stop();
		this.itemListgreen = [];
		this.itemListred = [];
		this.itemListyellow = [];
		image(backgroundimage,0,0,width,height);
		textSize(40);
		fill(255);
		textAlign(CENTER);
		text("You won!", width/2,height/2);
		textSize(30);
		fill("red");
		text('Press Enter to start a new game.',width/2,height/2+30);
		frameRate(0.5);	
		if(save == false){
		this.compareScores();
		}
		}
	}
	/*
	* Shows the game over screen.
	*/
	endOfGame(){
		if(endOfGame){
			slider.hide();
			backgroundmusic.pause();
			backgroundSoundSpecial.stop();	
		image(backgroundimage,0,0,width,height);
		this.itemListgreen = [];
		this.itemListred = [];
		this.itemListyellow = [];
		textSize(30);
		textAlign(CENTER);
		fill(255);
		text("GAME OVER !",width/2, height/2);
		textSize(25);
		text("Your Score: "+this.playerscore,width/2, height/2+30);
		fill("red");
		text("Press ENTER to Restart ! ",width/2, height/2+70);
		frameRate(0.5);
	if(save == false){
		this.compareScores();
	}
		}
	}
	/*
	* It compares the current playerscore with the scores of the highscore.
	* If there is a new Highscore a popup-window will display where the player can enter his name.
	*/
	compareScores(){
		let str1 = join(scoreResults,',');
		let name = matchAll(str1,"[a-zA-Z]+[^Score:]");
		let Score = matchAll(str1,"[0-9]+");
		for(var i = 4;i>=0;--i){
		if(this.playerscore >= int(Score[i])){
			scoreindex = i;
		}
	}	
	if( !(scoreindex == -2)){
		mode = 2;
		loop();
	}

}
	/*
	* This method pauses the game.
	*/
	pause(){
		noLoop();
		backgroundmusic.stop();
		backgroundSoundSpecial.stop();
		soundDie.stop();
	}
	/*
	* This method continues the game.
	*/
	start(){
		loop();
		backgroundmusic.play();
	}
	/*
	* Combines the needed methods for the game.
	*/
	update(){
		this.menu();
		this.endOfGame();
		this.won();
		this.drawItems();
		this.itemsLessZero(this.itemListgreen);
		this.itemsLessZero(this.itemListred);
		this.itemsLessZero(this.itemListyellow);
		this.newItems();
		this.deleteObstacles();
		this.score();
	}
}


