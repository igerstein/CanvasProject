var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var turn = 0;
var isFalling = false;

//Stores the position of the tokens(0 = empty, 1 = red, 2 = yellow)
var tokens = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

//Draws a line from a start point to an end point
var drawLine = function(startX, startY, endX, endY){
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
};

//Draws the grid
var drawGrid = function(){
    drawLine(70, 70, 70, 490);
    drawLine(140, 70, 140, 490);
    drawLine(210, 70, 210, 490);
    drawLine(280, 70, 280, 490);
    drawLine(350, 70, 350, 490);
    drawLine(420, 70, 420, 490);
    drawLine(0, 70, 490, 70);
    drawLine(0, 140, 490, 140);
    drawLine(0, 210, 490, 210);
    drawLine(0, 280, 490, 280);
    drawLine(0, 350, 490, 350);
    drawLine(0, 420, 490, 420);
};

drawGrid();

//Adds the token to the token array in the given column and returns the row
var addToArray = function(col){
    for (var i = 0; i < tokens.length; i++){
	if (i == tokens.length - 1 || tokens[i + 1][col] != 0){
	    if (turn == 0){
		tokens[i][col] = 1;
	    }
	    else{
		tokens[i][col] = 2;
	    }
	    return i;
	}
    }
};

//Draws a token at the top of a column
var drawToken = function(e){
    var x = Math.floor(e.clientX / 70) * 70 + 35;

    ctx.clearRect(0, 0, 490, 70);
    if (turn == 0){
	if (isFalling){
	    ctx.fillStyle = "yellow";
	}else{
	    ctx.fillStyle = "red";
	}
    }else{
	if (isFalling){
	    ctx.fillStyle = "red";
	}else{
	    ctx.fillStyle = "yellow";
	}
    }
    ctx.beginPath();
    ctx.arc(x, 35, 35, 0, Math.PI * 2);
    ctx.fill();
};

//Draws the token falling
var fall = function(e){
    if (!isFalling){
	isFalling = true;
	
	var x = Math.floor(e.clientX / 70) * 70 + 35;
	var y = 35;
	
	var finalY = addToArray(Math.floor(x / 70)) * 70 + 105;
	
	var fallAnimation = function(currentTurn){
	    
	    ctx.clearRect(x - 35, 0, 70, y + 35);

	    if (turn == 0){
		ctx.fillStyle = "red";  
	    }
	    else{
		ctx.fillStyle = "yellow";  
	    }

	    drawGrid();
	    ctx.beginPath();
	    ctx.arc(x, y, 35, 0, Math.PI * 2);
	    ctx.fill();

	    if (y < finalY){
		y += 10;
		window.requestAnimationFrame(fallAnimation);
	    }
	    else{
		//check if win
		isFalling = false;
		if (turn == 0){
		    turn = 1;
		}
		else{
		    turn = 0;
		}
	    }
	};

	fallAnimation(turn);
    }
};
// check thru array differnt ways to get horizontal, vertical diagonal
// check left right for horizontal ways to win
// check up donw for veritcla ways to win
// check diagonal bottom right for diagonal ways to win
var checkWinner = function(){
    if (turn == 0){
	var counter=0
	for (var i = 0; i < tokens.length; i++){
	    for (var col = 0; i < tokens[0].length; col++){
		if (tokens[i][col] == 1){
		    counter++;
		}
		else{
		    counter=0;
		}
		if (counter == 4){
		    return 1;
		}
	    }
	}
    }
    return 0;
}
    

canvas.addEventListener("mousemove", drawToken);
canvas.addEventListener("click", fall);
