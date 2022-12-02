import axios from "axios";
import { useState } from "react";



const CreatePlayList = ( {user} ) => {
    // state/context variables 
    const [error,setErrors] = useState("");
    const [playlistData, setPlaylistData] = useState({ 
        created_by:user,
        playlist_name:"",
        description:"",
        visibility:"",
    });

    // event handler for input field
    const handleInput = (event) => {
        setPlaylistData({
            ...playlistData,
            [event.target.name] : event.target.value
        })
    }

    // event handler to handle user data submission 
    const handleSubmit = async (event) =>{
        event.preventDefault();
        // attempt post request 
        try{
            let url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/playlist/create`
            await axios.post(url, playlistData)
            window.location.reload()
        }   
        catch(error){
            if (error.response && error.response != 200){
                console.log(error)
                setErrors(error.response.data.message)
            }
        }
    }

    console.log(playlistData)
    return(
        <div>
            <form onSubmit = {handleSubmit}>
                {/* list name input */}
                <input type="text" name = "playlist_name" onChange = {handleInput} value = {playlistData.playlist_name} />
                {/* optional description text area */}
                <textarea name = "description" onChange = {handleInput} value = {playlistData.description}></textarea>
                {/* visibility radio button */}
                <input type="radio" onChange = {handleInput} name = "visibility" value = "true"/> Public <br/>
                <input type="radio" onChange = {handleInput} name = "visibility" value = "false"/> Private <br/>
            </form>
            {error && 
                <div> 
                    <p>{error}</p> 
                </div>
            } 
        </div>
    )
}

export default CreatePlayList;