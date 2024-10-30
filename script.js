document.addEventListener("DOMContentLoaded", () => {
    const fireworksCanvas = document.getElementById("fireworks-canvas");
    const ctx = fireworksCanvas.getContext("2d");

    // Set canvas to full screen
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;

    function randomColor() {
        const colors = ["#ffd700", "#ff5733", "#c70039", "#900c3f", "#581845"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function createFirework(x, y) {
        const radius = Math.random() * 3 + 2;
        const explosionCount = Math.floor(Math.random() * 20) + 10;
        for (let i = 0; i < explosionCount; i++) {
            const angle = (Math.PI * 2) * (i / explosionCount);
            const velocity = Math.random() * 3 + 2;
            const spark = {
                x: x,
                y: y,
                dx: Math.cos(angle) * velocity,
                dy: Math.sin(angle) * velocity,
                radius: radius,
                color: randomColor(),
                life: 50
            };
            sparks.push(spark);
        }
    }

    const sparks = [];
    setInterval(() => {
        createFirework(Math.random() * fireworksCanvas.width, Math.random() * fireworksCanvas.height);
    }, 1000);

    function animate() {
        ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
        sparks.forEach((spark, index) => {
            spark.x += spark.dx;
            spark.y += spark.dy;
            spark.radius *= 0.97;
            spark.life -= 1;
            ctx.beginPath();
            ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
            ctx.fillStyle = spark.color;
            ctx.fill();
            if (spark.life <= 0) sparks.splice(index, 1);
        });
        requestAnimationFrame(animate);
    }
    animate();
});
