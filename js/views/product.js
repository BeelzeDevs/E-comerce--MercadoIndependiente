import Producto from '../models/Producto.js';
import StorageService from '../models/Storage.js';
import {ajusteCSSCarrito, existeEnCarrito , agregarEnCarrito,sumarEnCarrito, 
    actualizarBadgeProductosUnicosEnCarrito} from './carrito.js';

export const modalAñadirProducto_eventoIrCarrito = () =>{
    const modalProducto = document.querySelector('.modal-añadirProducto');
    const modalCarrito = document.querySelector('.modal-carrito');
    const irCarrito = document.querySelector('#ir-carrito');
   
    irCarrito.addEventListener('click', () => {
        ajusteCSSCarrito();
        modalProducto.classList.remove('modal-show');
        modalCarrito.classList.add('modal-show');
    });
}
const modalAñadirProductoTimeout = (modalProducto)=>{
    setTimeout(() => {
    modalProducto.classList.remove('modal-show');
    modalProducto.classList.add('modal-añadirProducto');
    }, 1200);
}

const addEventBtn_mostrarModalAñadirProducto = (btn) =>{
    const modalProducto = document.querySelector('.modal-añadirProducto');
    const modalCarrito = document.querySelector('.modal-carrito');
    let ProductID = parseInt(btn.dataset.pid);
    let producto = buscarProducto(ProductID);
    btn.addEventListener('click', ()=>{
        if(producto.getStock > 0) modalProducto.classList.add('modal-show');
        modalCarrito.classList.remove('modal-show');

    const interval = setInterval(modalAñadirProductoTimeout(modalProducto),0);
    clearInterval(interval);

    });

}
const addEventBtn_agregarCarrito = (btn) =>{
    let ProductID = btn.dataset.pid;
    btn.addEventListener('click',()=>{
        let product = buscarProducto(ProductID);
        let quant = buscarCantidad(ProductID);
        if(existeEnCarrito(ProductID)){
            sumarEnCarrito(product,quant);
        }else{
            agregarEnCarrito(product,quant);
            actualizarBadgeProductosUnicosEnCarrito();
        }
        PintarProductos();
    })
}

export const PintarProductos = ()=>{
    const productData =  StorageService.getItem('productos');
    const templateProductCard = document.getElementById('templateProductCard').content;
    const productList = document.getElementById('productList');
    const fragment = document.createDocumentFragment();

    productList.innerHTML = '';
    productData.forEach((element) => {
        const clone = templateProductCard.cloneNode(true);

        const item = clone.querySelector('.product-item ');
        const productImgLink = clone.querySelector('.container-image a');
        const productImgSource = clone.querySelector('.container-image img');
        const productLink = clone.querySelector('.product-item__link a');
        const productPrice = clone.querySelector('.productItem__price');
        const btnAddCart = clone.querySelector('.productItem_btnAddCart');
        const btnLessquantity = clone.querySelector('.item__btnLess');
        const btnMorequantity = clone.querySelector('.item__btnMore');
        const productStock = clone.querySelector('.productItem__stock');
        const productquant = clone.querySelector('.item__quant');
        
        //dataset
        item.dataset.pid = element.getPid;
        btnAddCart.dataset.pid = element.getPid;
        btnLessquantity.dataset.pid = element.getPid;
        btnMorequantity.dataset.pid = element.getPid;
        productquant.dataset.pid = element.getPid;
        
        //textContent
        productImgLink.href = '../index.html';
        productImgSource.src = '../' + element.getImg;
        productLink.href = '../index.html';
        productLink.textContent = element.getDescripcion;
        productPrice.textContent = '$ ' + element.getPrecioFinal;
        productStock.textContent = "Stock: " + element.getStock;
        productquant.textContent = 1;

        fragment.appendChild(item);
    });
    productList.appendChild(fragment);

    productData.forEach(element => {
        const btnMorequantity = document.querySelector(`.item__btnMore[data-pid='${element.getPid}']`);
        const btnLessquantity = document.querySelector(`.item__btnLess[data-pid='${element.getPid}']`);
        const btnAddCart = document.querySelector(`.productItem_btnAddCart[data-pid='${element.getPid}']`);

        // eventos
        addEventBtn_mostrarModalAñadirProducto(btnAddCart);
        addEventBtn_agregarCarrito(btnAddCart);
        addEventBtn_ProductoMas(btnMorequantity); 
        addEventBtn_ProductoMenos(btnLessquantity); 
    });
}

export function buscarProducto (ProductID){
    let productos = StorageService.getItem('productos');
    return productos.filter((item)=> item.getPid == ProductID)[0];
}

function buscarCantidad(ProductID){
    const quant = document.querySelector(`.item__quant[data-pid='${ProductID}']`);
    return quant ? parseInt(quant.textContent) : null;
}

function addEventBtn_ProductoMas(btn){
    let ProductID = btn.dataset.pid;
  
    let productos = StorageService.getItem('productos');
    const index = productos.findIndex((item)=> item.getPid == ProductID);
    const productquant = document.querySelector(`.item__quant[data-pid='${ProductID}']`);

    btn.addEventListener('click',()=>{
        const quant = buscarCantidad(ProductID);
        if( quant + 1 <= productos[index].getStock ){ 
            productquant.textContent = quant + 1;
        }
    });   
}       
    

function addEventBtn_ProductoMenos(btn){
    let ProductID = btn.dataset.pid;
  
    let productos = StorageService.getItem('productos');
    const index = productos.findIndex((item)=> item.getPid == ProductID);
    const productquant = document.querySelector(`.item__quant[data-pid='${ProductID}']`);

    btn.addEventListener('click',()=>{
        const quant = buscarCantidad(ProductID);
        if( quant - 1 >= 1 ){ 
            productquant.textContent = quant - 1;
        }
    }); 
}

