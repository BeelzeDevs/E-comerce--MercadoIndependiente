import StorageService from "./Storage.js";

function mostrarModal() {
    const modalProducto = document.querySelector('.modal-añadirProducto');
    const modalCarrito = document.querySelector('.modal-carrito');
    const irCarrito = document.querySelector('#ir-carrito');
    const icono = document.querySelector('.bi-brilliance');
    const carritoNavIcon = document.querySelector('#carrito');

    icono.addEventListener('click', () => {
        modalProducto.classList.toggle('modal-show');
        modalCarrito.classList.remove('modal-show');

    })
    irCarrito.addEventListener('click', () => {
        ajusteCSSCarrito();
        modalProducto.classList.toggle('modal-show');
        modalCarrito.classList.toggle('modal-show');
    })
    carritoNavIcon.addEventListener('click', () => {
        ajusteCSSCarrito()
        modalCarrito.classList.toggle('modal-show');
        
    })

    


}
function ajusteCSSCarrito() {
    const header = document.querySelector('header');
    const Carrito = document.querySelector('.modal-carrito');
    const tamañoHead = header.offsetHeight; // Obtiene la altura del elemento
    Carrito.style.top = tamañoHead + 'px';
}
function MainOffersButtons() {
    const mainOffers = document.querySelector('#mainOffersSlider');
    const prev = document.querySelector('#mainOffers-Prev');
    const next = document.querySelector('#mainOffers-Next');
    prev.addEventListener('click', ()=>{
        mainOffers.scrollLeft -= 200;
    });
    next.addEventListener('click', ()=>{
        mainOffers.scrollLeft += 200;
    });


}
mostrarModal();
MainOffersButtons();

