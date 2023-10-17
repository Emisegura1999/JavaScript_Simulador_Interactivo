// Arreglo de objetos para almacenar las notas de los alumnos
const alumnos = [];

// Función para ingresar las notas de un alumno
function ingresarNotas() {
    const nombre = prompt("Ingrese el nombre del alumno:");
    const notas = [];
    for (let i = 0; i < 5; i++) {
        const nota = parseFloat(prompt(`Ingrese la nota ${i + 1} para ${nombre}:`));
        notas.push(nota);
    }
    const alumno = {
        nombre: nombre,
        notas: notas
    };
    alumnos.push(alumno);
    alert(`${nombre} ha sido añadido a la lista de alumnos.`);
}

// Función para calcular el promedio de un alumno
function calcularPromedio(notas) {
    const suma = notas.reduce((a, b) => a + b, 0);
    return suma / notas.length;
}

// Función para calcular los promedios de todos los alumnos
function calcularPromedios() {
    const promedios = [];
    for (const alumno of alumnos) {
        const promedio = calcularPromedio(alumno.notas);
        promedios.push(`${alumno.nombre}: Promedio ${promedio}`);
    }
    alert("Promedios de los alumnos:\n\n" + promedios.join("\n"));
}

// Función para realizar un filtro avanzado sobre las notas de los alumnos
function filtroAvanzado() {
    const filtro = parseFloat(prompt("Ingrese el valor mínimo para el filtro avanzado:"));
    const resultados = [];

    for (const alumno of alumnos) {
        const promedio = calcularPromedio(alumno.notas);

        if (promedio >= filtro) {
            resultados.push(`${alumno.nombre}: Promedio ${promedio}`);
        }
    }

    if (resultados.length === 0) {
        alert("No hay alumnos que cumplan con el filtro especificado.");
    } else {
        alert("Alumnos que cumplen con el filtro avanzado:\n\n" + resultados.join("\n"));
    }
}

// Función para agregar un nuevo alumno
function agregarAlumno() {
    ingresarNotas();
}

// Función para eliminar un alumno por nombre
function eliminarAlumno() {
    const nombre = prompt("Ingrese el nombre del alumno que desea eliminar:");
    const index = alumnos.findIndex(alumno => alumno.nombre === nombre);
    if (index !== -1) {
        alumnos.splice(index, 1);
        alert(`${nombre} ha sido eliminado de la lista de alumnos.`);
    } else {
        alert(`No se encontró a un alumno con el nombre ${nombre}.`);
    }
}
