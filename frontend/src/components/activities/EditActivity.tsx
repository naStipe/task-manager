import React from 'react';
import {Activity} from "../../types/Activity.ts";
import {updateActivity} from "../../api/ActivityAPI.ts";

interface EditActivityProps {
    activity: Activity;
    onClose: () => void;
    onUpdate: (activity: Activity) => void;
}

export const EditActivity: React.FC<EditActivityProps> = ({ activity, onClose, onUpdate }) => {
    const [updatedActivity, setUpdatedActivity] = React.useState(activity);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdatedActivity({ ...updatedActivity, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onUpdate(updatedActivity);
        updateActivity(updatedActivity);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Edit Activity</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Activity Name</label>
                    <input type="text" name="name" id="name" value={updatedActivity.name} onChange={handleChange}
                           placeholder="Activity Name"
                           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>

                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                    <input type="text" name="content" id="content" value={updatedActivity.content}
                           onChange={handleChange}
                           placeholder="Content"
                           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>


                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                    <input type="text" name="tags" id="tags" value={updatedActivity.tags} onChange={(event) => {
                        const tagsArray = event.target.value.replace(/#/g, '').split(/[\s,]+/);
                        console.log(tagsArray);
                        setUpdatedActivity(prevActivity => ({...prevActivity, tags: tagsArray}))
                    }}
                           placeholder="Tags"
                           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>

                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Activity Type</label>
                    <input type="text" name="content" id="content" value={updatedActivity.activityType}
                           onChange={handleChange}
                           placeholder="Content"
                           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>


                    <div className="flex items-center">
                        <label className="text-gray-700">Done</label>
                        <input type="checkbox" name="Status" checked={updatedActivity.isDone} onChange={(event) => {
                            const newIsDone = event.target.checked;
                            setUpdatedActivity(prevActivity => ({...prevActivity, isDone: newIsDone}));
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
