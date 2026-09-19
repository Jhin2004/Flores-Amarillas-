// Efectos de luces, control de audio y modal
document.addEventListener("DOMContentLoaded", () => {
    // 1. Control de audio flotante
    const audio = document.getElementById("bgMusic");
    const audioBtn = document.getElementById("audioBtn");
    const audioIcon = document.getElementById("audioIcon");

    if (audio) {
        audio.play().catch(() => {
            console.log("Autoplay bloqueado por políticas del navegador; se activará con la interacción.");
        });
    }

    if (audioBtn && audio) {
        audioBtn.addEventListener("click", () => {
            if (audio.paused) {
                audio.play();
                audioIcon.textContent = "🎵";
            } else {
                audio.pause();
                audioIcon.textContent = "🔇";
            }
        });
    }

    // 2. Control del modal de la carta
    const openBtn = document.getElementById("openLetterBtn");
    const closeBtn = document.getElementById("closeLetterBtn");
    const modal = document.getElementById("letterModal");

    if (openBtn && modal) {
        openBtn.addEventListener("click", () => modal.classList.add("active"));
    }
    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    }
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("active");
        });
    }

    // 3. Canvas de fondo: luciérnagas doradas flotantes
    const canvas = document.getElementById("ambientCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.2 + 1,
            speedX: (Math.random() - 0.5) * 0.6,
            speedY: (Math.random() - 0.5) * 0.6 - 0.2,
            alpha: Math.random() * 0.7 + 0.3,
            pulse: Math.random() * 0.02 + 0.01,
            pulseDir: 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p) => {
            p.alpha += p.pulse * p.pulseDir;
            if (p.alpha > 0.9) p.pulseDir = -1;
            if (p.alpha < 0.2) p.pulseDir = 1;

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 235, 100, ${p.alpha})`;
            ctx.shadowColor = "rgba(255, 215, 0, 0.8)";
            ctx.shadowBlur = 10;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
});