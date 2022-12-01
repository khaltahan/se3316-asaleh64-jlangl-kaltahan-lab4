import {React, useState, useEffect} from 'react';
import styles from '../../styles/generalsearch.module.css'
import DisplaySearch from './displaysearch.component'



const Tracks = () =>{
    const [tracks,setTracks] = useState([]);

    useEffect(()=>{ 
        getTracks();
    },[])    


    const getTracks = async()=>{
        const response = await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/data/tracks/all`)
        const data = await response.json();
        setTracks(data)
        console.log(data);
    }

    return(
        <div className = {styles.tracks}> 
        {/* Values are currently hard coded, need to be passed down as prop */}
            {tracks.map(track =>(
                <DisplaySearch
                key = {track._id}
                track_title = {track.track_title}
                artist_name = {track.artist_name}
                track_id = {track.track_id}
                album_title = {track.album_title}
                album_id = {track.album_id}
                artist_id = {track.artist_id}
                track_duration = {track.track_duration}

                />
            ))}           
        </div>
                

    )

}

export default Tracks;