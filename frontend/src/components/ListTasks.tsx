import {useEffect, useRef, useState} from "react";
import {ViewportList} from "react-viewport-list";
import "../index.css"
import {updateTask} from "../api/TaskAPI.ts";
import {Task} from "../types/Task.ts";

export function ListTasks() {

    const [tasks, setTasks] = useState([]);
    const ref = useRef(null);
    const items = tasks.map((item, index) => ({
        id: item["task_id"],
        taskId: item["task_id"],
        name: item["name"],
        content: item["content"],
        startDate: item["startDate"],
        endDate: item["endDate"],
        tags: item["tags"],
        status: item["status"] == "true"
    }));

    const getTasks = async () => {
        try{
            const response = await fetch("http://localhost:5000/tasks");
            const jsonData = await response.json();
            setTasks(jsonData);
        } catch (err){
            if(err instanceof Error){
                console.error(err.message);
            } else {
                console.log("No valid error!");
            }
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    console.log(tasks)

    return (
        <>
            <div className="scroll-container overflow-auto max-h-full mt-2" ref={ref}>
                <ViewportList
                    viewportRef={ref}
                    items={items}
                >
                    {(item) => (

                        <div key={item.id} className="task-item flex items-center bg-slate-100 border-b border-gray-200 py-4 w-11/12 mx-auto my-3">
                            <input
                                type="checkbox"
                                checked={item.status}
                                onChange={() => {
                                    console.log(typeof item.status)
                                    let newTask: Task = {
                                        id: item.taskId,
                                        name: item.name,
                                        content: item.content,
                                        startDate: item.startDate,
                                        endDate: item.endDate,
                                        tags: item.tags,
                                        status: !item.status
                                    }
                                    console.log(newTask.id)
                                    updateTask(newTask)}}
                                className="form-checkbox h-6 w-6 text-indigo-600 border-gray-300 rounded-md shadow-sm m-2"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-800">{item.name} - {item.id} - {item.taskId}</h3>
                                <p className="text-sm text-gray-600">{item.content}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => {}}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:underline m-2"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                    }}
                                    className="text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none focus:underline m-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>


                    )}
                </ViewportList>
            </div>
        </>
    );
}