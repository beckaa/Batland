/*
* Sets the immortal time for the bat if it hit an obstacle.
*/
class Immortal{
	constructor(){
		//Sets the time at which the bat is not immortal anymore.
		this.immortalTime = millis()+2000;
	}
	/**
	* Returns true if the immortal time is over.
	*/
	timeOver(){
		if(millis()>this.immortalTime){
			return true;
		}else{
			return false;
		}
	}
}