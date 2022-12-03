import React from 'react';
import styles from '../../styles/generalsearch.module.css'
import DisplaySearch from './displaysearch.component'



const Tracks = () => {

    return(
        <div className = {styles.tracks}> 
        {/* Values are currently hard coded, need to be passed down as prop */}
                    <DisplaySearch 
                    track_title = {"Views"}
                    artist_name = {"Drake"}
                    track_id = {1}
                    album_title = {"Views"}
                    album_id = {6}
                    artist_id = {6}
                    track_duration = {"3:28"}
                    />
                    <DisplaySearch 
                    track_title = {"Views"}
                    artist_name = {"Drake"}
                    track_id = {1}
                    album_title = {"Views"}
                    album_id = {6}
                    artist_id = {6}
                    track_duration = {"3:28"}
                    />
                    <DisplaySearch 
                    track_title = {"Views"}
                    artist_name = {"Drake"}
                    track_id = {1}
                    album_title = {"Views"}
                    album_id = {6}
                    artist_id = {6}
                    track_duration = {"3:28"}
                    />
                </div>
                

    )

}

export default Tracks;