// When document is ready.
document.addEventListener("DOMContentLoaded", function (event) {
  const clients_list = [];

  var socket = io("http://127.0.0.1:5000"); 

  // When someone connect to the socket.
  document.getElementById("connected_clients").innerHTML = "";
  socket.emit("populate_me", "I am empty !");

  socket.on("output_from_client_to_web", function (message) {
    message = "<pre>" + message + "</pre>";
    message = message.replace("\n", "<br>");

    console.log(message);
    let output_display = document.getElementById("output_from_client");
    output_display.innerHTML = message;
    output_display.classList.add("has-text-left");
    output_display.classList.add("is-size-5");
  });

  socket.on("update_connections_list", function (connection_list) {
    document.getElementById("connected_clients").innerHTML = "";
    console.clear();
    console.log(connection_list);
    console.log("The number of clients : " + connection_list.length);

    let connected_clients_table = document.getElementById("connected_clients");

    for (let i = 0; i < connection_list.length; i++) {
      let new_table_row = document.createElement("tr");

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = 0;

      checkbox.addEventListener("click", function () {
        let fetched_client_ID = this.parentElement.parentElement.children[0]
          .innerHTML;
        if (checkbox.checked == true) {
          clients_list.push(fetched_client_ID);
        } else {
          while (clients_list.includes(fetched_client_ID)) {
            clients_list.pop(fetched_client_ID);
          }
        }
        console.log(clients_list);
        document.getElementById("client_ID").innerHTML = "";
        for (let i = 0; i < clients_list.length; i++) {
          let client_listing = document.createElement("div");
          client_listing.id = "client_listing";
          client_listing.innerHTML = clients_list[i];
          document.getElementById("client_ID").append(client_listing);
        }
      });

      let icon_head = document.createElement("th");
      icon_head.appendChild(checkbox);

      /* Client ID Node */
      let client_ID_node = document.createElement("td");
      let client_ID_text_node = document.createTextNode(
        connection_list[i]["client_ID"]
      );
      client_ID_node.appendChild(client_ID_text_node);

      /* Password Node */
      let password_node = document.createElement("td");
      let password_text_node = document.createTextNode(
        connection_list[i]["password"]
      );
      password_node.appendChild(password_text_node);

      /* Client Session ID Node */
      let client_Session_ID_node = document.createElement("td");
      let client_Session_ID_text_node = document.createTextNode(
        connection_list[i]["client_Session_ID"]
      );
      client_Session_ID_node.appendChild(client_Session_ID_text_node);

      /* CLient IP Node */
      let client_IP_node = document.createElement("td");
      let client_IP_text_node = document.createTextNode(
        connection_list[i]["client_IP"][0]
      );
      client_IP_node.appendChild(client_IP_text_node);

      /* Append to table Action */
      new_table_row.append(client_ID_node);
      new_table_row.append(icon_head);
      new_table_row.append(password_node);
      new_table_row.append(client_Session_ID_node);
      new_table_row.append(client_IP_node);

      connected_clients.appendChild(new_table_row);
      // END UPDATE CONNECTION SOCKET
    }
  });

  // When send button is clicked.
  var send_command = io("http://127.0.0.1:5000/command");
  document.getElementById("sendCommand").addEventListener("click", function () {
    // let client_ID = document.getElementById("client_ID").innerHTML;
    // console.log(client_ID);
    // if (client_ID == "") {
    //   alert("Select a client !");
    //   return;
    // }

    if (clients_list.length == 0) {
      alert("Select a client !");
      return;
    }

    let command = document.getElementById("command").value;

    for (let index = 0; index < clients_list.length; index++) {
      
      send_command.emit("command_from_web", {
        client_ID: clients_list[index],
        command: command,
      });
      
    }
  });

  function getFirstTdContent(row) {
    elem = row.children[0];
    alert(elem.textContent); // Do whatever you want to do with the content here
  }

  // TODO Disconnect a particular client from server
  // document.getElementById("#disconnect_action").addEventListener("click", function(){
  //   socket.emit("disconnect_action");
  // });

  // To show table is empty.
  let table_content_length = document.getElementById("clients_list").rows
    .length;
  console.log(table_content_length);

  // END DOCUMENT READY
});
