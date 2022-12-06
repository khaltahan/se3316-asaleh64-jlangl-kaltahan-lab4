import {React} from 'react';

//components
import SecurityPolicy from './securitypolicy.components'
import UsePolicy from './usepolicy.component'
import DMCAPage from './dmca.components'
import Navbar from '../navbar.component'



const PrivacyPage = ()=>{
  return (
    <div>
        <Navbar/>
        <SecurityPolicy/>
        <hr/>
        <UsePolicy/>
        <hr/>
        <DMCAPage/>
    </div>
  )
}

export default PrivacyPage;