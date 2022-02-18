import { io} from "socket.io-client"

const joinRoomButton = document.getElementById ("room-button")
const messageInput = document.getElementById ("message-input")
const roomInput = document.getElementById("room-input")
const form = document.getElementById("form")
var yourIP = new String;

console.log("1" + yourIP);

let apiKey = '1be9a6884abd4c3ea143b59ca317c6b2';

 $.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey, function(data) {
  
  console.log(JSON.stringify(data, null, 2));
  console.log (typeof(data.ip_address))
  console.log( data.ip_address);
  displayMessage (data.ip_address);
  socket.emit ('send-message', data.ip_address);
});


const socket = io("http://localhost:3000")
socket.on("connect", () => {
    displayMessage (`You connected with id: ${socket.id},<<<d{o_o}b>>><<<ALL CONVERSATIONS ARE RECORDED >>> <<<d{o_o}b>>> , enter seller's username and click "Join"`)
})

socket.on("receive-message", message => {
    displayMessage(message)
  //  socket.emit ('send-message', message)
    
})


form.addEventListener("submit", e => {
    e.preventDefault()
    const message = messageInput.value 
    const room = roomInput.value

    if (message === "") return 
    displayMessage(message)
    socket.emit("send-message", message, room)
    messageInput.value = ""
})

joinRoomButton.addEventListener("click", () => {
    const room = roomInput.value
    socket.emit ("join-room", room, message => {
        displayMessage(message)
    })
})

function displayMessage(message) {
    const div = document.createElement("div")
    div.textContent = message
    document.getElementById("message-container").append(div)
}

