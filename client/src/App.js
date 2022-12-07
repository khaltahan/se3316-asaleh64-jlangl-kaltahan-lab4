import { Route, Routes, Navigate} from 'react-router-dom'
import Overview from './components/authorizedview.component';
import Login from './components/login.component';
import Signup from './components/signup.component';
import ChangePassword from './components/passwordchange.component';
import LandingPage from './components/LandingPage/landingpage.component';

// bootstrap import 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const authorized = localStorage.getItem("token");
  // store user Id for permission handling 
  const user = localStorage.getItem("user")
  return (
    <Routes>
      {/* Authorized Routes */}
      {authorized && <Route path = '/' exact element = {<Overview/>}/>}
      {authorized && <Route path = '/account/change-password' exact element = { <ChangePassword user = {user}/>} /> }
      {authorized && <Route path = '*' exact element = {<Navigate replace to='/'/>}/>}

      {/* Unauthorized Routes */}
      {!authorized && <Route path = '/signup' exact element = {<Signup/>}/>}
      {!authorized &&<Route path = '/login' exact element = {<Login/>}/>}
      {!authorized &&<Route path = '/general' exact element = {<LandingPage/>}/>}
      {!authorized && <Route path = '/' exact element = {<Navigate replace to='/general'/>}/>}

      
    </Routes>
  );
}

export default App;
