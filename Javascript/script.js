// jshint esversion:6
document.addEventListener('DOMContentLoaded', (event) => {

    var $ = function(selector) {
        return document.querySelector(selector);
    };


    var ctx = $("#myCanvas").getContext('2d');
    var balls = [];

    function randomColor() {
        return `hsl(${Math.random() * 760}, 80%, 50%)`;
    }

    function randomGradient(size) {
        var gradient = ctx.createLinearGradient(-size, 0, size, 0);
        gradient.addColorStop(0, randomColor());
        gradient.addColorStop(1, '#FFEFFB');
        return gradient;
    }
    // JS style, constructors are always Capitalized
    class Ball {
        constructor() {
            this.x = ctx.canvas.width;
            this.y = ctx.canvas.height;
            this.vx = (Math.random() - 0.3) * 90;
            this.vy = (Math.random() - 0.3) * 90;
            this.radius = (Math.random() + 0.5) * 10;
            this.color = randomGradient(this.radius);
            this.angle = Math.random() * Math.PI * 4;
        }

        draw() {
            ctx.save();
            ctx.fillStyle = this.color; //****
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 0;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, 6.28, false);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.restore();
        }

        move(deltaTime) {
            // you didn't provide this code so I made something up.
            this.x = (this.x + this.vx * deltaTime + ctx.canvas.width) % ctx.canvas.width;
            this.y = (this.y + this.vy * deltaTime + ctx.canvas.height) % ctx.canvas.height;
        }
    }

    function create_balls() {
        for (let i = 0; i < 270; i++) {
            var temp = new Ball();
            balls.push(temp);
        }
    }
    let then = 0;

    function going(now) {

        now *= 0.001; // convert to seconds
        var deltaTime = now - then;
        then = now;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        balls.forEach((ball) => {
            ball.move(deltaTime);
            ball.draw();
        });
        requestAnimationFrame(going);
    }


    function resize_can() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }

    window.onresize = resize_can;
    resize_can();
    create_balls();

    requestAnimationFrame(going);
});