import {Component} from 'react'
import {v4} from 'uuid'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import TodoItem from '../TodoItem'

import './index.css'

class Todo extends Component {
  state = {userInput: ''}

  toggleIsCompleted = id => {
    const todoList = JSON.parse(localStorage.getItem('todo_list'))
    const updated = todoList.map(eachTodo => {
      if (eachTodo.id === id) {
        return {...eachTodo, isCompleted: !eachTodo.isCompleted}
      }
      return eachTodo
    })
    localStorage.setItem('todo_list', JSON.stringify(updated))
    this.setState({userInput: ''})
  }

  onDeleteTodo = id => {
    const todoList = JSON.parse(localStorage.getItem('todo_list'))
    const updatedTodoList = todoList.filter(eachTodo => eachTodo.id !== id)
    localStorage.setItem('todo_list', JSON.stringify(updatedTodoList))
    this.setState({userInput: ''})
  }

  onClickAddBtn = () => {
    const {userInput} = this.state
    const todo = JSON.parse(localStorage.getItem('todo_list'))
    const newTodo = {
      id: v4(),
      text: userInput,
      isCompleted: false,
    }
    localStorage.setItem('todo_list', JSON.stringify([...todo, newTodo]))
    this.setState({userInput: ''})
  }

  onChangeTodo = event => {
    this.setState({userInput: event.target.value})
  }

  onClickLogoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/todo/login')
  }

  render() {
    const {userInput} = this.state
    const todoList = JSON.parse(localStorage.getItem('todo_list'))

    console.log(todoList)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/todo/login" />
    }

    return (
      <div className="todo-container">
        <h1 className="todo-main-heading">TODO LIST</h1>
        <h1 className="create-task-heading">
          Create <span className="create-task-heading-subpart">Task</span>
        </h1>
        <input
          value={userInput}
          placeholder="What Needs To Bo Done?"
          onChange={this.onChangeTodo}
          className="todo-user-input"
        />
        <br />
        <button type="button" onClick={this.onClickAddBtn} className="add-btn">
          Add Task
        </button>
        <h1 className="create-task-heading">
          My <span className="create-task-heading-subpart">Tasks</span>
        </h1>
        <ul className="unordered-list">
          {todoList.map(each => (
            <TodoItem
              key={each.id}
              todoDetails={each}
              onDeleteTodo={this.onDeleteTodo}
              toggleIsCompleted={this.toggleIsCompleted}
            />
          ))}
        </ul>
        <button
          type="button"
          onClick={this.onClickLogoutBtn}
          className="add-btn"
        >
          Logout
        </button>
      </div>
    )
  }
}

export default Todo
