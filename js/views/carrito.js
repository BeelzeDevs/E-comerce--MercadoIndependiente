export const ajusteCSSCarrito=()=> {
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
