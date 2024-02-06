/*
* The class for the Bat which the player controls. 
* The bat is able to move and flap.
*/
class Bat{
	/**
	* The constructor for each bat object. It includes the needed values like the 3 lifes of the bat.
	*/
	constructor(){
	this.x = 10;
	this.y = height/2 - staticImg.height/2;
	this.velocity = 11;
	this.gravity = 7;
	this.life = 100;
	this.skill = 0;
	this.decreaseLife = this.life * (25/100);
	this.amountOfLife = 3;
	this.immortal= new Immortal();
	this.onceRun = false;
	this.fillSkill = 100 *(20/100);
	this.increaseLife = 100 *(10/100);
	this.skillActivation = false;
	this.special;
	this.trackingrec = new Rectangle(this.x, this.y,staticImg.width,staticImg.height);

	}
	/*
	* Starts the special Skill and decreases the skillbar.
	*/
	specialSkill(){
		if(this.skillActivation == true){
			this.special = new SpecialSkill();
			this.skill = this.skill-0.5;
			once = false;
			this.playSpecialSkillmusic();
			
			if(this.special.timeOver()){
				this.skillActivation = false;
				once = true;
				this.playSpecialSkillmusic();
				
			}
			}
	}
	/*
	* This Method plays the background music if the special skill is activated by the player.
	*/
	playSpecialSkillmusic(){
		if(!(specialSkillstart.isPlaying()) && once == false){
				backgroundmusic.pause();
				backgroundSoundSpecial.playMode("untilDone");
			backgroundSoundSpecial.play();
			
			}
			
			if(backgroundSoundSpecial.isPlaying() && once == true){
					backgroundSoundSpecial.pause();
					backgroundmusic.play()
			}
			
			}
	
