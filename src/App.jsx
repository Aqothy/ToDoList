import { useEffect, useState} from 'react';
import './App.css';
import ToDo from './toDo'
import List from './EditList';
import axios from 'axios'

export default function App() {

  const [item, setItem] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    return localValue === null ? [] : JSON.parse(localValue)
  });//passing a function and whatever you return from the function is your defualt value

  const [quote, setQuote] = useState('');

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(item))
  }, [item])

  useEffect(() => {
    axios.get('https://catfact.ninja/fact')
    .then((res) => {
      setQuote(res.data.fact)
    }).catch((err) => {
      console.log(err)
    })
  }, []);
  
  const addToDo = (toDo) => {
    /*setItem which is a function that sets the value for item, 
    in this case setItem function takes in annonymous function which takes in currentItem, 
    which is a copy of the item array*/
    setItem((currentItem) => {
      /*
      returns an array, using spread operator (...) that copies the currentItem array with existing objects
      and adds on new objects to the end
      */
      return [
        ...currentItem,
        //new object and their property
        {id: crypto.randomUUID(), task: toDo, checked: false, editing: false},
      ];
    });
  }
  
  //function that handles delete
  const handleDelete = () => {
    //setItem takes in function with currentItem which is a copy of the item array
    setItem((currentItem) => {
      //returns filtered array with false checked items
      return currentItem.filter((item) => item.checked !== true);
    });
  };

  //function that sets the task to checked, takes in id and checked property
  const handleChecked = (id, checked) => {
    //setItem takes in function with currentItem which is a copy of the item array
    setItem((currentItem) => {
      //maps through every single item of that array
      return currentItem.map((item) => {
        //returns compares the id checked in to every item in the array and if it matches, changed the checked property of that item
        //else if id doesnt match, return the normal item unchanged
        return item.id === id ? { ...item, checked: checked } : item;
      });
    });
  };  

  return (
    <div className='flex flex-col gap-[1rem] items-center'>
      <div className='mb-[5rem]'>{quote}</div>
      <ToDo onSubmit={addToDo}/>
      {/*when butotn is clicked, call the handleDelete function*/}
      <button onClick={() => handleDelete()} className='border-solid'>
        Delete
      </button>
      <List item={item} handleChecked={handleChecked} handleDelete={handleDelete} setItem={setItem}/>
    </div>
  );
}
