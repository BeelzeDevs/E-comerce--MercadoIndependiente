
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
    document.querySelector('#ayudaNombre').classList.add('d-none');
    document.querySelector('#ayudaApellido').classList.add('d-none');
    document.querySelector('#ayudaDireccion').classList.add('d-none');
    document.querySelector('#ayudaCodPostal').classList.add('d-none');
    document.querySelector('#ayudaProvincia').classList.add('d-none');
    document.querySelector('#ayudaTelefono').classList.add('d-none');
    document.querySelector('#ayudaPassword1').classList.add('d-none');
    document.querySelector('#ayudaPassword2').classList.add('d-none');
    // caracteres especiales : ñÑáéíóúÁÉÍÓÚ

    const regExpEmail = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ._%+-]{3,}@[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ.-]+\.[a-zA-Z]{2,}$/;
    const regExpPassword = /^(?=.*[A-Z])[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]+$/;
    const regExpNombre = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{4,12}( [a-zA-ZñÑáéíóúÁÉÍÓÚ]{4,12})?$/;
    const regExpApellido = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{4,12}( [a-zA-ZñÑáéíóúÁÉÍÓÚ]{4,12})?$/;
    const regExpCodPostal = /^[0-9]{4}$/;
    const regExpDireccion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{5,20} [0-9]{1,6}$/;
    const regExpProvincia = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{5,30}$/;
    const regExpTel = /^[0-9+]{10}$/;
    let boleano = true;
    
    const inputs = e.target.querySelectorAll('input');
    const [email,password1,password2,nombre,apellido,direccion,codPostal,provincia,telefono] = inputs;
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
        document.querySelector('#ayudaNombre').classList.remove('d-none');
        nombre.style.color = 'red';
        boleano=false;
    }
    if(!regExpApellido.test(apellido.value)){
        apellido.classList.add('border-danger');
        document.querySelector('#ayudaApellido').classList.remove('d-none');
        apellido.style.color = 'red';
        boleano=false;
    }
    if(!regExpDireccion.test(direccion.value)){
        direccion.classList.add('border-danger');
        document.querySelector('#ayudaDireccion').classList.remove('d-none');
        direccion.style.color = 'red';
        boleano=false;
    }
    if(!regExpCodPostal.test(codPostal.value)){
        codPostal.classList.add('border-danger');
        document.querySelector('#ayudaCodPostal').classList.remove('d-none');
        codPostal.style.color = 'red';
        boleano=false;
    }
    if(!regExpProvincia.test(provincia.value)){
        provincia.classList.add('border-danger');
        document.querySelector('#ayudaProvincia').classList.remove('d-none');
        provincia.style.color = 'red';
        boleano=false;
    }
    if(!regExpTel.test(telefono.value)){
        telefono.classList.add('border-danger');
        document.querySelector('#ayudaTelefono').classList.remove('d-none');
        telefono.style.color = 'red';
        boleano=false;
    }
    if(password1.value !== password2.value ){
        const ayudaPass1 = document.querySelector('#ayudaPassword2');
        const ayudaPass2 = document.querySelector('#ayudaPassword1');
        ayudaPass1.classList.remove('d-none');
        ayudaPass2.classList.remove('d-none');
        ayudaPass1.textContent = 'Passwords no coinciden';
        ayudaPass2.textContent = 'Passwords no coinciden';
        password1.style.color = 'red';
        password2.style.color = 'red';
        boleano = false;
    }else{
        if(!regExpPassword.test(password1.value)){
            password1.classList.add('border-danger');
            document.querySelector('#ayudaPassword1').classList.remove('d-none');
            document.querySelector('#ayudaPassword1').textContent = 'Solo letras y números, con 1 mayúscula obligatoria';
            password1.style.color = 'red';
            boleano = false;
        }else{
            document.querySelector('#ayudaPassword1').classList.add('d-none');
            password1.classList.remove('border-danger');
            password1.style.color = 'white';
        }
        if(!regExpPassword.test(password2.value)){
            password2.classList.add('border-danger');
            document.querySelector('#ayudaPassword2').classList.remove('d-none');
            document.querySelector('#ayudaPassword2').textContent = 'Solo letras y números, con 1 mayúscula obligatoria';
            password2.style.color = 'red';
            boleano = false;
        }else{
            document.querySelector('#ayudaPassword2').classList.add('d-none');
            password2.classList.remove('border-danger');
            password2.style.color = 'white';
        }   
    }
    
    if(boleano){
        document.querySelector('#modal-crearCuenta').classList.add('d-none');
        document.querySelector('.sesion-container').style.opacity = 1;
    }  
}
export const formCaptureData_iniciarSesion = (e)=>{
    console.log(e.target);
}