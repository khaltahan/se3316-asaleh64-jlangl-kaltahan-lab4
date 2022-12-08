import React from 'react';
import { useState } from "react";
import styles from '../../styles/generalsearch.module.css';
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';


const PublicLists = ( {user} ) =>{
    // state for public playlists 
    const [lists, setLists] = useState([])

    const fetchLists = async () => {
        // get request to get lists of current user 
        let url = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_API_PORT}/api/playlist/public-playlists`
        var res = await axios.get(url);
        // array of list objects for current user 
        setLists(res.data.lists)      
    }
    fetchLists();

    // states for detialed list view 
    const [listDetails, setDetails] = useState()
    const [listTracks, setTracks] = useState([])
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false);
    }

    // states for reviewing list 
    const [review, setReview] = useState(false);
    const [reviewDetails, setReviewDetails] = useState({
        user:user,
        list:"",
        rating:"",
        comments:""
    })


    // handle submitting review to playlist 
    const reviewPlaylist = async () => {
        // set the playlist being reviewed 
        reviewDetails.list = listDetails._id

        // API request 
        let url = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_API_PORT}/api/playlist/add-review`

        // get post response 
        const res = await axios.post(url, reviewDetails)
        if (res.status == 200){
            setReview(false);
            setShow(false);
        }
        
    }
    
    // get details for list display 
    const getDetails = async (event) => {
        if (event.target.getAttribute("value") !== null){
            const values = event.target.getAttribute("value").split(",")

            const listOwner = values[0]
            const list = values[1]

            // fetch details for list 
            let url = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_API_PORT}/api/playlist/view?user=${listOwner}&list=${list}`
            const response = await axios.get(url);

            setShow(true)
            setDetails(response.data.playlist)
            setTracks(response.data.tracks) 
        }
    }

    // change state for review detauls when user enters values 
    const handleChange = ({ currentTarget: input }) => {
		setReviewDetails({ ...reviewDetails, [input.name]: input.value });
	};

    const [showMore, setShowMore] = useState(false);

    const expandView = async () => {
        setShowMore(!showMore)
    }
    
    return(
        <div class = {styles.track_list}>
            <div> 
                <h3>Trendy Playlists</h3>
                <ListGroup>
                    {lists.map(list => {
                        return (
                            <ListGroup.Item>
                                <Button onClick = {getDetails} value = { [list.created_by,list._id]}>
                                    <h3> {list.playlist_name} </h3>
                                    <p> Created By : {list.creator} </p>
                                    <p> Tracks: {list.track_count} </p>
                                    <p> Playtime: {list.playtime}</p>
                                    <p> Average Rating: {list.average_rating}</p>
                                </Button>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
            {show == true &&
                    <>
                        <Modal show={show} onHide={handleClose} size="lg">
                            <Modal.Header>
                                <Modal.Title>
                                    {listDetails.playlist_name}
                                </Modal.Title>
                                <Button onstyle = {{float:"right"}} onClick = {() => {setReview(true)}}>Review List</Button>
                            </Modal.Header>
                            <Modal.Body>
                            {/* Detailed View Of List */}
                            {review == false &&
                                <div>
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
                                </div>
                            }
                            {/* View To Add Review To List */}
                            {review == true &&
                                <>
                                    <Form>
                                        <Form.Label>List Rating</Form.Label>
                                        <br></br>
                                        <div style={{textAlign:"center"}}>
                                            <label> 1 </label>
                                            <input onChange = {handleChange} type="radio" name="rating" value={1}/>
                                            <label> 2 </label>
                                            <input onChange = {handleChange} type="radio" name="rating" value={2}/>
                                            <label> 3 </label>
                                            <input onChange = {handleChange} type="radio" name="rating" value={3}/>
                                            <label> 4 </label>
                                            <input onChange = {handleChange} type="radio" name="rating" value={4}/>
                                            <label> 5 </label>
                                            <input onChange = {handleChange} type="radio" name="rating" value={5}/>
                                        </div>
                                        <br></br>
                                        <Form.Label>Comments</Form.Label>
                                        <Form.Control
                                        as="textarea"
                                        onChange={handleChange}
                                        name="comments"
                                        value={reviewDetails.comments}
                                        />
                                        <Modal.Footer>
                                            <Button onClick = {reviewPlaylist} > Save Review </Button>
                                        </Modal.Footer>
                                    </Form>
                                </>
                            }
                            </Modal.Body>
                        </Modal>
                    </>
                }
        </div>
    )
}

export default PublicLists;