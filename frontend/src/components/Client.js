import React from "react";

const Client = (props) => {
  return (
    <tr>
      <td>{props.client_ID}</td>
      <td>
        <input type="checkbox" onClick={props.selectClient} />
      </td>
      <td>{props.client_Session_ID}</td>
      {/* TODO Connection Time instead of Password */}
      <td>{props.password}</td>
      <td>{props.client_IP}</td>
    </tr>
  );
};

export default Client;
