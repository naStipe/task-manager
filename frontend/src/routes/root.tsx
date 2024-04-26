import { Link } from 'react-router-dom';

export default function Root() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-8">Welcome to Task/Activity Manager</h1>
            <div className="space-x-4">
                <Link to="/tasks">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Tasks
                    </button>
                </Link>
                <Link to="/activities">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Activities
                    </button>
                </Link>
            </div>
        </div>
    );
}

