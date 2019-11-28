

const defaultHabitaciones = 1;
const defaultAdult = 2;
const defaultChild = 0;
const maxChildren = 4;
const maxHabitaciones = 5;
//Habitaciones actuales
var contadorHabitacion = 0;
var fechaHoy = moment();

if (document.getElementById("fecha").value == "") {
    document.getElementById("fecha").value = fechaHoy.format('YYYY-MM-DD')
}
window.onload = function () {
    

    for (let i = 1; i <= defaultHabitaciones; i++) {
        addRoom();
    }

};
var labels = document.getElementsByTagName("label");
for (let i = 0; i < labels.length; i++) {
    labels[i].setAttribute("class", labels[i].getAttribute("class") + " Text-white")
}
document.getElementById("fecha").setAttribute("type", "date");
document.getElementById("fecha").setAttribute("min", fechaHoy.format('YYYY-MM-DD'));


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




var habitaciones = document.getElementById("habitaciones");
//Para evitar cambios en la caja de texto, hacemos que el usuario no pueda escribir en ella
habitaciones.setAttribute("readonly", true);

var divPrincipal = document.createElement("div");
divPrincipal.setAttribute("id", "divHabitaciones");


//Creación del botón para enviar los datos del nº de habitaciones y del nº de huespedes 
let buttonDone = document.createElement("button");
buttonDone.textContent = "Hecho";
buttonDone.setAttribute("type", "button");
buttonDone.style="position: absolute; right:    0; bottom:   0;";
buttonDone.addEventListener("click", asignarValor);
divPrincipal.appendChild(buttonDone);

//Creación del botón para añadir habitaciones
let buttonAdd = document.createElement("button");
buttonAdd.textContent = "Añadir";
buttonAdd.setAttribute("type", "button");
buttonAdd.setAttribute("id", "buttonAdd");
buttonAdd.style="position: absolute; left:    0; bottom:   0;";
buttonAdd.addEventListener("click", addRoom);
divPrincipal.appendChild(buttonAdd);

//Añadimos el nodo principal al documento html
document.getElementById("hoteles").appendChild(divPrincipal);


document.getElementById("habitaciones").addEventListener("click",mostrarSelector)
document.getElementById("submit").addEventListener("click",enviarDatos)

//Mediante la siguiente línea, hacemos que el formulario no recargue la página al pulsar el botón "submit"
document.getElementById("miFormulario").setAttribute("action","javascript:void(0);")

//Si no se ha seleccionado nada, se asignan los valores por defecto a los datos que se van a enviar
if(habitaciones.value == "")
    habitaciones.value = `${defaultHabitaciones} Habitación/es & ${defaultAdult+defaultChild} Huésped/es `


function mostrarSelector() {
    document.getElementById("divHabitaciones").style.display="block";
    document.getElementById("habitaciones").removeEventListener("click",mostrarSelector)
}

/**
 * @author Alejandro Martin
 * @description Función para mostrar por consola un resumen de los datos recogidos
 */
function enviarDatos() {
    let datosValidos=true;
    let datosEnviados="Destino/Nombre del hotel:\n";
    if(document.getElementById("destino").value==""){
        datosValidos=false;
    };
    datosEnviados+=document.getElementById("destino").value+"\n";
    datosEnviados+="Fecha de registro:\n";
    datosEnviados+=document.getElementById("fecha").value+"\n";
    datosEnviados+="Nº de noches:\n";
    datosEnviados+=document.getElementById(noche.getAttribute("id")).value+" noches\n";
    datosEnviados+="Nº de habitaciones y de huespedes:\n";
    datosEnviados+=habitaciones.value+"\n";
    datosValidos? console.log(datosEnviados):console.log("Debe introducir todos los datos");
}

/**
 * @author Alejandro Martin
 * @description Función que recoge el número de habitaciones y el número de huespedes y le asigna dicha información a una caja de texto
 */
function asignarValor() {
    let huespedes = contarHuespedes();
    habitaciones.value = `${contadorHabitacion} Habitación/es & ${huespedes} Huésped/es `
    document.getElementById("divHabitaciones").style.display="none";
    document.getElementById("habitaciones").addEventListener("click",mostrarSelector)
}


/**
 * @author Alejandro Martin
 * @description Función para contar el número total de huespedes
 */
function contarHuespedes() {
    var totalHuespedes = 0;
    for (let i = 1; i <= contadorHabitacion; i++) {
        totalHuespedes += parseInt(document.getElementById(`adultsRoom${i}`).value);
        totalHuespedes += parseInt(document.getElementById(`childrenRoom${i}`).value);

    }
    return totalHuespedes;
}

/**
 * @author Alejandro Martin
 * @description Función general para generar una habitación
 */
