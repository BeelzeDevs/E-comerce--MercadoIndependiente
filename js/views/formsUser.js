
export const preventFormSubmit = (formID) =>{
    const formSelected = document.getElementById(formID);
    formSelected.addEventListener('submit',(e)=>{
        e.preventDefault();
    })
};

export const toggleVisibilidadForm = (formID,btnClick) =>{
    const formSelected = document.getElementById(formID);
    const btn = document.getElementById(btnClick);
    btn.addEventListener('click', ()=>{ 
        formSelected.classList.toggle('d-none');
    })
}


if(window.location.pathname.includes('iniciar-sesion')){

    const crearCuentaLink = document.querySelector('#crearCuenta');
    const modalCrearCuenta = document.querySelector('#modal-crearCuenta');
    const formIniciarSesion = document.querySelector('#formIniciarSesion');
    
   
    formIniciarSesion.addEventListener('submit',(e)=>{
        e.preventDefault();
    })

    

}