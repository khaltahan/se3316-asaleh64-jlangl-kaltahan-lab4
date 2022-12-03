import axios from "axios";
import { useState } from "react";

const AllLists = ( {user} ) => {
    const [lists, setLists] = useState([])
    const [currentUser, setUser] = useState({})
    /*
        name of the play-list, 
        creator’s user name, 
        number of tracks, 
        total play time
        average rating.
    */
    const fetchLists = async () => {
        // get request to get lists of current user 
        let url = `http://localhost:${process.env.REACT_APP_API_PORT}/api/playlist/all-lists?user=${user}`
        var res = await axios.get(url);
        // array of list objects for current user 
        setLists(res.data.lists)    
        setUser(res.data.user)    
    }
    fetchLists();
    // display each list 
    return (
        <div>
            Lists:
            <p>
                {lists.map(list => {
                    return (
                        <div>
                            <button>
                                <p> {list.playlist_name} </p>
                                <p> Owner: {currentUser.name}</p>
                                <p> Tracks:{list.track_count} </p>
                                <p> Playtime:{list.playtime}</p>
                                {list.is_public == true && 
                                    <p> Average Rating:</p>
                                }
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