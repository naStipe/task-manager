import {useState} from "react";
function InputTask(){
    const [content, setContent] = useState("");

    const onSubmitForm = async (e: any) => {
        e.preventDefault();
        console.log(content);
        try {
            const body = {content};
            const response = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            console.log(response);
        } catch (err){
            if(err instanceof Error){
                console.error(err.message);
            }
        }
    }

    return(
        <>
            <h1 className="m-2 text-gray-800 font-mono font-medium">CREATE A NEW TASK</h1>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="create"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Create new Task</label>
                <div className="relative">
                    <input type="text" id="create"
                           className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="New task"
                           value={content}
                           onChange={(e) => setContent(e.target.value)}
                           required/>
                    <button type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create
                    </button>
                </div>
            </form>
        </>
    );
}

export default InputTask