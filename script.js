document.addEventListener("DOMContentLoaded", () => {
        const joinBtn = document.getElementById("joinBtn");

            if (joinBtn) {
                    joinBtn.addEventListener("click", () => {
                                alert("¡Bienvenido a MDL! Pronto recibirás más información.");
                                        });
                                            }

                                                // Animación de fondo dinámico
                                                    const colors = ["#3498db", "#9b59b6", "#e74c3c", "#2ecc71"];
                                                        let currentColor = 0;

                                                            setInterval(() => {
                                                                    document.body.style.backgroundColor = colors[currentColor];
                                                                            currentColor = (currentColor + 1) % colors.length;
                                                                                }, 5000);
                                                                                });
