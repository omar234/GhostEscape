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
        var coinSpawnInterval;
        var humansInterval = [];

        //change the board logical matrix, and call @drawCharacter
        function moveCharacter(character, targetX, targetY){
            var currentX;
            var currentY;
            if(character instanceof Ghost){
                currentX = character.getCurrentX() - 1;
                currentY = character.getCurrentY() - 1;

                if (logicBoard[targetX - 1][targetY - 1] == 0){
                    logicBoard[currentX][currentY] = 0;
                    logicBoard[targetX - 1][targetY - 1] = 2;
                    drawCharacter(character, targetX, targetY)
                } else if(logicBoard[targetX - 1][targetY - 1] == 4){
                    logicBoard[currentX][currentY] = 0;
                    logicBoard[targetX - 1][targetY - 1] = 2;
                    drawCharacter(character, targetX, targetY);
                    updateCounter();
                } else if(logicBoard[targetX - 1][targetY - 1] == 5) {
                    turnInCoins();
                }
            } else if(character instanceof Human){
                var nextMove = character.chaseGhost(ghost,board);
                if(nextMove.targetX != -1 && nextMove.targetY != -1){
                    currentX = character.getCurrentX() - 1;
                    currentY = character.getCurrentY() - 1;

                    if(nextMove.targetX == ghost.getCurrentX() - 1 && nextMove.targetY == ghost.getCurrentY() - 1){
                        finishGame();
                        alert('Game Over');
                        return
                    }

                    logicBoard[currentX][currentY] = 0;
                    logicBoard[nextMove.targetX][nextMove.targetY] = 3;

                    drawCharacter(character, nextMove.targetX + 1, nextMove.targetY + 1);
                }
            }
        }

        function finishGame() {
            removeKeyEvents();
            stopSpawnCoins();
            stopAIHuman();
        }

        function updateCounter(){
            var counter = $('.coinCounter');
            counter.text(parseInt(counter.text()) + 1);
        }

        function turnInCoins(){
            var coins = $('.coinCounter');
            var coinNumber = parseInt(coins.text());
            var globalCounter = $('#globalCounter');
            var totalCoints = parseInt(globalCounter.text()) + coinNumber;
            if(totalCoints >= 50){
                finishGame();
                alert('You win!');
                return
            }
            globalCounter.text(totalCoints);
            coins.text('0')

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
            var coordinates;
            if(type == 'ghost'){
                coordinates = board.generateRandomFreePoint();
                ghost = new Ghost(coordinates.x + 1, coordinates.y + 1);
                drawCharacter(ghost, coordinates.x + 1, coordinates.y + 1);
                logicBoard[coordinates.x][coordinates.y] = 2
            } else if(type == 'human'){
                coordinates = board.generateRandomFreePoint();
                var humanLenght;
                humans.push(new Human(coordinates.x + 1 ,coordinates.y + 1));
                humanLenght = humans.length;
                drawCharacter(humans[humanLenght - 1], coordinates.x + 1, coordinates.y + 1);
                logicBoard[coordinates.x][coordinates.y] = 3;
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
            coinSpawnInterval = setInterval(function(){board.generateRandomCoin()}, 1200);
        }

        function stopSpawnCoins(){
            clearInterval(coinSpawnInterval)
        }

        function startAIHuman(){
            var humanInterval;

            humans.forEach(function (human) {
                humanInterval = setInterval(function(){
                    moveCharacter(human);
                }, 1500);
                humansInterval.push(humanInterval);
            });

        }

        function stopAIHuman(){
            var i;
            for(i = 0 ; i < humansInterval.length ; i++){
                clearInterval(humansInterval[i]);
            }
        }

        return {
            //Public stuff
            drawBoard : function(){
                board.createBoard(10,10);
                board.generateRandomObstacles(10)
            },

            newPlayer: function (name) {
                createCharacter('ghost');
                createCharacter('human');
                createCharacter('human');

            },

            startGame : function(){
                initializeKeyEvents();
                startSpawnCoins();
                board.generateRandomChest();
                startAIHuman();
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