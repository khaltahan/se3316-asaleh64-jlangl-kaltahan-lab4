import React from 'react'
import PublicLists from './publiclists.component'
import DisplayTracks from './displaytracks.component'
import styles from '../../styles/generalsearch.module.css'
import Navbar from '../navbar.component'
import Tracks from '../LandingPage/displaytracks.component';

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