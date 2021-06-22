var participantes = 5, rondas = 12;

function addTable() {
    var myTableDiv = document.getElementById("myDynamicTable");

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
                if(j >= 1 && j < 13){
                    txtInput.setAttribute('class', 'fila' + i);
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
addTable();