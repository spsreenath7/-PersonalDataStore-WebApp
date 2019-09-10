import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import Home from './home/home'

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      signedIn: false,
      signeduser: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signIn = this.signIn.bind(this);
    // this.confirmSignIn = this.confirmSignIn.bind(this);
  }

  signIn() {
    const { username, password } = this.state;
    Auth.signIn({
      username: username,
      password: password
    })
      .then(() => console.log('successfully signed in'))
      .catch((err) => console.log(`Error signing in: ${err}`))
  }

  // confirmSignIn() {
  //   const { username } = this.state;
  //   Auth.confirmSignIn(username)
  //     .then(() => console.log('successfully confirmed signed in'))
  //     .catch((err) => console.log(`Error confirming sign up - ${err}`))
  // }

  handleSubmit(e) {
    e.preventDefault();

    this.signIn();
    // this.confirmSignIn();
    const currentUser = this.state.username;
    console.log('signed in user : '+currentUser);
    this.setState({
      username: '',
      password: '',
      signedIn: true,
      signeduser: currentUser
    });
    e.target.reset();
  }

  handleChange(e) {
    if (e.target.id === 'username') {
      this.setState({
        username: e.target.value
      });
    } else if (e.target.id === 'password') {
      this.setState({
        password: e.target.value
      });
    }
  }

  render() {
    const { signedIn } = this.state;
    if (signedIn) {
      console.log('After signed in  ');
      return (
        <div class="container">
          <div class="row justify-content-md-center">
            <h1>Personal Data lake</h1>
          </div>
          <div class="row justify-content-md-center">
            <div class="col col-lg-2">
            </div>
            <div class="col-md-auto">
              <Home curuser={this.state.signeduser} />
            </div>
            <div class="col col-lg-2">
            </div>
          </div>
        </div>

      );
    } else {
      return (
        <div class="container">
          <div class="row justify-content-md-center">
            <h1>Personal Data lake</h1>
          </div>
          <div class="row justify-content-md-center">
            <div class="col col-lg-2">
            </div>
            <div class="col-md-5">
              <br />
              <form onSubmit={this.handleSubmit}>
                <label for="username">Username</label>
                <input id='username' class="form-control" type='text' onChange={this.handleChange} />
                <label for="password">Password</label>
                <input id='password' class="form-control" type='password' onChange={this.handleChange} />
                <br/>
                <button class="btn btn-primary"> Sign In</button>
              </form>
            </div>
            <div class="col col-lg-2">
            </div>
          </div>
        </div>
        // <div>
        //   <form onSubmit={ this.handleSubmit }>
        //       <label>Username</label>
        //       <input id='username' type='text' onChange={ this.handleChange }/>
        //       <label>Password</label>
        //       <input id='password' type='password' onChange={ this.handleChange }/>
        //       <button>Sign In</button>
        //   </form>
        // </div>
      );
    }
  }
}

export default SignInForm;