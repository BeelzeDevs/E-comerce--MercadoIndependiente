import StorageService from "./models/Storage.js";
import {preventFormSubmit, toggleVisibilidadForm,formCaptureData_iniciarSesion,formCaptureData_CrearCuenta} from './views/iniciarSesion.js';
import {MainOffersButtons} from './views/home.js';

document.addEventListener('DOMContentLoaded', (e)=>{
    if(window.location.pathname.includes('iniciar-sesion')){
        preventFormSubmit('formIniciarSesion');
        preventFormSubmit('formCrearCuenta');
        toggleVisibilidadForm('modal-crearCuenta','crearCuenta-btnCancelar');
        toggleVisibilidadForm('modal-crearCuenta','crearCuenta');

    }
    if(window.location.pathname.includes('index')){
        MainOffersButtons();
        mostrarModal();
    
    }
    
});
document.addEventListener('submit', (e)=>{
    if(window.location.pathname.includes('iniciar-sesion')){
        if(e.target.id === 'formCrearCuenta'){
            formCaptureData_CrearCuenta(e);
        }
        if(e.target.id === 'formIniciarSesion'){
            formCaptureData_iniciarSesion(e);
        }   
    }
    
})

document.addEventListener('click', (e)=>{
    if(window.location.pathname.includes('iniciar-sesion')){
       if(e.target.id === 'crearCuenta'){ 
        document.querySelector('.sesion-container').style.opacity = 0.4;
       }
       if(e.target.id === 'crearCuenta-btnCancelar'){
        document.querySelector('.sesion-container').style.opacity = 1;
       }

    }
})



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







