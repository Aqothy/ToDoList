import { useState } from "react";

export default function List({item, handleChecked, setItem}){
    
    const [editingTask, setEditingTask] = useState('');//value of in the input of the editing field

    const [showTasks, setShowTasks] = useState(true);//determines if tasks should be shown or not

    //function that handles when user clicks edit, takes in id
    const handleEdit = (id) => {
        //when user is editing, showTasks is false
        setShowTasks(false);
        //resets editingTask input to default so user doesnt have to delete the task to enter a new one
        setEditingTask("")
        //setItem takes in function with currentItem which is a copy of the item array
        setItem((currentItem) => {
        //maps through every single item of that array
        return currentItem.map((item) => {
            //returns compares the id checked in to every item in the array and if it matches, changed the editing property of that item
            //else if id doesnt match, return the normal item unchanged
            return item.id === id ? ({...item, editing: true}): (item)
        })
        })
    }

    //function that updates the to Do list, takes in id and new task
    const handleUpdate = (id, updatedTask) => {
        //if input field value is 0, alert user to enter a task before adding
        editingTask.length === 0 ? alert('Please enter a task before adding.'):
        //basically same concept as the other function
        setItem((currentItems) => {
            return currentItems.map((item) => {
                return item.id === id ? { ...item, task: updatedTask, editing: false } : item;
            });
        });
        //after task is done updating and editingTask length is not 0, show the other tasks
        editingTask.length !==0 ? setShowTasks(true) : setShowTasks(false);
    };

    return(
        <ul>
            {/*maps through every element that is stored in the item array and creates a to Do List out of it*/}
            {item.map((items) => {
                //if editing is true, return editing form which allows you to edit list item
                return items.editing === true ? (
                    //Takes event of the onSubmit, prevent default of the event, which is refreshing page and submitting
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(items.id, editingTask); // Update with the value from 'editingTask', and passes in item.id
                    }}>
                    <input
                        type="text"
                        value={editingTask}
                        placeholder='New Task'
                        //takes in event of the onChange, and sets editingTask to the event value
                        onChange={(e) => {
                        setEditingTask(e.target.value); // Update 'editingTask' state as user types
                        }}
                    />
                    <button type='submit'>Update Task</button>
                    </form>
                ) : (
                    //when showTasks is true, which only happens when user is not editing, show the to Do list tasks
                    showTasks && (
                        <li key={items.id}>
                        <label htmlFor={items.id}>
                            <input
                            id={items.id}
                            type='checkbox'
                            //takes event of onChange of the checkBox and calls handChecked function, passing in the items.id and event checked
                            onChange={(e) => handleChecked(items.id, e.target.checked)}
                            checked={items.checked}
                            className='mr-[0.5rem]'
                            />
                            {/* displaying the task*/}
                            {items.task}
                        </label>
                        {/*clicking button calls handleEdit function, passing in the items.id*/}
                        <button className='ml-[1rem]' onClick={() => handleEdit(items.id)}>Edit</button>
                        </li>
                    )
                )
            })}
        </ul>
    )
}