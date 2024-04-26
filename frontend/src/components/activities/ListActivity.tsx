import {useEffect, useRef, useState} from "react";
import {ViewportList} from "react-viewport-list";
import "../../index.css"
import ReactDOM from "react-dom";
import {Activity} from "../../types/Activity.ts";
import {deleteActivity, getActivities, updateActivity} from "../../api/ActivityAPI.ts";
import {EditActivity} from "./EditActivity.tsx";

export default function ListActivity() {

    const [activities, setActivities] = useState([]);
    const ref = useRef(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [activityToUpdate, setActivityToUpdate] = useState<Activity | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDone, setShowDone] = useState(true);
    const [showNotDone, setShowNotDone] = useState(true);

    const items: Activity[] = activities.map((item) => ({
        id: item["activity_id"],
        name: item["name"],
        content: item["content"],
        isDone: item["is_done"] == "true",
        tags: item["tags"],
        activityType: item["activity_type"]
    }));

    const getActivitiesFromApi = async () => {
        const jsonData = await getActivities()
        setActivities(jsonData);
    }

    useEffect(() => {
        getActivitiesFromApi();
    }, []);

    if (isOverlayVisible && activityToUpdate) {
        return ReactDOM.createPortal(
            <EditActivity
                activity={activityToUpdate}
                onClose={() => setIsOverlayVisible(false)}
                onUpdate={() => {
                    setIsOverlayVisible(false);
                }}
            />,
            document.body // Render directly into the body
        );
    }

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredItemsByStatus = filteredItems.filter(item => {
        if (showDone && showNotDone) {
            return true; // Show all activities if both checkboxes are checked
        } else if (showDone) {
            return item.isDone; // Show only done activities
        } else if (showNotDone) {
            return !item.isDone; // Show only not done activities
        } else {
            return false; // Hide all activities if neither checkbox is checked
        }
    });

    return (
        <>
            <div className="scroll-container overflow-auto max-h-96 mt-2" ref={ref}>
                <input
                    type="text"
                    placeholder="Search activities by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-4/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
                />
                <div className="flex items-center space-x-4">
                    <label htmlFor="showDone" className="flex items-center space-x-2 mx-10">
                        <input
                            type="checkbox"
                            id="showDone"
                            checked={showDone}
                            onChange={() => setShowDone(!showDone)}
                            className="form-checkbox h-5 w-5 text-indigo-600"
                        />
                        <span className="text-sm">Show Done</span>
                    </label>
                    <label htmlFor="showNotDone" className="flex items-center space-x-2 mx-auto">
                        <input
                            type="checkbox"
                            id="showNotDone"
                            checked={showNotDone}
                            onChange={() => setShowNotDone(!showNotDone)}
                            className="form-checkbox h-5 w-5 text-indigo-600"
                        />
                        <span className="text-sm">Show Not Done</span>
                    </label>
                </div>
                <ViewportList
                    viewportRef={ref}
                    items={filteredItemsByStatus}
                >
                    {(item) => (
                        <div key={item.id}
                             className="activity-item flex items-center bg-slate-100 border-b border-gray-200 py-4 w-11/12 mx-auto my-3">
                            <input
                                type="checkbox"
                                checked={item.isDone}
                                onChange={() => {
                                    let newActivity: Activity = {
                                        id: item.id,
                                        name: item.name,
                                        content: item.content,
                                        tags: item.tags,
                                        isDone: !item.isDone,
                                        activityType: item.activityType
                                    }
                                    updateActivity(newActivity)
                                }}
                                className="form-checkbox h-6 w-6 text-indigo-600 border-gray-300 rounded-md shadow-sm m-2"
                            />
                            <div className="flex-1">
                                <h3 className={`text-lg font-medium text-gray-800 ${item.isDone ? 'line-through' : ''}`}>{item.name} - {item.id}</h3>
                                <p className="text-sm text-gray-600">{item.content}</p>
                            </div>
                            <div>
                                <button onClick={() => {
                                    setActivityToUpdate(item);
                                    setIsOverlayVisible(true);
                                }}>
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        deleteActivity(item);
                                    }}
                                    className="text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none focus:underline m-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </ViewportList>
            </div>
        </>
    );
}