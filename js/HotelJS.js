var defaultHabitaciones;
var defaultAdult;
var defaultChild;
var fechaHoy = moment();
window.onload = function () {
    //Línea para habilitar el popover
    $('#habitaciones').popover();
    if (document.getElementById("fecha").value == "") {
        document.getElementById("fecha").value = fechaHoy.format('YYYY-MM-DD')
    }
    defaultHabitaciones = 1;
    defaultAdult = 2;
    defaultChild = 0;
};

var labels = document.getElementsByTagName("label");
for (let i = 0; i < labels.length; i++) {
    labels[i].setAttribute("class", labels[i].getAttribute("class") + " Text-white")
}
document.getElementById("fecha").setAttribute("type", "date");



const maxNoches = 30;
const nochesPopulares = [4, 7, 10, 14];
let noche = document.getElementById("noches");

var selector = document.createElement("select");
selector.setAttribute("id", noche.getAttribute("id"));
selector.setAttribute("class", noche.getAttribute("class"));
selector.setAttribute("name", "selectNoches");

var grupoNochesPopulares = document.createElement("optgroup");
grupoNochesPopulares.setAttribute("label", "Duraciones Populares");
nochesPopulares.forEach(nochePopular => {
    let elemento = document.createElement("option");
    elemento.setAttribute("value", nochePopular);
    nochePopular == 1 ? elemento.innerHTML = `${nochePopular} Noche` : elemento.innerHTML = `${nochePopular} Noches`;
    grupoNochesPopulares.appendChild(elemento);
})
selector.appendChild(grupoNochesPopulares);


var grupoNoches = document.createElement("optgroup");
grupoNoches.setAttribute("label", "Duraciones por día");
for (let i = 1; i <= maxNoches; i++) {
    let elemento = document.createElement("option");
    elemento.setAttribute("value", i);
    i == 1 ? elemento.innerHTML = `${i} Noche` : elemento.innerHTML = `${i} Noches`;
    grupoNoches.appendChild(elemento);
}
selector.appendChild(grupoNoches);

document.getElementById("noches").parentNode.replaceChild(selector, noche);



//
//       EN CONSTRUCCIÓN
//
var habitaciones = document.getElementById("habitaciones");
habitaciones.setAttribute("data-toggle", "popover");
habitaciones.setAttribute("data-html", "true");
habitaciones.setAttribute("data-placement", "bottom");
habitaciones.setAttribute("readonly", true);


let divPrincipal = document.createElement("div");
divPrincipal.setAttribute("id","divPopover");
let contadorHabitacion = 1;
let divHabitacion = document.createElement("div");
let enunciadoHabitacion = document.createElement("h4");
enunciadoHabitacion.textContent = `${contadorHabitacion}ª Habitación`;
divHabitacion.appendChild(enunciadoHabitacion);
let labelAdults = document.createElement("label");
labelAdults.textContent = "Adultos    ";
let selectAdults = document.createElement("select");
selectAdults.setAttribute("id", `room${contadorHabitacion}`)
for (let i = 1; i < 5; i++) {
    let optionAdult = document.createElement("option");
    optionAdult.setAttribute("value", i);
    optionAdult.textContent = i;
    if (i == defaultAdult) {
        optionAdult.setAttribute('selected', true);
    }
    selectAdults.appendChild(optionAdult);
}
divHabitacion.appendChild(labelAdults);
divHabitacion.appendChild(selectAdults);
let saltoLinea = document.createElement("br");
divHabitacion.appendChild(saltoLinea);
let labelChildren = document.createElement("label");
labelChildren.textContent = "Niños    ";
let selectChildren = document.createElement("select");
for (let i = 0; i <= 2; i++) {
    let optionChild = document.createElement("option");
    optionChild.setAttribute("value", i);
    optionChild.textContent = i;
    if (i == defaultChild) {
        optionChild.setAttribute('selected', true);
    }
    selectChildren.appendChild(optionChild);
}
divHabitacion.appendChild(labelChildren);
divHabitacion.appendChild(selectChildren);

divPrincipal.appendChild(divHabitacion);
let buttonDone=document.createElement("button");
  buttonDone.textContent="Hecho";
  buttonDone.setAttribute("type","button");
  buttonDone.addEventListener("click",asignarValor);
  function asignarValor(){
  	document.getElementById("popoverDiv").value=`${contadorHabitacion} Habitación/es &  Huésped/es `
  }
  divPrincipal.appendChild(buttonDone);
habitaciones.setAttribute("data-content", "En construcción")
console.log(divPrincipal.innerHTML)



  //POPOVER: cuando se haga click en "Hecho", se cierra el popover y por tanto se ejecuta un evento (onpopover.close o similar) que modificará la información del formulario.

//
//github.com
//+ new repo
// martinalejandro.github.io
// subir
// commit