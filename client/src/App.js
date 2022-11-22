import {Route, Routes, Navigate} from 'react-router-dom'
import Overview from './components/Overview/overview';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';

function App() {
  const user = localStorage.getItem("token");
  return (
    
    <Routes>
      {user && <Route path = '/' exact element = {<Overview/>}/>}
      <Route path = '/signup' exact element = {<Signup/>}/>
      <Route path = '/login' exact element = {<Login/>}/>
      <Route path = '/' exact element = {<Navigate replace to='/login'/>}/>
    </Routes>
  );
}

export default App;
