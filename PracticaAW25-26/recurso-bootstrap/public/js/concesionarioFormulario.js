const concesionarioFormulario=document.getElementById("concessionaire");

const nombre = document.getElementById("nombre");
const ciudad = document.getElementById("ciudad");
const direccion = document.getElementById("direccion");
const telefono = document.getElementById("telefono");

const err_name = document.getElementById("err_name");
const err_ciudad = document.getElementById("err_ciudad");
const err_direcc = document.getElementById("err_direcc");
const err_telefono = document.getElementById("err_telefono");

function validarNombre() {
  const valor = nombre.value;
  if (valor.length < 5) {
    err_name.textContent = "El nombre debe contener como mínimo 3 caracteres.";
    nombre.classList.add("is-invalid");
    nombre.classList.remove("is-valid");
    return false;
  } else if (/[0-9]/.test(valor)) {
    err_name.textContent = "El nombre no puede contener números.";
    nombre.classList.add("is-invalid");
    nombre.classList.remove("is-valid");
    return false;
  } else {
    err_name.textContent = "";
    nombre.classList.remove("is-invalid");
    nombre.classList.add("is-valid");
    return true;
  }
}

function validarCiudad(){
    const valor=ciudad.value;

    if(/[0-9]/.test(valor)){
        err_ciudad.textContent="Una ciudad no puede contener números";
        ciudad.classList.add("is-invalid");
        ciudad.classList.remove("is-valid");
        return false;
    }
    else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).+$/.test(valor)){
        err_ciudad.textContent="Una ciudad no puede contener símbolos";
        ciudad.classList.add("is-invalid");
        ciudad.classList.remove("is-valid");
        return false;
    }
    else{
        err_ciudad.textContent="";
        ciudad.classList.remove("is-invalid");
        ciudad.classList.add("is-valid");
        return true;
    }
}

function validarDireccion(){
    const valor=direccion.value;

    if(valor.length>30){
        err_direcc.textContent="Dirección demasiado larga";
        direccion.classList.add("is-invalid");
        direccion.classList.remove("is-valid");
        return false;
    }
    else{
        err_direcc.textContent="";
        direccion.classList.remove("is-invalid");
        direccion.classList.add("is-valid");
        return true;
    }
}

function validarTelefono() {
  const valor = telefono.value;
  if (valor.length !== 9) {
    err_telefono.textContent = "Número de teléfono incorrecto (debe tener 9 cifras).";
    telefono.classList.add("is-invalid");
    telefono.classList.remove("is-valid");
    return false;
  } else if (/[A-Za-z]/.test(valor)) {
    err_telefono.textContent = "El número de teléfono no puede contener letras.";
    telefono.classList.add("is-invalid");
    telefono.classList.remove("is-valid");
    return false;
  } else {
    err_telefono.textContent = "";
    telefono.classList.remove("is-invalid");
    telefono.classList.add("is-valid");
    return true;
  }
}

function clearVerifications(){
    nombre.classList.remove("is-valid");
    nombre.classList.remove("is-invalid");
    ciudad.classList.remove("is-valid");
    ciudad.classList.remove("is-invalid");
    direccion.classList.remove("is-valid");
    direccion.classList.remove("is-invalid");
    telefono.classList.remove("is-valid");
    telefono.classList.remove("is-invalid");
    err_name.textContent="";
    err_ciudad.textContent="";
    err_direcc.textContent="";
    err_telefono.textContent="";
}

nombre.addEventListener("input", validarNombre);
ciudad.addEventListener("input", validarCiudad);
direccion.addEventListener("input", validarDireccion);
telefono.addEventListener("input", validarTelefono);

concesionarioFormulario.addEventListener("submit", function(event) {
    let valido =validarNombre() &validarCiudad() &validarDireccion() &validarTelefono();
    
    if (!valido) {
        event.preventDefault();
    }
});