const botones = document.getElementsByClassName("btnInicio");

for (let i=0; i < botones.length; i++){
    botones[i].addEventListener('click', function(){location.href = "inicioSesion.html";});
}