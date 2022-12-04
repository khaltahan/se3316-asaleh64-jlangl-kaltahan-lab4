import axios from "axios";
import { useState } from "react";
import styles from '../../styles/generalsearch.module.css';

const AllLists = ( {user} ) => {
    const [lists, setLists] = useState([])
    const [currentUser, setUser] = useState({})

    const fetchLists = async () => {
        // get request to get lists of current user 
        let url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/playlist/all-lists?user=${user}`
        var res = await axios.get(url);
        // array of list objects for current user 
        setLists(res.data.lists)    
        setUser(res.data.user)    
    }
    fetchLists();

    // event handler to display more information about a list when pressed 
    const viewMore = async (event) => {
        event.preventDefault();
        // create a indepth pop up, passing the list ID of the pressed list 
        
        alert(event.target.value)
    }

    // display user's list with necessary info 
    return (
        <div class = {styles.track_list}>
            Lists:
            <p>
                {lists.map(list => {
                    return (
                        <div>
                            <button onClick = {viewMore} value = {list._id} >
                                <h3> {list.playlist_name} </h3>
                                <p> Owner: {currentUser.name}</p>
                                <p> Tracks: {list.track_count} </p>
                                <p> Playtime: {list.playtime}</p>
                                <p> Average Rating: {list.average_rating}</p>
                            </button>
                        </div>
                    )
                })}
            </p>
        </div>
    )

}

export default AllLists;



// pass list._id to view component  when trying to view a specific list 