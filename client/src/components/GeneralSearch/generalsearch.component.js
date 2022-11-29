import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from '../../styles/generalsearch.module.css';
import DisplaySearch from './displaysearch.component';

const General = () => {
	
	return (
		<div>
                
            <div class = {styles.admin}>
                <h1>
                    General Search
                </h1>
                <Link to ='/login'>Login</Link>
                <Link to = '/signup'>Sign Up</Link>
            </div>
                <div class = {styles.search}>
                    <span> 
                        Filter by Track: <input type="text" id = "track"/>
                        <button id = "search-track">Search</button>
                    </span>
                    <span> 
                        Filter by Album: <input type="text" id = "album"/>
                        <button id = "search-album">Search</button>
                    </span>
                    <span> 
                        Filter by Artist : <input type="text" id = "artist"/>
                        <button id = "search-artist">Search</button>
                    </span>
                </div>
        <div class = {styles.content}>
                <div class = {styles.tracks}> 
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
                <div class = {styles.track_list}>
                    <div> 
                    <input placeholder = "List Name" type="text" id = "create-list"/>
                        <button id = "create-list-button">Create</button>
                    </div>
                <table id = "lists" class = {styles.display_list}>
                </table>
                </div>
        </div>
    </div>
	);
};

export default General;