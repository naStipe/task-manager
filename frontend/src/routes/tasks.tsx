import { Link } from "react-router-dom";
import { ListTasks } from "../components/ListTasks.tsx";
import InputTask from "../components/InputTask.tsx";

export default function Tasks() {
    return (
        <>
            <div className="antialiased text-center mx-auto w-11/12 max-h-screen h-fit">
                <div className="bg-white rounded-lg shadow-lg p-8 pt-0">
                    <Link to="/" className="block mt-8 text-blue-500 hover:underline">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                            Go to Root Page
                        </button>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">TASKS</h1>
                    <div className="max-w-screen-md mx-auto mb-8">
                        <InputTask />
                    </div>
                    <ListTasks />

                </div>
            </div>
        </>
    );
}
