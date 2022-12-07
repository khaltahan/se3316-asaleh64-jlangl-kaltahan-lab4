import {React} from 'react';
import jwt_decode from 'jwt-decode';

//components
import SecurityPolicy from './securitypolicy.components'
import UsePolicy from './usepolicy.component'
import DMCAPage from './dmca.components'
import Navbar from '../navbar.component'



const PrivacyPage = ()=>{
const user = localStorage.getItem("token");
let admin;
if(user){
  const decoded= jwt_decode(user);
  admin = decoded.admin;
  console.log(admin)
}

  return (
    <div>
        <Navbar/>
        <DMCAPage admin = {admin}/>
        <hr/>
        <UsePolicy admin = {admin}/>
        <hr/>
        <SecurityPolicy admin = {admin}/>
        
        
        
        
    </div>
  )
}

export default PrivacyPage;