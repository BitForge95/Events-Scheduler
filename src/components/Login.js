import React, { useState } from "react";

function Login () {

    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="Login-Container">
            <form >
                <input type="text" placeholder="Enter Your username" name onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login