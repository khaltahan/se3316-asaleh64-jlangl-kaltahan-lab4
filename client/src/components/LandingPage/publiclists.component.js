import React from 'react';
import { useState } from "react";
import styles from '../../styles/generalsearch.module.css';
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';


const PublicLists = () =>{
    // state for public playlists 
    const [lists, setLists] = useState([])

    const handleClose = () => {
        setShow(false)
    }

    const fetchLists = async () => {
        // get request to get lists of current user 
        let url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/playlist/public-playlists`
        var res = await axios.get(url);
        // array of list objects for current user 
        setLists(res.data.lists)      
    }
    fetchLists();

    // states for detialed list view 
    const [listDetails, setDetails] = useState()
    const [listTracks, setTracks] = useState([])
    const [show, setShow] = useState(false)

    const [showMore, setShowMore] = useState(false);

    const expandView = async () => {
        setShowMore(!showMore)
    }
    
    const getDetails = async (event) => {
        if (event.target.getAttribute("value") !== null){
            const values = event.target.getAttribute("value").split(",")

            const listOwner = values[0]
            const list = values[1]

            // fetch details for list 
            let url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/playlist/view?user=${listOwner}&list=${list}`
            const response = await axios.get(url);

            setShow(true)
            setDetails(response.data.playlist)
            setTracks(response.data.tracks) 
        }
    }

    return(
        <div className = {styles.track_list}>
             
                {lists.map(list => {
                    return (
                        <div>
                            <Button onClick = {getDetails} value = { [list.created_by,list._id] }>
                                <h3> {list.playlist_name} </h3>
                                <p> Created By : {list.creator} </p>
                                <p> Tracks: {list.track_count} </p>
                                <p> Playtime: {list.playtime}</p>
                                <p> Average Rating: {list.average_rating}</p>
                            </Button>
                        </div>
                    )
                })}
            
                {/* Detailed View Of List */}
                {show == true &&
                    <>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header>
                                <Modal.Title>
                                    {listDetails.playlist_name}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h3>Description:</h3>
                                <p>{listDetails.description}</p>
                                <h3>Tracks</h3>
                              <div>
                                {listTracks.map( track => {
                                    return (
                                        <>
                                            <Alert key={track.track_id}variant="success">
                                            {track.track_title} 
                                            <p>By: {track.artist_name}</p>
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
                              </div>
                            </Modal.Body>
                        </Modal>
                    </>
                }
        </div>
    )

}

export default PublicLists;