import {React, useState, useEffect} from 'react';
import styles from '../../styles/generalsearch.module.css'
import DisplaySearch from './displaysearch.component'

const Tracks = () =>{
    const [tracks,setTracks] = useState([]);
    const [query, setQuery] = useState('all');
    const [titleSearch, setTitleSearch] = useState([]);
    const [albumSearch, setAlbumSearch] = useState([]);
    const [artistSearch, setArtistSearch] = useState([]);

    useEffect(()=>{ 
        getTracks();
    },[query])    

    const getTracks = async()=>{
        const response = await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/tracks/${query}`)
        const data = await response.json();
        setTracks(data)
    }

    const updateTitleSearch = e => {
        setTitleSearch(e.target.value)
    }
    const updateAlbumSearch = e => {
        setAlbumSearch(e.target.value)
    }
    const updateArtistSearch = e => {
        setArtistSearch(e.target.value)
    }

    const getTitleSearch = e =>{
        e.preventDefault();
        setQuery('track_title/'+titleSearch);
        setTitleSearch('');
    }
    const getAlbumSearch = e =>{
        e.preventDefault();
        setQuery('album_title/'+albumSearch);
        setAlbumSearch('');
    }
    const getArtistSearch = e =>{
        e.preventDefault();
        setQuery('artist_name/'+artistSearch);
        setArtistSearch('');
    }
    const refresh = ()=>{
        window.location.reload();
    }

    return(
        <>
            <div className = {styles.search}>
                        <button onClick = {refresh} className = {styles.button}>
                            All Tracks
                        </button>
                        <form onSubmit={getTitleSearch}> 
                            Filter by Track: <input type="text" value = {titleSearch} onChange ={updateTitleSearch} />
                            <button id = "search-track">Search</button>
                        </form>
                         <form onSubmit={getAlbumSearch}>
                            Filter by Album: <input type="text" value = {albumSearch} onChange ={updateAlbumSearch}/>
                            <button id = "search-album">Search</button>
                         </form>
                         <form onSubmit={getArtistSearch}>
                            Filter by Artist : <input type="text" value = {artistSearch} onChange ={updateArtistSearch}/>
                            <button id = "search-artist">Search</button>
                        </form>
            </div>

            <div className = {styles.tracks}> 
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
        </>
    )
}

export default Tracks;