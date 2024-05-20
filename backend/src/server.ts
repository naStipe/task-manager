import {createTask, deleteTask, getAllTasks, getTask, updateTask} from "./taskRouter";
import {createActivity, deleteActivity, getActivity, getAllActivities, updateActivity} from "./activityRouter";

const cors = require("cors");
const express = require("express");
const dbPool = require("../src/db.ts");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// TASKS ROUTES
app.get("/tasks", getAllTasks);
app.post("/tasks", createTask)
app.get("/tasks:id", getTask)
app.put("/tasks/:id", updateTask)
app.delete("/tasks/:id", deleteTask)

// ACTIVITIES ROUTES
app.get("/activities", getAllActivities);
app.post("/activities", createActivity);
app.get("/activities:id", getActivity);
app.put("/activities:id", updateActivity);
app.delete("/activities:id", deleteActivity);

app.listen(port, () => {
    console.log("Server running on port: " + port);
})