//Constructor objetos:

class Producto {
    constructor(tipo, marca, talle, precio ) {
        this.tipo  = tipo;
        this.marca = marca;
        this.talle = talle;
        this.precio  = parseFloat(precio);
    }
}

const formulario = document.getElementById ("form")
const tipo = document.getElementById ("tipo")
const marca = document.getElementById ("marca")
const precio = document.getElementById ("precio")
const talle = document.getElementById ("talle")
const verlista = document.getElementById ("btn2")

const productos = [] 

//botón Agregar: 

formulario.addEventListener ('submit', (e) => {
    
    e.preventDefault();

    productos.push (new Producto (tipo.value, marca.value, talle.value, precio.value))
    
    localStorage.setItem ('lista', JSON.stringify(productos))

    salida.innerHTML = '';
    
    for (const producto of productos) {
        let divProducto = document.createElement ("div");
        divProducto.innerHTML = `<p>ITEM AGREGADO<p>`
        salida.appendChild(divProducto);
    }
})

const salida = document.createElement ("div");
document.body.appendChild (salida);

//botón Ver lista: 

verlista.addEventListener ('click', (e) => {
    e.preventDefault ();

    let productos2 = JSON.parse (localStorage.getItem("lista"));

    salida2.innerHTML = '';

    for (const prod of productos2) {
        let divLista = document.createElement ('div');
        divLista.innerHTML = `<p> Tipo: ${prod.tipo}, Marca: ${prod.marca}, Talle: ${prod.talle}, Precio: ${prod.precio} <p>`;
        salida2.appendChild(divLista);

    }
})

const salida2 = document.createElement ("div");
document.body.appendChild (salida2);