function addRoom() {
    contadorHabitacion++;
    let divHabitacion = document.createElement("div");
    divHabitacion.setAttribute("id", `room${contadorHabitacion}`)
    let enunciadoHabitacion = document.createElement("h4");
    enunciadoHabitacion.setAttribute("id", `enunciado${contadorHabitacion}`)
    enunciadoHabitacion.textContent = `${contadorHabitacion}ª Habitación`;
    divHabitacion.appendChild(enunciadoHabitacion);
    if (contadorHabitacion != 1) {
        let cerrar = document.createElement("button");
        cerrar.textContent = "x";
        cerrar.setAttribute("class", "buttonClose");
        cerrar.addEventListener("click",removeRoom);
        divHabitacion.appendChild(cerrar);
    }

    let formHabitacion = document.createElement("form");

    let selectAdults = document.createElement("select");
    let labelAdults = document.createElement("label");
    labelAdults.textContent = "Adultos   ";


    selectAdults.setAttribute("id", `adultsRoom${contadorHabitacion}`)
    for (let i = 1; i < 5; i++) {
        let optionAdult = document.createElement("option");
        optionAdult.setAttribute("value", i);
        optionAdult.textContent = i;
        if (i == defaultAdult) {
            optionAdult.setAttribute('selected', true);
        }
        selectAdults.appendChild(optionAdult);
    }
    formHabitacion.appendChild(labelAdults);
    formHabitacion.appendChild(selectAdults);

    let saltoLinea = document.createElement("br");
    formHabitacion.appendChild(saltoLinea);

    let selectChildren = document.createElement("select");
    selectChildren.addEventListener("change", addChildAge)
    let labelChildren = document.createElement("label");
    labelChildren.textContent = "Niños   ";

    selectChildren.setAttribute("id", `childrenRoom${contadorHabitacion}`)
    for (let i = 0; i <= maxChildren; i++) {
        let optionChild = document.createElement("option");
        optionChild.setAttribute("value", i);
        optionChild.textContent = i;
        if (i == defaultChild) {
            optionChild.setAttribute('selected', true);
        }
        selectChildren.appendChild(optionChild);
    }

    formHabitacion.appendChild(labelChildren);
    formHabitacion.appendChild(selectChildren);


    divHabitacion.appendChild(formHabitacion);
    divPrincipal.appendChild(divHabitacion);

    if(contadorHabitacion==maxHabitaciones){
        document.getElementById("buttonAdd").style="display:none";
    }
}

/**
 * @author Alejandro Martin
 * @description Añade un selector por cada niño seleccionado
 */
function addChildAge() {
    for (let i = 1; i <= this.value; i++) {
        if (i == 1) {
            let labelChildAge = document.createElement("label");
            labelChildAge.textContent = "Edad/es  ";
            if (document.getElementById(`room${(this.parentNode.parentNode.getAttribute("id")).substring(4)}ChildLabel`) == null) {
                labelChildAge.setAttribute("id", `room${(this.parentNode.parentNode.getAttribute("id")).substring(4)}ChildLabel`)

                this.parentNode.appendChild(labelChildAge)
            }

        }

        if (document.getElementById(`room${(this.parentNode.parentNode.getAttribute("id")).substring(4)}Child${i}`) == null) {

            let childAge = document.createElement("select");
            childAge.setAttribute("id", `room${(this.parentNode.parentNode.getAttribute("id")).substring(4)}Child${i}`);

            for (let j = 0; j <= 17; j++) {
                let age = document.createElement("option");
                age.textContent = j;
                childAge.appendChild(age);
            }

            this.parentNode.appendChild(childAge)
        }
    }
    for (j = parseInt(this.value) + 1; j <= maxChildren; j++) {
        if (j == 1)
            document.getElementById(`room${(this.parentNode.parentNode.getAttribute("id")).substring(4)}ChildLabel`).remove();

        if (document.getElementById(`room${(this.parentNode.parentNode.getAttribute("id")).substring(4)}Child${j}`) != null) {
            document.getElementById(`room${(this.parentNode.parentNode.getAttribute("id")).substring(4)}Child${j}`).remove();
        }
    }
}

/**
 * @author Alejandro Martin
 * @description Elimina la habitación que se haya seleccionado y vuelve a mostrar el boton de añadir habitaciones en caso de que se haya ocultado
 */
function removeRoom(){
    let idRoomDelete=this.parentNode.getAttribute("id").substring(4);
    document.getElementById(`room${idRoomDelete}`).remove();
    document.getElementById("buttonAdd").style="display:inline;position: absolute; left:    0; bottom:   0;";

    updateIds(idRoomDelete);
}


var updateIds=idRoomDelete=>{
    
    for(let i=parseInt(idRoomDelete)+1;i<=contadorHabitacion;i++){
        document.getElementById(`room${i}`).setAttribute("id",`room${i-1}`)
        document.getElementById(`enunciado${i}`).textContent=`${i-1}ª Habitación`;
        document.getElementById(`enunciado${i}`).setAttribute("id",`enunciado${i-1}`)
        document.getElementById(`adultsRoom${i}`).setAttribute("id",`adultsRoom${i-1}`)
        let children=document.getElementById(`childrenRoom${i}`).value;
        for(let j=1;j<=children;j++){
            document.getElementById(`room${i}Child${j}`).setAttribute("id",`room${i-1}Child${j}`)
        }
        document.getElementById(`childrenRoom${i}`).setAttribute("id",`childrenRoom${i-1}`)
        if(document.getElementById(`room${i}ChildLabel`)!=null)
            document.getElementById(`room${i}ChildLabel`).setAttribute("id",`room${i-1}ChildLabel`)

    }
    contadorHabitacion--;

}

//github.com
//+ new repo
// martinalejandro.github.io
// subir
// commit