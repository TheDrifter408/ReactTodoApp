import {  SyntheticEvent, useState, useEffect } from 'react'
import './App.css'

class Todo {
  id:number;
  todo:string;
  checked:boolean
  constructor(newId:number = 0,newTodo:string,checked:boolean = false){
    this.id = newId;
    this.todo = newTodo;
    this.checked = checked;
  }

}
function App() {
  {/* To store the text form of the Todo Object */}
  const [todo,setTodo] = useState('');
  {/* It's an array of type Todo to store the Todo Objects */}
  const [todoList,setTodoList] = useState<Todo[]>([]);
  {/* warning state for duplicate todos or empty input*/}
  const [warning,setWarning] = useState('');
  {/* localStorage is by react's docs an 'external system' as such useEffect is used*/}
  
  function checkList(newItem:Todo){
    let filtered = todoList.filter((item) => item.todo === newItem.todo)
    if(filtered.length === 0){
      return false;
    }
    return true;
  }

  useEffect(() => {
    let myList = localStorage.getItem("myList");
    if(myList === null){
      return;
    }
    let parsedList = JSON.parse(myList);
    setTodoList(parsedList);
  },[])

  function handleSubmit(e:SyntheticEvent){
    e.preventDefault();
    let newId = 0;
    if(todo.length === 0){
      return;
    }
    if(todoList.length === 0){
      newId = 1;
    } else {
      newId = todoList[todoList.length-1].id + 1;
    }
    let newTodo = new Todo(newId,todo);
    setTodo('');
    if(checkList(newTodo)){
      setWarning("You already have this");
      setTodo('');
      return;
    }
    setWarning('')
    let newTodoList = [...todoList,newTodo];
    setTodoList(newTodoList);
    let storeList = JSON.stringify(newTodoList);
    localStorage.setItem("myList",storeList);
  }
  
  function removeItem(id:number){
    let newList = todoList.filter((item) => item.id !== id);
    setTodoList(newList);
    let storeList = JSON.stringify(newList);
    localStorage.setItem("myList",storeList);
  }
  return (
    <div>
      <main>
      <section>
        <article>
          <h1>Add An Item:</h1>
          <form onSubmit={(e) => handleSubmit(e)} className="form">
          <div className="input-container">
            <input type="text" value={todo} id="newItem" onChange={(e) => setTodo(e.target.value)} />
            <div className="warn-container">
              <p className="warning">{warning}</p>
            </div>
          </div>
          <div className="btn-container">
            <button>Add Todo</button>
          </div>
          </form>
        </article>
        <article className="todos-container">
          <h1>Your Todos:</h1>
          <ul className="list-container">
          {
            todoList.map((item) => {
              return (
                <li key={item.id} className="todoItem">
                  <input type="checkbox" id={`item-${item.id}`} value={`${item.checked}`} />
                  <label htmlFor={`item-${item.id}`}>{item.todo}</label>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </li>
              )
            })
          }
          </ul>
        </article>
      </section>
      </main>
    </div>
  )
}

export default App
