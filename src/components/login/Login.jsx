import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login(){

    const backend_url = "https://task-manager-dkjaiswal77.herokuapp.com";

    const navigate = useNavigate();

    const [entry, setEntry] = useState(
        {
            email : "", 
            password : ""
        }
    );

    function handleChange(e){
        setEntry({...entry, [e.target.id] : e.target.value});
    }

    async function loginUser()
    {
        try{
            let res = await fetch(backend_url + "/users/login", {
                method : "POST", 
                body : JSON.stringify(entry), 
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            let res_data = await res.json();
            console.log(res_data);
            if(res_data.status)
            {
                localStorage.setItem("task_manager_token", JSON.stringify(res_data.token));
                localStorage.setItem("task_manager_user", JSON.stringify(res_data.user));

                navigate("/tasks/displayTask");
            }
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <form className="small_container" onSubmit={(e) => {
                e.preventDefault();
                loginUser();
            }}>
                <h2>Log-In</h2>

                <input type="email" id="email" className="entry" value={entry.email} placeholder="enter your email" onChange={handleChange} />

                <input type="password" id="password" className="entry" value={entry.password} placeholder="enter password" onChange={handleChange} />

                <input type="submit" value="Log In" className="btn entry" />
            </form>

            <div className="small_container">
                <p>Not signed up yet?</p>
                <button className="btn entry" onClick={()=>{
                    navigate("/register");
                }} >Sign-Up</button>
            </div>
        </div>
    );
}