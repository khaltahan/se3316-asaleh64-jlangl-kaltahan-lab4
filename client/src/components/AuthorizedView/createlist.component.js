import axios from "axios";
import { useState } from "react";
import styles from '../../styles/createlist.module.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';


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
    const handleSubmit = async (event) => {
        event.preventDefault();
        // attempt post request 
        try{
            let url = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_API_PORT}/api/playlist/create`
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
        <Card>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <form onSubmit={handleSubmit}>
                        <Form.Label>Playlist Name</Form.Label>
                        <br></br>
                        <Form.Control
                        name="playlist_name"
                        onChange={handleInput}
                        />
                        <Form.Label>Playlist Description</Form.Label>
                        <br></br>
                        <Form.Control
                        name="description"
                        onChange={handleInput}
                        />
                        <Form.Label>Playlist Visibility</Form.Label>
                        <br></br>
                        <input id = "public" type = "radio" onChange = {handleInput} name = "visibility" value = "true"/>
                        <label> Public </label>
                        <input id = "private" type = "radio" onChange = {handleInput} name = "visibility" value = "false"/>
                        <label> Private </label>
                    </form>
                </Form>
                <Button style = {{float:"right"}} onClick={handleSubmit}> Create </Button>
                {error && 
                    <div> 
                        <Alert variant="danger">{error}</Alert> 
                    </div>
                } 
            </Card.Body>
        </Card>
    )
}

export default CreatePlayList;