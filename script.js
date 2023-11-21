document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("form-login");
    const formRegistro = document.getElementById("form-registro");
    const mostrarRegistroLink = document.getElementById("mostrar-registro");
    const mostrarLoginLink = document.getElementById("mostrar-login");
    const bienvenida = document.getElementById("bienvenida");
    const nombreBienvenida = document.getElementById("nombre-bienvenida");

    // Verifica si un usuario ya ha iniciado sesión
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    if (usuarioActual) {
        mostrarBienvenida(usuarioActual);
    }

    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();
        const nombreLogin = document.getElementById("nombre-login").value;
        const contrasenaLogin = document.getElementById("contrasena-login").value;

        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
        const usuarioEncontrado = usuariosRegistrados.find(usuario => usuario.nombre === nombreLogin && usuario.contrasena === contrasenaLogin);

        if (usuarioEncontrado) {
            mostrarBienvenida(usuarioEncontrado);
        } else {
            mostrarError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        }
    });

    formRegistro.addEventListener("submit", function (e) {
        e.preventDefault();
        const nombreRegistro = document.getElementById("nombre-registro").value;
        const contrasenaRegistro = document.getElementById("contrasena-registro").value;

        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
        const usuarioExistente = usuariosRegistrados.find(usuario => usuario.nombre === nombreRegistro);

        if (usuarioExistente) {
            mostrarError("El usuario ya está registrado. Por favor, elige otro nombre.");
        } else {
            const nuevoUsuario = { nombre: nombreRegistro, contrasena: contrasenaRegistro };
            usuariosRegistrados.push(nuevoUsuario);
            localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

            mostrarBienvenida(nuevoUsuario);
        }
    });

    mostrarRegistroLink.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("login-form").style.display = "none";
        document.getElementById("registro-form").style.display = "block";
    });

    mostrarLoginLink.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("login-form").style.display = "block";
        document.getElementById("registro-form").style.display = "none";
    });

     function mostrarBienvenida(usuario) {
        return new Promise((resolve) => {
            Toastify({
                text: `¡Bienvenido, ${usuario.nombre}!`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: 'right',
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
            }).showToast();

        const mensajeError = document.getElementById("mensaje-error");
        mensajeError.style.display = "none";
        const mensajeErrorRegistro = document.getElementById("mensaje-error-registro");
        mensajeErrorRegistro.style.display = "none";

        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
        document.getElementById("login-form").style.display = "none";
        document.getElementById("registro-form").style.display = "none";
        bienvenida.style.display = "block";
        nombreBienvenida.textContent = `Bienvenido, ${usuario.nombre}!`;
        document.getElementById("agregar-alumno").style.display = "block";

        resolve();

          });
    }
     

   function mostrarError(mensaje) {
        return new Promise((resolve) => {
            Toastify({
                text: mensaje,
                duration: 3000,
                close: true,
                gravity: "top",
                position: 'right',
                backgroundColor: "#ff0000"
            }).showToast();

            resolve(); 
        });
    }

})

// Función para agregar un nuevo alumno
function agregarAlumno() {
    const nombre = document.getElementById("nombre").value;
    const nota1 = parseInt(document.getElementById("nota1").value);
    const nota2 = parseInt(document.getElementById("nota2").value);
    const nota3 = parseInt(document.getElementById("nota3").value);

   
    if (nota1 >= 1 && nota1 <= 10 && nota2 >= 1 && nota2 <= 10 && nota3 >= 1 && nota3 <= 10) {
        // Crea un objeto alumno
        const alumno = {
            nombre: nombre,
            notas: [nota1, nota2, nota3],
        };

        // Obtener la lista de alumnos del almacenamiento local
        const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

        
        if (alumnos.length < 10) {
            alumnos.push(alumno);

            // Guardar la lista de alumnos en el almacenamiento local
            localStorage.setItem("alumnos", JSON.stringify(alumnos));

            
            mostrarAlumnos();

            // Limpiar los campos de entrada
            document.getElementById("nombre").value = "";
            document.getElementById("nota1").value = "";
            document.getElementById("nota2").value = "";
            document.getElementById("nota3").value = "";
        } else {
            alert("Se ha alcanzado el límite de 10 alumnos.");
        }
    } else {
        alert("Las notas deben estar en el rango de 1 a 10.");
    }
}

// Función para calcular el promedio y estado del alumno
function calcularPromedioYEstado(notas) {
    const promedio = (notas[0] + notas[1] + notas[2]) / 3;
    const estado = promedio >= 7 ? "Aprobado" : "Desaprobado";
    return [promedio, estado];
}

// Función para mostrar la lista de alumnos en el DOM
function mostrarAlumnos() {
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    const alumnosList = document.getElementById("alumnos-list");
    alumnosList.innerHTML = "";

    // Iterar a través de la lista de alumnos y mostrarlos en el DOM
    alumnos.forEach((alumno, index) => {
        const [promedio, estado] = calcularPromedioYEstado(alumno.notas);

        const alumnoDiv = document.createElement("div");
        alumnoDiv.innerHTML = `
            <p>Nombre: ${alumno.nombre}</p>
            <p>Notas: ${alumno.notas.join(", ")}</p>
            <p>Promedio: ${promedio.toFixed(2)}</p>
            <p>Estado: ${estado}</p>
            <button onclick="eliminarAlumno(${index})">Eliminar</button>
            <button onclick="mostrarFormularioModificar(${index})">Modificar Notas</button>
        `;

        alumnosList.appendChild(alumnoDiv);
    });
}

// Función para eliminar un alumno
function eliminarAlumno(index) {
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    if (index >= 0 && index < alumnos.length) {
        alumnos.splice(index, 1);
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        mostrarAlumnos();
    }
}

// Función para mostrar el formulario de modificación de notas
function mostrarFormularioModificar(index) {
    const formularioModificar = document.getElementById("formulario-modificar");
    formularioModificar.style.display = "block";
    formularioModificar.dataset.index = index;

    // Obtener las notas actuales del alumno seleccionado
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    const alumno = alumnos[index];
    document.getElementById("nuevaNota1").value = alumno.notas[0];
    document.getElementById("nuevaNota2").value = alumno.notas[1];
    document.getElementById("nuevaNota3").value = alumno.notas[2];
}


// Función para modificar las notas de un alumno
function modificarNotas() {
    const index = parseInt(document.getElementById("formulario-modificar").dataset.index);
    const nuevaNota1 = parseInt(document.getElementById("nuevaNota1").value);
    const nuevaNota2 = parseInt(document.getElementById("nuevaNota2").value);
    const nuevaNota3 = parseInt(document.getElementById("nuevaNota3").value);

    if (!isNaN(nuevaNota1) && !isNaN(nuevaNota2) && !isNaN(nuevaNota3)) {
        const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
        if (index >= 0 && index < alumnos.length) {
            alumnos[index].notas[0] = nuevaNota1;
            alumnos[index].notas[1] = nuevaNota2;
            alumnos[index].notas[2] = nuevaNota3;
            localStorage.setItem("alumnos", JSON.stringify(alumnos));
            mostrarAlumnos();
            document.getElementById("formulario-modificar").style.display = "none";
        }
    } else {
        alert("Ingrese valores válidos para las notas.");
    }
}

     
// Mostrar la lista de alumnos al cargar la página
mostrarAlumnos();
