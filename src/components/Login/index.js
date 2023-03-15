import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isErrorName: false,
    isErrorPass: false,
    isError: false,
    errorMsgName: '',
    errorMsgPass: '',
    errMsg: '',
    passwordHide: true,
  }

  onClickImg = () => {
    this.setState(prevState => ({passwordHide: !prevState.passwordHide}))
  }

  onChangeEmail = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  loginProcess = () => {
    const {username, password} = this.state
    const details = JSON.parse(localStorage.getItem('users_list'))
    let exists = false
    details.forEach(eachItem => {
      if (eachItem.username === username) {
        exists = true
      }
    })
    if (exists) {
      const particularUser = details.filter(
        eachItem => eachItem.username === username,
      )
      if (particularUser[0].password === password) {
        const currentUser = details.filter(
          eachElement => eachElement.username === username,
        )
        const jwtToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9. nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y'
        Cookies.set('jwt_token', jwtToken, {expires: 1})
        localStorage.setItem('current_user', JSON.stringify(currentUser[0]))
        const {history} = this.props

        history.replace('/todo')
      } else {
        this.setState({
          isError: true,
          errMsg: "Email and Password didn't match",
        })
      }
    } else {
      this.setState({
        isError: true,
        errMsg: 'The user seems to be new! Please sign up',
      })
    }
  }

  checkFields = () => {
    const {username, password} = this.state
    if (username === '' && password === '') {
      this.setState({
        isErrorName: true,
        errorMsgName: 'Please enter a valid username.',
        isErrorPass: true,
        errorMsgPass: 'Please enter a valid password',
      })
    } else if (username === '' && password !== '') {
      this.setState({
        isErrorName: true,
        errorMsgName: 'Please enter a valid username.',
      })
    } else if (password === '' && username !== '') {
      this.setState({
        isErrorPass: true,
        errorMsgPass: 'Please enter a valid password',
      })
    } else {
      this.setState({isErrorName: false, isErrorPass: false})
      this.loginProcess()
    }
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.checkFields()
  }

  render() {
    const {
      username,
      password,
      isErrorName,
      isErrorPass,
      isError,
      errorMsgName,
      errorMsgPass,
      errMsg,
      passwordHide,
    } = this.state

    const imgUrl = passwordHide
      ? 'https://res.cloudinary.com/dwkye4hwh/image/upload/v1678514130/ic_hide_password_lxvngq.svg'
      : 'https://res.cloudinary.com/dwkye4hwh/image/upload/v1678514174/ic_unhide_password_vqtalq.svg'

    const passwordType = passwordHide ? 'password' : 'text'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/todo" />
    }

    return (
      <div className="login-card-container">
        <form onSubmit={this.onSubmitForm} className="form-container">
          <h1 className="main-heading">Login Here!</h1>
          <div className="email-container">
            <label htmlFor="email" className="input-label-login">
              Username*
            </label>
            <br />
            <input
              value={username}
              placeholder="Enter Username"
              onChange={this.onChangeEmail}
              className="user-input"
              id="email"
              type="text"
            />
            {isErrorName ? <p className="error-msg">{errorMsgName}</p> : ''}
          </div>
          <div className="email-container">
            <label htmlFor="pass" className="input-label-login">
              Password*
            </label>
            <br />
            <div className="pass-img-container">
              <input
                value={password}
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                className="password-input"
                id="pass"
                type={passwordType}
              />
              <button
                type="button"
                onClick={this.onClickImg}
                className="eye-img-btn"
              >
                <img src={imgUrl} alt="password" className="eye-img" />
              </button>
            </div>
            {isErrorPass ? <p className="error-msg">{errorMsgPass}</p> : ''}
          </div>
          <p className="main-para">
            Create account <Link to="/todo/sign-in">Sign In</Link>
          </p>
          <button type="submit" className="sign-in-btn">
            Login
          </button>
          {isError ? <p className="error-msg">{errMsg}</p> : ''}
        </form>
      </div>
    )
  }
}

export default Login
