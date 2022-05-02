import "./sidebar.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Sidebar(){

    let user = JSON.parse(localStorage.getItem("task_manager_user"));

    const navigate = useNavigate();

    const categories = useSelector((state) => (state.categories.categories));

    return (
        <div className="sidebar_container">

            <div className="userAndCategories_container">

                <div className="userDetails_container sidebar_small_container">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>

                <div className="taskCategories_container sidebar_small_container">

                    <div className="category">
                        <span>All</span>
                        <span>{categories.all}</span>
                    </div>

                    <div className="category">
                        <span>Personal</span>
                        <span>{categories.personal}</span>
                    </div>

                    <div className="category">
                        <span>Official</span>
                        <span>{categories.official}</span>
                    </div>

                    <div className="category">
                        <span>Others</span>
                        <span>{categories.others}</span>
                    </div>

                </div>

            </div>

            <div className="sidebar_navigation_container">
                <div className="sidebar_small_container logout_container" onClick={()=>{
                    navigate("/tasks/displayTask");
                }}>Home</div>
                <div className="sidebar_small_container logout_container" onClick={()=>{
                    navigate("/tasks/createTask");
                }}>Create Task</div>
                <div className="logout_container sidebar_small_container" onClick={()=>{
                    localStorage.removeItem("task_manager_user");
                    localStorage.removeItem("task_manager_token");
                    navigate("/");
                }}>Log Out</div>
            </div>

        </div>
    );
}