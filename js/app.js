const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
const borrarBtn = document.querySelector('.borrar-curso')
let articulosCarrito = [];


agregarLosEventos();

function agregarLosEventos(){
    //cuando agregas un curso al carrito 
    listaCursos.addEventListener('click', agregarCurso)
    
    //elimina los cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //elimina todos los cursos del carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || []

        carritoHTML();
    })
}


function agregarCurso(e){
    e.preventDefault()

    if(e.target.classList.contains('agregar-carrito')){
        let cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
     }
}

function eliminarCurso(e){
    e.preventDefault();
  if(e.target.classList.contains('borrar-curso')){

        let cursoId = e.target.getAttribute('data-id')

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML()
  }
}

function vaciarCarrito(e){
    e.preventDefault();
    articulosCarrito = []
    limpiarHTML()
}

function leerDatosCurso(curso){
   const infoCurso = {
       imagen: curso.querySelector('img').src,
       titulo: curso.querySelector('h4').textContent,
       parrafo: curso.querySelector('.precio span').textContent,
       id: curso.querySelector('a').getAttribute('data-id'),
       cantidad: 1
   }


 const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)

   if(existe){

        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso
            }
        })
        articulosCarrito = [...cursos]
       
   }else{
        articulosCarrito = [...articulosCarrito, infoCurso]
   }    

   carritoHTML()
}

function carritoHTML(){
     limpiarHTML()

     articulosCarrito.forEach(curso => {
         const {imagen, titulo, parrafo, id, cantidad} = curso;
        const row = document.createElement('tr')

        row.innerHTML = `
            <td>
            <img src="${imagen}" width=100>
            </td>
            <td>${titulo}</td>
            <td>${parrafo}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        contenedorCarrito.appendChild(row)
     })
     sincronizar()
}

function sincronizar(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
    return false;
}