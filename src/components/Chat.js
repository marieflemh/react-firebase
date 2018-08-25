import React, { Component } from "react";
import firebase, { provider } from "../firebase";
import "../styles/App.css";

function toArray(users) {
  let array = [];
  for (let item in users) {
    array.push({ ...users[item], key: item });
  }
  return array;
}

class Chat extends Component {
  state = {
    user: "",
    message: "",
    users: []
  };

  componentDidMount() {
    this.auth();
    firebase
      .database()
      .ref("/messages")
      .on("value", snapshot => {
        const users = toArray(snapshot.val());
        this.setState({ users });
      });
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

  //update state when something is written in the input field
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //push to database
  pushMessage = event => {
    event.preventDefault();
    this.setState({ message: "" });
    const inputData = {
      user: this.state.user.displayName,
      message: this.state.message,
      timestamp: new Date().getTime()
    };
    firebase
      .database()
      .ref(`/messages`)
      .push(inputData);
  };

  //remove from database
  removeMessage = removeMsg => {
    firebase
      .database()
      .ref(`/messages/${removeMsg.key}`)
      .remove();
  };

  //output
  showMessages = users => {
    return users.map(user1 => (
      <div key={user1.uid} className="col-sm-4">
        <div className="card">
          <h5 className="card-header">{user1.user}</h5>
          <div className="card-body">
            <div className="card-text">
              <p>{user1.message}</p>
              <p>{new Date(user1.timestamp).toLocaleTimeString()}</p>
            </div>
            <hr className="my-2" />
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => this.removeMessage(user1)}
            >
              ta bort
            </button>
          </div>
        </div>
      </div>
    ));
  };

  render() {
    const { users } = this.state;
    const allMessages = this.showMessages(users);
    return (
      <div className="container">
        {this.state.user ? ( //if loggedin
          <div className="row">
            <div className="col-sm-6">
              <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">
                  Welcome, {this.state.user.displayName}
                </h4>
                <p>Write a comment</p>
                <hr />
                <div className="mb-o">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={this.logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="input-group mb-3">
                <textarea
                  type="text"
                  name="message"
                  className="form-control"
                  placeholder="Write a comment"
                  rows="5"
                  onChange={this.handleChange}
                  value={this.state.message}
                />

                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={this.pushMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
            <div className="container">
              <hr className="my-4" />
              <h2>User comments</h2>
              <div className="row">{allMessages}</div>
            </div>
          </div>
        ) : (
          //else (if not loggedin)
          <div>
            <h2>Login with Google</h2>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={this.login}
            >
              Login
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Chat;
