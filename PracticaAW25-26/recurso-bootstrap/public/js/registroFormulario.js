const registrarFormulario = document.getElementById("register");

const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const contrasenia = document.getElementById("contrasenia");
const telefono = document.getElementById("telefono");
const concesionario = document.getElementById("concesionario");

const err_name = document.getElementById("err_name");
const err_correo = document.getElementById("err_correo");
const err_contrasenia = document.getElementById("err_contrasenia");
const err_telefono = document.getElementById("err_telefono");
const err_concesionario = document.getElementById("err_concesionario");

// Validaciones individuales
function validarNombre() {
  const valor = nombre.value;
  if (valor.length < 3) {
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

function validarCorreo() {
  const valor = correo.value;
  if (!valor.endsWith("@gmail.com")) {
    err_correo.textContent = "El correo debe terminar en @gmail.com.";
    correo.classList.add("is-invalid");
    correo.classList.remove("is-valid");
    return false;
  } else {
    err_correo.textContent = "";
    correo.classList.remove("is-invalid");
    correo.classList.add("is-valid");
    return true;
  }
}

function validarContrasenia() {
  const valor = contrasenia.value;
  if (valor.length < 8) {
    err_contrasenia.textContent = "La contraseña debe contener al menos 8 caracteres.";
    contrasenia.classList.add("is-invalid");
    contrasenia.classList.remove("is-valid");
    return false;
  } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).+$/.test(valor)) {
    err_contrasenia.textContent = "Debe contener al menos 1 mayúscula, 1 número y 1 carácter especial.";
    contrasenia.classList.add("is-invalid");
    contrasenia.classList.remove("is-valid");
    return false;
  } else {
    err_contrasenia.textContent = "";
    contrasenia.classList.remove("is-invalid");
    contrasenia.classList.add("is-valid");
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
    correo.classList.remove("is-valid");
    correo.classList.remove("is-invalid");
    contrasenia.classList.remove("is-valid");
    contrasenia.classList.remove("is-invalid");
    telefono.classList.remove("is-valid");
    telefono.classList.remove("is-invalid");
    concesionario.classList.remove("is-valid");
    concesionario.classList.remove("is-invalid");
    err_name.textContent="";
    err_correo.textContent="";
    err_contrasenia.textContent="";
    err_telefono.textContent="";
    err_concesionario="";
}

function validarConcesionario() {
  if (concesionario.value === "Open this select menu") {
    err_concesionario.textContent = "Debes escoger un concesionario";
    concesionario.classList.add("is-invalid");
    concesionario.classList.remove("is-valid");
    return false;
  } else {
    err_concesionario.textContent = "";
    concesionario.classList.remove("is-invalid");
    concesionario.classList.add("is-valid");
    return true;
  }
}

// Validación dinámica mientras escribes / cambias
nombre.addEventListener("input", validarNombre);
correo.addEventListener("input", validarCorreo);
contrasenia.addEventListener("input", validarContrasenia);
telefono.addEventListener("input", validarTelefono);
concesionario.addEventListener("change", validarConcesionario);

// Validación al enviar
registrarFormulario.addEventListener("submit", function(event) {
  let valido =
    validarNombre() &
    validarCorreo() &
    validarContrasenia() &
    validarTelefono()&
    validarConcesionario();
  if (!valido) {
    event.preventDefault(); // bloquea envío si hay errores
  }
});