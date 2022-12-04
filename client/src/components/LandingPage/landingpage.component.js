import React from 'react'
import GeneralSearch from './generalsearch.component'
import PublicLists from './publiclists.component'
import Tracks from './displaytracks.component'
import styles from '../../styles/generalsearch.module.css'
import Navbar from '../navbar.component'

const LandingPage = () =>{
return(
    <div>
        <Navbar/>
        <div>
        <Tracks/>
        <PublicLists/>
        </div>
    </div>
)
}

export default LandingPage;