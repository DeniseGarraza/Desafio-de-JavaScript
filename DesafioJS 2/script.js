let productos = [];
fetch("./productos.json")
  .then(response => response.json())
  .then(data => {
    productos = data;
    cargarProductos(productos);
  })






function sorteo() {
  let edad = prompt("Ingrese su edad");
  if (edad < 18) {
    alert("Sos menor de edad. No podés participar del sorteo.");
  } else {
    let sorteo = Number(
      prompt("Ingrese un numero del 1 al 10 para participar del sorteo")
    );
    switch (sorteo) {
      case 1:
        alert("Lo siento, segui participando");
        break;
      case 2:
        alert("Lo siento, segui participando");
        break;
      case 3:
        alert("Felicitaciones,ganaste una orden de compra");
        break;
      case 4:
        alert("Lo siento, segui participando");
        break;
      case 5:
        alert("Felicitaciones,ganaste una orden de compra");
        break;
      case 6:
        alert("Lo siento, segui participando");
        break;
      case 7:
        alert("Lo siento, segui participando");
        break;
      case 8:
        alert("Felicitaciones,ganaste una orden de compra");
        break;
      case 9:
        alert("Lo siento, segui participando");
        break;
      case 10:
        alert("Lo siento, segui participando");
        break;
      default:
        alert("Recuerda que es del 1 al 10");
        break;
    }
  }
}

// let productos = [
//   {
//     id: "1",
//     titulo: "Saco lola",
//     precio: 10000,
//     color: "nude",
//     imagen: "./img/outfit1.png",
//     categoria: {
//       nombre: "Abrigos",
//       id: "Abrigos",
//     },
//   },
//   {
//     id: "2",
//     titulo: "Conjunto Vero",
//     precio: 12000,
//     color: "blanco",
//     imagen: "./img/outfit2.png",
//     categoria: {
//       nombre: "Conjuntos",
//       id: "Conjuntos",
//     },
//   },
//   {
//     id: "3",
//     titulo: "Sweater Mia",
//     precio: 6000,
//     color: "marron",
//     imagen: "./img/outfit3.png",
//     categoria: {
//       nombre: "Sweaters",
//       id: "Sweaters",
//     },
//   },
//   {
//     id: "4",
//     titulo: "Conjunto Victoria",
//     precio: 12000,
//     color: "blanco",
//     imagen: "./img/conjuntowhite.png",
//     categoria: {
//       nombre: "Conjuntos",
//       id: "Conjuntos",
//     },
//   },
//   {
//     id: "5",
//     titulo: "Pantalon Rude",
//     precio: 12000,
//     color: "blanco",
//     imagen: "./img/pantalon.png",
//     categoria: {
//       nombre: "Pantalones",
//       id: "Pantalones",
//     },
//   },
//   {
//     id: "6",
//     titulo: "Saco Luz",
//     precio: 12000,
//     color: "blanco",
//     imagen: "./img/saco2.png",
//     categoria: {
//       nombre: "Abrigos",
//       id: "Abrigos",
//     },
//   },
// ];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".btn");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
      <div class="producto-detalles">
       <h3 class="titulo">${producto.titulo}</h3>
       <p class="producto-precio">${producto.precio}</p>
       <button class="btn"id="${producto.id}">Agregar</button>
      </div>
    `;

    contenedorProductos.append(div);
  });
  actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));

    e.currentTarget.classList.add("active");
    if (e.currentTarget.id != "Todos") {
      const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);

      tituloPrincipal.innerText = productoCategoria.categoria.nombre;

      const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los productos"
      cargarProductos(productos);
    }
  });
});
 
function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".btn");

  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  Toastify({
    text: "Producto agregado",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #b5a392, #b5a3925e)",
      borderRadius: '2rem'
    },
    offset: {
      x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function(){} // Callback after click
  }).showToast();
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(producto => producto.id === idBoton);

  if(productosEnCarrito.some(producto => producto.id === idBoton)){
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  actualizarNumerito();
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))

}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numerito.innerText = nuevoNumerito;
}
