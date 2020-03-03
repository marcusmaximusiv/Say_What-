import React, { Component } from 'react';
import axios from 'axios'

// components
import ErrorMessage from './ErrorMessage'

// Constants
import Constants from '../Constants'

class Register extends Component {
  // static propTypes = {
  //     className: PropTypes.string,
  // };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      errorMessage: 'Username / Password cannot be empty',
      showLoading: false
    }

    // instantiate the Constants
    this.allConstants = new Constants()
  }

  // handle when the username / password field is updated
  handleOnChange(type, event) {
    event.persist()

    // update the corresponding state values
    if (type == 'username') {
      this.setState({
        username: event.target.value
      })
    } elif {
      this.setState({
        password: event.target.value
      })
    }
    else{

    }
  }

  // handle when the ENTER key is pressed
  handleKeyPress(type, event) {
    event.persist();

    if (event.keyCode == 13 || event.which == 13) {

      if (type == 'username') {
        if (this.state.username != '') {

          this.setState({
            showPasswordInput: true
          })
        } else {
          this.showErrorComponent()
        }
      } else if (type == 'password') {
        if (this.state.password != '') {

          console.log('Everything is correct Go for verify...', this.state)
          this.verifyUser()
        } else {
          this.showErrorComponent()
        }
      }
    }
  }

  // verify the logged in user
  verifyUser() {
    let { name, username, password} = this.state

    // reset the username / password field
    this.setState({ password: '', username: '', showLoading })

    let allConstants = this.allConstants

    axios({
      method: allConstants.method.POST,
      url: allConstants.login,
      header: allConstants.header,
      data: {
        username,
        password,
        name
      }
    })
      .then((res) => {

        if (res.data.userId) {
          console.log('user authentication successful', res.data)
          this.setState({ showLoading: false })
          // send the logged in user's data to parent
          this.props.onSuccessLogin(res.data)
        } else {
          // show the error message
          this.setState({ 'errorMessage': 'Authentication faliure ! Auto reload the page', showLoading: false })
          this.showErrorComponent()

          // reload the page
          setTimeout(() => {
            location.reload()
          }, 2000)
        }
      })
  }

  showErrorComponent() {

    // show the error message component
    this.setState({
      showError: true
    })

    // hide the error message component after 3sec
    setTimeout(() => {
      this.setState({
        showError: false
      })
    }, 2000)
  }

  render() {
    let { showError, showPasswordInput, showLoading, errorMessage, username, password, name } = this.state
    return (
      <div className="register">
        <div className="register-form">
          <div className="header-logo-area">
            <img src="images/logo.png" className="header-logo" />
          </div>
          <div className="register-title">Register</div>
          {(showError == true) ? <ErrorMessage message={errorMessage} /> : ''}

          {(showLoading == true) ? <Loading />
            :
            (showPasswordInput == false) ?
              <input type="text"
              placeholder="Enter your name"
              onChange={this.handleOnChange.bind(this, 'name')}
              onKeyPress={this.handleKeyPress.bind(this, 'name')}
              value={name} />
              :
              <input type="text"
                placeholder="Enter username"
                onChange={this.handleOnChange.bind(this, 'username')}
                onKeyPress={this.handleKeyPress.bind(this, 'username')}
                value={username} />
              :
              <input type="password"
                placeholder="Enter password"
                onChange={this.handleOnChange.bind(this, 'password')}
                onKeyPress={this.handleKeyPress.bind(this, 'password')}
                value={password} />
          }
        </div>
      </div>
    );
  }
}

export default Register;