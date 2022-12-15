
import React, { useEffect,useState } from 'react';
import {Button, FormCheck, FormControl, Form} from 'react-bootstrap'
import { ReactComponent as DeleteIcon }  from './assets/DeleteIcon.svg'
import { ReactComponent as EditIcon }  from './assets/EditIcon.svg'
import { ReactComponent as SaveIcon }  from './assets/SaveIcon.svg'
import { v4 as uuidv4 } from 'uuid';




function App()
{
  const [todolist,setTodoList]=useState([])
  const [todo, setTodo]= useState('')
  const [newTodo, setNewTodo]= useState('')
  const addTodo =() =>
  {
    setTodoList(prevTodoList =>[...prevTodoList,{id: uuidv4(),todo:newTodo,isEditable: false, isCompleted :false}])
    setNewTodo('')
  }

  const completedTodo= (id)=>
  {
    setTodoList(prevTodoList => prevTodoList.map(todoItem => todoItem.id === id ? {...todoItem, isCompleted: !todoItem.isCompleted  }: todoItem))
  }
  const editTodo= (id,  oldTodo) =>
  {
    setTodoList(prevTodolist => prevTodolist.map(todoItem => todoItem.id=== id ?{...todoItem,isEditable: !todoItem.isEditable}:todoItem ))
    setTodo(oldTodo)
  }
  const saveTodo =(id)=>
  {
setTodoList(prevTodoList => prevTodoList.map(todoItem => todoItem.id=== id ?{...todoItem, isEditable: !todoItem.isEditable}: todoItem ))
  }
const deleteTodo=(id)=>
{
  setTodoList(prevTodoList => prevTodoList.filter(todoItem => todoItem.id !== id))
}
 useEffect(()=> console.log(todolist),[todolist])

//  useEffect(()=> {console.log(todolist) },[todolist])
  return (
    
    <div className="d-flex flex-column justify-content-center align-items-center mb-100">
     <h1 className="mt-100 justify-content-center align-items-center mb-100 mt">Todo List</h1>
    <div className='mt-20 d-flex w-50'> 
    <FormControl
    className="w-70"
      placeholder="Todo Input"
      value={newTodo}
      onChange={(event)=> setNewTodo(event.target.value)}
      />
     <Button className='btn btn-secondary ms-5' onClick={() =>addTodo() }>Add Todo</Button>
    </div>
     <div className='mt-5 w-75'>
      {
        todolist.map(
         ( todoItem ) =>
          <div key={ todoItem.id } className='d-flex justify-content-between mt-2 '>
            <div className='d-flex w-75 '>
            <FormCheck
          type="checkbox"
          className='me-2'
          value={todoItem.isCompleted}
          onChange={() => completedTodo(todoItem.id)}
         />
         
         {
        
        !todoItem.isEditable ?
        <label className= {`${todoItem.isCompleted ? 'text-decoration-line-through':' '} fw-bold`}>
          {todoItem.todo}
          </label>
          :
          <FormControl
         
          value={todo}
          onChange={(event)=> setTodo( event.target.value)}
     />
         

         }
          
         </div>
            <div>
              
              {
                !todoItem.isEditable ?
                <EditIcon width={25} height={25} style={{cursor:'pointer'}} className="me-2" onClick={()=> editTodo(todoItem.id , todoItem.todo ) }/>
              :
              <SaveIcon width={25} height={25} style={{cursor:'pointer'}} className="me-2" onClick={()=>saveTodo(todoItem.id, )}/>
              }
              <DeleteIcon width={25} height={25} style={{cursor:'pointer'}} className="me-2" onClick={()=>deleteTodo(todoItem.id)}/>
              </div>
         </div>
        )
      }
     </div>
    </div>
  );
  }
  
export default App;
