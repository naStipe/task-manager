import React, {useEffect, useState} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {getTasks} from "../../api/TaskAPI.ts";
import {Task} from "../../types/Task.ts";

const PerformanceGraph = ({data}) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const getTasksFromApi = async () => {
        const jsonData = await getTasks()
        let firstFiveTasks = jsonData;
        if(jsonData.length > 5){
            firstFiveTasks = jsonData.slice(0, 5);
        }
        setTasks(firstFiveTasks);
    }

    useEffect(() => {
        getTasksFromApi();
    }, []);

    function transformTasksToDailyData(tasks) {
        const dailyData = {};

        tasks.forEach(task => {
            const start = new Date(task.startDate);
            const end = new Date(task.endDate);

            while (start <= end) {
                const dateKey = start.toISOString().split('T')[0]; // Format as YYYY-MM-DD
                dailyData[dateKey] = (dailyData[dateKey] || 0) + 1;
                start.setDate(start.getDate() + 1);
            }
        });

        // Convert dailyData object to an array of objects for the graph
        return Object.entries(dailyData).map(([date, count]) => ({ date, count }));
    }

    const dailyTasksData = transformTasksToDailyData(tasks);

 return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
 );
};
