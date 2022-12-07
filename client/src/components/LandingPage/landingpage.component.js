import React from 'react'
import PublicLists from './publiclists.component'
import DisplayTracks from './displaytracks.component'
import styles from '../../styles/generalsearch.module.css'
import Navbar from '../navbar.component'

const LandingPage = () =>{
return(
    <div>
        <Navbar/>
          <DisplayTracks/>
          <PublicLists/>
    </div>
)
}

export default LandingPage;