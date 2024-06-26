import Producto from "../models/Producto.js";
import StorageService from "../models/Storage.js";

export const mainOffersButtons = () => {
    const mainOffers = document.querySelector('#moreOffersSlider');
    const prev = document.querySelector('#mainOffers-Prev');
    const next = document.querySelector('#mainOffers-Next');
    prev.addEventListener('click', ()=>{
        mainOffers.scrollLeft -= 200;
    });
    next.addEventListener('click', ()=>{
        mainOffers.scrollLeft += 200;
    });

}

export const pintarSliderMasOfertas_Storage = ()=>{
    
    const productos = StorageService.getStoredProductos();
    if(!productos) return;

    const productosOfertas = productos.filter((item)=> item.getDescuento > 1 && !item.getDayOffer);

    if(productosOfertas.length > 0){
        const MoreOffersContainer = document.getElementById('moreOffersSlider');
        const fragment = document.createDocumentFragment();
        const templateCardSliderContainer = document.getElementById('templateCardMoreOffers').content;
        
        if (!MoreOffersContainer || !templateCardSliderContainer) return;
        
        MoreOffersContainer.innerHTML = '';
        productosOfertas.forEach((item)=>{
            const clone = templateCardSliderContainer.cloneNode(true);
            const link = clone.querySelector('a');
            const img = clone.querySelector('img');
            const precioSinDescuento = clone.querySelector('#precioSinDescuento');
            const descuento = clone.querySelector('#descuento');
            const precioFinal = clone.querySelector('.card__price span');
            const envio = clone.querySelector('.card__shipment span');

            //dataset
            link.dataset.id = item.getPid;
            //textContent
            
            link.textContent = item.getNombre;
            img.src = item.getImg;
            precioSinDescuento.textContent = "$ "+ item.getPrecio;
            precioFinal.textContent = "$" + item.getPrecioFinal;
            descuento.textContent = " " + item.getDescuento + "% OFF";
            envio.textContent = 'Envio Gratis';
            link.insertBefore(img, link.firstChild);
            fragment.appendChild(clone);
        })
        MoreOffersContainer.appendChild(fragment);
        
    }
}