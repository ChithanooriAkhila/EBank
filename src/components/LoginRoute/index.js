import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginRoute extends Component {
  state = {userId: '', pin: '', loginError: false, errorMessage: ''}

  changeUserId = event => {
    this.setState({userId: event.target.value})
  }

  changePin = event => {
    this.setState({pin: event.target.value})
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    console.log('clicked!!')

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  submitFailure = errorMessage => {
    this.setState({loginError: true, errorMessage})
  }

  loginForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, loginError, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="login-route-container">
          <div className="login-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <div className="login-form-container">
            <h1>Welcome Back!</h1>
            <form onSubmit={this.loginForm} className="login-form">
              <label htmlFor="userId">User ID</label>
              <input
                id="userId"
                type="text"
                placeholder="Enter User Id"
                onChange={this.changeUserId}
                value={userId}
                className="input-field"
              />
              <label htmlFor="pin">PIN</label>
              <input
                id="pin"
                type="password"
                placeholder="Enter PIN"
                onChange={this.changePin}
                value={pin}
                className="input-field"
              />
              <button type="submit" className="login-button">
                Login
              </button>
              {loginError && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginRoute
