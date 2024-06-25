export default class Producto{
    id;
    nombre;
    descripción;
    precio;
    descuento;
    stock;
    img;
    dayOffer;
    static pid;
    constructor(id=Producto.pid,nombre,descripcion,precio,descuento=1,stock, img,dayOffer=false){
        Producto.pid += 1;
        this.id = parseInt(id);
        this.nombre = nombre;
        this.descripción = descripcion;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.img = img;
        this.dayOffer = dayOffer;
        if(descuento === 0) this.descuento = 1;
        else this.descuento = parseInt(descuento);
    }
    get getPrecioFinal(){
        return parseFloat(this.precio - (parseFloat(this.precio * this.descuento))/100);
    }

    get getPrecio(){
        return parseFloat(this.precio);
    }
    set setPrecio(precio){
        this.precio = parseFloat(precio);
    }

    get getDescuento(){
        return this.descuento.toString();
    }
    set setDescuento(descuento){
        this.descuento = parseInt(descuento);
    }

    get getStock(){
        return this.stock;
    }
    set setStock(stock){
        this.stock = stock;
    }
    
    get getNombre(){
        return this.nombre;
    }
    set setNombre(nombre){
        this.nombre = nombre;
    }

    get getPid(){
        return this.id;
    }
    set setPid(id){
        this.id = parseInt(id);
    }

    get getDescripcion(){
        return this.descripción;
    }
    set setDescripcion(descripcion){
        this.descripción = descripcion;
    }
    get getImg(){
        return (this.img);
    }
    set setImg(img){
        this.img = String.toString(img);
    }
    get getDayOffer(){
        return this.dayOffer;
    }
    set setDayOffer(dayOffer){
        this.dayOffer = dayOffer;
    }
}