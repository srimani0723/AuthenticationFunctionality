import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Login = props => {
  const onSuccessLogin = token => {
    const {history} = props

    Cookies.set('jwt_token', token, {
      expires: 30,
    })

    history.replace('/')
  }

  const onSampleCreds = async () => {
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username: 'rahul',
      password: 'rahul@2021',
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      onSuccessLogin(data.jwt_token)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login">
      <h1>Please Login</h1>
      <button type="button" onClick={onSampleCreds}>
        Login with Sample Creds
      </button>
    </div>
  )
}

export default Login
