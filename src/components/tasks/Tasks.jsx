import "./tasks.css";

import {Routes, Route} from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import CreateTask from "../createTask/CreateTask";
import EditTask from "../editTask/EditTask";
import DisplayTask from "../displayTask/DisplayTask";

export default function Tasks(){
    return (
        <div className="main_container">

            <Sidebar />

            <Routes>
                <Route path="/createTask" element={< CreateTask />} />
                <Route path="/displayTask" element={< DisplayTask />} />
                <Route path="/editTask" element={< EditTask />} />
            </Routes>

        </div>
    );
}