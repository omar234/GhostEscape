/**
 * Created by OmarCespedes on 16/09/2015.
 */
var Board = (function(){
    var instance;

    function init(){
        //Private stuff
        var board = [];
        var row = [];
        var MAX_Y = 0;
        var MAX_X = 0;

        function setMAX_X(value){
            MAX_X = value
        }

        function setMAX_Y(value){
            MAX_Y = value
        }

        function checkFreeCells(){
            for(var i = 0 ; i < MAX_X ; i++){
                for(var j = 0 ; j < MAX_Y ; j++){
                    if(board[i][j] == 0){
                        return true
                    }
                }
            }
            return false
        }

        return {
            //Public stuff
            getMAX_X : function () {
                return MAX_X
            },

            getMAX_Y : function () {
                return MAX_Y
            },
            createBoard : function (height, width) {
                var gameBoard = $('#gameBoard');
                setMAX_X(height);
                setMAX_Y(width);
                gameBoard.css('height', (height + 1) * 30 + 3 * height);
                gameBoard.css('width', (width + 1) * 30 + 3 * width);
                //gameBoard.css('display','block');
                for(var i = 1 ; i < height + 1 ; i++){
                    for(var j = 1 ; j < width + 1 ; j++){
                        var divEl = '<div id="' + i + "x" + j + 'y" class="floor"></div>';
                        gameBoard.append(divEl);
                        row.push(0);
                    }
                    board.push(row);
                    row = [];
                }
            },

            getLogicArray : function () {
                return board;
            },

            changeCellType: function (x, y, type){
                var cellId = x + 'x' + y + 'y';
                var cell = $('#' + cellId);
                cell.removeClass();
                cell.addClass(type);
            },

            generateRandomObstacles : function(number){
                var randomX;
                var randomY;
                var cont = 0;

                while(cont < number){
                    randomX = Math.round(Math.random() * 9);
                    randomY = Math.round(Math.random() * 9);
                    if(board[randomX][randomY] === 0){
                        this.changeCellType(randomX + 1, randomY + 1, 'obstacle');
                        board[randomX][randomY] = 1;
                        cont++;
                    }
                }

            },

            generateRandomCoin : function(){
                var randomX;
                var randomY;

                while(true){
                    randomX = Math.round(Math.random() * 9);
                    randomY = Math.round(Math.random() * 9);
                    if(board[randomX][randomY] === 0){

                        this.changeCellType(randomX + 1, randomY + 1, 'coin');
                        board[randomX][randomY] = 4;
                        break;
                    } else {
                        if(!checkFreeCells())
                            break
                    }
                }
            },

            generateRandomChest : function(){
                var randomX;
                var randomY;

                while(true){
                    randomX = Math.round(Math.random() * 9);
                    randomY = Math.round(Math.random() * 9);
                    if(board[randomX][randomY] === 0){
                        this.changeCellType(randomX + 1, randomY + 1, 'chest');
                        board[randomX][randomY] = 5;
                        break;
                    }
                }
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

    };


})();