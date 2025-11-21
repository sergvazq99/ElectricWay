const vehiculoFormulario = document.getElementById("vehicle");

const matricula=document.getElementById("matricula");
const marca=document.getElementById("marca");
const modelo=document.getElementById("modelo");
const matriculacion=document.getElementById("matriculacion");
const plazas=document.getElementById("plazas");
const autonomia=document.getElementById("autonomia");
const color=document.getElementById("color");
const concesionario=document.getElementById("concesionario");

const err_matr=document.getElementById("err_matr");
const err_marca=document.getElementById("err_marca");
const err_modelo=document.getElementById("err_modelo");
const err_anio_matr=document.getElementById("err_anio_matr");
const err_plazas=document.getElementById("err_plazas");
const err_autonomia=document.getElementById("err_autonomia");
const err_color=document.getElementById("err_color");
const err_concesionario=document.getElementById("err_concesionario");

function validarMatricula(){
    const valor=matricula.value;

    if(valor.length!==7){
      err_matr.textContent="Error. (Matrícula debe tener 7 caracteres)";
      matricula.classList.add("is-invalid");
      matricula.classList.remove("is-valid");
      return false;
    }
    else if(!/^[A-Z]{3}[0-9]{4}$/.test(valor)){
      err_matr.textContent = "Error. La matrícula debe tener 3 letras seguidas de 4 números";
      matricula.classList.add("is-invalid");
      matricula.classList.remove("is-valid");
      return false;
    }
    else{
      err_matr.textContent="";
      matricula.classList.remove("is-invalid");
      matricula.classList.add("is-valid");
      return true;
    }
    
}

function validarMarca(){
    const valor=marca.value;
    if (valor.trim() === "") {
        err_marca.textContent = "La marca no puede estar vacía.";
        marca.classList.add("is-invalid");
        marca.classList.remove("is-valid");
        return false;
    }
    else if (valor.length < 3) {
      err_marca.textContent = "Una marca debe contener como mínimo 3 caracteres.";
      marca.classList.add("is-invalid");
      marca.classList.remove("is-valid");
      return false;
    } 
    else if (/[0-9]/.test(valor)) {
        err_marca.textContent = "Una marca no puede contener números.";
        marca.classList.add("is-invalid");
        marca.classList.remove("is-valid");
        return false;
    }
    else{
      err_marca.textContent="";
      marca.classList.remove("is-invalid");
      marca.classList.add("is-valid");
      return true;
    }
    
}

function validarModelo(){
    const valor=modelo.value;
    if (valor.trim() === "") {
        err_modelo.textContent = "El modelo no puede estar vacío.";
        modelo.classList.add("is-invalid");
        modelo.classList.remove("is-valid");
        return false;
    }
    else if (valor.length < 3) {
      err_modelo.textContent = "Un modelo debe contener como mínimo 3 caracteres.";
      modelo.classList.add("is-invalid");
      modelo.classList.remove("is-valid");
      return false;
    } 
    else{
      err_modelo.textContent="";
      modelo.classList.remove("is-invalid");
      modelo.classList.add("is-valid");
      return true;
    }
    
}

function validarMatriculacion(){
    const valor=matriculacion.value;
    if (valor.trim() === "") {
        err_anio_matr.textContent = "El año no puede estar vacío.";
        matriculacion.classList.add("is-invalid");
        matriculacion.classList.remove("is-valid");
        return false;
    }
    else if (valor.length!==4) {
        err_anio_matr.textContent = "Año incorrecto.";
        matriculacion.classList.add("is-invalid");
        matriculacion.classList.remove("is-valid");
      return false;
    } 
    else{
        err_anio_matr.textContent="";
        matriculacion.classList.remove("is-invalid");
        matriculacion.classList.add("is-valid");
      return true;
    }
    
}

function validarPlazas(){
    const valor=Number(plazas.value);
  
    if (valor<1||valor>9) {
        err_plazas.textContent = "Error. (Máximo 9 plazas).";
        plazas.classList.add("is-invalid");
        plazas.classList.remove("is-valid");
      return false;
    } 
    else if (isNaN(valor) || valor === "") {
        err_plazas.textContent = "El número de plazas no puede estar vacío o ser inválido.";
        plazas.classList.add("is-invalid");
        plazas.classList.remove("is-valid");
        return false;
    }
    else{
        err_plazas.textContent="";
        plazas.classList.remove("is-invalid");
        plazas.classList.add("is-valid");
      return true;
    }
    
}

function validarAutonomia(){
    const valor=Number(autonomia.value);
  
    if (valor>999) {
        err_autonomia.textContent = "Error. (Máximo 999 kms).";
        autonomia.classList.add("is-invalid");
        autonomia.classList.remove("is-valid");
      return false;
    } 
    else if (isNaN(valor) || valor === "") {
        err_autonomia.textContent = "Campo vacío.";
        autonomia.classList.add("is-invalid");
        autonomia.classList.remove("is-valid");
        return false;
    }
    else{
        err_autonomia.textContent="";
        autonomia.classList.remove("is-invalid");
        autonomia.classList.add("is-valid");
      return true;
    }
    
}

function validarColor(){
    const valor=color.value;
    
    if (valor==="") {
        err_color.textContent = "Elija un color.";
        color.classList.add("is-invalid");
        color.classList.remove("is-valid");
      return false;
    } 
    else if (/[0-9]/.test(valor)) {
        err_color.textContent = "Un color no puede contener números.";
        color.classList.add("is-invalid");
        color.classList.remove("is-valid");
        return false;
    }
    else{
        err_color.textContent="";
        color.classList.remove("is-invalid");
        color.classList.add("is-valid");
      return true;
    }
    
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



  function clearVerifications(){
    matricula.classList.remove("is-valid");
    matricula.classList.remove("is-invalid");
    marca.classList.remove("is-valid");
    marca.classList.remove("is-invalid");
    modelo.classList.remove("is-valid");
    modelo.classList.remove("is-invalid");
    matriculacion.classList.remove("is-valid");
    matriculacion.classList.remove("is-invalid");
    plazas.classList.remove("is-valid");
    plazas.classList.remove("is-invalid");
    autonomia.classList.remove("is-valid");
    autonomia.classList.remove("is-invalid");
    color.classList.remove("is-valid");
    color.classList.remove("is-invalid");
    concesionario.classList.remove("is-valid");
    concesionario.classList.remove("is-invalid");
    err_matr.textContent="";
    err_marca.textContent="";
    err_modelo.textContent="";
    err_anio_matr.textContent="";
    err_plazas.textContent="";
    err_autonomia.textContent="";
    err_color.textContent="";
    err_concesionario.textContent="";
}

matricula.addEventListener("input", validarMatricula);
marca.addEventListener("input", validarMarca);
modelo.addEventListener("input", validarModelo);
matriculacion.addEventListener("input", validarMatriculacion);
plazas.addEventListener("input", validarPlazas);
autonomia.addEventListener("input", validarAutonomia);
color.addEventListener("input", validarColor);
concesionario.addEventListener("change", validarConcesionario);

vehiculoFormulario.addEventListener("submit", function(event) {
    let valido =
    validarMatricula() &&
    validarMarca() &&
    validarModelo() &&
    validarMatriculacion()&&
    validarPlazas()&&validarAutonomia()&&validarColor()&&validarConcesionario();
    if (!valido) {
      event.preventDefault(); // bloquea envío si hay errores
    }
  });


