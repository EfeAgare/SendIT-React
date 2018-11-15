 /**
  * Get the modal
  *  */ 
 const modal = document.getElementById('myModal');
        
 /**
  * Get the button that opens the modal
  *  */ 

 const clickButton = document.getElementById("location");

 
 const span = document.getElementsByClassName("close")[0];
 
 clickButton.onclick = function() {
     modal.style.display = "block";
 }
 span.onclick = function() {
     modal.style.display = "none";
 }
 /**
  * When the user clicks anywhere outside of the modal, close it
  *  */ 
 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
 }