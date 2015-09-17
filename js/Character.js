/**
 * Created by OmarCespedes on 16/09/2015.
 */
function Character(x , y){
    this.currentX = x;
    this.currentY = y;

    Character.prototype.getCurrentX = function(){
        return this.currentX
    };

    Character.prototype.getCurrentY = function(){
        return this.currentY
    };
}

