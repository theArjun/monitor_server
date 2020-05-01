import React from "react";
import Client from "./Client";
import SelectClient from "./SelectClient";

// Select Event Handling
const selected_clients = [];

const selectClientHandler = (event) => {
  const client_row = event.target.parentNode.parentNode;
  const client_session_ID = client_row.children[2].innerHTML;
  const client_ID = client_row.children[0].innerHTML;

  if (event.target.checked) {
    if (!selected_clients.includes(client_session_ID)) {
      selected_clients.push(client_session_ID);
    }
  } else {
    if (selected_clients.includes(client_session_ID)) {
      selected_clients.pop(client_session_ID);
    }
  }
  console.log(selected_clients);
};
// END Select Event Handling


// Listing Clients
const clients = (props) => {
  const clients = props.clients;
  const showClients = clients.length > 0 ? true : false;

  const listClients = clients.map((item) => {
    return (
      <Client
        client_ID={item.client_ID}
        client_Session_ID={item.client_Session_ID}
        password={item.password}
        client_IP={item.client_IP}
        key={item.client_Session_ID}
        selectClient={(event) => {
          selectClientHandler(event);
        }}
      />
    );
  });

  let clientLists = "No clients to show !";
  if (showClients) {
    clientLists = (
      <div className="table-container">
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th colSpan="2">Name</th>
              <th>Session ID</th>
              <th>Connected Time</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>{listClients}</tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <SelectClient selected_clients={selected_clients}/>
      <br/> <br/>
      <div>{clientLists}</div>
    </div>
  );
};

export default clients;
