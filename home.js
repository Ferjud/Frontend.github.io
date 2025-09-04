const btnAgregar = document.getElementById("btn-agregar");
const inputBox = document.getElementById("inputBox");
const inputTarea = document.getElementById("nuevaTareaInput");
const btnGuardar = document.getElementById("guardarTarea");
const btnCancelar = document.getElementById("cancelarTarea");
const lista = document.querySelector(".lista_tareas");

// Mostrar input al hacer clic en "Agregar tarea"
btnAgregar.addEventListener("click", () => {
    inputBox.style.display = "flex";   
    inputTarea.focus();                 
});

// Guardar tarea
btnGuardar.addEventListener("click", agregarTarea);
inputTarea.addEventListener("keydown", (e) => {
    if(e.key === "Enter") agregarTarea();
});

// Cancelar tarea antes de agregar
btnCancelar.addEventListener("click", () => {
    inputTarea.value = "";
    inputBox.style.display = "none";   
});

// Función agregar tarea
async function agregarTarea() {
    const texto = inputTarea.value.trim();
    if (!texto) return;

    const res = await fetch("/api/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tarea: texto })
    });
    const data = await res.json();

    if (!data.success) {
        alert(data.message);
        return;
    }

    inputTarea.value = "";
    inputTarea.focus();
    cargarTareas();
}

// Función cargar tareas
async function cargarTareas() {
    const res = await fetch("/api/tareas");
    const data = await res.json();
    if (!data.success) return;

    lista.innerHTML = "";

    data.tareas.forEach((t, i) => {
        const tareaDiv = document.createElement("div");
        tareaDiv.classList.add("tarea");
        tareaDiv.innerHTML = `${t.texto} <button class="eliminar" data-id="${t.id}">X</button>`;
        lista.appendChild(tareaDiv);
    });

    // Eliminar tareas
    document.querySelectorAll(".eliminar").forEach(btn => {
        btn.addEventListener("click", async () => {
            const id = btn.dataset.id;
            await fetch(`/api/tareas/${id}`, { method: "DELETE" });
            cargarTareas();
        });
    });
}

//cargar la página
window.addEventListener("DOMContentLoaded", cargarTareas)