import LastTasks from "../components/dashboard/LastTasks.tsx";
import {Link} from "react-router-dom";
import LastActivities from "../components/dashboard/LastActivities.tsx";
import PerformanceGraph from "../components/dashboard/PerformanceGraph.tsx";


export default function Dashboard(){

    return(
        <>
            <div className="md:flex-row gap-4 p-4">
                <Link to="/">
                    <h1 className="text-2xl font-bold mb-4 mx-auto">Dashboard</h1>
                </Link>

                <div className="flex justify-between mx-auto">
                    <div className="mx-auto w-1/4">
                        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
                            <h2 className="text-xl font-semibold mb-2">Last 5 Tasks</h2>
                            <LastTasks />
                        </div>
                    </div>
                    <div className="mx-auto w-1/4">
                        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
                            <h2 className="text-xl font-semibold mb-2">Task Performance</h2>\
                            <PerformanceGraph />
                        </div>
                    </div>
                    <div className="mx-auto w-1/4">
                        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
                            <h2 className="text-xl font-semibold mb-2">Last 5 Activities</h2>
                            <LastActivities />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}