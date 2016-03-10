var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var reset = document.getElementById("reset");
var winnerText = document.getElementById("winner");
// make button to allow reset
// button should call setup after winning
// when person has won. cavnas is cleared and text of winner shown
var turn;
var isFalling;
var gameFinished;
var gameInProgress;
//Stores the position of the tokens (0 = empty, 1 = red, 2 = yellow)
var tokens;
/*var tokens = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];*/

//Draws a line from a start point to an end point
var drawLine = function(startX, startY, endX, endY){    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
};

var drawGrid = function(){
    
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    
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
//Draws the grid
var setup = function(){
    ctx.clearRect(0,0,490,490);
    tokens = [
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0]
    ];
    console.log("im being used");
    turn = 0;
    isFalling = false;
    gameFinished = false;
    gameInProgress = false;
    drawGrid();
}
setup();
 
/*var drawGrid = function(){
    
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    
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
};*/ 

//drawGrid();

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
    var x = Math.floor(e.offsetX / 70) * 70 + 35;

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
    if (!isFalling && !gameFinished){
	var x = Math.floor(e.offsetX / 70) * 70 + 35;
	
	if (tokens[0][Math.floor(x / 70)] == 0){
	    
	    isFalling = true;
	    
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
		    var winner = checkWinner();
		    if (winner != ""){
			gameFinished = true;
			highlightWinner(winner);
			console.log(winner);
			if (winner.split(",")[0]=="1"){
			    winnerText.innerHTML = "RED IS THE WINNER";
			}
			else{
			    winnerText.innerHTML = "YELLOW IS THE WINNER";
			}
		    }
		    
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
    }
};

//Draws a line through the winning 4 tokens
var highlightWinner = function(winner){
    var winnerArray = winner.split(",");
    var color = winnerArray[0];
    var row = winnerArray[1];
    var col = winnerArray[2];
    var direction = winnerArray[3];

    var startX = col * 70 + 35;
    var startY = row * 70 + 105;

    var endX;
    var endY;
    if (direction == "right"){
	endX = startX + 210;
	endY = startY;
    }else if (direction == "down"){
	endX = startX;
	endY = startY + 210;
    }else if (direction == "down-right"){
	endX = startX + 210;
	endY = startY + 210;
    }else{
	endX = startX - 210;
	endY = startY + 210;
    }
    
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;

    drawLine(startX, startY, endX, endY);
};

//Checks to see if a winner exists
var checkWinner = function(){
    for (var i = 0; i < tokens.length; i++){
	for (var j = 0; j < tokens[i].length; j++){
	    if (tokens[i][j] != 0){
		if (j < tokens[i].length - 3){
		    if (tokens[i][j] == tokens[i][j + 1] && tokens[i][j] == tokens[i][j + 2] && tokens[i][j] == tokens[i][j + 3]){
			return tokens[i][j].toString() + "," + i.toString() + "," + j.toString() + ",right";
		    }
		}
		if (i < tokens.length - 3){
		    if (tokens[i][j] == tokens[i + 1][j] && tokens[i][j] == tokens[i + 2][j] && tokens[i][j] == tokens[i + 3][j]){
			return tokens[i][j].toString() + "," + i.toString() + "," + j.toString() + ",down";
		    }
		}
		if (j < tokens[i].length - 3 && i < tokens.length - 3){
		    if (tokens[i][j] == tokens[i + 1][j + 1] && tokens[i][j] == tokens[i + 2][j + 2] && tokens[i][j] == tokens[i + 3][j + 3]){
			return tokens[i][j].toString() + "," + i.toString() + "," + j.toString() + ",down-right";
		    }
		}
		if (j >= 3 && i < tokens.length - 3){
		    if (tokens[i][j] == tokens[i + 1][j - 1] && tokens[i][j] == tokens[i + 2][j - 2] && tokens[i][j] == tokens[i + 3][j - 3]){
			return tokens[i][j].toString() + "," + i.toString() + "," + j.toString() + ",down-left";
		    }
		}
	    }
	}
    }
    return "";
};

canvas.addEventListener("mousemove", drawToken);
canvas.addEventListener("click", fall);
reset.addEventListener("click",setup);
