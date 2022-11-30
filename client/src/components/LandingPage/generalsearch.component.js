import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from '../../styles/generalsearch.module.css';
import navbarStyles from '../../styles/authorizedview.module.css';

const General = () => {
	
	return (
		<div>    
                <div className = {styles.search}>
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
    </div>
	);
};

export default General;