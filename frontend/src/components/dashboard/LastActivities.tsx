import {useEffect, useState} from "react";
import {Activity} from "../../types/Activity.ts";
import {getActivities} from "../../api/ActivityAPI.ts";



export default function LastActivities(){
    const [lastActivities, setLastActivities] = useState<Activity[]>([]);

    const getActivitiesFromApi = async () => {
        const jsonData = await getActivities()
        let firstFiveActivities = jsonData;
        if(jsonData.length > 5){
            firstFiveActivities = jsonData.slice(0, 5);
        }
        setLastActivities(firstFiveActivities);
    }

    useEffect(() => {
        getActivitiesFromApi();
    }, []);

    return(
        <>
            <div className="flex flex-col space-y-4">
                {lastActivities.map((activity, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">{activity.name}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}