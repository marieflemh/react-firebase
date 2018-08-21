import React, { Component } from "react";
import styled from "styled-components";

const ButtonCall = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// We're extending Button with some extra styles
const ButtonMail = ButtonCall.extend`
  color: tomato;
  border-color: tomato;
`;

class Contact extends Component {
  render() {
    return (
      <div className="container">
        <div className="media">
          <img
            className="mr-3"
            src="https://static.thenounproject.com/png/1562095-200.png"
            alt="Generic placeholder"
          />
          <div className="media-body">
            <h5 className="mt-0">Contact us</h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
            scelerisque ante sollicitudin. Cras purus odio, vestibulum in
            vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
            vulputate fringilla. Donec lacinia congue felis in faucibus.
            <div>
              <ButtonCall>Telephone</ButtonCall>
              <ButtonMail>Email</ButtonMail>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
