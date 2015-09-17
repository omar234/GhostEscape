/**
 * Created by OmarCespedes on 16/09/2015.
 */
var Board = (function(){
    var instance;


    function init(){
        //Private stuff
        var board = [];
        var row = [];

        function changeCellType(x, y, type){
            x++; y++;
            var cellId = x + 'x' + y + 'y';
            var cell = $('#' + cellId);
            cell.removeClass();
            cell.addClass("obstacle");
        }

        return {
            //Public stuff
            createBoard : function (height, width) {
                var gameBoard = $('#gameBoard');
                gameBoard.css('height', (height + 1) * 30 + 3 * height);
                gameBoard.css('width', (width + 1) * 30 + 3 * width);
                //gameBoard.css('display','block');
                for(var i = 1 ; i < height + 1 ; i++){
                    for(var j = 1 ; j < width + 1 ; j++){
                        var divEl = '<div id="' + i + "x" + j + 'y" class="boardCell"></div>';
                        gameBoard.append(divEl);
                        row.push(0);
                    }
                    board.push(row);
                    row = [];
                }
                console.log(board)

            },

            getLogicArray : function () {
                return board;
            },

            generateRandomObstacles : function(number){
                var randomX;
                var randomY;
                var cont = 0;

                while(cont < number){
                    randomX = Math.round(Math.random() * 9);
                    randomY = Math.round(Math.random() * 9);
                    if(board[randomX][randomY] === 0){
                        console.log(randomX, randomY);
                        changeCellType(randomX, randomY, 1);
                        board[randomX][randomY] = 1;
                        cont++;
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