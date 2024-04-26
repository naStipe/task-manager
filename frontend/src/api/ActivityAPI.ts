import {Activity} from "../types/Activity.ts";

const API_URL = "http://localhost:5000/activities/"
export async function createActivity(activity: Activity | undefined){
    try {
        const body = activity;
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        console.log(JSON.stringify(body));
        console.log(response);
        window.location.href = "/activities";
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        }
    }
}

export async function updateActivity(activity: Activity){
    try {
        const body = activity;
        console.log(activity.id)
        const response = await fetch(API_URL + body.id, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        console.log(JSON.stringify(body));
        console.log(response);
        window.location.href = "/activities";
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        }
    }
}

export async function getActivities() {
    try{
        const response = await fetch("http://localhost:5000/activities/");
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

export async function deleteActivity(activity: Activity){
    try{
        const body = activity;
        console.log(body);
        const response = await fetch(API_URL + body.id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        console.log(response);
        window.location.href = "/activities";
    } catch (err){
        if(err instanceof Error) {
            console.log(err.message);
        } else {
            console.log("No valid error!");
        }
    }
}