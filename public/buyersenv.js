let socket = io();
socket.on('chat:broadcast', (msg) => {
  $("#chat-msg-list").append(createMessage(msg, true));
})
// function createItem(item) {
//     return `
// <div class="col s6 m4 l3 xl2" id="item-id-${item.itemID}"style= "width:320px">
//   <div class="card">
//     <div class="card-image waves-effect waves-block waves-light">
//       <img class="activator" src="${item.img ? item.img : 'assets/chair2.jpg'}">
//     </div>
//     <div class="card-content">
//       <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
//       <button class="btn waves-effect waves-light black" onclick="deleteItem(${item.itemID})"><i class="material-icons">Delete</i></button>
//   </div>
//   <div class="card-reveal">
//     <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
//     <p>${item.info}</p>
//   </div>
// </div>`;
// }

function createItem(item) {
  return `
  <div class="col s6 m4 l3 xl2" id="item-id-${item.itemID}">
    <div class="card">
      <div class="card-image">
        <img src="${item.img ? item.img : 'assets/chair2.jpg'}">
        <span class="card-title">${item.title}</span>
      </div>
      <div class="card-content">
        <p>${item.info}</p>
      </div>
      <div class="card-action">
        <button><a class="waves-effect waves-light red btn" onClick="deleteItem(${item.itemID})"><i class="material-icons">delete</i></a></button>
      </div>
    </div>
  </div>`;
}

function deleteItem(id) {
    var settings = {
    "url": `/api/items/${id}`,
    "method": "DELETE",
    "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
      $(`#item-id-${id}`).remove();
    });
}
function createMessage(msg, isRight = false) {
  return `<p class="${isRight ? 'msg-right' : 'msg-left'}">
    ${msg}
  </p><br style="clear:both"/>`
}
$(document).ready(function(){
  console.log('Ready') 
  $.get('/api/items',(result) => {
    for (let item of result){
      $('#items').append(createItem(item));}
  })
  $("#chat-send-btn").click(() => {
    //send this message to the back-end server
    socket.emit("chat:msg", $("#chat-msg").val());
    //add this message to the chat msg list on the left side of screen
    $("#chat-msg-list").append(createMessage($("#chat-msg").val()));
    //clear the message input text
    $("#chat-msg").val("");
  });
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
      "url": "/api/items",
      "method": "POST",
      "timeout": 0,
      "headers": {
      "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
    };
    
    $.ajax(settings).done(function(response) {
      console.log(response);
      $('#items').append(createItem(data));
      var instance = M.Modal.getInstance($('.modal'));
      instance.close();
    });
  });
})