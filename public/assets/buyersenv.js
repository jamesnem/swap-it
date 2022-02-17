let socket = io();
socket.on('number', (msg) => {
    console.log('Random number: ' + msg);
})
function createItem(item) {
    return `
<div class="col s6 m4 l3 xl2" id="item-id-${item.itemID}"style= "width:320px">
  <div class="card">
  <div class="card-image waves-effect waves-block waves-light">
  <img class="activator" src="${item.img ? item.img : 'assets/chair2.jpg'}"> </div>
    </div>
    <div class="card-content">
    <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
    <p><a class="waves-effect waves-light black btn" onClick="deleteItem(${item.itemID})"><i class="material-icons">delete</i></a></p>
  </div>
  <div class="card-reveal">
    <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
    <p>${item.info}</p>
  </div>
</div>
</div>`;
}

function deleteItem(id) {
    var settings = {
    "url": `/items/${id}`,
    "method": "DELETE",
    "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
    $(`#items-id-${id}`).remove();
    });
}
$(document).ready(function(){
  console.log('Ready') 
  $.get('/items',(result) => {
    for (let item of result){
      $('#items').append(createItem(item));}
  })
  $('.sidenav').sidenav();
  $('.modal').modal();
  $('#save-item').click((e)=>{
    const data = {
      itemID : $('#item-id').val(),
      title: $('#item-title').val(),
      info: $('#item-description').val(),
      img: $('#item-image').val(),    
    };
    var settings = {
      "url": "/items",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
      $('#items').append(createItem(data));
      var instance = M.Modal.getInstance($('.modal'));
      instance.close();
    });
  });
})