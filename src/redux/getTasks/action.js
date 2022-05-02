import updateTasksAction from "../updateTasks/action";
// import updateTasksReducer from "../updateTasks/reducer";

export default function getTasksAction(){
    const backend_url = "https://task-manager-dkjaiswal77.herokuapp.com";
    const userId = JSON.parse(localStorage.getItem("task_manager_user")).userId;

    return async (dispatch) => {
        try{
            const res = await fetch(`${backend_url}/tasks/${userId}`);
            const res_data = await res.json();
            console.log(res_data);
            dispatch(updateTasksAction(res_data));

        }catch(error){
            console.log(error);
        }
    }
}