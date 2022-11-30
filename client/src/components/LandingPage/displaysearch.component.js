import React, {useState} from "react";
import styles from "./search.module.css"

const Search= ({track_title, artist_name,track_id,album_title,album_id,artist_id,track_duration}) =>{
    const [open,setOpen] = useState(false)

    const expand =()=>{ 
        setOpen(!open)
    };
    return(
        <div class = {styles.track_row}>
            <div class = {styles.header}>
                <p>Track Title: {track_title}</p>
            <p> Artist Name: {artist_name}</p>
            <button class = {styles.search_button} onClick = {expand}>See More</button>
            </div>
            
            {open && 
            <span class ={styles.extended_info}>
            <p>Track ID:{track_id}</p>
            <p>Album Title:{album_title}</p>
            <p>Album ID:{album_id}</p>
            <p>Artist ID:{artist_id}</p>
            <p>Track Duration:{track_duration}</p>
            </span>
            }
        </div>
    )
}
export default Search;