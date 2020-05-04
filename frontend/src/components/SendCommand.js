import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./SendCommand.css";
const ENDPOINT = "http://127.0.0.1:5000/command";
const socket = socketIOClient(ENDPOINT); // socket declaration shall be at top.

const SendCommand = (props) => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("date");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [returnCode, setReturnCode] = useState("");

  props.socket.on("output_from_client_to_web", (commandOutput) => {
    const output = JSON.parse(commandOutput);

    // Show output to respective clients.
    if (output.session_ID === props.client_Session_ID) {
      console.log(output.session_ID);
      setOutput(output.stdout);
      setError(output.stderr);
      setReturnCode(output.return_code);
    }
  });

  let commandToSend = {
    client_ID: props.client_Session_ID,
    command: query,
  };

  useEffect(() => {
    socket.emit("command_from_web", commandToSend);
  }, [query]);

  const updateSearch = (event) => {
    setSearch(event.target.value);
  };

  const getCommand = (event) => {
    event.preventDefault();
    setQuery(search);
  };

  return (
    <div className="tile is-parent">
      <article className="tile is-child notification is-bordered has-text-centered">
        <div className="is-family-monospace disp rcode">{returnCode}</div>
        <p className="title">{props.client_ID}</p>
        <p className="subtitle">Session ID : {props.client_Session_ID}</p>
        <br />
        <form onSubmit={getCommand}>
          <div className="field has-addons is-centered">
            <div className="control is-expanded">
              <input
                className="input is-family-monospace"
                type="text"
                placeholder="Enter command here"
                onChange={updateSearch}
              />
            </div>
            <div className="control">
              <button className="button is-primary">Command</button>
            </div>
          </div>
        </form>
        <br />
        {output.length > 0 ? (
          <div className="is-family-monospace disp output">{output}</div>
        ) : null}
        {error.length > 0 ? (
          <div className="is-family-monospace disp error">{error}</div>
        ) : null}
      </article>
    </div>
  );
};

export default SendCommand;
