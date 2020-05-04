import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./SendCommand.css";
const ENDPOINT = "http://127.0.0.1:5000/command";
const socket = socketIOClient(ENDPOINT); // socket declaration shall be at top.

const SendCommand = React.memo((props) => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(props.globalCommand);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [returnCode, setReturnCode] = useState("");
  const [returnCodeMeaning, setReturnCodeMeaning] = useState("");
  const [executionTimeStamp, setExecutionTimeStamp] = useState("");
  const [
    showCommandExecutionMetaData,
    setShowCommandExecutionMetaData,
  ] = useState(false);

  useEffect(() => {
    setQuery(props.globalCommand);
  }, [props.globalCommand]);

  props.socket.on("output_from_client_to_web", (commandOutput) => {
    const output = JSON.parse(commandOutput);

    // Show output to respective clients.
    if (output.session_ID === props.client_Session_ID) {
      setOutput(output.stdout);
      setError(output.stderr);
      setReturnCode(output.return_code);
      setReturnCodeMeaning(output.return_code_meaning);
      setExecutionTimeStamp(output.execution_timestamp);
    }
    setShowCommandExecutionMetaData(true);
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

  const returnCodeStyling = returnCode === 0 ? "#00d1b2" : "lightcoral";

  return (
    <div className="tile is-parent">
      <article className="tile is-child notification is-bordered has-text-centered">
        <p className="title">{props.client_ID}</p>
        <p className="subtitle">Session ID : {props.client_Session_ID}</p>
        {showCommandExecutionMetaData ? (
          <div
            style={{ backgroundColor: returnCodeStyling }}
            className="output_metadata is-family-monospace"
          >
            <div class="return_code">
              {returnCode} ▶️ {returnCodeMeaning}
            </div>
            <div>EXECUTION TIMESTAMP : {executionTimeStamp}</div>
          </div>
        ) : null}
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
              <button type="submit" className="button is-primary">
                Command
              </button>
            </div>
          </div>
        </form>

        {output.length > 0 ? (
          <div className="is-family-monospace disp output">{output}</div>
        ) : null}
        {error.length > 0 ? (
          <div className="is-family-monospace disp error">{error}</div>
        ) : null}
      </article>
    </div>
  );
});

export default SendCommand;
