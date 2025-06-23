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

// Mostrar/ocultar contraseña
const togglePass = document.getElementById('togglePass');
const adminCodeInput = document.getElementById('adminCode');
togglePass.onclick = function() {
    if (adminCodeInput.type === 'password') {
        adminCodeInput.type = 'text';
        togglePass.textContent = '🙈';
    } else {
        adminCodeInput.type = 'password';
        togglePass.textContent = '👁️';
    }
};

// Guardar cambios en LocalStorage para que se reflejen en la página principal
function saveAdminData() {
    const data = {
        mainTitle: document.getElementById("mainTitle").value,
        mainDesc: document.getElementById("mainDesc").value,
        news1: document.getElementById("news1").value,
        news2: document.getElementById("news2").value,
        newsList: Array.from(document.querySelectorAll('#newsList li')).map(li => li.textContent),
        bgColor: document.getElementById("bgColor").value,
        particleIntensity: document.getElementById("particleIntensity").value,
        discordLink: document.getElementById("discordLink").value,
        finalImage: document.getElementById("previewImage").src
    };
    localStorage.setItem('adminPanelData', JSON.stringify(data));
}

document.getElementById("saveBtn").addEventListener("click", function() {
    saveAdminData();
    document.getElementById("saveMsg").textContent = "Cambios guardados. Recarga la página principal para verlos.";
    alert("[Simulación] Commit realizado: Cambios guardados en la página principal.");
});

// --- Editor Visual ---

// Cargar el contenido de index.html en el editor visual
async function loadEditableContent() {
    const res = await fetch('../index.html');
    const html = await res.text();
    // Extraer solo el contenido del <body>
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const editableArea = document.getElementById('editableArea');
    if (bodyMatch && editableArea) {
        editableArea.innerHTML = bodyMatch[1];
    }
}

// Herramientas para agregar elementos
const toolMenu = document.getElementById('toolMenu');
toolMenu && toolMenu.addEventListener('click', function(e) {
    if (e.target.classList.contains('tool-btn')) {
        const tool = e.target.getAttribute('data-tool');
        const editableArea = document.getElementById('editableArea');
        if (!editableArea) return;
        if (tool === 'text') {
            const p = document.createElement('p');
            p.textContent = 'Nuevo texto editable';
            p.contentEditable = true;
            editableArea.appendChild(p);
        } else if (tool === 'image') {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(ev) {
                const file = ev.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(evv) {
                        const img = document.createElement('img');
                        img.src = evv.target.result;
                        img.style.maxWidth = '200px';
                        editableArea.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        } else if (tool === 'button') {
            const btn = document.createElement('button');
            btn.textContent = 'Nuevo botón';
            editableArea.appendChild(btn);
        } else if (tool === 'section') {
            const section = document.createElement('section');
            section.innerHTML = '<h3>Nueva sección</h3><p>Contenido de la sección...</p>';
            editableArea.appendChild(section);
        }
    }
});

// Guardar cambios visuales
const saveVisualBtn = document.getElementById('saveVisualBtn');
saveVisualBtn && saveVisualBtn.addEventListener('click', async function() {
    const editableArea = document.getElementById('editableArea');
    if (!editableArea) return;
    // Reconstruir el index.html con el nuevo <body>
    const res = await fetch('../index.html');
    let html = await res.text();
    html = html.replace(/<body[\s\S]*<\/body>/i, `<body>\n${editableArea.innerHTML}\n</body>`);
    // Enviar al backend
    const formData = new FormData();
    formData.append('content', html);
    fetch('update_index.php', {
        method: 'POST',
        body: formData
    })
    .then(r => r.json())
    .then(data => {
        document.getElementById('saveMsg').textContent = data.message;
        if (data.success) alert('¡Cambios guardados!');
    });
});

// Inicializar editor visual al mostrar panel admin
if (adminPanel) {
    loadEditableContent();
}
