import {useEffect, useRef, useState} from "react";
import {ViewportList} from "react-viewport-list";
import "../index.css"

export function ListTasks() {

    const [tasks, setTasks] = useState([]);
    const ref = useRef(null);

    const items = tasks.map((item, index) => ({
        id: index,
        name: item["name"],
        content: item["content"],
        startDate: item["startDate"],
        endDate: item["endDate"],
        tags: item["tags"]
    }));

    const getTasks = async () => {
        try{
            const response = await fetch("http://localhost:5000/tasks");
            const jsonData = await response.json();
            setTasks(jsonData);
        } catch (err){
            if(err instanceof Error){
                console.error(err.message);
            } else {
                console.log("No valid error!");
            }
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            <div className="scroll-container" ref={ref}>
                <ViewportList
                    ref={ref}
                    items={items}
                    itemMinSize={40}
                    margin={8}
                >
                    {(item) => (
                        <div key={item.id} className="task">
                            <h3>{item.name}</h3>
                            <p>{item.content}</p>
                        </div>
                    )}
                </ViewportList>
            </div>
        </>
    );
}