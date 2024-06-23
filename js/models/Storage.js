export default class StorageService{

    static setItem(key,value){
        localStorage.setItem(key,JSON.stringify(value));

    }
    static getItem(key){
        JSON.parse(localStorage.getItem(key));
    }

    static startStorage(){
        
    }
}