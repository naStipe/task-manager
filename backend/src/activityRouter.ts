import {Activity} from "./types/Activity";
const dbPool = require("../src/db.ts");

//ACTIVITY//

// Create an activity
export const createActivity = async (req, res) => {

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
};

// get all activities

export const getAllActivities = async (req, res) => {

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
};

// get an activity

export const getActivity = async (req, res) => {

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
};

// update an activity

export const updateActivity = async (req, res) => {

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
};

// delete an activity

export const deleteActivity = async (req, res) => {
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
};