/**
 * Created by OmarCespedes on 16/09/2015.
 */
function Ghost(x , y){
    Character.call(this, x , y);
    initializeKeyEvents();
    removeKeyEvents();

    function initializeKeyEvents(){
        $(window).on('keydown', function (event) {
            if(event.keyCode == 38){ //up arrow

            } else if(event.keyCode == 40){ //down arrow

            } else if(event.keyCode == 37){ // left arrow

            } else if(event.keyCode == 39){ // right arrow

            }
        });
    }

    function removeKeyEvents(){
        $(window).off('keydown')
    }
}

Ghost.prototype = new Character();
Ghost.prototype.constructor = Ghost;