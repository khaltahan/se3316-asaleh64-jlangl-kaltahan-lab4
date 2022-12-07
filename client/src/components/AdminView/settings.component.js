//Render all components here, then render this component in the navbar if user is admin

import React from 'react';
import Users from './users.component'
import Navbar from '../navbar.component'

const Settings = ()=>{

    return(
        <>
        <Navbar/>
        <Users/>
        </>
        
    )
    

}

export default Settings;