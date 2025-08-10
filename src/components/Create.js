import React, { useState } from "react"
import axios from "axios"

function Create () {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const postNewEventDetails = async () => {
        try {
            const res = await axios.post("http://localhost:3000/create",{
                title,
                description,
                startDate,
                endDate
            })

            setErrorMessage("")
            console.log("Event Posted Successfully", res.data)


        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Something went wrong. Please dont try again.");
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postNewEventDetails()
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Title: " onChange={(e) => setTitle(e.target.value)}/>
                <br/>
                <input type="text-area" placeholder="Enter Description: " onChange={(e) => setDescription(e.target.value)}/>
                <br/>
                <input type="date" onChange={(e) =>setStartDate(e.target.value)}/>
                <br/>
                <input type="date"onChange={(e) => setEndDate(e.target.value)}/>
                <button>Create</button>
            </form>
            {errorMessage ? <p>{errorMessage}</p> : null}
        </div>
    )
}

export default Create