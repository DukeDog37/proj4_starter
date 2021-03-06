import React, { Component } from "react";
//import { Link } from "react-router-dom";
import {  FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./signin.css";
import config from "../../config";
import {
 CognitoUserPool,
 AuthenticationDetails,
 CognitoUser
} from "amazon-cognito-identity-js";

import LoaderButton from "../../components/LoaderButton";


export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

    login(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err)
      })
    );
  }


  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit =  event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
         this.login(this.state.email, this.state.password).then( err =>{
          if (err) { alert(err)}
            else {
          
           window.location.replace("/")
          this.props.history.push("/");
          this.props.userHasAuthenticated(true);
          this.setState({ isLoading: false });
          }
         })
       
        } catch (e) {
          alert(e);
      }
  }

  render() {
    return (
      <div className="signin">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
             block
             bsSize="large"
             disabled={ !this.validateForm() }
             type="submit"
             isLoading={this.state.isLoading}
             text="Login"
             loadingText="Logging in…"
            />
        </form>
      </div>
    );
  }
}

//https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//https://reactjs.org/docs/higher-order-components.html 