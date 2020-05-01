import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Clients from "./components/Clients";
import Hero from "./components/Hero";
const ENDPOINT = "http://127.0.0.1:5000/";
class App extends Component {
  constructor(props) {
    super(props);

    this.socket = socketIOClient(ENDPOINT);

    this.state = {
      response: [],
    };
    this.socket.emit("populate_me", "Some Message is required here.");
    this.socket.on("update_connections_list", (data) => {
      this.setState({ response: data });
    });
  }

  render() {
   
    return (
      <div>
        <Hero />
        <div className="container">
          <Clients clients={this.state.response} />
        </div>
      </div>
    );
  }

  // TODO Reloading response issue OPTIMIZATION too much reloading
}

export default App;
