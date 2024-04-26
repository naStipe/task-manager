import {Task} from "./types/Task";
import {commonjs} from "globals";
import {Activity} from "./types/Activity";
const express = require("express");
const cors = require("cors");
const dbPool = require("../src/db.ts");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// ROUTER //

//TASK//

// create a task

app.post("/tasks", async(req, res) => {
    try {
        const task: Task = req.body;
        console.log(task)
        const newTask = await dbPool.query("INSERT INTO task (name, content, start_date, end_date, tags, is_done) " +
            "VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [task.name, task.content, task.startDate, task.endDate, task.tags, task.isDone]);
        res.json(newTask.rows[0]);
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        } else {
            console.error("No valid error.");
        }
    }
});

// get all tasks

app.get("/tasks", async (req, res) => {
    try {
        const allTasks = await dbPool.query("SELECT * FROM task ORDER BY task_id DESC");
        res.json(allTasks.rows);
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        } else {
            console.error("No valid error.");
        }
    }
})

// get a task

app.get("/tasks/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const task = await dbPool.query("SELECT * FROM task WHERE task_id = $1", [id]);
        res.json(task.rows);
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        } else {
            console.error("No valid error.");
        }
    }
})

// update a task

app.put("/tasks/:id", async (req, res) => {
    console.log("In api")
    try {
        const task: Task = req.body;
        const updateTask = await dbPool.query("UPDATE task SET name = $2, content = $3, start_date = $4, end_date = $5, " +
            "tags = $6, is_done = $7 WHERE task_id = $1", [task.id, task.name, task.content, task.startDate, task.endDate, task.tags, task.isDone]);
        res.json("Task was updated!");
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        } else {
            console.error("No valid error.");
        }
    }
})

// delete a task

app.delete("/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleteTask = await dbPool.query("DELETE FROM task WHERE task_id = $1", [id]);
        res.json("Task was deleted!")
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        } else {
            console.error("No valid error.");
        }
    }
})


//ACTIVITY//

app.post("/activities/", async(req, res) => {
    try {
        const activity: Activity = req.body;
        console.log(activity)
        const newActivity = await dbPool.query("INSERT INTO activity (name, content, is_done, tags, activity_type) " +
            "VALUES($1, $2, $3, $4, $5) RETURNING *",
            [activity.name, activity.content, activity.isDone, activity.tags, activity.activityType]);
        res.json(newActivity.rows[0]);
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        } else {
            console.error("No valid error.");
        }
    }
});

// get all activities

app.get("/activities/", async (req, res) => {
    try {
        const allActivities = await dbPool.query("SELECT * FROM activity ORDER BY activity_id DESC");
        res.json(allActivities.rows);
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        } else {
            console.error("No valid error.");
        }
    }
})

// get an activity

app.get("/activities/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const activity = await dbPool.query("SELECT * FROM activity WHERE activity_id = $1", [id]);
        res.json(activity.rows);
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        } else {
            console.error("No valid error.");
        }
    }
})

// update an activity

app.put("/activities/:id", async (req, res) => {
    console.log("In api")
    try {
        const activity: Activity = req.body;
        const updateTask = await dbPool.query("UPDATE task SET name = $2, content = $3, activity_type = $4" +
            "tags = $5, is_done = $6 WHERE task_id = $1", [activity.id, activity.name, activity.content, activity.activityType, activity.tags, activity.isDone]);
        res.json("Task was updated!");
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        } else {
            console.error("No valid error.");
        }
    }
})

// delete an activity

app.delete("/activities/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleteTask = await dbPool.query("DELETE FROM activity WHERE activity_id = $1", [id]);
        res.json("Activity was deleted!")
        console.log(deleteTask)
    } catch (err){
        if(err instanceof Error){
            console.error(err.message);
        } else {
            console.error("No valid error.");
        }
    }
})


app.listen(port, () => {
    console.log("Server running on port: " + port);
})