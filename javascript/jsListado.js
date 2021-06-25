const enlaces = document.getElementsByClassName("btnPodio");

for(let i = 0; i < enlaces.length; i++) {
    enlaces[i].addEventListener('click', function(){location.href = "podio.html";});
}