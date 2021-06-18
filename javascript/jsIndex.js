var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    alert("Ha llegado al final crack");
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

const tarjetas = document.getElementsByClassName("tarjeta");

for (let i=0; i < tarjetas.length; i++){
    tarjetas[i].addEventListener('click', function(){nextPrev(1);});
}