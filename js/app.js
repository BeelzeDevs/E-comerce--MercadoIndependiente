import StorageService from "./models/Storage.js";
import {preventFormSubmit, toggleVisibilidadForm,formCaptureData_iniciarSesion,formCaptureData_CrearCuenta} from './views/iniciarSesion.js';
import {MainOffersButtons} from './views/home.js';
import {mostrarModalCarrito,mostrarModalAñadirProducto} from './views/carrito.js';

document.addEventListener('DOMContentLoaded', (e)=>{
    StorageService.startStorage();
    mostrarModalCarrito();

    if(window.location.pathname.includes('iniciar-sesion')){
        preventFormSubmit('formIniciarSesion');
        preventFormSubmit('formCrearCuenta');
        toggleVisibilidadForm('modal-crearCuenta','crearCuenta-btnCancelar');
        toggleVisibilidadForm('modal-crearCuenta','crearCuenta');

    }
    if(window.location.pathname.includes('index')){
        MainOffersButtons(); 
    }
    if(window.location.pathname.includes('producto')){
        mostrarModalAñadirProducto();
    }
    if(window.location.pathname.includes('contacto')){
        e.preventDefault();// trabajar en el formulario para enviar el mail
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











