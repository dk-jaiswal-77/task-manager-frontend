import "./sidebar.css";

export default function Sidebar(){

    let user = JSON.parse(localStorage.getItem("task_manager_user"));

    return (
        <div className="sidebar_container">

            <div className="userAndCategories_container">

                <div className="userDetails_container sidebar_small_container">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>

                <div className="taskCategories_container sidebar_small_container">

                    <div>
                        <span>All</span>
                        <span>0</span>
                    </div>

                    <div>
                        <span>Personal</span>
                        <span>0</span>
                    </div>

                    <div>
                        <span>Official</span>
                        <span>0</span>
                    </div>

                    <div>
                        <span>Others</span>
                        <span>0</span>
                    </div>

                </div>

            </div>

            <div className="logout_container sidebar_small_container">
                Log Out
            </div>

        </div>
    );
}