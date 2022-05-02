import "./displayTask.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import getTasksAction from "../../redux/getTasks/action";
import updateCategoriesAction from "../../redux/updateCategories/action";

export default function DisplayTask(){

    const backend_url = "https://task-manager-dkjaiswal77.herokuapp.com";
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tasks = useSelector((state) => (state.tasks.tasks));
    let todo_tasks = tasks.filter((task) => (task.status === "todo"));
    let inprogress_tasks = tasks.filter((task) => (task.status === "inprogress"));
    let done_tasks = tasks.filter((task) => (task.status === "done"));

    useEffect(()=>{
        // categories
        let personal_count = 0;
        let official_count = 0;
        let others_count = 0;

        for(let i = 0; i < tasks.length; i++)
        {
            if(tasks[i].personal)
            {
                personal_count++;
            }
            if(tasks[i].official)
            {
                official_count++;
            }
            if(tasks[i].others)
            {
                others_count++;
            }
        }

        dispatch(updateCategoriesAction({
            all : tasks.length, 
            personal : personal_count, 
            official : official_count, 
            others : others_count
        }));
    })

    useEffect(()=>{
        dispatch(getTasksAction());
    }, []);

    async function updateTaskInDB(e){
        try{
            const taskId = e.target.parentNode.parentNode.id;
            const subtaskId = e.target.id;
            // console.log(e.target.checked);

            let [task_filtered] = tasks.filter((task) => (task._id === taskId));
            let count_checked_subtasks = 0;

            // loop for changing checked key of selected subtask
            for(let i = 0; i < task_filtered.subtasks.length; i++)
            {
                if(task_filtered.subtasks[i].id === subtaskId)
                {
                    task_filtered.subtasks[i].checked = e.target.checked;
                    // console.log(task_filtered.subtasks[i]);
                }
                if(task_filtered.subtasks[i].checked)
                {
                    count_checked_subtasks++;
                }
            }
            
            // conditional for updating task status
            if(count_checked_subtasks === 0)
            {
                task_filtered.status = "todo";
            }
            else if (count_checked_subtasks === task_filtered.subtasks.length)
            {
                task_filtered.status = "done";
            }
            else
            {
                task_filtered.status = "inprogress";
            }

            // request for updating the task in db
            await fetch(`${backend_url}/tasks/${taskId}`, {
                method : "PATCH",
                body : JSON.stringify(task_filtered), 
                headers : {
                    "Content-Type" : "application/json"
                } 
            });

            dispatch(getTasksAction());

        }catch(error){
            console.log(error);
        }
    }

    async function deleteTask(e){
        try{
            const taskId = e.target.parentNode.parentNode.id;
            await fetch(`${backend_url}/tasks/${taskId}`, {
                method : "DELETE"
            });
            dispatch(getTasksAction());
        }catch(error){
            console.log(error);
        }
    }

    function editTask(e){
        let taskToBeEdited_taskId = e.target.parentNode.parentNode.id;
        localStorage.setItem("taskToBeEdited_taskId", JSON.stringify(taskToBeEdited_taskId));
        navigate("/tasks/editTask");
    }

    return (
        <div className="right_container displayTask_container">

            <div id="todo_container" className="status_container">
                <h2 className="status_title">TODO</h2>
                {todo_tasks.map(task => {
                    return (
                        <div className="displayTask" key={task._id} id={task._id} >

                            <h4 className="displayTask_title">{task.title}</h4>

                            <div className="displayTaskCategories">
                                {(task.official) ? <span>Official</span> : ""}
                                {(task.personal) ? <span>Personal</span> : ""}
                                {(task.others) ? <span>Others</span> : ""}  
                            </div>

                            <div className="displayTask_date">{task.date}</div>

                            <div className="displayTask_description">{task.description}</div>

                            {task.subtasks.map((subtask) => {
                                return (
                                    <label htmlFor={subtask.id} className="displayTask_subtask" key={subtask.id} >
                                        <input type="checkbox" id={subtask.id} checked={subtask.checked} onChange={updateTaskInDB} />
                                        <span>{subtask.content}</span>
                                    </label>
                                );
                            })}

                            <div className="editAndDeleteTask">
                                <span className="editTaskBtn" onClick={editTask}>Edit</span>
                                <span className="deleteTaskBtn" onClick={deleteTask}>Delete</span>
                            </div>

                        </div>
                    );
                })}
            </div>

            <div id="inprogress_container" className="status_container">
                <h2 className="status_title">IN-PROGRESS</h2>
                {inprogress_tasks.map(task => {
                    return (
                        <div className="displayTask" key={task._id} id={task._id} >

                            <h4 className="displayTask_title">{task.title}</h4>

                            <div className="displayTaskCategories">
                                {(task.official) ? <span>Official</span> : ""}
                                {(task.personal) ? <span>Personal</span> : ""}
                                {(task.others) ? <span>Others</span> : ""}  
                            </div>

                            <div className="displayTask_date">{task.date}</div>

                            <div className="displayTask_description">{task.description}</div>

                            {task.subtasks.map((subtask) => {
                                return (
                                    <label htmlFor={subtask.id} className="displayTask_subtask" key={subtask.id} >
                                        <input type="checkbox" id={subtask.id} checked={subtask.checked} onChange={updateTaskInDB} />
                                        <span>{subtask.content}</span>
                                    </label>
                                );
                            })}

                            <div className="editAndDeleteTask">
                                <span className="editTaskBtn" onClick={editTask}>Edit</span>
                                <span className="deleteTaskBtn" onClick={deleteTask}>Delete</span>
                            </div>

                        </div>
                    );
                })}
            </div>

            <div id="done_container" className="status_container">
                <h2 className="status_title">DONE</h2>
                {done_tasks.map(task => {
                    return (
                        <div className="displayTask" key={task._id} id={task._id} >

                            <h4 className="displayTask_title">{task.title}</h4>

                            <div className="displayTaskCategories">
                                {(task.official) ? <span>Official</span> : ""}
                                {(task.personal) ? <span>Personal</span> : ""}
                                {(task.others) ? <span>Others</span> : ""}  
                            </div>

                            <div className="displayTask_date">{task.date}</div>

                            <div className="displayTask_description">{task.description}</div>

                            {task.subtasks.map((subtask) => {
                                return (
                                    <label htmlFor={subtask.id} className="displayTask_subtask" key={subtask.id} >
                                        <input type="checkbox" id={subtask.id} checked={subtask.checked} onChange={updateTaskInDB} />
                                        <span>{subtask.content}</span>
                                    </label>
                                );
                            })}

                            <div className="editAndDeleteTask">
                                <span className="editTaskBtn" onClick={editTask}>Edit</span>
                                <span className="deleteTaskBtn" onClick={deleteTask}>Delete</span>
                            </div>

                        </div>
                    );
                })}
            </div>

        </div>
    );
}