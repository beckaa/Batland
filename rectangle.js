/*
*Source : Coding Challenge: Frogger-Part1,14.07.2019.
*Daniel Shiffman. The Coding Train.
*Link: https://www.youtube.com/watch?v=giXV6xErw0Y
*/

/*
* This class is used to check for collisions.
*/
class Rectangle{
	constructor(x,y,width,height){
		this.topRec = y;
		this.bottomRec = y+height;
		this.left = x;
		this.right = x +width;
	}
	/*
	* Checks if a rectangle overlaps another one.
	*/
	overlaps(otherRectangle){
		return!(this.left>=otherRectangle.right 
		|| this.right <= otherRectangle.left 
		|| this.topRec >= otherRectangle.bottomRec
		|| this.bottom<=otherRectangle.topRec);
	}
	/*
	* Checks if one rectangle overlaps a rectangle of a list.
	*/
	overlaps(list){
		for(var i = 0; i< list.length;i++){
			if(!(this.left>=list[i].trackingRec.right 
		|| this.right <= list[i].trackingRec.left 
		|| this.topRec >= list[i].trackingRec.bottomRec
		|| this.bottom<=list[i].trackingRec.topRec)){
		return true;
		
		}
		}
		return false;
		
	}
	
}
