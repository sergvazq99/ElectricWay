const loginFormulario=document.getElementById("login");

const correo = document.getElementById("correo");
const contrasenia = document.getElementById("contrasenia");

const err_correo = document.getElementById("err_correo");
const err_contrasenia = document.getElementById("err_contrasenia");

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

function clearVerifications(){
    correo.classList.remove("is-valid");
    correo.classList.remove("is-invalid");
    contrasenia.classList.remove("is-valid");
    contrasenia.classList.remove("is-invalid");
    err_correo.textContent="";
    err_contrasenia.textContent="";
}


correo.addEventListener("input", validarCorreo);
contrasenia.addEventListener("input", validarContrasenia);

loginFormulario.addEventListener("submit", function(event) {
  let valido =
    validarCorreo() &
    validarContrasenia();
  if (!valido) {
    event.preventDefault(); 
  }
});