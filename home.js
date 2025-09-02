const btnAgregar = document.getElementById("btn-agregar");
const inputBox = document.getElementById("inputBox");
const inputTarea = document.getElementById("nuevaTareaInput");
const btnGuardar = document.getElementById("guardarTarea");
const btnCancelar = document.getElementById("cancelarTarea");
const lista = document.querySelector(".lista_tareas");

// Mostrar input al hacer clic en "Agregar tarea"
btnAgregar.addEventListener("click", () => {
    inputBox.style.display = "flex";   // mostrar el input y botones
    inputTarea.focus();                 // poner el cursor listo
});

// Guardar tarea
btnGuardar.addEventListener("click", agregarTarea);
inputTarea.addEventListener("keydown", (e) => {
    if(e.key === "Enter") agregarTarea();
});

// Cancelar tarea antes de agregar
btnCancelar.addEventListener("click", () => {
    inputTarea.value = "";
    inputBox.style.display = "none";   // ocultar input y botones
});

function agregarTarea() {
    const texto = inputTarea.value.trim();
    if(texto === "") return;

    const nuevaTarea = document.createElement("div");
    nuevaTarea.classList.add("tarea");
    nuevaTarea.innerHTML = `${texto} <button class="eliminar">X</button>`;

    // Botón eliminar para cada tarea
    nuevaTarea.querySelector(".eliminar").addEventListener("click", () => {
        lista.removeChild(nuevaTarea);
    });

    lista.appendChild(nuevaTarea);
    inputTarea.value = "";               // limpiar input
    inputTarea.focus();                  // mantener cursor listo
}

