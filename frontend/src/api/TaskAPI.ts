import {Task} from "../types/Task.ts";

const API_URL = "http://localhost:5000/tasks/"
export async function createTasks(task: Task | undefined){
    try {
        const body = task;
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        console.log(JSON.stringify(body));
        console.log(response);
        window.location.href = "/";
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        }
    }
}

export async function updateTask(task: Task){

    try {
        const body = task;
        const response = await fetch(API_URL + task.id, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        console.log(JSON.stringify(body));
        console.log(response);
        //window.location.href = "/";
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        }
    }
}

// export async function getTasks() {
//     try{
//         const response = await fetch("http://localhost:5000/tasks");
//         const jsonData = response.json();
//         return jsonData;
//     } catch (err){
//         if(err instanceof Error){
//             console.error(err.message);
//         } else {
//             console.log("No valid error!");
//         }
//     }
// }