import StorageService from "./models/Storage.js";
import {preventFormSubmit, toggleVisibilidadForm,formCaptureData_iniciarSesion,formCaptureData_CrearCuenta} from './views/iniciarSesion.js';
import {mainOffersButtons,pintarSliderMasOfertas_Storage} from './views/home.js';
import {mostrarModalCarrito} from './views/carrito.js';
import {PintarProductos,modalAñadirProducto_eventoIrCarrito} from './views/product.js';

document.addEventListener('DOMContentLoaded', async (e)=>{
    await StorageService.startStorage();
    mostrarModalCarrito();

    if(window.location.pathname.includes('iniciar-sesion')){
        preventFormSubmit('formIniciarSesion');
        preventFormSubmit('formCrearCuenta');
        toggleVisibilidadForm('modal-crearCuenta','crearCuenta-btnCancelar');
        toggleVisibilidadForm('modal-crearCuenta','crearCuenta');

    }
    if(window.location.pathname.includes('index')){
        await pintarSliderMasOfertas_Storage();
        mainOffersButtons(); 
    }
    if(window.location.pathname.includes('producto')){
        await PintarProductos();
        modalAñadirProducto_eventoIrCarrito();
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











