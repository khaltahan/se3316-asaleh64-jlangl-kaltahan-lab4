import React from 'react';
import { useState } from "react";
import styles from '../../styles/generalsearch.module.css';
import axios from "axios";

const PublicLists = () =>{
    // state for public playlists 
    const [lists, setLists] = useState([])

    const fetchLists = async () => {
        // get request to get lists of current user 
        let url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/playlist/public-playlists`
        var res = await axios.get(url);
        // array of list objects for current user 
        setLists(res.data.lists)      
    }
    fetchLists();

    return(
        <div className = {styles.track_list}>
             
                {lists.map(list => {
                    return (
                        <div>
                            <button>
                                <h3> {list.playlist_name} </h3>
                                <p> Created By : {list.creator} </p>
                                <p> Tracks: {list.track_count} </p>
                                <p> Playtime: {list.playtime}</p>
                                <p> Average Rating: {list.average_rating}</p>
                            </button>
                        </div>
                    )
                })}
            
                
        </div>
    )

}

export default PublicLists;