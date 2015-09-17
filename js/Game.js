/**
 * Created by OmarCespedes on 16/09/2015.
 */
var Game = (function(){

    var instance;

    function init(){
        //Private stuff
        var board = Board.getInstance();
        var logicBoard = board.getLogicArray();
        var ghost;
        var humans = [];

        //change the board logical matrix, and call @drawCharacter
        function moveCharacter(character, targetX, targetY){
            if(character instanceof Ghost){
                var currentX = character.getCurrentX() - 1;
                var currentY = character.getCurrentY() - 1;
                console.log(targetX, targetY, character);
                if (logicBoard[targetX - 1][targetY - 1] == 0){
                    logicBoard[currentX][currentY] = 0;
                    logicBoard[targetX - 1][targetY - 1] = 3;
                    drawCharacter(character, targetX, targetY)
                }
            } else if(character instanceof Human){

            }
        }

        // moves graphically the character and sets its current x and y
        function drawCharacter(character, targetX, targetY){
            var currentX = character.getCurrentX();
            var currentY = character.getCurrentY();

            board.changeCellType(currentX, currentY, 'floor');
            board.changeCellType(targetX, targetY, character.type );


            character.setCurrentX(targetX);
            character.setCurrentY(targetY);

        }

        function createCharacter(type) {
            if(type == 'ghost'){
                ghost = new Ghost(4,4);
                drawCharacter(ghost, 4, 4);
                logicBoard[4 - 1][4 - 1] = 2
            } else if(type == 'human'){
                humans.push(new Human(5,5));
                drawCharacter(humans[0], 5, 5);
                logicBoard[5 - 1][5 - 1] = 3;
            }
        }

        function isValidMovement(x, y){
            if(x <= 0 || y <= 0 || x > board.getMAX_X() || y > board.getMAX_Y()){
                return false
            }
            return true
        }

        function initializeKeyEvents(){
            $(window).on('keydown', function (event) {

                if(event.keyCode == 38){ //up arrow
                    if(isValidMovement(ghost.getCurrentX() - 1, ghost.getCurrentY()))
                        moveCharacter(ghost, ghost.getCurrentX() - 1, ghost.getCurrentY())
                } else if(event.keyCode == 40){ //down arrow
                    if(isValidMovement(ghost.getCurrentX() + 1, ghost.getCurrentY()))
                        moveCharacter(ghost, ghost.getCurrentX() + 1, ghost.getCurrentY())
                } else if(event.keyCode == 37){ // left arrow
                    if(isValidMovement(ghost.getCurrentX(), ghost.getCurrentY() -1))
                        moveCharacter(ghost, ghost.getCurrentX(), ghost.getCurrentY() -1)
                } else if(event.keyCode == 39){ // right arrow
                    if(isValidMovement(ghost.getCurrentX(), ghost.getCurrentY() + 1))
                        moveCharacter(ghost, ghost.getCurrentX(), ghost.getCurrentY() + 1)
                }
            });
        }

        function removeKeyEvents(){
            $(window).off('keydown')
        }

        return {
            //Public stuff
            drawBoard : function(){
                board.createBoard(10,10);
            },

            newPlayer: function (name) {
                createCharacter('ghost');
                createCharacter('human');
                //console.log(ghost.getCurrentX());
                //console.log(humans[0].getCurrentX())
            },

            startGame : function(){
                initializeKeyEvents();
            }

        }
    }

    return {
        getInstance : function(){
            if(!instance){
                instance = init();
            }
            return instance

        }
    }
})();