const enlaces = document.getElementsByClassName("btn btn-outline");

for(let i = 0; i < enlaces.length; i++) {
    enlaces[i].addEventListener('click', function(){location.href = "infoCompeticion.html";});
}