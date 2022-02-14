// connect to the socket
let socket = io();


socket.on('number', (msg) => {
    console.log('Random number: ' + msg);
})
function createItemCard(item){
  return `
  <div class="col s12 m7" id="item-id-${item.id}"style= "width:320px">
  <div class="card" >
  <div class="card-image waves-effect waves-block waves-light">
    <img class="activator" src="${item.img ? item.img:'assets/Barter.jpg'}">
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
</div>


  
`;
}

function deleteItem(id) {
  var settings = {
    "url": `/items/${id}`,
    "method": "DELETE",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    $(`#item-id-${id}`).remove();
  });
}


// function deleteItem(id) {
//   var settings = {
//     "url": `api/items/${id}`,
//     "method": "DELETE",
//     "timeout": 0,
//   };

//   $.ajax(settings).done(function (response) {
//     $(`#item-id-${id}`).remove();
//   });
// }

$(document).ready(function(){
  console.log('Ready')
  
  
 
  //test get call
  $.get('/items',(result) => {
    for (let item of result){
      $('#items').append(createItemCard(item));
    }
  })
  $('.sidenav').sidenav();
  $('.modal').modal();
  $('#save-item').click((e)=>{
    //validation
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
      $('#items').append(createItemCard(data));
      var instance = M.Modal.getInstance($('.modal'));
      instance.close();
     
    });
  });
})




{/* <div class="col s12 m7" id="item-id-${item.id}"style= "width:420px">
<div class="card horizontal">
<div class="card-image">
<img src="${item.img ? item.img:'assets/Barter.jpg'}"style= "height:150px">
</div>
<div class="card-stacked">
<div class="card-content">
<p>${item.info}</p>
</div>
<div class="card-action">
<a href="#?pid=${item.id}">Click to open Item</a>
<a class="waves-effect waves-light black btn" onClick="deleteItem(${item.itemID})"><i class="material-icons">delete</i></a>
</div>
</div>
</div>
</div>
// <div class="col s12 m7" id="item-id-${item.id}"style= "width:420px">
// <div class="card horizontal">
// <div class="card-image">
// <img src="${item.img ? item.img:'assets/Barter.jpg'}"style= "height:150px">
// </div>
// <div class="card-stacked">
// <div class="card-content">
// <p>${item.info}</p>
// </div>
// <div class="card-action">
// <a href="#?pid=${item.id}">Click to open Item</a>
// <a class="waves-effect waves-light black btn" onClick="deleteItem(${item.itemID})"><i class="material-icons">delete</i></a>
// </div>
// </div>
// </div>
// </div> */}