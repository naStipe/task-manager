import {useEffect, useState} from "react";
import {getTasks} from "../../api/TaskAPI.ts";
import {Task} from "../../types/Task.ts";


export default function LastTasks(){
    const [lastTasks, setLastTasks] = useState<Task[]>([]);

    const getTasksFromApi = async () => {
        const jsonData = await getTasks()
        let firstFiveTasks = jsonData;
        if(jsonData.length > 5){
            firstFiveTasks = jsonData.slice(0, 5);
        }
        setLastTasks(firstFiveTasks);
    }

    useEffect(() => {
        getTasksFromApi();
    }, []);

    return(
        <>
            <div className="flex flex-col space-y-4">
                {lastTasks.map((task, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">{task.name}</h3>

                    </div>
                ))}
            </div>
        </>
    )
}