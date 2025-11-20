const reservarFormulario = document.getElementById("reserve");

const vehicle = document.getElementById("vehiculo");
const marca=document.getElementById("marca");
const date1 = document.getElementById("date1");
const date2 = document.getElementById("date2");

const err_veh = document.getElementById("err_veh");
const err_marca = document.getElementById("err_marca");
const err_date1 = document.getElementById("err_date1");
const err_date2 = document.getElementById("err_date2");

function validarNombreVehiculo(){
    const valor=vehicle.value;
  
    if(valor.length>20){
      err_veh.textContent="El nombre de un vehículo no puede de tener más de 20 caracteres";
      vehicle.classList.add("is-invalid");
      vehicle.classList.remove("is-valid");
      return false;
    }
    else{
      err_veh.textContent="";
      vehicle.classList.remove("is-invalid");
      vehicle.classList.add("is-valid");
      return true;
    }
    
}

function validarMarcaVehiculo(){
    const valor=marca.value;
  
    if(valor.length>20){
      err_marca.textContent="La marca de un vehículo no puede de tener más de 20 caracteres";
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

function validarFechaInicio(){
    const valor = date1.value.trim();
    const hoy = new Date(); // Fecha actual
    hoy.setHours(0, 0, 0, 0); // Ajustamos la hora a 00:00 para comparar solo las fechas

    if (!valor) {
        err_date1.textContent = "Seleccione una fecha";
        date1.classList.add("is-invalid");
        date1.classList.remove("is-valid");
        return false;
    }

    const fechaInicio = new Date(valor);
    if (fechaInicio < hoy) {
        err_date1.textContent = "La fecha de inicio no puede ser anterior al día de hoy.";
        date1.classList.add("is-invalid");
        date1.classList.remove("is-valid");
        return false;
    }

    err_date1.textContent = "";
    date1.classList.remove("is-invalid");
    date1.classList.add("is-valid");
    return true;
}

function validarFechaFin(){
    const valor = date2.value.trim();
    const hoy = new Date(); // Fecha actual
    hoy.setHours(0, 0, 0, 0); // Ajustamos la hora a 00:00 para comparar solo las fechas
    const fechaInicio = new Date(date1.value); // Obtenemos la fecha de inicio

    if (!valor) {
        err_date2.textContent = "Seleccione una fecha";
        date2.classList.add("is-invalid");
        date2.classList.remove("is-valid");
        return false;
    }

    const fechaFin = new Date(valor);

    if (fechaFin < hoy) {
        err_date2.textContent = "La fecha de finalización no puede ser anterior a la fecha actual.";
        date2.classList.add("is-invalid");
        date2.classList.remove("is-valid");
        return false;
    } else if (fechaFin < fechaInicio) {
        err_date2.textContent = "La fecha de finalización no puede ser anterior a la fecha de inicio.";
        date2.classList.add("is-invalid");
        date2.classList.remove("is-valid");
        return false;
    }

    err_date2.textContent = "";
    date2.classList.remove("is-invalid");
    date2.classList.add("is-valid");
    return true;
}


function clearVerifications(){
    vehicle.classList.remove("is-valid");
    vehicle.classList.remove("is-invalid");
    date1.classList.remove("is-valid");
    date1.classList.remove("is-invalid");
    date2.classList.remove("is-valid");
    date2.classList.remove("is-invalid");
    err_veh.textContent="";
    err_date1.textContent="";
    err_date2.textContent="";
}
  
vehicle.addEventListener("input",validarNombreVehiculo);
marca.addEventListener("input", validarMarcaVehiculo);
date1.addEventListener("input",validarFechaInicio);
date2.addEventListener("input",validarFechaFin);

reservarFormulario.addEventListener("submit",async function(event){

    event.preventDefault();


    let valido=validarNombreVehiculo()&&validarFechaInicio()&&validarFechaFin()&&validarMarcaVehiculo();
  
    if(!valido){
      return; 
    }

    const data={vehiculo:vehicle.value,marca:marca.value,date1:date1.value,date2:date2.value};
    const resp=await fetch("/reserve",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)});
    const json=await resp.json();

    if(!json.ok){
        const campoError = document.getElementById("err_" + json.campo);
        if(campoError){
            campoError.textContent = json.error;
        }
        return;
    }

    alert("Reserva realizada correctamente ✔");

    reservarFormulario.reset();
    clearVerifications();
});
  