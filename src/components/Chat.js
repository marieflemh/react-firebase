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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //push to database
  pushMessage = event => {
    event.preventDefault();
    this.setState({ message: this.state.message });
    const inputData = {
      user: this.state.user.displayName,
      message: this.state.message
    };
    firebase
      .database()
      .ref(`/messages`)
      .push(inputData);
  };

  showMessages = users => {
    return users.map(user1 => (
      <div key={user1.uid} className="col-sm-6">
        <div className="card">
          <h5 className="card-header">{user1.user}</h5>
          <div className="card-body">
            <p className="card-text"> {user1.message}</p>
          </div>
        </div>
      </div>
    ));
  };

  render() {
    const { users } = this.state;
    const allMessages = this.showMessages(users);
    return (
      <div>
        <div className="container">
          {this.state.user ? (
            <div>
              <h1>Hello, {this.state.user.displayName}</h1>{" "}
              <button onClick={this.logout}>Logout</button>
              <form>
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
                <button
                  type="submit"
                  className="btn btn-primary mb-2"
                  onClick={this.pushMessage}
                >
                  Send
                </button>
              </form>
              <div className="container">
                <p>{allMessages}</p>
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
