import Producto from "../models/Producto.js";
import StorageService from "../models/Storage.js";
import { PintarProductos } from "./product.js";

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

export const existeEnCarrito = (ProductID) =>{
    let carrito = [] ;
    let existeEnCarrito = false;
    if(StorageService.getItem('carrito').length > 0 ) carrito = StorageService.getItem('carrito');
    if(carrito.length > 0 && carrito.some((item)=> item.id == ProductID)){
        existeEnCarrito = true;
    }
    return existeEnCarrito;
}
export const agregarEnCarrito = (prod,quant) =>{
    let carrito = StorageService.getItem('carrito');
    let productos = StorageService.getItem('productos');
    let productoArestarStock = productos.find((item)=> item.getPid == prod.getPid);
    productoArestarStock.setStock = productoArestarStock.getStock - quant;
    carrito.push(new Producto(
            prod.getPid,
            prod.getNombre,
            prod.getDescripcion,
            prod.getPrecioFinal,
            prod.getDescuento,
            quant,//Cantidad
            prod.getImg,
            prod.getDayOffer
        ));
    StorageService.setItem('carrito',carrito);
    StorageService.setItem('productos',productos);
}

export const sumarEnCarrito = (prod,quant)=>{
    let carrito = StorageService.getItem('carrito');
    let productos = StorageService.getItem('productos');
    let productoCarrritoAsumar = carrito.find((item)=> item.getPid == prod.getPid);
    let productoArestarStock = productos.find((item)=> item.getPid == prod.getPid);
    if(productoArestarStock.getStock - quant < 0) return;
    productoCarrritoAsumar.stock += quant;
    productoArestarStock.setStock = productoArestarStock.getStock - quant;
    StorageService.setItem('carrito',carrito);
    StorageService.setItem('productos',productos);
}