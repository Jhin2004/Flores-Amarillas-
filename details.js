// Efectos de luces, control de audio, carta e interactividad al tocar
document.addEventListener("DOMContentLoaded", () => {
    // 1. Control de audio flotante
    const audio = document.getElementById("bgMusic");
    const audioBtn = document.getElementById("audioBtn");
    const audioIcon = document.getElementById("audioIcon");

    if (audio) {
        audio.play().catch(() => {
            console.log("Autoplay en pausa; se activará con la interacción.");
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
    if (canvas) {
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
    }

    // 4. Efecto de Polvo de Estrellas y Corazones al Tocar o Hacer Clic
    const emojis = ["✨", "💛", "⭐", "🌻", "💫"];

    function createSparkle(x, y) {
        const count = 8; // Cantidad de destellos por toque
        for (let i = 0; i < count; i++) {
            const el = document.createElement("span");
            el.className = "sparkle-particle";
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

            // Tamaño aleatorio
            const size = Math.random() * 14 + 14;
            el.style.fontSize = `${size}px`;

            // Posición inicial centrada en el clic/toque
            el.style.left = `${x - size / 2}px`;
            el.style.top = `${y - size / 2}px`;

            // Ángulo y distancia de dispersión
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 70 + 35;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance - 30; // Tendencia a flotar hacia arriba
            const rot = (Math.random() - 0.5) * 60;

            el.style.setProperty("--dx", `${dx}px`);
            el.style.setProperty("--dy", `${dy}px`);
            el.style.setProperty("--rot", `${rot}deg`);

            document.body.appendChild(el);

            // Eliminar del DOM al terminar la animación
            setTimeout(() => {
                el.remove();
            }, 1200);
        }
    }

    // Evento de clic para PC
    window.addEventListener("click", (e) => {
        // No disparar partículas si se hace clic en botones interactivos
        if (e.target.closest("button") || e.target.closest(".audio-control") || e.target.closest(".letter-content")) {
            return;
        }
        createSparkle(e.clientX, e.clientY);
    });

    // Evento táctil para celular
    window.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        if (e.target.closest("button") || e.target.closest(".audio-control") || e.target.closest(".letter-content")) {
            return;
        }
        createSparkle(touch.clientX, touch.clientY);
    }, { passive: true });
});
