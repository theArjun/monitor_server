import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Slider from "./Slider";

const SelectClients = React.memo((props) => {
  const [selectedClients, setSelectedClients] = useState([]);
  const [userTypesGlobalCommand, setUserTypesGlobalCommand] = useState("");
  const [globalCommand, setGlobalCommand] = useState();
  const [showGlobalCommandBox, setShowGlobalCommandBox] = useState(false);

  const client_data = [];
  props.clients.map((item) => {
    client_data.push({ ...item });
  });

  const updateCommand = (event) => {
    setUserTypesGlobalCommand(event.target.value);
  };

  const getGlobalCommand = (event) => {
    event.preventDefault();
    setGlobalCommand(userTypesGlobalCommand);
  };

  return (
    <div>
      <Slider
        selected_clients={selectedClients}
        socket={props.socket}
        globalCommand={globalCommand}
      />
      {showGlobalCommandBox ? (
        <div>
          <form onSubmit={getGlobalCommand}>
            <div className="field has-addons is-centered">
              <div className="control is-expanded">
                <input
                  className="input is-family-monospace"
                  type="text"
                  placeholder="Command to all selected clients"
                  onChange={updateCommand}
                />
              </div>
              <div className="control">
                <button type="submit" className="button is-primary">
                  Command Selected Clients
                </button>
              </div>
            </div>
          </form>
          <br />{" "}
        </div>
      ) : null}
      <MaterialTable
        title="Connected Clients"
        columns={[
          { title: "Name", field: "client_ID" },
          { title: "Session ID", field: "client_Session_ID" },
          { title: "Connection Time", field: "password" },
          { title: "IP Address", field: "client_IP" },
        ]}
        data={client_data}
        options={{
          selection: true,
        }}
        actions={[
          {
            tooltip: "Command all selected clients",
            icon: "code",
            onClick: (evt, data) => {
              setSelectedClients(data);
              if (data.length > 1) {
                setShowGlobalCommandBox(true);
              }
            },
          },
        ]}
      />
    </div>
  );
});

export default SelectClients;
