import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import updateTasksReducer from "./updateTasks/reducer";
import updateCategoriesReducer from "./updateCategories/reducer";

const rootReducer = combineReducers({
    tasks : updateTasksReducer, 
    categories : updateCategoriesReducer
});

const thunkMiddleware = (store)=>(next)=>(action)=>{
    if(typeof(action) === "function")
    {
        return action(store.dispatch);
    }
    next(action);
}

const store = createStore(rootReducer, compose(
    applyMiddleware(thunkMiddleware), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export {store};