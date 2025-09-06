
// Variables
const formLogin = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const formRegister = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

const inputLoginUser = formLogin.querySelector('input[name="username"]');
const inputLoginPass = formLogin.querySelector('input[name="password"]');

const inputRegisterUser = formRegister.querySelector('input[name="username"]');
const inputRegisterPass = formRegister.querySelector('input[name="password"]');

const showRegisterLink = document.getElementById("showRegister");
const showLoginLink = document.getElementById("showLogin");


// Funciones
// Login
async function loginUsuario(e) {
    e.preventDefault();

    const username = inputLoginUser.value.trim();
    const password = inputLoginPass.value.trim();
    if (!username || !password) return;

    const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (!data.success) {
        loginMessage.classList.add("error"); // aplica estilos y visibilidad desde CSS
        loginMessage.textContent = data.message; // usuario no existe o contraseña incorrecta
        return;
    }

    // login exitoso 
    window.location.href = "home.html";
}

// Registro
async function registrarUsuario(e) {
    e.preventDefault();

    const username = inputRegisterUser.value.trim();
    const password = inputRegisterPass.value.trim();
    if (!username || !password) return;

    const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password })
    });
    const data = await res.json();

    

    if (!data.success) {
         // Mostrar mensaje de error
        registerMessage.classList.add("error");
        registerMessage.textContent = data.message;
        return;
    }

    // Mostrar mensaje de éxito
    registerMessage.classList.add("success");
    registerMessage.textContent = data.message;

    // Limpiar inputs
    inputRegisterUser.value = "";
    inputRegisterPass.value = "";
}



// Alternar formularios
function toggleForms() {
    formLogin.classList.toggle("hidden");
    formRegister.classList.toggle("hidden");



 // Limpiar mensajes cuando se muestra el formulario
    loginMessage.textContent = "";
    loginMessage.className = "";  // quita clases de error o success
    registerMessage.textContent = "";
    registerMessage.className = "";
}

// Event Listeners
formLogin.addEventListener("submit", loginUsuario);
formRegister.addEventListener("submit", registrarUsuario);


showRegisterLink.addEventListener("click", function(e) {
    e.preventDefault();
    toggleForms();
});


showLoginLink.addEventListener("click", function(e) {
    e.preventDefault();
    toggleForms();
});


