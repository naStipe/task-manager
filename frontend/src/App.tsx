import './App.css'
import InputTask from "./components/InputTask.tsx";

function App() {

  return (
    <>
        <div className="flex flex-col text-center mx-auto w-11/12 h-screen pt-5">
            <div className="flex-initial h-60 left-0 border-gray-800 border-2 m-5">
                <h1 className="m-2 text-gray-800 font-mono font-medium">TASKS</h1>
                <div className="max-w-screen-md mx-auto">
                    <InputTask/>
                </div>
            </div>

            <div className="flex-auto left-0 border-gray-800 border-2 m-5 max-w-screen">
                <h1>TASKS</h1>
            </div>
        </div>
    </>
  )
}

export default App
