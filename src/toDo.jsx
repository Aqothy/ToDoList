import { useState } from "react";

export default function ToDo({onSubmit}){

  const [toDo, setToDo] = useState('');//value in the input of the toDo

  const handleSubmit = () => {
    //if the toDo value length is equal to 0, alert the user to enter a task before adding
    toDo.length === 0 ? alert('Please enter a task before adding.'):

    onSubmit(toDo)

    //setToDo to default value so user doesn't have to delete text to re-enter task
    setToDo('');
  };

  return(
    <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()}} className='flex flex-col gap-[0.5rem]'>
        <label htmlFor='toDo'>To Do List</label>
        <input
          value={toDo}
          //takes in event of the onChange, and passes event value to setToDo function to change the value of toDo
          onChange={(e) => {
              setToDo(e.target.value);
          }}
          id='toDo'
          type='text'
          className='w-[10rem]'
        />
        <button type='submit' className='border border-solid border-gray-500'>
          Add
        </button>
      </form> 
    )
}