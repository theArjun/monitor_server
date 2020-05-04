import React from "react";
import Client from "../Client";
import Slider from "../Slider";

const clients = (props) => {
  const clients = props.clients;
  const showClients = clients.length > 0 ? true : false;

  // Select Event Handling
  const selectedClients = [];

  const selectClientHandler = (event) => {
    const clientRow = event.target.parentNode.parentNode;
    const client_session_ID = clientRow.children[2].innerHTML;
    const client_ID = clientRow.children[0].innerHTML;

    if (event.target.checked) {
      if (!selectedClients.includes(client_session_ID)) {
        selectedClients.push(client_session_ID);
      }
    } else {
      if (selectedClients.includes(client_session_ID)) {
        selectedClients.pop(client_session_ID);
      }
    }
    console.log(selectedClients);
  };
  // END Select Event Handling

  const listClients = clients.map((item) => {
    return (
      <Client
        client_ID={item.client_ID}
        client_Session_ID={item.client_Session_ID}
        connection_timestamp={item.connection_timestamp}
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
      <Slider selected_clients={selectedClients} />
      <br /> <br />
      <div>{clientLists}</div>
    </div>
  );
};

export default clients;
