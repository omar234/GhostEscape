/**
 * Created by OmarCespedes on 16/09/2015.
 */
function Game(){
    Game.prototype.drawBoard = function () {
        var board = new Board();
        board.createBoard(10,10);
    }
}