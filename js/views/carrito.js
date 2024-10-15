import Producto from "../models/Producto.js";
import StorageService from "../models/Storage.js";
import { PintarProductos, buscarProducto } from "./product.js";


export const mostrarModalCarrito =()=> {
    const modalCarrito = document.querySelector('.modal-carrito');
    const carritoModalBtn = document.querySelector('#modal-carritobtn');
    const modalCarritoContainer = document.querySelector('.carritoModal-btnContainer');
    carritoModalBtn.addEventListener('click', () => {
        modalCarrito.classList.toggle('modal-show');
        const widthOffset = modalCarrito.offsetWidth;

        carritoModalBtn.classList.toggle('bi-cart4');
        carritoModalBtn.classList.toggle('bi-x-lg');

        if(modalCarrito.classList.contains('modalcarrito-animate-left')){
            modalCarritoContainer.style.left = "0px";
            modalCarrito.classList.remove('modalcarrito-animate-left');
            modalCarrito.classList.add('modalcarrito-animate-right');
            modalCarritoContainer.classList.remove('modalcarritoBtn-animate-left');
            modalCarritoContainer.classList.add('modalcarritoBtn-animate-right');
            
        } else if(modalCarrito.classList.contains('modalcarrito-animate-right')){
            modalCarritoContainer.style.left = widthOffset + 35 + "px";
            modalCarrito.classList.remove('modalcarrito-animate-right');
            modalCarrito.classList.add('modalcarrito-animate-left');
            modalCarritoContainer.classList.add('modalcarritoBtn-animate-left');
            modalCarritoContainer.classList.remove('modalcarritoBtn-animate-right');
        }
        else{
            modalCarritoContainer.style.left = widthOffset + 35 + "px";
            modalCarrito.classList.add('modalcarrito-animate-left');
            modalCarritoContainer.classList.add('modalcarritoBtn-animate-left');
        }
    });
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
}
export const PintarCarritoHtml = () =>{
    const totalCarritoWeb = document.getElementById('totalCarritoWeb');
    let acumTotalCarrito = 0;
    let carrito = StorageService.getItem('carrito');
    const templateCarritoWebItem = document.getElementById('template-carrito-web').content;
    const carritoArticletoCreate = document.getElementById('carrito-items');
    const fragment = document.createDocumentFragment();
    // carrito web
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
        let subTotalMount = parseFloat((item.getPrecio * item.getStock).toFixed(2));
        let formattedTotal = subTotalMount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        
        subtotal.innerHTML =`<span class"remark">$</span> ${formattedTotal}`;
        acumTotalCarrito += parseFloat(item.getPrecio * item.getStock);

        fragment.appendChild(itemArticle);

    });
    carritoArticletoCreate.appendChild(fragment);

    carrito.forEach((prod)=>{
        const ProductID = prod.getPid;
        const btnLess = document.querySelector(`.carrito-btnLess[data-pid='${ProductID}']`);
        const btnMore = document.querySelector(`.carrito-btnMore[data-pid='${ProductID}']`);
        const btnVaciar = document.getElementById('carritoVaciar');

        addEventBtn_carritoBtnMas(btnMore);
        addEventBtn_carritoBtnMenos(btnLess);
        addEventBtn_carritoVaciar(btnVaciar);

    });
    let acumTotal = parseFloat(acumTotalCarrito.toFixed(2));
    let formattedAcumTotal = acumTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    totalCarritoWeb.innerHTML = `<p id="totalCarritoWeb">Total: <span class="remark">$ </span>${formattedAcumTotal}</p>`;
}
export const PintarCarritoModal = () => {
    
    let acumTotalCarrito = 0;
    let carrito = StorageService.getItem('carrito');
    const fragment = document.createDocumentFragment();
    const modalCarritoItems = document.getElementById('modal-carrito-productos');
    const templateCarritoModal = document.getElementById('template-carrito-modal').content;
    const totalCarritoModal = document.querySelector('.carrito-total');

    modalCarritoItems.innerHTML = '';
    carrito.forEach((prod)=>{
        const clone = templateCarritoModal.cloneNode(true);
        const img = clone.querySelector('.producto-info img');
        const descripcion = clone.querySelector('.producto-info p');
        const btnLess = clone.querySelector('.btnLess');
        const btnMore = clone.querySelector('.btnMore');
        const quant = clone.querySelector('.producto-cantidad p');
        const subtotal = clone.querySelector('.producto-subtotal p');

        btnLess.dataset.pid = prod.getPid;
        btnMore.dataset.pid = prod.getPid;
        quant.dataset.pid = prod.getPid;
        
        img.src = `../${prod.getImg}`;
        descripcion.textContent = prod.getDescripcion;
        quant.textContent = prod.getStock;
        let subTotalMount = parseFloat((prod.getPrecio * prod.getStock).toFixed(2));
        let formattedTotal = subTotalMount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        
        subtotal.innerHTML =`<span class"remark">$</span> ${formattedTotal}`;
        acumTotalCarrito += parseFloat(prod.getPrecio * prod.getStock);

        fragment.appendChild(clone);
    });

    modalCarritoItems.appendChild(fragment);
    acumTotalCarrito = acumTotalCarrito.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2});
    totalCarritoModal.innerHTML=`<span class="remark">$</span>${acumTotalCarrito}`;

    // eventos
    carrito.forEach((prod)=>{
        const ProductID = prod.getPid;
        const btnLess = document.querySelector(`.btnLess[data-pid="${ProductID}"]`);
        const btnMore = document.querySelector(`.btnMore[data-pid="${ProductID}"]`);
        const btnVaciar = document.getElementById('vaciarCarritoModal');

        
        addEventBtn_carritoBtnMas(btnMore);
        addEventBtn_carritoBtnMenos(btnLess);
        addEventBtn_carritoVaciar(btnVaciar);
    })
    
    



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
export const modalCarrito_defaultReset = ()=> {
    const carritoModalBtnContainer = document.querySelector('.carritoModal-btnContainer');
    const carritoModalBtn = document.querySelector('#modal-carritobtn');
    const modalCarrito = document.querySelector('.modal-carrito');
    if(carritoModalBtnContainer.classList.contains('modalcarritoBtn-animate-left')){
        modalCarrito.className = 'modal-carrito modalcarrito-animate-right';
        carritoModalBtnContainer.className = 'carritoModal-btnContainer modalcarritoBtn-animate-right';
        carritoModalBtn.className = 'bi bi-cart4'        
    }
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
        if(window.location.pathname.includes('carrito')) PintarCarritoHtml();
        if(window.location.pathname.includes('producto')) PintarProductos();
        PintarCarritoModal();
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
        if(window.location.pathname.includes('carrito')) PintarCarritoHtml();
        if(window.location.pathname.includes('producto')) PintarProductos();
        PintarCarritoModal();
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
            if(window.location.pathname.includes('carrito')) PintarCarritoHtml();
            if(window.location.pathname.includes('producto')) PintarProductos();
            PintarCarritoModal();

        });

}

function buscarCarritoProd(ProductID){
    const carrito = StorageService.getItem('carrito');
    return carrito.filter((item)=>item.getPid === ProductID)[0];
}
