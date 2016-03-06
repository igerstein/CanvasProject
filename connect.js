var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

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

//Draws a token at the top of a column
var drawToken = function(e){
    var x = Math.floor(e.clientX / 70) * 70 + 35;

    ctx.clearRect(0, 0, 490, 70);
    
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, 35, 35, 0, Math.PI * 2);
    ctx.fill();
};

//Draws the token falling
var fall = function(e){
    var x = Math.floor(e.clientX / 70) * 70 + 35;
    var y = 35;

    var fallAnimation = function(){
	
	ctx.clearRect(x - 35, 0, 70, y + 35);

	drawGrid();

	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(x, y, 35, 0, Math.PI * 2);
	ctx.fill();

	if (y < 455){
	    y += 10;
	    window.requestAnimationFrame(fallAnimation);
	};
    };

    fallAnimation();
};
    

canvas.addEventListener("mousemove", drawToken);
canvas.addEventListener("click", fall);
