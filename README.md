Swap-it is a web application that aims to reduce waste by providing a platform that facilites users to offer goods in exchange for other goods or services.
Login and Registration pages created by James Nemecek \
Seller page created by Muhammad \
Buyer page created by Bose \
User chat created by Julia \

<==============================================================>
Julia - 06/02/2022 - adding chat code to the group project repo.
<==============================================================>

Chat is based on socket.io and socket.io/client finctionality.
References: https://twitter.com/DevSimplified
https://www.youtube.com/watch?v=ZKEqqIO7n-k&t=282s

Socket.io establishes a persistent connection between the server and the client,
allowing for exchange of messages without tearing down the connection each time.
Package is based on the libraries

- socket.io
- socket.io-client
- nodemon and snowpack

  Socket.io/admin-ui also works subject to being able to install @socket.io/admin-ui
  On Win10 Pro I recommend opening cmd as administrator and running npm i @socket.io/admin-ui

Server io and chat client use ports 8080 and 3000.
Server serves /public/index.html on port 8090

While front end htmls for seller and buyer are under construction,
run chat as follows:

Select Split Terminal from the VSC Menu or <Ctrl + Shift + 5>

> \_ cd client in one terminal; >\_cd server in the other terminal
> Client>npm start
> Server> npm run devStart
> Client will open one chat window localhost:8080, the rest must be opened manually.

Chat can broadcast messages to all users or converse privately - between all chat windows who joined the same user. Functionality will be eventually utilised in identifying corresponding user or removed if obsolete.

Please note that node_modules must be installed for the server and for the client. Make sure to run recent versions. I.e.,
You will not be able to install @socket.io/admin-ui if socket.io is not v 4.4.1

Found: socket.io@2.4.1
npm ERR! node_modules/socket.io
npm ERR! socket.io@"^2.4.1" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer socket.io@">=3.1.0" from @socket.io/admin-ui@0.2.0
npm ERR! node_modules/@socket.io/admin-ui
npm ERR! @socket.io/admin-ui@"\*" from the root project

Proof that it works:
/assets/ScreendumpChatsandSeller.JPG

Finally, added Website about us and our project.

<========================================================>
James, kindly place updated SRS to ./WebsiteProjectPitch/assets
<========================================================>
<========================================================>
