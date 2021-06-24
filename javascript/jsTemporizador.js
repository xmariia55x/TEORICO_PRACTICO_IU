var temp = 10000;
var tempAux = 10000;
visor = document.getElementById("reloj"); //localizar pantalla del reloj


window.onload = function () {
    addTable();
    visor = document.getElementById("reloj"); //localizar pantalla del reloj
    //asociar eventos a botones: al pulsar el botón se activa su función.
    document.cron.boton1.onclick = activo;
    document.cron.boton2.onclick = pausa;
    document.cron.boton1.disabled = false;
    document.cron.boton2.disabled = true;
    document.getElementById("lAlerta").style.display = "none";
    document.getElementById("bPuntuaciones").style.display = "none";
    var bCancelar = document.getElementById("bCancelar");
    bCancelar.addEventListener("click", function () {
        var mensaje;
        var opcion = confirm("¿Está seguro que desea salir de la competición? Se borraran todos los datos introducidos hasta ahora.");
        if (opcion === true) {
            mensaje = "Has clickado OK";
        } else {
            mensaje = "Has clickado Cancelar";
        }
        alert(mensaje);
    });

    //variables de inicio:
    var marcha = 0; //control del temporizador
    var cro = 0; //estado inicial del cronómetro.
}

//botón Empezar / Reiniciar
function activo() {
    if (document.cron.boton1.value == "Empezar") { //botón en "Empezar"
        empezar() //ir  la función empezar
    }
    else {  //Botón en "Reiniciar"
        reiniciar()  //ir a la función reiniciar
    }
}
//botón pausa / continuar
function pausa() {
    if (marcha == 0) { //con el boton en "continuar"
        continuar() //ir a la función continuar
    }
    else {  //con el botón en "parar"
        parar() //ir a la funcion parar
    }
}
//Botón 1: Estado empezar: Poner en marcha el crono
function empezar() {
    emp = new Date() //fecha inicial (en el momento de pulsar)
    elcrono = setInterval(tiempo, 10); //función del temporizador.
    marcha = 1 //indicamos que se ha puesto en marcha.
    document.cron.boton1.value = "Reiniciar"; //Cambiar estado del botón
    document.cron.boton2.disabled = false; //activar botón de pausa
}
//función del temporizador			
function tiempo() {
    actual = new Date(); //fecha a cada instante
    //tiempo del crono (cro) = fecha instante (actual) - fecha inicial (emp)
    cro = actual - emp; //milisegundos transcurridos.
    tempAux = temp - cro;
    cr = new Date(); //pasamos el num. de milisegundos a objeto fecha.
    cr.setTime(tempAux);
    //obtener los distintos formatos de la fecha:
    cs = cr.getMilliseconds(); //milisegundos 
    cs = cs / 10; //paso a centésimas de segundo.
    cs = Math.round(cs); //redondear las centésimas
    sg = cr.getSeconds(); //segundos 
    mn = cr.getMinutes(); //minutos 
    ho = cr.getHours() - 1; //horas

    if (ho < 0) {
        cs = 0;
        sg = 0;
        mn = 0;
        ho = 0;
        document.cron.boton2.disabled = true;
        document.getElementById("lAlerta").style.display = "block";
        document.getElementById("bPuntuaciones").style.display = "block";
        clearInterval(elcrono);
    }

    //poner siempre 2 cifras en los números		 
    if (cs < 10) { cs = "0" + cs; }
    if (sg < 10) { sg = "0" + sg; }
    if (mn < 10) { mn = "0" + mn; }
    //llevar resultado al visor.		 
    visor.innerHTML = mn + " mm " + sg + " ss " + cs + " ms";
}
//parar el cronómetro
function parar() {
    clearInterval(elcrono); //parar el crono
    marcha = 0; //indicar que está parado.
    document.cron.boton2.value = "Continuar"; //cambiar el estado del botón
}
//Continuar una cuenta empezada y parada.
function continuar() {
    emp2 = new Date(); //fecha actual
    emp2 = emp2.getTime(); //pasar a tiempo Unix
    emp3 = emp2 - cro; //restar tiempo anterior
    emp = new Date(); //nueva fecha inicial para pasar al temporizador 
    emp.setTime(emp3); //datos para nueva fecha inicial.
    elcrono = setInterval(tiempo, 10); //activar temporizador
    marcha = 1; //indicar que esta en marcha
    document.cron.boton2.value = "parar"; //Cambiar estado del botón
    document.cron.boton1.disabled = false; //activar boton 1 si estuviera desactivado
}
//Volver al estado inicial
function reiniciar() {
    if (marcha == 1) {  //si el cronómetro está en marcha:
        clearInterval(elcrono); //parar el crono
        marcha = 0;	//indicar que está parado
    }
    //en cualquier caso volvemos a los valores iniciales
    cro = 0; //tiempo transcurrido a cero
    visor.innerHTML = "00 mm 10 ss 00 ms"; //visor a cero
    document.cron.boton1.value = "Empezar"; //estado inicial primer botón
    document.cron.boton2.value = "Parar"; //estado inicial segundo botón
    document.cron.boton2.disabled = true;  //segundo botón desactivado
    document.getElementById("lAlerta").style.display = "none";
    document.getElementById("bPuntuaciones").style.display = "none";
}


