import React, { useState } from "react";

function Register () {

    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail]= useState("");

    return (
        <div className="Regsiter-Container">
            <form >
                <input type="email" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <input type="text" placeholder="Enter Your username" name onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Register