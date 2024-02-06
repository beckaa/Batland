/*
* Creates and places the obstacles in the scene
*/		
class Obstacle{
	constructor(img){
		
		this.imageO = img;
		this.minHeight = height/4;
		this.maxHeight = height/2;
		this.speed = 9;
		this.minDistance = width/3;
		this.minHeightDist = staticImg.height+100;
		this.maxHeightDist = staticImg.height*4;
		this.x = width;
		this.obstacleWidth=0;
		this.obstacleHeight =0;
		this.trackingRec;
	}
/*
* Sets the speed, minDistance,minHeightDist,maxHeightDist of an obstacle. (Used for different difficult level)
*/	
set(speed, minDistance, minHeightDist, maxHeightDist){
	this.speed = speed;
	this.minDistance = minDistance;
	this.minHeightDist = minHeightDist;
	this.maxHeightDist = maxHeightDist;
}
	
/*
* draws the obstacles on the canvas.
*/
drawObstacle(bottom){
	if(bottom){	
	image(this.imageO,this.x ,height-this.obstacleHeight,this.imageO.width,this.obstacleHeight);
	this.trackingRec = new Rectangle(this.x,height-this.obstacleHeight,this.imageO.width,this.obstacleHeight);
	}else{
	image(this.imageO,this.x,0,this.imageO.width,this.obstacleHeight);
	this.trackingRec = new Rectangle(this.x,0,this.imageO.width,this.obstacleHeight);
	}
}

//moves the Obstacles
moveObstacle(){
	this.x = this.x - this.speed;
}

/**
* Creates a random Distance between the obstacles and a random height between the obstacles. 
* It minds the minimum distance and the minimum height between the obstacles.
*/
random(temp){
	
	//var randomHeight1 = round(random(this.minHeight,this.maxHeight));
	var randomHeightDistance = round(random(this.minHeightDist,this.maxHeightDist));
	var previousObstacle = new Obstacle();
	var previousTopObstacle = new Obstacle();
	var currentBttO = bottomObstacles[temp];
	var currentTO = topObstacles[temp];
	while(this.minHeightDist+this.randomHeight2 > this.maxHeightDist){
		randomHeight2 = round(random(1,height/4));
	}
	currentTO.obstacleHeight = this.maxHeight;
	currentBttO.obstacleHeight = this.maxHeight - randomHeightDistance;
	if(currentBttO.obstacleHeight <=this.minHeight){
		currentBttO.obstacleHeight =round( this.maxHeight-randomHeightDistance/2);
		currentTO.obstacleHeight = round(this.maxHeight-randomHeightDistance/2);
	}
	
	var randomDist1 = round(random(10, width/8));
	var randomDist2 = round(random(10, width/7));
	if(temp > 0){
		previousObstacle = bottomObstacles[temp-1];
		previousTopObstacle = topObstacles[temp-1];
		var minDistance = previousObstacle.x + previousObstacle.obstacleWidth +this.minDistance;
		var minDistTop = previousTopObstacle.x +previousTopObstacle.obstacleWidth+this.minDistance;
		currentBttO.x = minDistance+randomDist1;
		currentTO.x = minDistance + randomDist2;
	}else{
		currentBttO.x = this.x+randomDist1;
		currentTO.x = randomDist1+this.x;
	}
}
} 
