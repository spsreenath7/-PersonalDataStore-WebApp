import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import SignInForm from './SignInForm';
class SignUpForm extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            username: '',
            password: '',
            phone_number: '',
            email: '',
            confirmationCode: '',
            verified: false,
            profile: {
              prof_username: '',
              prof_phone_number: '',
              prof_email: ''              
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUp = this.signUp.bind(this);
        this.confirmSignUp = this.confirmSignUp.bind(this);
    }
  
    signUp() {
        const { username, password, email, phone_number } = this.state;  
        Auth.signUp({
            username: username,
            password: password,
            attributes: {
                email: email,
                phone_number: phone_number
            }
        })
        .then(() => {
            console.log('Successfully signed up');
        })
        .catch((err) => console.log(`Error signing up: ${ err }`))
    }
  
    confirmSignUp() {
        const { username, confirmationCode } = this.state;
        const { prof_username, prof_phone_number, prof_email} = this.state.profile;
        Auth.confirmSignUp(username, confirmationCode)
        .then(() => {
            console.log('Successfully confirmed signed up')
            this.props.handleSignup();
            // 'http://ec2-52-214-36-181.eu-west-1.compute.amazonaws.com:3001/usersetup/'
            const resp =  axios.post('http://localhost:3001/usersetup/', {
              // userid: `pdlrz${username}`,
              username: prof_username,
              phonenumber: prof_phone_number,
              email: prof_email              
            });
        })
        .catch((err) => console.log(`Error confirming sign up - ${ err }`));
    }
  
    handleSubmit(e) {
      const { verified } = this.state;
  
        e.preventDefault();
  
        if (verified) {
          this.confirmSignUp();
          this.setState({
             confirmationCode: '',
             username: ''
          });
        } else {
          this.signUp();
          const { username, password, email, phone_number } = this.state;
          this.setState({
            password: '',
            email: '',
            phone_number: '',
            verified: true,
            profile: {
              prof_username: username,
              prof_phone_number: phone_number,
              prof_email: email              
            }
        });
        }
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
        } else if (e.target.id === 'phone_number') {
          this.setState({
              phone_number: e.target.value
          });
        } else if (e.target.id === 'email') {
          this.setState({
              email: e.target.value
          });
        } else if (e.target.id === 'confirmationCode') {
          this.setState({
              confirmationCode: e.target.value
          });
        }
    }
  
    render() {
      const { verified } = this.state;
      if (verified) {
          return (
              <div>
                  <form onSubmit={ this.handleSubmit }>
                  <div class="form-group">
                      <label for="confirmationCode">Confirmation Code</label>
                      <input id='confirmationCode' class="form-control" type='text' onChange={ this.handleChange }/>
                      </div>
                      <button>Confirm Sign up</button>
                  </form>
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
            <div class="col-md-auto">
              <br/>
            <form onSubmit={ this.handleSubmit }>
            <div class="form-group">
                <label for="username">Username</label>
                <input id='username' class="form-control" type='text' onChange={ this.handleChange }/>
                </div>
                <div class="form-group">
                <label for="password">Password</label>
                <input id='password' class="form-control" type='password' onChange={ this.handleChange }/>
                </div>
                <div class="form-group">
                <label for="phone_number">Phone Number</label>
                <input id='phone_number' class="form-control" type='text' onChange={ this.handleChange }/>
                </div>
                <div class="form-group">
                <label for="email">Email</label>
                <input id='email' class="form-control" type='text' onChange={ this.handleChange }/>
                </div>
                <button class="btn btn-primary">Sign up</button>
            </form>
            </div>
            <div class="col col-lg-2">
            </div>
          </div>
        </div>

          // <div>
            // <form onSubmit={ this.handleSubmit }>
            // <div class="form-group">
            //     <label>Username</label>
            //     <input id='username' type='text' onChange={ this.handleChange }/>
            //     </div>
            //     <div class="form-group">
            //     <label>Password</label>
            //     <input id='password' type='password' onChange={ this.handleChange }/>
            //     </div>
            //     <div class="form-group">
            //     <label>Phone Number</label>
            //     <input id='phone_number' type='text' onChange={ this.handleChange }/>
            //     </div>
            //     <div class="form-group">
            //     <label>Email</label>
            //     <input id='email' type='text' onChange={ this.handleChange }/>
            //     </div>
            //     <button class="btn btn-primary">Sign up</button>
            // </form>
          //   <br/>
          //   <br/>
            
          // </div>
        );
      }
    }
}

export default SignUpForm;