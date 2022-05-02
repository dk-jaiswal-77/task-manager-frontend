export default function updateTasksReducer(tasks={tasks:[]}, {type, payload}){
    switch(type){
        case "UPDATE_TASKS":
            return {tasks : payload};
        default:
            return tasks;
    }
}