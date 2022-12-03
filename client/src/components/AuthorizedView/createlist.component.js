import axios from "axios";
import { useState } from "react";
import styles from '../../styles/createlist.module.css'

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
                setErrors(error.response.data.message)
            }
        }
    }
    return(
        <div>
            <form className = {styles.form_container} onSubmit = {handleSubmit}>
                {/* list name input */}
                <p><label> Playlist Name: </label></p>
                <input type="text" name = "playlist_name" onChange = {handleInput} value = {playlistData.playlist_name} />
                {/* optional description text area */}
                <div>
                    <p><label for="w3review"> Playlist Description </label></p>
                    <div>
                        <textarea name = "description" onChange = {handleInput} value = {playlistData.description}></textarea>
                    </div>
                </div>
                {/* visibility radio button */}
                <div>
                    <input id = "public" type = "radio" onChange = {handleInput} name = "visibility" value = "true"/>
                    <label for="public"> Public </label><br></br>
                    <input id = "private" type = "radio" onChange = {handleInput} name = "visibility" value = "false"/>
                    <label for="public"> Private </label><br></br>
                </div>
                <button type="submit" onSubmit={handleSubmit}> Create </button>
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