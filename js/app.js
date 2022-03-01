let textoA ='comision-20025';
let textoB = 'Nelson-Andrada';

console.log('Mi clase es :  ' + textoA + '  y mi nombre es:   ' + textoB);

// Uso de Ajax para mostrar productos de un archivo JSON local

const cards = document.getElementById("cards")
const items = document.getElementById("items")
const footer = document.getElementById("footer")
const templateCard = document.getElementById("template-card").content
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content
const fragment = document.createDocumentFragment()
let carrito = {}

// Traer productos de mi json
cards.addEventListener("click", e=>{
    addCarrito(e)
})

items.addEventListener("click", e => {
    btnAccion(e)
})
const fetchData = async () => {
    try {
        const res = await fetch("js/stock.json")
        const data = await res.json()
        mostrarCards(data)
    }catch (error){
        console.log(error)
    }
}
document.addEventListener('DOMContentLoaded', e => {
    fetchData()
    if(localStorage.getItem("carrito")) {
       carrito = JSON.parse(localStorage.getItem("carrito"))
       mostrarCarrito()
    }
})    
// cards.addEventListener('click', e => { addCarrito(e) });
//items.addEventListener('click', e => { btnAccion(e) }) 

// Mostrar tarjetas de stock.json
const mostrarCards = data => {
    //console.log(data)
    data.forEach(producto => {
       templateCard.querySelector("h5").textContent = producto.nombre
       templateCard.querySelector("#descripcion").textContent = producto.desc
       templateCard.querySelector("#Precio").textContent = producto.precio
       templateCard.querySelector("img").setAttribute ("src",producto.img )
       templateCard.querySelector(".btn-info").dataset.id = producto.id 
       const clone = templateCard.cloneNode(true)
       fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}
// Agregar al carrito
const addCarrito = e => {
    //console.log(e.target)
    //console.log(e.target.classList.contains("btn-info"))
    if(e.target.classList.contains("btn-info")){
       setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

 const setCarrito = Objecto => {
    //console.log(Objecto)
     const producto = {
        id : Objecto.querySelector(".btn-info").dataset.id,
        nombre: Objecto.querySelector("h5").textContent,
        precio: Objecto.querySelector("#Precio").textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    mostrarCarrito()
}

 const mostrarCarrito = () => {
    //console.log(carrito)
    items.innerHTML = ""

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector("th").textContent = producto.id
        templateCarrito.querySelectorAll("td")[0].textContent = producto.nombre
        templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad
        templateCarrito.querySelector(".btn-info").dataset.id = producto.id
        templateCarrito.querySelector(".btn-danger").dataset.id = producto.id
        templateCarrito.querySelector("span").textContent = producto.cantidad * producto.precio
        
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    mostrarFooter() 

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const mostrarFooter = ()=>{
    footer.innerHTML = ""
    if (Object.keys(carrito).length === 0){
        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        return
    }
    
const nCantidad = Object.values(carrito).reduce((acc,{cantidad}) => acc + cantidad, 0)
const nPrecio = Object.values(carrito).reduce((acc,{cantidad, precio}) => acc + cantidad * precio, 0)

templateFooter.querySelectorAll("td")[0].textContent = nCantidad
templateFooter.querySelector("span").textContent = nPrecio

const clone = templateFooter.cloneNode(true)
fragment.appendChild(clone)
footer.appendChild(fragment)

const btnVaciar = document.getElementById("vaciar-carrito")
btnVaciar.addEventListener("click" , () =>{
    carrito = {}
    mostrarCarrito()
})

}

const btnAccion = e => {
    console.log(e.target)
    //Aumentar
    if(e.target.classList.contains("btn-info")){
        //console.log(carrito[e.target.dataset.id])
        //carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++ 
        carrito[e.target.dataset.id] = {...producto}
        mostrarCarrito() 
    }
    //Disminuir
    if(e.target.classList.contains("btn-danger")){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        } 
        mostrarCarrito() 
    }
    e.stopPropagation() 
} 
 
/*// Cambio de titulo con Jquery
 $(document).ready(function (){
     $('#titulo').html('Desafio clase catorce')
 });*/
// Animación con Jquery
/*var resultado = $('mostrarProductos')
 $(document).ready(function (){
     $('.btn-info').click(function(){
     resultado.animate({
         left :'250px',
         opacity:'0.5',
         height: '+=150px',
         width:'+=150px'
     },1000, function(){
         resultado.animate({
         left :'-50px',
         opacity:'1.5',
         height: '-=10px',
         width:'-=10px'
     }, 1000)
     });
     })
 });*/
// Animacion JQuery ocultar
/*$(document).ready(function(){
     $('template-carrito').click(function(){
         $('*').hide();
    });
 });*/

/*$("p").css("background-color", "pink");
$("p").css("width", "8rem");

$(".titulo").css({  "color": "#B667F1", 
                    "font-size": "40px", 
                    "borderLeft": "5px solid #ccc",
                    "padding": "50px" });
$("#estilo1").css({"font-weight":"bold"});*/
/* $(document).ready(function(){
    $('body').prepend('<h4 style="display:none"> ¡Bienvenido  de nuevo a nuestro mejor cliente!');
    $('h4').show(3000);
})
 $(document).ready(function(){
    $('body').prepend('<h4 style="display:none"> ¡Bienvenido  de nuevo a nuestro mejor cliente!');
     $('h4').hide(4000); 
 })*/

