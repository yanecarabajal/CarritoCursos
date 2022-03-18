// Variables

const carrito = document.querySelector("#carrito"); //Se usa QuerySelector porque es solo un carrito y const porque no se reasigna
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = []; // Es con let porque va agregando o sacando cosas del carrito, comienza vacio 
// Crear una funcion donde registra todos los evenListener
cargarEvenListeners();
function cargarEvenListeners() {
  // Cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Eliminar cursos del carrito
  carrito.addEventListener('click', eliminarCurso)

  // Vaciar el carrito 

  vaciarCarritoBtn.addEventListener('click', () => {
      articulosCarrito = []; // Reseteamos el carrito

      limpiarHTML();// Eliminamos todo el html
  })
}

// Funciones
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
      const cursoSeleccionado = e.target.parentElement.parentElement;
   
      leerDatosCurso(cursoSeleccionado);
}}

//Eliminar cursos del carrito
 function eliminarCurso(e) {

     console.log(e.target.classList);
     if(e.target.classList.contains('borrar-curso')){
         const cursoId = e.target.getAttribute('data-id');

         // Elimina del arreglo de articulosCarrito por el data-id
         articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

         carritoHtml(); // Iterar sobre el carrito y mostrar el HTML 
     }
     
 }

// Lee el contenido del html al que le dimos click y extrae la informacion del curso 

function leerDatosCurso(curso) {
//console.log(curso);
    // Crear un objeto con el contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:  1
    }

    // Revisa si un elemento ya existe en el carrito 

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe){
        // Actualizamos la cantidad

        const cursos = articulosCarrito.map( curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{ // AGREGAMOS EL CURSO AL CARRITO 
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // Agrega elementos al arreglo de carrito 

 console.log(articulosCarrito);

 carritoHtml();
}

// muestra el carrito de compras en el HTML 
// Esta funcion se va a encargar de crear el html basado en el carrito de compras cada vez que se va agregando un curso
function carritoHtml () {

    // Limpiar el HTML
    limpiarHTML();


    //Recorre el carrito y genera el HTML 
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src ="${imagen}" width=100></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td> ${cantidad} </td>
        <td> 
        <a href = "#" class = "borrar-curso" data-id ="${id}"> X </a>
         </td>
        `;

        // Agrega el HTml del carrito en el tbody
        contenedorCarrito.appendChild(row);

    });


}

// Elimina los cursos del tbody

function limpiarHTML() {
    // Forma lenta
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
    
}
