const testButtonFunction=()=>{
  alert('Thank you for clicking')
}

// connect to the socket

let socket = io();

socket.on('number', (msg) => {
    console.log('Random number: ' + msg);
})

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, options);
});
$(document).ready(function(){
  console.log('Ready')
  
  $("#main-nav").load("components/navbar.html",()=> {
    $('.sidenav').sidenav();
   
  })
})
