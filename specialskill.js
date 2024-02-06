/**
* The class for the special skill of the bat.
*/
class SpecialSkill{
	constructor(){
		//Sets the time at which the bat is not immortal anymore.
		this.countdown = bat.skill;
	}
	/*
	* Returns true if the immortal time is over.
	*/
	timeOver(){
		if(this.countdown<=0){
			return true;
		}else{
			return false;
		}
	}
}