//WIZARD
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
var rondasTotales = 12;
var rondaActual = 1;
var bSiguiente = document.getElementById('bSiguiente');
var lRonda = document.getElementById('encabezadoRondas');

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
}

function nextPrev() {
    if (rondaActual > rondasTotales){  //Final -> volver a inicio -> mensaje de confirmación
        
    }

    var x = document.getElementsByClassName("tab");
    x[currentTab].style.display = "none";
    var inputPtsActual = document.getElementsByClassName('columna'+rondaActual);

    if (currentTab === 0) {        //CRONOMETRO
        currentTab = 1;

        //HABILITAR LOS INPUT QUE TOQUEN Y DESHABILITAR LOS DE LA RONDA ANTERIOR
        if (rondaActual > 1) {
            var inputPtsAnterior = document.getElementsByClassName('columna'+(rondaActual-1));
            for (var i = 0; i < inputPtsAnterior.length; i++){
                inputPtsAnterior[i].setAttribute('disabled','');
            }
        }
        
        for (var i = 0; i < inputPtsActual.length; i++){
            inputPtsActual[i].disabled = false;
        }

        if (rondaActual === rondasTotales){
            //CAMBIAR BOTON SIGUIENTE RONDA POR FINALIZAR COMPETICIÓN
            bSiguiente.value = 'Finalizar competición'
        }

        bSiguiente.style.display = "inline";

    } else {                       //PUNTUACIONES
        var valido = validarPuntos();
        if (valido.length > 0){
            alert("Campos no válidos");
            for (var i = 0; i < valido.length; i++){
                inputPtsActual[valido[i]].focus();
            }
            return;
        } else {
            var opcion = confirm("Pasará a la siguiente ronda y no habrá vuelta atrás. ¿Está seguro?");
            if (opcion === true) {
                calcularPuntos(rondaActual);
                currentTab = 0;
                rondaActual++;
                reiniciar();
                bSiguiente.style.display = "none";
                lRonda.innerHTML = "Ronda "+rondaActual+" de 12";
            } else {
                return;
            }
        }
    }

    showTab(currentTab);
}

function validarPuntos(){
    var columna = document.querySelectorAll('.columna'+rondaActual);
    var error = []; 
    var contador = 0;
    for(var i = 0; i < columna.length; i++){
        try {
            if (Number(columna[0].value) < 0){
                error[contador] = i + 1;
                contador++;
            }
        } catch (error){
            error[contador] = i + 1;
            contador++;
        }
    }
    return error;
}


var participantes = 5, rondas = 12;

function addTable() {
    var myTableDiv = document.getElementById("tabla");

    var table = document.createElement('TABLE');
    table.setAttribute('id', 'tablaPuntuaciones');
    table.border = '1';
    table.setAttribute('class', 'table');

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);


    for (var i = 0; i < participantes + 1; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (var j = 0; j < rondas + 2; j++) {
            var td = document.createElement('TH');
            td.width = '100';

            if (i === 0) {
                if (j === 13) {
                    td.appendChild(document.createTextNode("Total"));

                } else if (j !== 13 && j !== 0) {
                    td.appendChild(document.createTextNode("Ronda " + j));

                } else {
                    td.appendChild(document.createTextNode("Participantes"));
                    td.style = 'width:max-content';
                }
                
            } else if (j === 0 && i !== 0) {
                td.appendChild(document.createTextNode("Participante " + i));
                td.style = 'width:max-content';
            } else {
                var txtInput = document.createElement('input');
                txtInput.setAttribute('class', 'columna' + j);
                txtInput.setAttribute('id', 'celda' + i + j);
                txtInput.setAttribute('size', '3');
                txtInput.setAttribute('maxlength', '3');
                txtInput.setAttribute('disabled','');
                txtInput.classList.add('txtPuntos');
                if(j >= 1 && j < 13){
                    txtInput.classList.add('fila' + i);
                }
                if (j === 13) {
                    txtInput.setAttribute('readOnly', 'true');
                    txtInput.style = 'background-color: #C3FFF3';

                } 
                td.appendChild(txtInput);

            }
            tr.appendChild(td);
        }
    }
    myTableDiv.appendChild(table);
}

function calcularPuntos(rondaActual){
    var columnaTotal = document.querySelectorAll('.columna13'); 
    for(var i = 1; i <= participantes; i++){
        var fila = document.querySelectorAll('.fila' + i);
        var suma = 0;
        for(var j = 1; j <= rondaActual; j++){
            suma += Number(fila[j - 1].value);
        }
        columnaTotal[i - 1].value = suma;
    }
}


//EVENTOS DE LOS BOTONES
var bPuntuaciones = document.getElementById('bPuntuaciones');
bPuntuaciones.addEventListener('click', nextPrev);
bSiguiente.addEventListener('click', nextPrev);