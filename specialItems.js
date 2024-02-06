/*
* This is the class of the special items which the bat can collect during the game.
*/
class SpecialItems{
	constructor(colorI){
		this.x = 0;
		this.y = 0;
		this.width = itemgreen[0].width*3/2;
		this.height = itemgreen[0].height*(3/2);
		this.color = colorI;
		this.speed = 9;
		this.minDistance = width/4;
		this.trackingRec = this.randomPosition();
	}
/*
* The items will move with the speed of the obstacles.
*/
moveItem(){
this.x = this.x - this.speed;
}	
	/*
	* Draws the items on the canvas.
	*/	
draw(){
	if(this.color == "yellow"){
		image(itemyellow[frameCount%itemyellow.length],this.x, this.y,this.width,this.height);
	}else if(this.color == "red"){
		image(itemred[frameCount%itemred.length],this.x, this.y, this.width,this.height);
	}else if(this.color == "green"){
		image(itemgreen[frameCount%itemgreen.length],this.x,this.y,this.width,this.height);
	}
}	
/*
*Sets a random Position on the Canvas.
*/
randomPosition(){
	this.x = round(randomGaussian(width*4,width*2));
	while(this.x < width){
		this.randomPosition();
	}
	this.y = round(random(height/4,height*2/3));
	this.trackingRec = new Rectangle(this.x,this.y,this.width,this.height);
}
/*
* Changes the speed of the items.
* (used for different difficult level)
*/ 
setSpeed(speed){
	this.speed = speed;
}

}