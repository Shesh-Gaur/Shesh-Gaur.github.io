import {Vector2D} from "./math.js"
import {interpolate} from "./math.js"


const flock = [];
const maxBoids = 80;
const separationIntensity = 0.2;
const alignmentIntensity = 0.3;
const cohesionIntensity = 0.2;


class Boid
{
    constructor()
    {
        this.randSize = Math.pow(Math.random(),5) ;

        if (this.randSize < 0.8)
        {
            this.randSize = 20;
        }
        else
        {
            this.randSize *= 80
        }

        this.randColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        this.color = this.randColor;
        this.size = new Vector2D(this.randSize, this.randSize);

        this.pos =  new Vector2D(Math.random() * myGameArea.canvas.width, Math.random()* myGameArea.canvas.height);
        this.maxVel = 3;
        this.vel = new Vector2D((Math.random() - 0.5) * this.maxVel, (Math.random() - 0.5) * this.maxVel);

        this.acc = new Vector2D(0,0);
        this.maxAcc = 1;
    }

    Draw()
    {
        myGameArea.context.fillStyle = this.color;
        myGameArea.context.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }

    Wrap()
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

    Separation(boids) 
    {
        let radius = 2.3 * this.size.x;
        let total = 0;
        let force = new Vector2D(0,0);

        boids.forEach(boid => 
        {
            if (boid == this)
                return;
        
            let dir = this.pos.Sub(boid.pos);
            let dist = dir.Length;

            if (dist > radius)
                return;
    
           this.color = interpolate(this.color, boid.color, -0.01);

            dir = dir.Div(dist);
            force = force.Add(dir);
            total++;      
        })

        if (total > 0)
        {
            force = force.Div(total);
            force = force.Normalize().Mult(this.maxVel);
            force = force.Sub(this.vel);

            if (force.Length > this.maxAcc)
                force = force.Normalize().Mult(this.maxAcc);
        }

        return force;
    }

    Alignment(boids)
    {
        let radius = 2.3 * this.size.x;
        let total = 0;
        let force = new Vector2D(0,0);

        boids.forEach(boid => 
        {
            if (boid == this)
                return;
        
            let dir = this.pos.Sub(boid.pos);
            let dist = dir.Length;

            if (dist > radius)
                return;
    
            this.color = interpolate(this.color, boid.color, 0.01);
            force = force.Add(boid.vel);

            total++;      
        })

        if (total > 0)
        {
            force = force.Div(total);
            force = force.Normalize().Mult(this.maxVel);
            force = force.Sub(this.vel);

            if (force.Length > this.maxAcc)
                force = force.Normalize().Mult(this.maxAcc);
        }

        return force;
    }

    Cohesion(boids)
    {
        let radius = 2.3 * this.size.x;
        let total = 0;
        let force = new Vector2D(0,0);

        boids.forEach(boid => 
        {
            if (boid == this)
                return;
        
            let dir = this.pos.Sub(boid.pos);
            let dist = dir.Length;

            if (dist > radius)
                return;

            this.color = interpolate(this.color, boid.color, 0.01);
            force = force.Add(boid.pos);
            total++;      
        })

        if (total > 0)
        {
            force = force.Div(total);
            force = force.Sub(this.pos);
            force = force.Normalize().Mult(this.maxVel);
            force = force.Sub(this.vel);
            if (force.Length > this.maxAcc)
                force = force.Normalize().Mult(this.maxAcc);
        }

        return force;
    }

    Steer(boids)
    {
        let seperation = this.Separation(boids);
        let alignment = this.Alignment(boids);
        let cohesion = this.Cohesion(boids);

        this.acc = this.acc.Add(seperation.Mult(separationIntensity * 0.001));
        this.acc = this.acc.Add(alignment.Mult(alignmentIntensity * 0.001));
        this.acc = this.acc.Add(cohesion.Mult(cohesionIntensity * 0.001));
    }

    Update()
    {
        this.color = interpolate(this.color, this.randColor, 0.01);

        this.Wrap();
        this.Steer(flock);

        this.pos = this.pos.Add(this.vel);
        this.vel = this.vel.Add(this.acc);
        if (this.vel.Length > this.maxVel)       
           this.vel = this.vel.Normalize().Mult(this.maxVel);
        
        this.Draw();
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
    
    flock.forEach(boid => { boid.Update()})
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
