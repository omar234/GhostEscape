/**
 * Created by OmarCespedes on 16/09/2015.
 */
function Ghost(x , y){
    Character.call(this, x , y);
    this.type = 'ghost';
}

Ghost.prototype = new Character();
Ghost.prototype.constructor = Ghost;