//Render all components here, then render this component in the navbar if user is admin

import React from 'react';
import Users from './users.component'
import Navbar from '../navbar.component'
import Reviews from './reviews.component'

const Settings = ()=>{

    return(
        <>
        <Navbar/>
        <Users/>
        <Reviews/>
        </>
    )
    

}

export default Settings;