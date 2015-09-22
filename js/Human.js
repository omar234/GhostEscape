/**
 * Created by OmarCespedes on 16/09/2015.
 */
function Human(x, y){
    Character.call(this, x , y);
    this.type = 'human';

    Human.prototype.chaseGhost = function (ghost, board) {
        var logicBoard = board.getLogicArray();
        var ghostX = ghost.getCurrentX() - 1;
        var ghostY = ghost.getCurrentY() - 1;
        var currentX = this.getCurrentX() - 1;
        var currentY = this.getCurrentY() - 1;
        var targetX = -1;
        var targetY = -1;

        function isValidMovement(x, y){
            if( x <= 0 || y <= 0 || x > board.getMAX_X() || y > board.getMAX_Y()
                || logicBoard[x][y] == 1 || logicBoard[x][y] == 3 || logicBoard[x][y] == 5 || logicBoard[x][y] == 4){
                return false
            }
            return true
        }


        //columns
        if(ghostX < currentX && isValidMovement(currentX - 1, currentY)){
            targetX = currentX - 1
        } else if (ghostX > currentX && isValidMovement(currentX + 1, currentY)){
            targetX = currentX + 1
        }

        //rows
        if(ghostY < currentY && isValidMovement(currentX, currentY - 1)){
            targetY = currentY - 1
        } else if (ghostY > currentY && isValidMovement(currentX, currentY + 1)){
            targetY = currentY + 1
        }

        if(targetX == -1 && targetY != -1)
            targetX = currentX;
        if(targetY == -1 && targetX != -1)
            targetY = currentY;
        //console.log('chase',targetX, targetY);
        return {targetX : targetX, targetY: targetY}
    }
}

Human.prototype = new Character();
Human.prototype.constructor = Human;




