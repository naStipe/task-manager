import {Task} from "../types/Task.ts";

const API_URL = "http://localhost:5000/tasks/"
export async function createTask(task: Task | undefined){
    try {
        const body = task;
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        console.log(JSON.stringify(body));
        console.log(response);
        window.location.href = "/tasks";
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        }
    }
}

export async function updateTask(task: Task){
    try {
        const body = task;
        console.log(task.id)
        const response = await fetch(API_URL + body.id, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        console.log(JSON.stringify(body));
        console.log(response);
        window.location.href = "/tasks";
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        }
    }
}

export async function getTasks() {
    try{
        const response = await fetch("http://localhost:5000/tasks");
        const jsonData = response.json();
        return jsonData;
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        } else {
            console.log("No valid error!");
        }
    }
}

export async function deleteTask(task:Task){
    try{
        console.log('In delete api');
        const body = task;
        const response = await fetch(API_URL + body.id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        console.log(response);
        window.location.href = "/tasks";
    } catch (err){
        if(err instanceof Error) {
            console.log(err.message);
        } else {
            console.log("No valid error!");
        }
    }
}