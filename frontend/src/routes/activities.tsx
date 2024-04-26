import { Link } from "react-router-dom";
import ListActivity from "../components/activities/ListActivity.tsx";
import InputActivity from "../components/activities/InputActivity.tsx";

export default function Activities() {
    return (
        <>
            <div className="antialiased text-center mx-auto w-11/12 max-h-screen h-auto">
                <div className="bg-white rounded-lg shadow-lg p-8 pt-0">
                    <Link to="/">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-4">ACTIVITIES</h1>
                    </Link>
                    <div className="w-1/2 mx-auto mb-8">
                    <InputActivity />
                    </div>
                    <ListActivity />
                </div>
            </div>
        </>
    );
}
