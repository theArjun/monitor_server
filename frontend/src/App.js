import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import ActionsOnSelectedRows from "./components/SelectClient";
import Hero from "./components/Hero";
const ENDPOINT = "http://127.0.0.1:5000/";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: socketIOClient(ENDPOINT),
      response: [],
    };
    this.state.socket.emit("populate_me", "Some Message is required here.");
    this.state.socket.on("update_connections_list", (data) => {
      this.setState({ response: data });
    });
  }

  render() {
    return (
      <div>
        <Hero />
        <div className="container">
          <br />
          <ActionsOnSelectedRows
            clients={this.state.response}
            socket={this.state.socket}
          />
        </div>
      </div>
    );
  }

  // TODO Reloading response issue OPTIMIZATION too much reloading
}

export default App;
