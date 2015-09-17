/**
 * Created by OmarCespedes on 16/09/2015.
 */
function Game(){
    var board = Board.getInstance();
    var ghost;
    var humans = [];

    Game.prototype.drawBoard = function () {
        board.createBoard(10,10);
    };

    Game.prototype.newPlayer = function (name) {
        createCharacter('ghost');
        createCharacter('human');
        //console.log(ghost.getCurrentX());
        //console.log(humans[0].getCurrentX())
    };

    function createCharacter(type) {
        if(type == 'ghost'){
            ghost = new Ghost(4,4);
        } else if(type == 'human'){
            humans.push(new Human(5,5))
        }
    }

    function drawCharacter(character, x, y){
        //TODO dibujar al character
    }

    function moveCharacter(character, targetX, targetY){
        if(character instanceof Ghost){
            var currentX = character.getCurrentX();
            var currentY = character.getCurrentY();
            if (board[targetX][targetY] == 0){
                board[currentX][currentY] = 0;
                board[targetX][targetY] = 3;
                drawCharacter(character, targetX, targetY)
            }
        } else if(character instanceof Human){

        }


    }
}