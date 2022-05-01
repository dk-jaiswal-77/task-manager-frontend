import "./createTask.css";
import {RiDeleteBin6Line} from "react-icons/ri";

import { useState } from "react";

import { nanoid } from "nanoid";

export default function CreateTask(){

    // let subtasks = [{content : "subtask 1", checked : false, id:"1"}, {content : "subtask 2", checked : true, id:"2"}];

    const backend_url = "https://task-manager-dkjaiswal77.herokuapp.com";

    const [task, setTask] = useState({
        title : "",
        description : "",
        status : "todo",
        official : false, 
        personal : false, 
        others : false
    });

    function updateTask(e){
        if(e.target.className === "checkbox")
        {
            // console.log(e.target.checked);
            setTask({...task, [e.target.id] : e.target.checked});
        }
        else if(e.target.className === "radio")
        {
            setTask({...task, status : e.target.id});
        }
        else
        {
            setTask({...task, [e.target.id] : e.target.value});
        }
    }

    async function saveTask(){
        try{
            let userId = JSON.parse(localStorage.getItem("task_manager_user")).userId;
            let taskWithSubtasks = {...task, subtasks, userId };

            let res = await fetch(backend_url + "/tasks", {
                method : "POST", 
                body : JSON.stringify(taskWithSubtasks), 
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            let res_data = await res.json();
            console.log(res_data);
            if(res_data.status)
            {
                setTask({
                    title : "",
                    description : "",
                    status : "todo",
                    official : false, 
                    personal : false, 
                    others : false
                });
                setSubtaskContent("");
                setSubtasks([]);
            }
        }catch(error){
            console.log(error);
        }
    }

    // ----------------------------------------------------------------------------->
    const [subtasks, setSubtasks] = useState([]);

    const [subtaskContent, setSubtaskContent] = useState("");

    function addSubtask(){
        let subtask = {
            content : subtaskContent,
            checked : false, 
            id : nanoid()
        };
        setSubtasks([...subtasks, subtask]);
    }

    return (
        <div className="right_container">

            <div className="left_cont">

                <input type="text" id="title" className="entry" value={task.title} placeholder="enter title of task" onChange={updateTask} />

                <textarea id="description" rows="10" className="entry" value={task.description} placeholder="enter description of task" onChange={updateTask} ></textarea>

                <div className="task_status_container">
                    <span>Choose task status</span>

                    <div className="option">
                        <input type="radio" className="radio" name="status" id="todo" onClick={updateTask} />
                        <label htmlFor="todo">Todo</label>
                    </div>

                    <div className="option">
                        <input type="radio" className="radio" name="status" id="inprogress" onClick={updateTask} />
                        <label htmlFor="inprogress">In progress</label>
                    </div>

                    <div className="option">
                        <input type="radio" className="radio" name="status" id="done" onClick={updateTask} />
                        <label htmlFor="done">Done</label>
                    </div>
                </div>

                <div className="task_category_container"> 

                    <span>Choose categories</span>

                    <div className="option">
                        <input type="checkbox" className="checkbox" id="official" checked={task.official} onChange={updateTask} />
                        <label htmlFor="official">Official</label>
                    </div>

                    <div className="option">
                        <input type="checkbox" className="checkbox" id="personal" checked={task.personal} onChange={updateTask} />
                        <label htmlFor="personal">Personal</label>
                    </div>

                    <div className="option">
                        <input type="checkbox" className="checkbox" id="others" checked={task.others} onChange={updateTask} />
                        <label htmlFor="others">Others</label>
                    </div>

                </div>

            </div>

            <div className="mid_cont">
                <div className="add_subtask_container">
                    <input type="text" id="entry" className="entry" value={subtaskContent} onChange={(e) => {
                        setSubtaskContent(e.target.value);
                    }} />
                    <button className="add_subtask_btn" onClick={addSubtask}>Add</button>
                </div>
                <div className="subtasks">
                    {subtasks.map((subtask) => {
                        return(
                            <div key={subtask.id} className={`subtask ${subtask.id}`}>
                                <label htmlFor={subtask.id} className="subtask_label">
                                    <input type="checkbox" id={subtask.id} />
                                    <span>{subtask.content}</span>
                                </label>
                                <RiDeleteBin6Line className="delete_icon"/>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="right_cont">
                <button className="createBtn" onClick={saveTask}>Create new task</button>
            </div>

        </div>
    );
}