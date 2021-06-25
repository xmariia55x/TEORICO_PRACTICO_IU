const boton = document.getElementById("btnInicioSesion");
const usuario = document.getElementById("email_usuario");
const contrasenia = document.getElementById("contrasenia_usuario");
const warning = document.getElementById("warning");

boton.addEventListener('click', function(){
    warning.style.display = "none";

    if(usuario.value === "user@example.com" && contrasenia.value === "user") {
        location.href = "listadoCompeticionesMaster.html";
    } else {
        warning.style.display = "block";
    }
});
