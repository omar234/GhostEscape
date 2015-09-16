/**
 * Created by OmarCespedes on 16/09/2015.
 */
function Board(){
    Board.prototype.createBoard = function (height, width) {
        var board = $('#gameBoard');
        board.css('height', (height + 1) * 30 + 3 * height);
        board.css('width', (width + 1) * 30 + 3 * width);
        board.css('display','block');
        for(var i = 1 ; i < height + 1 ; i++){
            for(var j = 1 ; j < width + 1 ; j++){
                var divEl = '<div id="' + i + "x" + j + 'y" class="boardCell"></div>';
                board.append(divEl);
            }
        }
    };
}