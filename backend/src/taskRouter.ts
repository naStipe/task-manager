import {Task} from "./types/Task";


const dbPool = require("../src/db.ts");


// ROUTER //

//TASK//

// create a task

export const createTask = async (req, res) => {
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
};

// get all tasks

export const getAllTasks = async (req, res) => {
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
};

// get a task

export const getTask = async (req, res) => {
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
};

// update a task

export const updateTask = async (req, res) => {
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
};

// delete a task

export const deleteTask = async (req, res) => {
    console.log("in the router DELETE")
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
};



