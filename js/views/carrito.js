import Producto from "../models/Producto.js";
import StorageService from "../models/Storage.js";
import { PintarProductos, buscarProducto } from "./product.js";

export const ajusteCSSCarrito=()=> {
    const header = document.querySelector('header');
    const Carrito = document.querySelector('.modal-carrito');
    const tamañoHead = header.offsetHeight; // Obtiene la altura del elemento
    Carrito.style.top = tamañoHead + 'px';
}
export const mostrarModalCarrito =()=> {
    // const modalCarrito = document.querySelector('.modal-carrito');
    // const carritoNavIcon = document.querySelector('#carrito');
    // carritoNavIcon.addEventListener('click', () => {
    //     ajusteCSSCarrito()
    //     modalCarrito.classList.toggle('modal-show');
        
    // });
}
export const agregarEventoBtn_headerCarrito = () =>{
    const carritoNavIcon = document.querySelector('#carrito');
    carritoNavIcon.addEventListener('click', () => {
        window.location.href = '../pages/carrito.html';
    });
}
export const actualizarBadgeProductosUnicosEnCarrito = ()=>{
    const carritoCountBadge = document.getElementsByClassName('badge rounded-pill'); 
    const carrito = StorageService.getItem('carrito');
    let contador = 0;
    carrito.forEach((element) =>{
        contador++;
    });
    carritoCountBadge[0].textContent = contador;
    console.log(carritoCountBadge);
}
export const PintarCarritoHtml = () =>{
    let carrito = StorageService.getItem('carrito');
    const templateCarritoWebItem = document.getElementById('template-carrito-web').content;
    const carritoArticletoCreate = document.getElementById('carrito-items');
    const fragment = document.createDocumentFragment();
    carritoArticletoCreate.innerHTML = '';
    carrito.forEach(item => {
        
        const clone = templateCarritoWebItem.cloneNode(true);
        const itemArticle = clone.querySelector('.carrito-item');
        const img = clone.querySelector('.carrito-productInfo img');
        const descripcion = clone.querySelector('.carrito-productInfo p');
        const quant = clone.querySelector('.carrito-productCant p');
        const subtotal = clone.querySelector('.carrito-productSubtotal p');
        const btnLess = clone.querySelector('.carrito-btnLess');
        const btnMore = clone.querySelector('.carrito-btnMore');

        itemArticle.dataset.pid = item.getPid;
        btnLess.dataset.pid = item.getPid;
        btnMore.dataset.pid = item.getPid;
        quant.dataset.pid = item.getPid;
        img.src = '../' + item.getImg;
        descripcion.textContent = item.getDescripcion;
        quant.textContent = item.getStock;
        subtotal.textContent =`$ ${parseInt(item.getPrecioFinal * item.getStock)}`;

        fragment.appendChild(itemArticle);

    });
    carritoArticletoCreate.appendChild(fragment);

    carrito.forEach((prod)=>{
        const ProductID = prod.getPid;
        const btnLess = document.querySelector(`.carrito-btnLess[data-pid='${ProductID}']`);
        const btnMore = document.querySelector(`.carrito-btnMore[data-pid='${ProductID}']`);
        const quant = document.querySelector(`.carrito-productCant p`);
        const subtotal = document.querySelector(`.carrito-productSubtotal p[data-pid='${ProductID}']`);
        const btnVaciar = document.getElementById('carritoVaciar');

        addEventBtn_carritoBtnMas(btnMore);
        addEventBtn_carritoBtnMenos(btnLess);
        addEventBtn_carritoVaciar(btnVaciar);

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


function addEventBtn_carritoBtnMenos(btnLess){
    btnLess.addEventListener('click', () => {
        const ProductID = parseInt(btnLess.dataset.pid);
        const carrito = StorageService.getItem('carrito');
        const productos = StorageService.getItem('productos');
        const Selectproducto = productos.filter((item)=> item.getPid === ProductID)[0];
        const SelectprodCarrito = carrito.filter((item)=> item.getPid === ProductID)[0];

        
        if(SelectprodCarrito.getStock - 1 > 0){
            Selectproducto.setStock = Selectproducto.getStock + 1;
            SelectprodCarrito.setStock = SelectprodCarrito.getStock - 1;
            StorageService.setItem('carrito',carrito);
            StorageService.setItem('productos',productos);
        }else{
            const newCarrito = carrito.filter((item)=> item.getPid !== ProductID);
            Selectproducto.setStock = Selectproducto.getStock + 1;
            StorageService.setItem('carrito',newCarrito);
            StorageService.setItem('productos',productos);
            actualizarBadgeProductosUnicosEnCarrito();
        }
        PintarCarritoHtml();
    })
}
function addEventBtn_carritoBtnMas(btnMore){
    btnMore.addEventListener('click',()=>{
        const ProductID = parseInt(btnMore.dataset.pid);
        const carrito = StorageService.getItem('carrito');
        const productos = StorageService.getItem('productos');
        const Selectproducto = productos.filter((item)=> item.getPid === ProductID)[0];
        const SelectprodCarrito = carrito.filter((item)=> item.getPid === ProductID)[0];

        
        if(Selectproducto.getStock - 1 >= 0){
            Selectproducto.setStock = Selectproducto.getStock - 1;
            SelectprodCarrito.setStock = SelectprodCarrito.getStock + 1;
            StorageService.setItem('carrito',carrito);
            StorageService.setItem('productos',productos);
        }else{
            return;
        }
        PintarCarritoHtml();
    })
}

function addEventBtn_carritoVaciar(btnVaciar){
   
        let carrito = StorageService.getItem('carrito');
        const productos = StorageService.getItem('productos');
        
        btnVaciar.addEventListener('click', () =>{
            carrito.forEach((item)=>{
                const quant = item.getStock;
                const prodToAddStock = productos.filter((prod)=> prod.getPid === item.getPid )[0];
                prodToAddStock.setStock = prodToAddStock.getStock + quant;
            });
            StorageService.setItem('productos',productos);
            localStorage.removeItem('carrito');
            actualizarBadgeProductosUnicosEnCarrito();
            PintarCarritoHtml();
        });

}

function buscarCarritoProd(ProductID){
    const carrito = StorageService.getItem('carrito');
    return carrito.filter((item)=>item.getPid === ProductID)[0];
}
