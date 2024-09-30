const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function Heart(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.opacity = 1;

    this.draw = function() {
        ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size / 2, this.x + this.size, this.y + this.size / 3, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x - this.size, this.y + this.size / 3, this.x - this.size / 2, this.y - this.size / 2, this.x, this.y);
        ctx.closePath();
        ctx.fill();
    };

    this.update = function() {
        this.y -= this.speed;
        this.opacity -= 0.005;
        if (this.opacity <= 0) {
            this.opacity = 0;
        }
    };
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.1) {
        hearts.push(new Heart(Math.random() * canvas.width, canvas.height, 20, 2));
    }

    hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();

        if (heart.opacity === 0) {
            hearts.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

animate();
