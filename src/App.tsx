import React, { useState } from 'react';
import './App.css';
import NumberInputPage from './components/mantain';
import { Button } from '@mantine/core';
import { CloseButton, Group, Checkbox } from '@mantine/core';

function App(this: any) {
  const [varidation,setVaridation] = useState("");
  const [inputValue,setInputValue] = useState("");
  const [inputText,setInputText] = useState("");
  const [todos,setTodos] = useState<Todo[]>([]);

  type Todo ={
    inputValue:string,
    inputText:string,
    inputSolve:string,
    id:number,
    checked:boolean,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    console.log(e.target.value);
    setInputValue(e.target.value);
  }
  
  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value)
    setInputText(e.target.value);
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    

    const newTodos : Todo = {
      inputValue: inputValue,
      inputText: inputText,
      inputSolve:'',
      id: todos.length,
      checked:false,
    }
    if(inputValue){
      setTodos([...todos,newTodos]);
      setVaridation("");
    }else{
      setVaridation("Please add task")
    }
    setInputText("");
    setInputValue("");
  }

  const handleEdit = ( id : number,inputValue : string ) => {
    const newTodos = todos.map( (todo) => {
      if( todo.id === id ){
        todo.inputValue = inputValue;
      }
      return todo;
    } )
    setTodos(newTodos);
  };
  const handleEditText = ( id : number,inputText : string ) => {
    const newTodos = todos.map( (todo) => {
      if( todo.id === id ){
        todo.inputText = inputText;
      }
      return todo;
    } )
    setTodos(newTodos);
  };

  const handleChecked = ( id : number, checked : boolean ) => {
    const newTodos = todos.map( (todo) => {
      if( todo.id === id ){
        todo.checked = !checked;
      }
      return todo;
    } )
    setTodos(newTodos);

  };

  const handleDelete = (id : number) => {
    const newTodos = todos.filter( (todo) => todo.id !== id);
    setTodos(newTodos)
  }

  const handleSolve = ( id : number,inputSolve : string ) => {
    const newTodos = todos.map( (todo) => {
      if( todo.id === id ){
        todo.inputSolve = inputSolve;
      }
      return todo;
    } )
    setTodos(newTodos);
  };



  return (
    <div className="App">
      <div className='Applist'>
        <NumberInputPage />
        <h2>ToDo List with Typescript</h2>
        <form onSubmit={(e)=> handleSubmit(e)}>
          <input onChange={(e)=>handleChange(e)} className="inputTitle" value={inputValue} />
          <textarea onChange={(e)=> handleText(e)} className="inputTextarea" value={inputText}></textarea>
          <Button 
          color="indigo" radius="md"
          type="submit" className="submitButton">CREATE</Button>
          <p className='varidation'>{varidation}</p>
        </form>
        <ul className="todoList">
          <h2 className="todoListTitle">QuestionsLists and Answers</h2>
          {todos.map( (todo) => (
              <li key={todo.id}>
                <div className='questionArea'>
                  <input
                  onChange={(e)=>handleEdit(todo.id, e.target.value)} 
                  className="inputTileValue"
                  value={todo.inputValue}
                  disabled={todo.checked}/>
                  <textarea
                  onChange={(e)=>handleEditText(todo.id, e.target.value)}
                  className="inputTextareaValue"
                  disabled={todo.checked}
                  >{todo.inputText}</textarea>
                </div>

                <div>
                  <input
                  onChange={(e)=>handleSolve(todo.id, e.target.value)} 
                  className="inputSolve"
                  value={todo.inputSolve}
                  disabled={todo.checked}/>
                  <Checkbox
                  className='inputCheckbox'
                  onClick={ (e) => handleChecked(todo.id , todo.checked)}
                  radius="md"
                  size="xl"
                  />
                </div>
                <Group position="center" className='inputDelete'>
                  <CloseButton title="Close popover" size="xl" iconSize={20} 
                  onClick={() => handleDelete( todo.id)}/>
                </Group>
                
                
              </li>
          ) )}
        </ul>
      </div>
    </div>
  );
}

export default App;
