import { useState } from "react"
import Header from './Components/Header'
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const  [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctors Appointment",
      day: "Fed 5th at 2:30",
      reminder: true,
    }

  ])

  //Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task}
    setTasks([...tasks, newTask])
  }

  //Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //Should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id ? {...task, reminder: !task.reminder } : task))
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd= {showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Task'}
    </div>
  );
}

export default App;
