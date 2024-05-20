import React, {useEffect, useState} from "react";
import {getTasks} from "../../api/TaskAPI.ts";
import {Task} from "../../types/Task.ts";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";


export default function  PerformanceGraph() {
    const [tasks, setTasks] = useState([])
    const [transformedData, setTransformedData] = useState([]);

    const getTasksFromDbAPI = async () => {
        const jsonData = await getTasks();
        setTasks(jsonData);
    }
    useEffect(() => {
        getTasksFromDbAPI();
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            const data = transformTasksData(tasks);
            setTransformedData(data);
        }
    }, [tasks]);

    const items: Task[] = tasks.map((item) => ({
        id: item["task_id"],
        name: item["name"],
        content: item["content"],
        startDate: item["start_date"],
        endDate: item["end_date"],
        tags: item["tags"],
        isDone: item["is_done"] == "true"
    }));


    const completedTasks: Task[] = items.filter((item => item.isDone));
    const calendar: Date[] = [];

    return (
        <LineChart width={600} height={300} data={transformedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
    );
};

