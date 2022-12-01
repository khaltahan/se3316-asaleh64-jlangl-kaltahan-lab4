import { Route, Routes, Navigate} from 'react-router-dom'
import Overview from './components/authorizedview.component';
import Login from './components/login.component';
import Signup from './components/signup.component';
import ChangePassword from './components/passwordchange.component';
import LandingPage from './components/LandingPage/landingpage.component';

function App() {
  const authorized = localStorage.getItem("token");
  // store user Id for permission handling 
  const user = localStorage.getItem("user")
  return (
    <Routes>
      {authorized && <Route path = '/' exact element = {<Overview/>}/>}
      <Route path = '/signup' exact element = {<Signup/>}/>
      <Route path = '/login' exact element = {<Login/>}/>
      <Route path = '/general' exact element = {<LandingPage/>}/>
      <Route path = '/' exact element = {<Navigate replace to='/general'/>}/>
      {authorized && <Route path = '/account/change-password' exact element = { <ChangePassword user = {user}/>} /> }
    </Routes>
  );
}

export default App;
