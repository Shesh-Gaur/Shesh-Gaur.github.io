import {Vector2D} from "./math.js"

const flock = [];
const maxBoids = 100;

class Boid
{
    constructor()
    {
        this.color = "#" + Math.floor(Math.random()*16777215).toString(16);
        this.size = new Vector2D(20,20);
        this.pos =  new Vector2D(Math.random() * myGameArea.canvas.width, Math.random()* myGameArea.canvas.height);
        this.maxVel = 3;
        this.vel = new Vector2D(Math.random() * this.maxVel, Math.random() * this.maxVel);
    }

    //Vector2D Acc
    //float maxAcc

    draw()
    {
        myGameArea.context.fillStyle = this.color;
        myGameArea.context.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }

    wrap()
    {
        var bottom = myGameArea.canvas.height - this.size.y;

        if (this.pos.x > myGameArea.canvas.width + this.size.x) 
        {
            this.pos.x = -this.size.x; 
        }
        else if (this.pos.x < -this.size.x)
        {
            this.pos.x = myGameArea.canvas.width + this.size.x; 
        }

        if (this.pos.y > myGameArea.canvas.height + this.size.y) 
        {
            this.pos.y = -this.size.y; 
        }
        else if (this.y < -this.size.y)
        {
            this.pos.y = myGameArea.canvas.height + this.size.y; 
        }
    }

    update()
    {
        this.wrap();
        //Steering Behaviours Here
        this.pos = this.pos.Add(this.vel);
        this.draw();
    }
}

window.onload = function startGame() {

    myGameArea.start();

    for(let i=0; i < maxBoids; i++) 
    {
        flock.push(new Boid())
    }
    window.addEventListener('resize', fitCanvas, false);
    fitCanvas();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 16.67);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//Update
function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    
    flock.forEach(boid => { boid.update()})
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function resize() {
    content.strokeStyle = 'red';
    content.lineWidth = '10'; 
    content.strokeRect(0, 0, window.innerWidth, window.innerHeight);
 }
 function fitCanvas() {
    myGameArea.canvas.width = window.innerWidth;
    myGameArea.canvas.height = window.innerHeight;
    resize();
 }
