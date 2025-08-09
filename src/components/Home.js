import React, { useState } from "react";
import { Read } from "./Read";

function Home() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <div className="Home-Container">
            
            {isLoggedIn ? <Read/> : null}

        </div>
    )
}

export default Home

