import "./register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register(){

    const backend_url = "https://task-manager-dkjaiswal77.herokuapp.com";

    const navigate = useNavigate();

    const [entry, setEntry] = useState(
        {
            name : "", 
            email : "", 
            password : ""
        }
    );

    function handleChange(e){
        setEntry({...entry, [e.target.id] : e.target.value});
    }

    async function registerUser(){
        try{
            let res = await fetch(backend_url + "/users/register", {
                method : "POST", 
                body : JSON.stringify(entry), 
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            let res_data = await res.json();
            if(res_data.status)
            {
                return navigate("/");
            }
            console.log(res_data.error);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <form className="small_container" onSubmit={(e) => {
                e.preventDefault();
                registerUser();
            }}>
                <h2>Sign-Up</h2>

                <input type="text" id="name" className="entry" value={entry.name} placeholder="enter your name" onChange={handleChange} />

                <input type="email" id="email" className="entry" value={entry.email} placeholder="enter your email" onChange={handleChange} />

                <input type="password" id="password" className="entry" value={entry.password} placeholder="enter password" onChange={handleChange} />

                <input type="submit" value="Sign Up" className="btn entry" />
            </form>

            <div className="small_container">
                <p>Already have an account?</p>
                <button className="btn entry" onClick={() => {
                    navigate("/");
                }}>Log-In</button>
            </div>
        </div>
    );
}