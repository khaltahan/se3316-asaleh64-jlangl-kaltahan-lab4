import { Route, Routes, Navigate} from 'react-router-dom'
import Overview from './components/authorizedview.component';
import Login from './components/login.component';
import Signup from './components/signup.component';
import ChangePassword from './components/passwordchange.component';

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {user && <Route path = '/' exact element = {<Overview/>}/>}
      <Route path = '/signup' exact element = {<Signup/>}/>
      <Route path = '/login' exact element = {<Login/>}/>
      <Route path = '/' exact element = {<Navigate replace to='/login'/>}/>
      {user && <Route path = '/account/change-password' exact element = { <ChangePassword user = {user}/>} /> }
    </Routes>
  );
}

export default App;
