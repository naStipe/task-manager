import './App.css'
import InputTask from "./components/InputTask.tsx";
import {ListTasks} from "./components/ListTasks.tsx";

function App() {

  return (
    <>
        <div className="antialiased text-center mx-auto w-11/12 h-screen pt-5">
            <div className=" h-screen left-0 border-gray-800 border-2 m-5">
                <h1 className="m-2 text-gray-800 font-mono font-medium">TASKS</h1>
                <div className="max-w-screen-md mx-auto">
                    <InputTask/>
                </div>
                <ListTasks />
            </div>
        </div>
    </>
  )
}

export default App
