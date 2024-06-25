const ajusteCSSCarrito=()=> {
    const header = document.querySelector('header');
    const Carrito = document.querySelector('.modal-carrito');
    const tamañoHead = header.offsetHeight; // Obtiene la altura del elemento
    Carrito.style.top = tamañoHead + 'px';
}
export const mostrarModalCarrito =()=> {
    const modalCarrito = document.querySelector('.modal-carrito');
    const carritoNavIcon = document.querySelector('#carrito');

    carritoNavIcon.addEventListener('click', () => {
        ajusteCSSCarrito()
        modalCarrito.classList.toggle('modal-show');
        
    });
}
export const mostrarModalAñadirProducto = () =>{
    const modalProducto = document.querySelector('.modal-añadirProducto');
    const modalCarrito = document.querySelector('.modal-carrito');
    const irCarrito = document.querySelector('#ir-carrito');
    const icono = document.querySelector('.bi-brilliance');

    icono.addEventListener('click', () => {
        modalProducto.classList.toggle('modal-show');
        modalCarrito.classList.remove('modal-show');

    });    
    irCarrito.addEventListener('click', () => {
        ajusteCSSCarrito();
        modalProducto.classList.toggle('modal-show');
        modalCarrito.classList.toggle('modal-show');
    });
}