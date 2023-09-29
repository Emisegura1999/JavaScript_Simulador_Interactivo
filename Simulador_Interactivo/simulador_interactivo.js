// Inicializar variables
let totalAlumnos = 5;
let totalNotas = 10;
let sumaTotal = 0;
let nombreAlumnos = "";
let apellidoAlumnos = "";

// Ciclo para ingresar las notas de cada alumno
for (let i = 1; i <= totalAlumnos; i++) {
  let sumaNotas = 0;

  nombreAlumnos = prompt("Ingrese el nombre del Alumno");
  apellidoAlumnos = prompt("Ingrese el apellido del Alumno");

  // Ciclo para ingresar las 10 notas de cada alumno
  for (let j = 1; j <= totalNotas; j++) {
    let nota = parseInt(prompt(`Ingrese la nota ${j} del alumno ${i} `));

    // Verificar que la nota esté entre 1 y 10
    while (nota < 1 || nota > 10) {
      nota = parseInt(prompt(`La nota debe estar entre 1 y 10. Ingrese la nota ${j} del alumno ${i} `));
    }

    sumaNotas += nota;
  }

  let promedio = sumaNotas / totalNotas;
  sumaTotal += promedio;

  if (promedio >= 7){
  console.log(`El promedio del alumno ${nombreAlumnos}  ${apellidoAlumnos} es: ${promedio} Esta Aprobado, Felicitaciones`)
  }else{
  console.log(`El promedio del alumno ${nombreAlumnos}  ${apellidoAlumnos} es: ${promedio} Esta Desaprobado `)
  }
}

let promedioTotal = sumaTotal / totalAlumnos;
console.log(`El promedio total de los ${totalAlumnos} alumnos es: ${promedioTotal} `);
