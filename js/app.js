import StorageService from "./models/Storage.js";
import {preventFormSubmit, toggleVisibilidadForm,formCaptureData_iniciarSesion,formCaptureData_CrearCuenta} from './views/iniciarSesion.js';
import {mainOffersButtons,pintarSliderMasOfertas_Storage} from './views/home.js';
import {mostrarModalCarrito,agregarEventoBtn_headerCarrito,PintarCarritoHtml,actualizarBadgeProductosUnicosEnCarrito} from './views/carrito.js';
import {PintarProductos,modalAñadirProducto_eventoIrCarrito} from './views/product.js';

document.addEventListener('DOMContentLoaded', async (e)=>{
    //data
    try{
        if(StorageService.getItem('pageLoaded').length === 0){
            StorageService.setItem('pageLoaded', 'true');
            await StorageService.startStorage();

        }
    }catch(error){
        console.error('Error inicializando el storage: ', error);
    }
    // carrito badge
    actualizarBadgeProductosUnicosEnCarrito();
    //events header
    agregarEventoBtn_headerCarrito();
    mostrarModalCarrito();

    //location functions
    if(window.location.pathname.includes('iniciar-sesion')){
        preventFormSubmit('formIniciarSesion');
        preventFormSubmit('formCrearCuenta');
        toggleVisibilidadForm('modal-crearCuenta','crearCuenta-btnCancelar');
        toggleVisibilidadForm('modal-crearCuenta','crearCuenta');

    }
    if(!window.location.pathname.includes('producto') && !window.location.pathname.includes('iniciar-sesion') && !window.location.pathname.includes('contacto') && !window.location.pathname.includes('sobre-nosotros') && !window.location.pathname.includes('carrito')){
        //Posionados en el index o home, es para el deploy en vercell
        pintarSliderMasOfertas_Storage();
        mainOffersButtons(); 
    }
    if(window.location.pathname.includes('producto')){
        PintarProductos();
        modalAñadirProducto_eventoIrCarrito();
    }
    if(window.location.pathname.includes('contacto')){
        e.preventDefault();// trabajar en el formulario para enviar el mail
    }
    if(window.location.pathname.includes('carrito')){
        PintarCarritoHtml();
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












