import Producto from "./Producto.js";

export default class StorageService{
    static url = '/json/datos.json';

    static setItem(key,value){
        localStorage.setItem(key,JSON.stringify(value));

    }
    static getItem(key){
        const data = JSON.parse(localStorage.getItem(key)) || [];
        if (key === 'productos' && data.length > 0) {
            return data.map(element => new Producto(
                element.id,
                element.nombre,
                element.descripcion,
                element.precio,
                element.descuento,
                element.stock,
                element.img,
                element.dayOffer
            ));
        }
        if(key == 'carrito' && data.length > 0){
            return data.map(element => new Producto(
                element.id,
                element.nombre,
                element.descripcion,
                element.precio,
                element.descuento,
                element.stock,
                element.img,
                element.dayOffer
            ));
        }
        else{
            return data;
        }
    }
    static async getDatos() {
        try {
            const response = await fetch(StorageService.url);
            if (!response.ok) {
                throw new Error('Problema de conexión a datos.json');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            alert(error);
            return null;
        }
    }
    static async startStorage() {
        let arrayProductos = [];
        try {
            const datos = await StorageService.getDatos();
            
            if (!datos || !datos.Productos) {
                throw new Error('No se encontraron productos en los datos');
            }

            const productos = datos.Productos;
            productos.forEach(element => {
                const producto = new Producto(
                    element.id,
                    element.nombre,
                    element.descripcion,
                    element.precio,
                    element.descuento,
                    element.stock,
                    element.img,
                    element.dayOffer
                );
                arrayProductos.push(producto);
            });
            StorageService.setItem('productos', arrayProductos);
        } catch (error) {
            console.error('Error fetch data || productos:', error);
        }
    }

    static getStoredProductos() {
        return StorageService.getItem('productos');
        
    }
}

