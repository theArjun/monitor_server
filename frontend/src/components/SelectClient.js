import React, { useState } from "react";
import MaterialTable from "material-table";
import Slider from "./Slider";

const SelectClients = (props) => {
  const [selectedClients, setSelectedClients] = useState([]);

  const client_data = [];
  props.clients.map((item) => {
    client_data.push({ ...item });
  });

  return (
    <div>
      <Slider selected_clients={selectedClients} socket={props.socket} />
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
            },
          },
        ]}
      />
    </div>
  );
};

export default SelectClients;
