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
        }else{
            return data;
        }
    }
    static async getDatos(){
        try {
            const response = await fetch(StorageService.url)
            if(!response.ok) {
                throw new Error('Problema de Conexion a datos.json');
            }
            const data = await response.json();
            return data;
        }catch(error) {
            alert(error);
            return null;
        }
    }
    static async startStorage(){
        let arrayProductos = [];
        const datos = await StorageService.getDatos();   

        if (!datos.Productos) {
            alert('No se encontraron productos en los datos');
            return;
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
        if(datos){
            StorageService.setItem('productos',arrayProductos);
        }
    }
    static getStoredProductos() {
        const productosData = StorageService.getItem('productos');
        
    }
}

