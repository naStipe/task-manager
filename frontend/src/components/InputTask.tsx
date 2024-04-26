import {useState} from "react";
import {Task} from "../types/Task.ts";
import {createTasks} from "../api/TaskAPI.ts";
function InputTask(){
    const [task, setTask] = useState<Task>();

    const onSubmitForm = async (e: any) => {
        e.preventDefault()

        console.log(task?.name);
        console.log(task?.content);
        console.log(task);
        await createTasks(task);
    }

    return(
        <>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="create"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Create new Task</label>
                <div className="relative">
                    <input type="text" id="create"
                           className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="New task"
                           value={task?.content}
                           onChange={(e) => {
                               const date = new Date()
                               const dateFormat = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
                               let newTask: Task = {name: "New Task", content: e.target.value, startDate: dateFormat, isDone: false};
                               setTask(newTask);
                           }}
                           required/>
                    <button type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create
                    </button>
                </div>
            </form>
        </>
    );
}

export default InputTask