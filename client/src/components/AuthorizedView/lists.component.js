import axios from "axios";
import { useState,useEffect } from "react";
import styles from '../../styles/generalsearch.module.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

const AllLists = ( {user} ) => {
    const [lists, setLists] = useState([])
    const [currentUser, setUser] = useState({})
    const [listToView, setList] = useState(""); 
    const [show, setShow] = useState(false);

    const[edit, setEdit] = useState(false);
  
    // detailed view states 
    const[listDetails, setDetails] = useState();
    const[listTracks, setTracks] = useState([]);

    const handleClose = () => {
        setShow(false)
        setEdit(false)
    };

    const fetchLists = async () => {
        // get request to get lists of current user 
        let url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/playlist/all-lists?user=${user}`
        var res = await axios.get(url);
        // array of list objects for current user 
        setLists(res.data.lists)    
        setUser(res.data.user)    
    }
    fetchLists();

    const getDetails = async (event) => {
        setList(event.target.getAttribute("value"))
        console.log("attempting to get details")
        // get list details 
        let url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/playlist/view?user=${user}&list=${listToView}`
        var res = await axios.get(url);

        // check if response has data and set states 
        if (Object.keys(res.data).length > 0){ 
            // show playlist view 
            setShow(true)
            // set context variables for view playlist view 
            setDetails(res.data.playlist)
            setTracks(res.data.tracks)
        }
        event.preventDefault();
    }

    const allowEdit = async (event) => {
        // allow edit
        setEdit(true);
        // set edit button visibilty to false 
        event.target.style.display = 'none';

    }

     /* find a way to set listName to the list being edited */
     const [editDetails, setChange] = useState({
        list:"",
        user:user,
        newName:"",
        description:"",
        visibility:false,
        tracks:""
    })

    const removeTrack = async (event) => {
        const trackToRemove = event.target.value
        let url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/playlist/delete-track/${trackToRemove}/${listDetails._id}/${user}`
        const res = await axios.delete(url)
        setShow(false)
    }

    // event handler to save changes for playlist edit 
    const editPlaylist = async () => {
        // make request to edit playlist and save to database 
        editDetails.list = listDetails.playlist_name
        let url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/playlist/edit`;
        // get post response to check success 
        const res = await axios.put(url, editDetails);
        console.log(res.status);
        if (res.status == 200){
            setShow(false);
            setEdit(false);
        }
    }

    const [showConfirm,setConfirm] = useState(false);

    const handleChange = ({ currentTarget: input }) => {
		setChange({ ...editDetails, [input.name]: input.value });
	};

    const decideDelete = async (event) => {
        if (event.target.getAttribute("value") === "yes"){
            // delete playlist and exist delete view 
            console.log("deleting list")
            // get playlist to delete 
            const toDelete = {
                playlist_name : listDetails.playlist_name,
                user:listDetails.created_by
            }

            let url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/playlist/delete`
            const res = await axios.delete(url,{ data: toDelete })

            console.log(res.data.message)
            if (res.status === 200){
                setConfirm(false)
                setShow(false)
            }
        }
        else{
            // keep playlist and exist delete view 
            setConfirm(false)
        }
    }

    const [showMore, setShowMore] = useState(false);

    const expandView = async () => {
        setShowMore(!showMore)
    }

    // display user's list with necessary info 
    return (
        <div class = {styles.track_list}>
            <h3>Your Playlists</h3>
            <ListGroup>
                {lists.map(list => {
                    return (
                        <ListGroup.Item>
                            <Button onClick = {getDetails} variant = "outline-secondary" value = {list._id}>  
                                <h3> {list.playlist_name} </h3>
                                <p> Owner: {currentUser.name}</p>
                                <p> Tracks: {list.track_count} </p>
                                <p> Playtime: {list.playtime}</p>
                                <p> Average Rating: {list.average_rating}</p>
                            </Button>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
            <div>
                {/* Detailed View Of Selected List */}
                {show == true && 
                    <>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header>
                            <Modal.Title>{listDetails.playlist_name}</Modal.Title><Button onstyle = {{float:"right"}} onClick = {allowEdit}> Edit </Button>
                            {showConfirm == true && 
                            <>
                                <Modal show={showConfirm}>
                                    <Modal.Body>
                                        Are you sure you want to delete 
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick = {decideDelete} value="yes">Yes</Button>
                                        <Button onClick = {decideDelete} value="no">No</Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                            }
                            </Modal.Header>
                            <Modal.Body>
                                { edit == false &&
                                    <div>
                                        <p>{listDetails.description}</p>
                                        <p>Tracks:</p>
                                        {listTracks.map( track => {
                                            return(
                                                <>
                                                <Alert key={track.track_id}variant="success">
                                                {track.track_title} 
                                                <p>By: {track.artist_name} <Button onClick = {removeTrack} value = {track.track_id} variant="danger" style={{float:"right"}}>Delete</Button></p>
                                                <Button variant="outline-info" onClick={expandView}> Show More </Button>
                                                <Button variant="outline-danger" href = {`https://www.youtube.com/results?search_query=${track.artist_name}+${track.track_title}`} target="_blank" rel="noopener noreferrer"> Youtube </Button>
                                                {showMore == true && 
                                                    <p>
                                                        <br></br>
                                                        <p>Track:{track.track_id} </p>
                                                        <p>AlbumID: {track.album_id} By: {track.album_title},</p>
                                                        <p>Duration: {track.track_duration}</p>
                                                    </p>
                                                }
                                                </Alert>
                                                </>
                                            )
                                        })}
                                        <Modal.Footer>
                                        <Button onClick={ () => {setConfirm(true)}} variant="outline-warning"style={{float:"right"}}> Delete List </Button>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        </Modal.Footer>
                                    </div>
                                    
                                }
                                {edit == true && 
                                    <>
                                        <p> Leaving any field blank will set that field default</p>
                                        <Form>
                                            <br></br> 
                                            <Form.Label>Current Name</Form.Label> 
                                            <Form.Control
                                            readOnly
                                            placeholder="New Name"
                                            name="listName"
                                            value={listDetails.playlist_name}
                                            />
                                            <br></br> 
                                            <Form.Label>New Name - Optional</Form.Label> 
                                            <Form.Control
                                            placeholder="New Name"
                                            name="newName"
                                            value={editDetails.newName}
                                            onChange={handleChange}
                                            />
                                            <br></br> 
                                            <Form.Label>New Description - Optional</Form.Label> 
                                            <Form.Control
                                            placeholder="Description"
                                            name="description"
                                            value={editDetails.description}
                                            as="textarea"
                                            onChange={handleChange}
                                            />
                                            <br></br> 
                                            <Form.Label> New Tracks List - Optional</Form.Label>  
                                            <Form.Control
                                            placeholder="tracks"
                                            name="tracks"
                                            value={editDetails.tracks}
                                            onChange={handleChange}
                                            />
                                            <br></br> 
                                            <>
                                                <input id = "public" type = "radio" onChange = {handleChange} name = "visibility" value = "true"/>
                                                <label for="public"> Public </label><br></br>
                                                <input id = "private" type = "radio" onChange = {handleChange} name = "visibility" value = "false"/>
                                                <label for="public"> Private </label><br></br>
                                            </>
                                        </Form>
                                        <Modal.Footer>
                                        <Button variant="primary" onClick={editPlaylist}>
                                            Save Changes
                                        </Button>
                                        </Modal.Footer>
                                    </>
                                }
                            </Modal.Body>
                        </Modal>
                        </>
                }
            </div>
        </div>
    )

}

export default AllLists;

