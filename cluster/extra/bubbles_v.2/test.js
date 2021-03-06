var viewer = document.getElementById("viewer");
var ctx = viewer.getContext("2d");
var balls = [];
var colors = ['#FF0000','#00FF00','#0000FF'];

function createBall()
{
	var ball = [];
	ball[0] = Math.floor((Math.random() * 600) + 100);   // x
	ball[1] = Math.floor((Math.random() * 200) + 100);   // y
	ball[2] = Math.floor((Math.random() * 25) + 5);      // radius
	ball[3] = Math.floor(Math.random() * colors.length); // color
	balls.push(ball);
}

function drawBalls()
{
	ctx.clearRect(0, 0, viewer.width, viewer.height);
	for(j = 0; j < balls.length; j++)
	{
		var ball = balls[j];
		ctx.beginPath();
		ctx.arc(ball[0], ball[1], ball[2], 0, 2 * Math.PI);
		ctx.fillStyle = colors[ball[3]];
		ctx.fill();
	}
}

function mouseDown(event)
{
	var rect = viewer.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
	var j = 0;
	var found = false;
	for(; j < balls.length; j++)
	{
		var ball = balls[j];
		var dx = ball[0]-x;
		var dy = ball[1]-y;
		if( Math.sqrt((dx)*(dx) + (dy)*(dy)) < ball[2] )
		{
			found = true;
			break;
		}
	}
	if(found)
	{		
		balls.splice(j,1);
		drawBalls();
	}
}

var ballCount = Math.floor((Math.random() * 30) + 20);
for(j = 0; j < ballCount; j++)
{
	createBall();
}

viewer.width = 800;
viewer.height = 600;
//viewer.style.backgroundImage  = "url('./nebula/dev/a/" + scene["bg"] + "')";
//viewer.style.backgroundSize = "contain";
viewer.addEventListener("mousedown", mouseDown, false);

drawBalls();