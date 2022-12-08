import React from 'react';
import NavBar from './navbar.component'
const About = ()=>{

    return(
        <div>
        <NavBar/>   
            <h1>About</h1>
            <p> This is a music archive library built using React, Node, Express and MongoDB. You can search for tracks, create and edit playlists and much more.</p>
        </div>
    )
    

}

export default About;