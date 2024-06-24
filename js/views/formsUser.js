
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

export const formCaptureData_CrearCuenta = (e) =>{
    // if(e.target.value === ''){}
    const regExpEmail = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regExpNombre = /^[a-zA-Z]{4,12}( [a-zA-Z]{4,12})?$/;
    const regExpApellido = /^[a-zA-Z]{4,12}( [a-zA-Z]{4,12})?$/;
    const regExpCodPostal = /^[0-9]{4}$/;
    const regExpDireccion = /^[a-zA-Z ]{5,20} [0-9]{1,6}$/;
    const regExpProvincia = /^[a-zA-Z ]{5,30}$/;
    const regExpTel = /^[0-9+]{10}$/;
    let boleano = true;
    
    const inputs = e.target.querySelectorAll('input');
    const [email,nombre,apellido,direccion,codPostal,provincia,telefono] = inputs;
    inputs.forEach(item => {
        item.classList.remove('border-danger');
        item.style.color = 'white';
    });
    //Validaciones
    if(!regExpEmail.test(email.value)){
        email.classList.add('border-danger');
        email.style.color = 'red';
        boleano=false;
    }
    if(!regExpNombre.test(nombre.value)){
        nombre.classList.add('border-danger');
        nombre.style.color = 'red';
        boleano=false;
    }
    if(!regExpApellido.test(apellido.value)){
        apellido.classList.add('border-danger');
        apellido.style.color = 'red';
        boleano=false;
    }
    if(!regExpDireccion.test(direccion.value)){
        direccion.classList.add('border-danger');
        direccion.style.color = 'red';
        boleano=false;
    }
    if(!regExpCodPostal.test(codPostal.value)){
        codPostal.classList.add('border-danger');
        codPostal.style.color = 'red';
        boleano=false;
    }
    if(!regExpProvincia.test(provincia.value)){
        provincia.classList.add('border-danger');
        provincia.style.color = 'red';
        boleano=false;
    }
    if(!regExpTel.test(telefono.value)){
        telefono.classList.add('border-danger');
        telefono.style.color = 'red';
        boleano=false;
    }
    if(boleano){
        document.querySelector('#modal-crearCuenta').classList.toggle('d-none');
    }  
}
export const formCaptureData_iniciarSesion = (e)=>{
    console.log(e.target);
}