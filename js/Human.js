/**
 * Created by OmarCespedes on 16/09/2015.
 */
function Human(x, y){
    Character.call(this, x , y);
    this.type = 'human'
}

Human.prototype = new Character();
Human.prototype.constructor = Human;