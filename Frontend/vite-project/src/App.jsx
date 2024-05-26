import './App.css'
import axios from "axios";
import { useState, useEffect } from 'react';
import { BsFillTrashFill, BsCircleFill, BsCircle } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";

function App() {
  // using hooks to store the data
  const [task, setTask] = useState("");
  const [alltask, setAlltask] = useState([]);

  const baseUrl = 'http://localhost:5000/api'

  useEffect(() => {
    axios.get(`${baseUrl}/getAllTask`).then(async (result) => {
      console.log(result);

      // result.data.forEach((element) => {
      //   alltask.push(element.task);
      // })
      setAlltask(result.data);

    }).catch((err) => {
      console.log("Getting all task api error : " + err);
    })
  }, []);

  // const alltaskElements = alltask.map(function(task, index) {
  //   return (
  //     <> 
  //       <div key={index}>
  //         <p>task</p>
  //       </div>
  //     </>
  //   )
  // });



  const handleAddTask = () => {
    if (task === '') {
      alert('Task is empty');
    } else {

      axios.post(`${baseUrl}/addTask`, {
        "task": task
      }).then(result => {
        location.reload();
        console.log(result);
      }).catch(err => {
        console.log("Add task api error : " + err);
      })
      // location.reload();
      document.querySelector(".input-box").value = "";
    }

  }

  // mark as completed function
  const handleMarkAsCompleted = async (id) => {
    await axios.put(`${baseUrl}/markCompleted/${id}`).then(result => {
      location.reload();
      console.log(result);
    }).catch(err => {
      console.log(`Marking done as true error !! ${err}`);
    })
  }


  // edit the task function
  const handleEditTask = async (id) => {

    const updatedTask = prompt("Enter new task");
    if (updatedTask != "") {
      await axios.put(`${baseUrl}/update/${id}`, {
        "task": updatedTask
      }).then(result => {
        location.reload();
        console.log(result);
      }).catch(err => console.log(`Edit task error !! ${err}`));
    }

  }


  // delete the task
  const handleDeleteTask = async (id) => {

    await axios.delete('http://localhost:5000/api/deleteTask/' + id).then(result => {
      location.reload();
      console.log(result);
    }).catch(err => {
      console.log(`delete task api error , ${err}`);
    })
  }

  return (
    <>
      <h1 className='main-heading'>Time is Money</h1>
      <div className='input-button'>
        <div>
          <input type="text" className="input-box" onChange={(e) => {
            setTask(e.target.value);
            console.log(task);
          }} />
        </div>
        <div>
          <button className="btn" onClick={handleAddTask}>Add</button>
        </div>
      </div>

      <div className='task-container'>
        {
          alltask.length == 0
            ?
            <div> No Record </div>
            :
            alltask.map((todo, index) => {

              return <div className='todo' key={index}>

                <div>
                  {todo.done == true ?
                    <BsCircleFill className='icon' /> :
                    <BsCircle className='icon' onClick={() => handleMarkAsCompleted(todo._id)} />}
                </div>
                <div className='checkbox'>



                  <p className='todo-task'> {todo.task} </p>
                </div>
                <div >
                  <FaRegEdit className='icon' onClick={() => handleEditTask(todo._id)} />
                  <BsFillTrashFill className='icon' onClick={() => handleDeleteTask(todo._id)} />
                </div>
              </div>
            })
        }
      </div>
    </>
  )
}

export default App;