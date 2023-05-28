import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }
  const logoutUser = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="home-main-container">
      <div className="home-header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button type="button" onClick={logoutUser} className="logout-button">
          Logout
        </button>
      </div>
      <div className="digital-card-container">
        <h1>Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card"
        />
      </div>
    </div>
  )
}
export default Home
