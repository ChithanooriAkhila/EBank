import './App.css'
import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import LoginRoute from './components/LoginRoute'
import NotFound from './components/NotFound'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/ebank/login" component={LoginRoute} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
