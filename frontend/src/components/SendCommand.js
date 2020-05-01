import React from "react";

const sendcommand = (props) => {
  return (
    <div className="tile is-parent">
      <article className="tile is-child notification is-bordered has-text-centered">
        <p className="title">Client Name</p>
        <p className="subtitle">Session ID</p>
        <div className="field has-addons is-centered">
          <div className="control is-expanded">
            <input
              className="input is-family-monospace"
              type="text"
              placeholder="Enter command here"
              autoFocus
            />
          </div>
          <div className="control">
            <button className="button is-primary">Command</button>
          </div>
        </div>
        <p className="subtitle">Output : </p>
        <p className="subtitle is-family-monospace">No commands executed yet.</p>

      </article>

    </div>
  );
};

export default sendcommand;
