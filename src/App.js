import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/antd/dist/antd.css';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
Amplify.configure(aws_exports);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedUp : true
        }
        this.handleSignup = this.handleSignup.bind(this);
    }

    handleSignup() {
        this.setState({
            signedUp: true
        });
    }
    render() {
        const { signedUp } = this.state;
        return !signedUp ? <SignUpForm handleSignup={ this.handleSignup }/> : <SignInForm />;
    }
}

export default App;

// Amplify.configure(aws_exports);

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default withAuthenticator(App, true);

