import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import SignIn from './components/SignIn'
import Todo from './components/Todo'
import NotFound from './components/NotFound'

const App = () => {
  const todoList = localStorage.getItem('todo_list')
  if (todoList === null) {
    const todo = []
    localStorage.setItem('todo_list', JSON.stringify(todo))
  }
  const userDetails = localStorage.getItem('users_list')
  if (userDetails === null) {
    const user = []
    localStorage.setItem('users_list', JSON.stringify(user))
  }

  return (
    <Switch>
      <Route exact path="/todo/login" component={Login} />
      <Route exact path="/todo/sign-in" component={SignIn} />
      <Route exact path="/todo" component={Todo} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default App
