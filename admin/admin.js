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
    const datos = JSON.parse(localStorage.getItem('adminPanelData'));
    if (datos) {
        document.getElementById("mainTitle").value = datos.mainTitle || "Bienvenido a MDL";
        document.getElementById("mainDesc").value = datos.mainDesc || "Un lugar donde la comunidad gamer se une.";
        document.getElementById("news1").value = datos.news1 || "🎮 ¡Nuevo torneo de Minecraft este fin de semana!";
        document.getElementById("news2").value = datos.news2 || "🔥 Se ha actualizado el servidor con nuevos plugins.";
        document.getElementById("previewImage").src = datos.finalImage || "../asset/ING/chamito.png";
        document.getElementById("bgColor").value = datos.bgColor || "#1e1e1e";
        document.getElementById("particleIntensity").value = datos.particleIntensity || 50;
        document.getElementById("particleValue").textContent = datos.particleIntensity || 50;
        document.getElementById("discordLink").value = datos.discordLink || "https://discord.gg/pA4PGb3EUR";
        // Noticias extra
        const newsList = document.getElementById('newsList');
        newsList.innerHTML = '';
        if (datos.extraNews && datos.extraNews.length) {
            datos.extraNews.forEach(n => {
                const li = document.createElement('li');
                li.textContent = n;
                newsList.appendChild(li);
            });
        }
    } else {
        // Simulación: valores por defecto
        document.getElementById("mainTitle").value = "Bienvenido a MDL";
        document.getElementById("mainDesc").value = "Un lugar donde la comunidad gamer se une.";
        document.getElementById("news1").value = "🎮 ¡Nuevo torneo de Minecraft este fin de semana!";
        document.getElementById("news2").value = "🔥 Se ha actualizado el servidor con nuevos plugins.";
    }
}

// NUEVO: Opciones avanzadas de administración
// Permitir cambiar imagen, agregar noticias, cambiar colores, controlar partículas y enlaces

// Elementos extra
const extraPanel = document.createElement('div');
extraPanel.innerHTML = `
    <hr>
    <h3>Opciones avanzadas</h3>
    <label>Imagen final:<br><input type="file" id="finalImageInput" accept="image/*"></label><br>
    <img id="previewImage" src="../asset/ING/chamito.png" style="width:80px;margin:10px 0;display:block;">
    <label>Agregar noticia:<br><input type="text" id="newNews"></label><button id="addNewsBtn">Agregar</button><br>
    <ul id="newsList"></ul>
    <label>Color de fondo:<br><input type="color" id="bgColor" value="#1e1e1e"></label><br>
    <label>Intensidad de partículas:<br><input type="range" id="particleIntensity" min="10" max="100" value="50"></label><span id="particleValue">50</span><br>
    <label>Hipervínculo Discord:<br><input type="url" id="discordLink" value="https://discord.gg/pA4PGb3EUR"></label><br>
`;
adminPanel.appendChild(extraPanel);

// Noticias dinámicas
const newsList = document.getElementById('newsList');
document.getElementById('addNewsBtn').onclick = function() {
    const val = document.getElementById('newNews').value;
    if(val) {
        const li = document.createElement('li');
        li.textContent = val;
        newsList.appendChild(li);
        document.getElementById('newNews').value = '';
    }
};

// Imagen final
const finalImageInput = document.getElementById('finalImageInput');
const previewImage = document.getElementById('previewImage');
finalImageInput.onchange = function(e) {
    const file = e.target.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            previewImage.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    }
};

// Color de fondo
const bgColor = document.getElementById('bgColor');
bgColor.oninput = function() {
    document.body.style.background = bgColor.value;
};

// Intensidad de partículas
const particleIntensity = document.getElementById('particleIntensity');
const particleValue = document.getElementById('particleValue');
particleIntensity.oninput = function() {
    particleValue.textContent = particleIntensity.value;
    // Aquí se podría comunicar con la página principal para cambiar la cantidad de partículas
};

// Hipervínculo Discord
const discordLink = document.getElementById('discordLink');
discordLink.oninput = function() {
    // Aquí se podría guardar el nuevo enlace para la página principal
};

// Guardar cambios (ahora en LocalStorage)
document.getElementById("saveBtn").addEventListener("click", function() {
    const datos = {
        mainTitle: document.getElementById("mainTitle").value,
        mainDesc: document.getElementById("mainDesc").value,
        news1: document.getElementById("news1").value,
        news2: document.getElementById("news2").value,
        extraNews: Array.from(document.querySelectorAll('#newsList li')).map(li => li.textContent),
        finalImage: document.getElementById("previewImage").src,
        bgColor: document.getElementById("bgColor").value,
        particleIntensity: document.getElementById("particleIntensity").value,
        discordLink: document.getElementById("discordLink").value
    };
    localStorage.setItem('adminPanelData', JSON.stringify(datos));
    document.getElementById("saveMsg").textContent = "Cambios guardados. Recarga la página principal para verlos.";
    alert("[Simulación] Commit realizado: Cambios guardados en la página principal.");
});
