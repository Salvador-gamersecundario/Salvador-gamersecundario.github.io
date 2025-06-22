// admin.js
const ADMIN_CODE = "xxx-admin-panel-2025";
const ADMIN_EMAIL = "luisfont349@gmail.com";

const loginForm = document.getElementById("loginForm");
const adminLogin = document.getElementById("adminLogin");
const adminPanel = document.getElementById("adminPanel");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const code = document.getElementById("adminCode").value;
    const email = document.getElementById("adminEmail").value;
    if (code === ADMIN_CODE && email) {
        adminLogin.style.display = "none";
        adminPanel.style.display = "block";
        sendAccessEmail(email);
        loadMainData();
    } else {
        loginError.textContent = "Código o correo incorrecto.";
    }
});

function sendAccessEmail(userEmail) {
    // Simulación de envío de correo (solo frontend)
    alert(`Se notificó a ${ADMIN_EMAIL} que ${userEmail} accedió a la consola de administrador.\n\n¡Cuidado! Esta consola puede modificar toda la página.`);
}

// Cargar datos actuales de la página principal (simulado)
function loadMainData() {
    // Simulación: valores por defecto
    document.getElementById("mainTitle").value = "Bienvenido a MDL";
    document.getElementById("mainDesc").value = "Un lugar donde la comunidad gamer se une.";
    document.getElementById("news1").value = "🎮 ¡Nuevo torneo de Minecraft este fin de semana!";
    document.getElementById("news2").value = "🔥 Se ha actualizado el servidor con nuevos plugins.";
}

// Guardar cambios (simulado)
document.getElementById("saveBtn").addEventListener("click", function() {
    // Aquí normalmente se haría una petición a backend o git, pero solo simulamos
    document.getElementById("saveMsg").textContent = "Cambios guardados (simulado). Recarga la página principal para verlos.";
    // Simulación de commit
    alert("[Simulación] Commit realizado: Cambios guardados en la página principal.");
});
