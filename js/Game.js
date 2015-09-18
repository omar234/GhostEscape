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
        var coinSpawn;

        //change the board logical matrix, and call @drawCharacter
        function moveCharacter(character, targetX, targetY){
            if(character instanceof Ghost){
                var currentX = character.getCurrentX() - 1;
                var currentY = character.getCurrentY() - 1;

                if (logicBoard[targetX - 1][targetY - 1] == 0){
                    logicBoard[currentX][currentY] = 0;
                    logicBoard[targetX - 1][targetY - 1] = 3;
                    drawCharacter(character, targetX, targetY)
                } else if(logicBoard[targetX - 1][targetY - 1] == 4){
                    logicBoard[currentX][currentY] = 0;
                    logicBoard[targetX - 1][targetY - 1] = 3;
                    drawCharacter(character, targetX, targetY);
                    updateCounter();
                }


            } else if(character instanceof Human){

            }
        }

        function updateCounter(){
            var counter = $('.coinCounter');
            counter.text(parseInt(counter.text()) + 1);
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
            var keyInterval;
            var MOVE_SPEED = 250;
            $(window).on('keydown', function (event) {
                clearInterval(keyInterval);
                if(event.keyCode == 38){ //up arrow
                    keyInterval = setInterval(
                        function(){
                            if(isValidMovement(ghost.getCurrentX() - 1, ghost.getCurrentY()))
                                moveCharacter(ghost, ghost.getCurrentX() - 1, ghost.getCurrentY())
                        },MOVE_SPEED);
                } else if(event.keyCode == 40){ //down arrow
                    keyInterval = setInterval(
                        function(){
                            if(isValidMovement(ghost.getCurrentX() + 1, ghost.getCurrentY()))
                                moveCharacter(ghost, ghost.getCurrentX() + 1, ghost.getCurrentY())
                        },MOVE_SPEED);
                } else if(event.keyCode == 37){ // left arrow
                    keyInterval = setInterval(
                        function(){
                            if(isValidMovement(ghost.getCurrentX(), ghost.getCurrentY() -1))
                                moveCharacter(ghost, ghost.getCurrentX(), ghost.getCurrentY() -1)
                        },MOVE_SPEED);
                } else if(event.keyCode == 39){ // right arrow
                    keyInterval = setInterval(
                        function(){
                            if(isValidMovement(ghost.getCurrentX(), ghost.getCurrentY() + 1))
                                moveCharacter(ghost, ghost.getCurrentX(), ghost.getCurrentY() + 1)
                    },MOVE_SPEED);
                }
            });
        }

        function removeKeyEvents(){
            $(window).off('keydown')
        }

        function startSpawnCoins(){
            coinSpawn = setInterval(function(){board.generateRandomCoin()}, 1200);
        }

        function stopSpawnCoins(){
            clearInterval(coinSpawn)
        }

        return {
            //Public stuff
            drawBoard : function(){
                board.createBoard(10,10);
            },

            newPlayer: function (name) {
                createCharacter('ghost');
                createCharacter('human');

            },

            startGame : function(){
                initializeKeyEvents();
                startSpawnCoins();
                board.generateRandomChest();
            },

            finishGame : function () {
                removeKeyEvents();
                stopSpawnCoins();
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