	/*
	* The "itemCollision"-Method checks if the bat has hit an item.
	* Depending on which item has been hit different actions will take place.
	*/
	itemCollision(){
		var green = game.itemListgreen;
		var red = game.itemListred;
		var yellow = game.itemListyellow;
		for(var i = 0; i < green.length;i++){
			if(this.x+staticImg.width >= green[i].x && this.x <= green[i].x+green[i].width && this.y +staticImg.height>= green[i].y && this.y <= green[i].y +green[i].height){
				collectSound.play();
				green[i].x = -80;
				if(this.skill >= 100){
					this.skill = 100;
				}else{
					if(this.skillActivation == false){
						//increase skill bar
					this.skill = this.skill + this.fillSkill;
					}
				}
			}
		}
		for(var i = 0 ; i< red.length;i++){
		if(this.x+staticImg.width >= red[i].x && this.x <= red[i].x+red[i].width && this.y +staticImg.height>= red[i].y && this.y <= red[i].y +red[i].height){
				collectSound.play();
				red[i].x = -80;
				if(this.life >= 100){
					this.life = 100;
				}else{
					//increase life bar
					this.life = this.life + this.increaseLife;
				}	
			}
		}
		for(var i = 0; i<yellow.length;i++){
			
			if(this.x+staticImg.width >= yellow[i].x && this.x <= yellow[i].x+yellow[i].width && this.y +staticImg.height>= yellow[i].y && this.y <= yellow[i].y +yellow[i].height){
				collectSound.play();
				yellow[i].x = -80;
				//increase the score of the player
				game.playerscore = game.playerscore + 1000;
			}
		}
	}
		
	
	/**
	* This will reset the values of the Bat back to the Standard values.
	*/
	resetBat(){
		this.x = 10;
		this.y = height/2 - staticImg.height/2;
		this.amountOfLife = 3;
		this.life = 100;
		this.skill = 0;
		this.skillActivation = false;
	}
	/**
	* Animates the wings of the bat.
	*/
	flap(){
		var blink = [];
		for(var i = 0; i<batimages.length*2;i=i+2){
		blink[i] = batimages[i];
		blink[i+1] = batimagesred[i+1];
		}
		this.bars();
		this.lifes();
		if(this.immortal.timeOver() &&this.skillActivation == false){
		image(batimages[frameCount % batimages.length],bat.x-32,bat.y-41);
		}else{
			image(blink[frameCount%batimagesred.length],bat.x-32,bat.y-41);
		}
		for(var i = 0; i< 3 ;i++){
		this.y = this.y-1/fps-this.gravity;
		}
	}
	/*
	* The bat will be able fly to the right and to the left of the screen.
	* If the bat doesn't flap it will sink slowly.
	* It also assures that the bat will not fly outside the canvas (Screen collision).
	*/
	move(){
		
		if(this.y >= 0 && this.y < height - staticImg.height){
		this.y = this.y+1/fps+this.gravity;
		}else if(this.y <= 0){
			this.y = 0;
		}else if(this.y + staticImg.height >= height){
			this.y = height - staticImg.height;
		}
		if(this.x+ staticImg.width >width){
			this.x = width - staticImg.width;
		}
		if(this.x <= 0){
			this.x = 0;
		}
		
		if(keyIsDown(RIGHT_ARROW)){
		this.x = this.x+1/fps+this.velocity;
		}
		if(keyIsDown(LEFT_ARROW)){
		this.x = this.x-1/fps-this.velocity;
		}
		
	}
	/*
	* Detects if the bat did die by touching the ground. 
	* Furthermore if the life bar of the bat is 0, then this method will take one heart away. 
	*/
	detectDeath(){
		if(this.y+staticImg.height == height&&this.skillActivation ==false|| this.life <= 0&&this.skillActivation==false){
			death = true;
			this.amountOfLife = this.amountOfLife-1;
			soundDie.playMode("restart");
			soundDie.play();
			if(this.amountOfLife == 0){
				endOfGame = true;
				soundDie.stop();
				noLoop();
			}else{
				this.life = 100;
				this.x = this.x;
				this.y = height/2 - staticImg.height/2;
			}
			
		}
		else{
			death = false;
		}
	}
	/*
	* Decreases the life bar if the bat hits an obstacle. 
	* Also sets the life bar to zero if the bat is on the left side of the screen and hits an obstacle.
	*/
	decreaseLifeBar(){
		// variable 'onceRun' ensures that if the bat hits one obstacle only one time the life will be decreased.
		if(this.onceRun == false && this.skillActivation == false){
			if(this.x==0){
			this.life = 0;	
			this.onceRun = true;
			hitRock.play();
			this.immortal = new Immortal();
			}else{
			this.life = this.life - this.decreaseLife;
			this.onceRun = true;
			hitRock.play();
			this.immortal = new Immortal();
	
			}
		}
		
		this.immortalBat();
		
	}
	/*
	* Proves if the bat is still immortal.
	*/
	immortalBat(){
		if(this.immortal != null){
		if(this.immortal.timeOver()){
			this.onceRun = false;
		}
		}
	}
	/*
	* Draws the bat and the flaps of the bat on the canvas.
	* The bat will blink red and grey if it's immortal.
	*/
	draw(){
		var blink = [];
		blink[0] = staticImg;
		blink[1] = redImg;
		if(flap){
		this.flap();
		}else{
		if(this.immortal.timeOver() && this.skillActivation == false){
			image(staticImg,this.x,this.y,staticImg.width, staticImg.height);
		}else{
		image(blink[frameCount%blink.length],this.x,this.y,staticImg.width,staticImg.height);
		}
		}
	
	}
	/*
	* Draws the Lifebar and the special skillbar.
	*/
	bars(){
		image(hpBar,8,18,115,50);
		fill("red");
		rect(12,25,this.life,15);
		fill("green");
		rect(12,47,this.skill,15);
		noFill();
		
		
	}
	/*
	* Draws the 3 lifes (hearts) in the Beginning of the game.
	*/ 
	lifes(){
		if(this.amountOfLife == 3){
			image(lifeimages[0],width - 120,10,100,30);
		}else if(this.amountOfLife == 2){
			image(lifeimages[2],width -120,10,100,30);
		}else if(this.amountOfLife == 1){
			image(lifeimages[1],width - 120,10,100,30);
		}else{
			image(lifeimages[3],width - 120,10,100,30);
		}
	}
	/*
	*Checks if the Bat collides with one of the obstacles.
	*/
	collision(){
		
		if(bottomObstacles.length == 0 && topObstacles.length == 0){
			if(backgroundSoundSpecial.isPlaying){
				backgroundSoundSpecial.stop();
				
			}
			noLoop();
			won = true;
			game.won();
		}else{
		for(var i = 0; i<bottomObstacles.length;i++){	
		if(this.x+staticImg.width >= bottomObstacles[i].x &&this.x + staticImg.width < bottomObstacles[i].x+bottomObstacles[i].imageO.width&& this.y + staticImg.height >= height-bottomObstacles[i].obstacleHeight
		|| this.x <= bottomObstacles[i].x+bottomObstacles[i].imageO.width && this.x > bottomObstacles[i].x && this.y + staticImg.height >= height-bottomObstacles[i].obstacleHeight){
			this.decreaseLifeBar();
		}
		}
		for(var i = 0; i<topObstacles.length;i++){	
		if(this.x + staticImg.width >= topObstacles[i].x &&this.x + staticImg.width < topObstacles[i].x+topObstacles[i].imageO.width && this.y <= topObstacles[i].obstacleHeight
		|| this.x <= topObstacles[i].x + topObstacles[i].imageO.width && this.x > topObstacles[i].x && this.y <= topObstacles[i].obstacleHeight){
			this.decreaseLifeBar();
		}
		}
		}
		
		
	}
	/*
	* Combines all bat Functions for the game.
	*/
	update(){
		this.move();
		this.draw();
		this.detectDeath();
		this.collision();
		this.itemCollision();
		this.specialSkill();
	}
}