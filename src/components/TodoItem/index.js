import {RiDeleteBin6Line} from 'react-icons/ri'

import './index.css'

const TodoItem = props => {
  const {todoDetails, onDeleteTodo, toggleIsCompleted} = props
  const {text, id, isCompleted} = todoDetails

  const onChangeInput = () => {
    toggleIsCompleted(id)
  }

  const onClickBtn = () => {
    onDeleteTodo(id)
  }
  const classLabel = isCompleted ? 'completed-task' : ''

  return (
    <li className="list-container">
      <input
        type="checkbox"
        id={id}
        onChange={onChangeInput}
        className="checkbox-input"
      />
      <div className="label-container">
        <label htmlFor={id} className={`label-text ${classLabel}`}>
          {text}
        </label>
        <button type="button" onClick={onClickBtn} className="delete-btn">
          <RiDeleteBin6Line
            style={{height: '22px', width: '22px', color: '#000000'}}
          />
        </button>
      </div>
    </li>
  )
}

export default TodoItem
