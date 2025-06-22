document.addEventListener("DOMContentLoaded", () => {
        const joinBtn = document.getElementById("joinBtn");
            const themeToggle = document.getElementById("themeToggle");

                if (joinBtn) {
                        joinBtn.addEventListener("click", () => {
                                    joinBtn.style.transform = "scale(1.2)";
                                                setTimeout(() => {
                                                                joinBtn.style.transform = "scale(1)";
                                                                                alert("¡Bienvenido a MDL! Pronto recibirás más información.");
                                                                                            }, 300);
                                                                                                    });
                                                                                                        }

                                                                                                            // Modo oscuro/claro
                                                                                                                themeToggle.addEventListener("click", () => {
                                                                                                                        document.body.classList.toggle("light-mode");
                                                                                                                                localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
                                                                                                                                    });

                                                                                                                                        // Cargar preferencia del usuario
                                                                                                                                            if (localStorage.getItem("theme") === "light") {
                                                                                                                                                    document.body.classList.add("light-mode");
                                                                                                                                                        }

                                                                                                                                                            // Fondo animado con partículas
                                                                                                                                                                const canvas = document.createElement("canvas");
                                                                                                                                                                    document.body.appendChild(canvas);
                                                                                                                                                                        const ctx = canvas.getContext("2d");

                                                                                                                                                                            canvas.width = window.innerWidth;
                                                                                                                                                                                canvas.height = window.innerHeight;

                                                                                                                                                                                    let particles = [];

                                                                                                                                                                                        class Particle {
                                                                                                                                                                                                constructor(x, y, size, speedX, speedY) {
                                                                                                                                                                                                            this.x = x;
                                                                                                                                                                                                                        this.y = y;
                                                                                                                                                                                                                                    this.size = size;
                                                                                                                                                                                                                                                this.speedX = speedX;
                                                                                                                                                                                                                                                            this.speedY = speedY;
                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                            update() {
                                                                                                                                                                                                                                                                                        this.x += this.speedX;
                                                                                                                                                                                                                                                                                                    this.y += this.speedY;

                                                                                                                                                                                                                                                                                                                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                                                                                                                                                                                                                                                                                                                            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                            draw() {
                                                                                                                                                                                                                                                                                                                                                        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
                                                                                                                                                                                                                                                                                                                                                                    ctx.beginPath();
                                                                                                                                                                                                                                                                                                                                                                                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                                                                                                                                                                                                                                                                                                                                                                                            ctx.fill();
                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                            function initParticles() {
                                                                                                                                                                                                                                                                                                                                                                                                                    for (let i = 0; i < 50; i++) {
                                                                                                                                                                                                                                                                                                                                                                                                                                let size = Math.random() * 3 + 1;
                                                                                                                                                                                                                                                                                                                                                                                                                                            let x = Math.random() * canvas.width;
                                                                                                                                                                                                                                                                                                                                                                                                                                                        let y = Math.random() * canvas.height;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    let speedX = (Math.random() - 0.5) * 2;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                let speedY = (Math.random() - 0.5) * 2;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            particles.push(new Particle(x, y, size, speedX, speedY));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            function animateParticles() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            particles.forEach(particle => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        particle.update();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    particle.draw();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    requestAnimationFrame(animateParticles);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            initParticles();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                animateParticles();

    // Leer datos del admin panel desde LocalStorage
    const adminData = localStorage.getItem('adminPanelData');
    if (adminData) {
        const data = JSON.parse(adminData);
        // Cambiar título y descripción
        const h1 = document.querySelector('header h1');
        if(h1 && data.mainTitle) h1.textContent = data.mainTitle;
        const desc = document.querySelector('header p');
        if(desc && data.mainDesc) desc.textContent = data.mainDesc;
        // Noticias
        const newsItems = document.querySelectorAll('.news-item');
        if(newsItems[0] && data.news1) newsItems[0].textContent = data.news1;
        if(newsItems[1] && data.news2) newsItems[1].textContent = data.news2;
        // Noticias adicionales
        const newsSection = document.getElementById('news');
        if(newsSection && data.newsList && data.newsList.length) {
            data.newsList.forEach(txt => {
                const div = document.createElement('div');
                div.className = 'news-item';
                div.textContent = txt;
                newsSection.appendChild(div);
            });
        }
        // Imagen final
        const img = document.querySelector('.final-image');
        if(img && data.finalImage) img.src = data.finalImage;
        // Color de fondo
        if(data.bgColor) document.body.style.background = data.bgColor;
        // Discord link
        const discordBtn = document.querySelector('.discord-btn');
        if(discordBtn && data.discordLink) discordBtn.href = data.discordLink;
        // (Opcional) Intensidad de partículas: aquí podrías ajustar la cantidad si lo deseas
    }
            });