import React, { Component } from "react";
import firebase, { provider } from "../firebase";
import "../styles/App.css";

class Chat extends Component {
  state = {
    user: "",
    message: ""
  };

  componentDidMount() {
    this.auth();
  }

  //login authentication
  auth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: "" });
      }
    });
  };

  //login function
  login = () => {
    firebase.auth().signInWithPopup(provider);
  };

  //logout function
  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ user: "" });
      });
  };

  //handle submit
  onSubmit = event => {
    event.preventDefault();
    this.setState({ message: this.state.message });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <div className="container">
          {this.state.user ? (
            <div>
              <h1>Hello, {this.state.user.displayName}</h1>{" "}
              <button onClick={this.logout}>Logout</button>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="message"
                    className="form-control"
                    placeholder="Write a message"
                    onChange={this.handleChange}
                    value={this.state.message}
                  />
                </div>
                <button type="submit" className="btn btn-primary mb-2">
                  Send
                </button>
              </form>
              <div className="container">
                <p>{this.state.message}</p>
              </div>
            </div>
          ) : (
            <div>
              <h1>Login with Google</h1>
              <button onClick={this.login}>Login</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Chat;
