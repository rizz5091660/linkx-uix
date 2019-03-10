import React, { Component } from 'react';

import GoogleLogin from 'react-google-login';

class Login extends Component {

  render() {

    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
      <div className="App">
        <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>

      <GoogleLogin
        clientId="11628067413-6fusf55adnj5m254m91mg77o86qq2ir3.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />

      </div>
    );
  }
}

export default Login;