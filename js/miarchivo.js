//Declaración del array (utilizando lo que haya almacenado en el storage):
let productos 
let almacenados = JSON.parse (localStorage.getItem("lista"));
if (almacenados) {
    productos = almacenados
} else {
    productos = []
}

//Constructor de objetos : 
class Producto {
    constructor(literal) {
        this.id = productos.length
        this.tipo  = literal.tipo;
        this.marca = literal.marca;
        this.talle = literal.talle;
        this.precio = parseFloat(literal.precio);
        this.cantidad = literal.cantidad
    }
}

//Relacionando el contructor de objetos con el DOM:
const formulario = document.getElementById ("form")
const tipo = document.getElementById ("tipo")
const marca = document.getElementById ("marca")
const precio = document.getElementById ("precio")
const talle = document.getElementById ("talle")
const cantidad = document.getElementById ("cantidad")

//Botón "Agregar" para construir objetos, agregarlos al array y al storage: 

formulario.addEventListener ('submit', (e) => {
    
    e.preventDefault();

    if (!tipo.value || !marca.value || !talle.value || !precio.value) {

        swal("Por favor, ingresá los datos solicitados")
    
    }else if(!/^[a-zA-Z]+$/.test(tipo.value)) {
        swal("ingresá sólo letras en 'Tipo'")
    }
    else if (isNaN(precio.value)) {
        swal("Ingresá sólo números en 'Precio'")
    }
    else if (cantidad.value <= 0) {
        swal("Cantidad mínima 1 item")
    }
    else {

    productos.push (new Producto ({tipo: tipo.value, marca: marca.value, talle: talle.value, precio: precio.value, cantidad: cantidad.value, }))

    Toastify({
        text: "Item agregado!",
        duration: 3000,
        gravity: 'bottom',
        position: 'right'
    }).showToast();

    localStorage.setItem ('lista', JSON.stringify(productos)) }
      
}) 


//Notificación al cargar página:

let productosGuardados = JSON.parse (localStorage.getItem("lista"));

notificacionInicial = () => { 

    return new Promise ((resolve, reject) => {
           
           productosGuardados.length > 0 ? resolve (): reject ();
         })
}  

window.onload = () => {
   notificacionInicial ()
    .then ((response) => {
        setTimeout(()=>{ 
            Toastify({
                text: "Hay productos guardados",
                duration: 5000,
                gravity: 'bottom',
                position: 'right'
            }).showToast()}, 2000
        )
})
    .catch ((err) => {
        setTimeout( ()=>{
            Toastify({
                text: "No hay productos guardados",
                duration: 5000,
                gravity: 'bottom',
                position: 'right'
            }).showToast()}, 2000
        )
})}
      
       
//Botón "Ver lista": 

const verlista = document.getElementById ("btn2")
const salida = document.createElement ("div");
document.body.appendChild (salida);

verlista.addEventListener ('click', (e) => {
    e.preventDefault ();

    salida.innerHTML = '';
    
    for (const prod of productos) {
        let divLista = document.createElement ('div');
        divLista.innerHTML = `<p> Tipo: ${prod.tipo}, Marca: ${prod.marca}, Talle: ${prod.talle}, Precio: ${prod.precio}, Cantidad: ${prod.cantidad} <p>`;
        //boton "eliminar":
        let prodId = prod.id  
        let botonEliminar = document.createElement ('input')
        botonEliminar.type = "button"
        botonEliminar.value = "Eliminar"
        divLista.append (botonEliminar)
        
        botonEliminar.addEventListener ('click', () =>{
            
            productos = productos.filter (el=> el.id !== prodId);
            divLista.remove();
            localStorage.clear()
            localStorage.setItem ('lista', JSON.stringify(productos))
        })
     
        salida.appendChild(divLista);
    }
})

//Botón Archivo:

const archivo = document.getElementById ("btn3")
const salida2 = document.createElement ('div')
const botonOcultar = document.createElement ("input")
botonOcultar.type = "button"
botonOcultar.value ="Ocultar"

document.body.appendChild (salida2)  

archivo.addEventListener ('click', (e)=> {
    e.preventDefault ();
     
    salida2.innerHTML ='';
    fetch ('../datos/datos.json')
            .then ((resp) => resp.json())
            .then ((data) => { 
                data.forEach(info => {
                const divDatos = document.createElement ("div");
                divDatos.innerHTML = `<p> Tipo: ${info.tipo}, Marca: ${info.marca}, Talle: ${info.talle}, Precio: ${info.precio}, Cantidad: ${info.cantidad} <p>`  
                salida2.appendChild (divDatos) 
                botonOcultar.addEventListener ('click', () =>{
                divDatos.remove()
                botonOcultar.remove()
                })
                salida2.appendChild (botonOcultar)

                }) 
            })
})

            
         
        


            

                

                
        











//METER API


//BOOTSRAP

//CONDICIONALES DE INPUT
//set time out inicio


