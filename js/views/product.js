import Producto from '../models/Producto.js';
import StorageService from '../models/Storage.js';
import {ajusteCSSCarrito, existeEnCarrito , agregarEnCarrito} from './carrito.js';

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

    btn.addEventListener('click', ()=>{
        
        modalProducto.classList.add('modal-show');
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
            console.log(btn.dataset.pid);
            console.log('existe');
        }else{
            agregarEnCarrito(product,quant);
        }
    })
}

export const PintarProductos = ()=>{
    const productData =  StorageService.getItem('productos');

    const templateProductCard = document.getElementById('templateProductCard').content;
    const productList = document.getElementById('productList');
    const fragment = document.createDocumentFragment();
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
        //evento
        addEventBtn_mostrarModalAñadirProducto(btnAddCart);
        addEventBtn_agregarCarrito(btnAddCart);
        //textContent
        productImgLink.href = '../index.html';
        productImgSource.src = '../' + element.getImg;
        productLink.src = '../index.html';
        productLink.textContent = element.getDescripcion;
        productPrice.textContent = '$ ' + element.getPrecioFinal;
        productStock.textContent = "Stock: " + element.getStock;
        productquant.textContent = 1;
        fragment.appendChild(item);
    });
    productList.appendChild(fragment);
}

function buscarProducto(ProductID){
    let productos = StorageService.getItem('productos');
    return productos.filter((item)=> item.getPid == ProductID)[0];
}
function buscarCantidad(ProductID){
    const quant = document.querySelector(`.item__quant[data-pid='${ProductID}']`);
    return quant ? quant.textContent : null;
}