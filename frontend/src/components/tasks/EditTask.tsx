// TaskUpdateOverlay.tsx
import React from 'react';
import { Task } from '../../types/Task.ts';
import {updateTask} from "../../api/TaskAPI.ts";

interface EditTaskProps {
    task: Task;
    onClose: () => void;
    onUpdate: (task: Task) => void;
}

export const EditTask: React.FC<EditTaskProps> = ({ task, onClose, onUpdate }) => {
    const [updatedTask, setUpdatedTask] = React.useState(task);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onUpdate(updatedTask);
        updateTask(updatedTask);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Task Name</label>
                    <input type="text" name="name" id="name" value={updatedTask.name} onChange={handleChange}
                           placeholder="Task Name"
                           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>

                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                    <input type="text" name="content" id="content" value={updatedTask.content} onChange={handleChange}
                           placeholder="Content"
                           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>

                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date
                        (DD/MM/YYYY)</label>
                    <input type="text" name="startDate" id="startDate" value={updatedTask.startDate}
                           onChange={handleChange}
                           placeholder="Start (DD/MM/YYYY)"
                           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>

                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date
                        (DD/MM/YYYY)</label>
                    <input type="text" name="endDate" id="endDate" value={updatedTask.endDate} onChange={handleChange}
                           placeholder="End (DD/MM/YYYY)"
                           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>

                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                    <input type="text" name="tags" id="tags" value={updatedTask.tags} onChange={(event) => {
                        const tagsArray = event.target.value.replace(/#/g, '').split(/[\s,]+/);
                        console.log(tagsArray);
                        setUpdatedTask(prevTask => ({ ...prevTask, tags: tagsArray}))
                    }}
                           placeholder="Tags"
                           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
                    <div className="flex items-center">
                        <label className="text-gray-700">Done</label>
                        <input type="checkbox" name="Status" checked={updatedTask.isDone} onChange={(event) => {
                            const newIsDone = event.target.checked;
                            setUpdatedTask(prevTask => ({ ...prevTask, isDone: newIsDone }));
                        }}
                               className="ml-2 form-checkbox h-5 w-5 text-indigo-600"/>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit"
                                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Save
                        </button>
                    </div>
                </form>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Cancel</button>
                </div>
            </div>
        </div>
    );
};
