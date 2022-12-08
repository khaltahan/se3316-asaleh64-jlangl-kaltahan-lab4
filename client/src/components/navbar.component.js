import React from 'react';
import { Link } from 'react-router-dom'; 
import navbarStyles from '../styles/authorizedview.module.css';
import styles from '../styles/login.module.css'
import jwt_decode from 'jwt-decode'

const Navbar = () => {
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.replace('/');
	};
	const user = localStorage.getItem("token");
    let isAdmin = false;
    if(user){
        const decoded = jwt_decode(user)
        isAdmin = decoded.admin;
    }
	return (    
            <div className = {navbarStyles.navbar}>
                <h1>
                    Home Page
                </h1>
                <Link to = "/"><button className = {styles.white_btn}>Home</button></Link>
                <Link to = "/about"><button className = {styles.white_btn}>About</button></Link>

                <Link to = "/privacy"><button className = {styles.white_btn}>Privacy & Security</button></Link>
                {/* Unauthorized */}
                {!user && <Link to ='/login'><button className = {styles.white_btn}>Login</button></Link>} 
                {!user && <Link to = '/signup'><button className = {styles.white_btn}>Signup</button></Link>}
                {/* Admin Privileges */}
                {user && isAdmin && <Link to = '/admin/settings'><button className = {styles.white_btn}>Admin Settings</button></Link> }

                {/* Authorized */}
                {user && <Link to = "/account/change-password"><button className = {styles.white_btn}>Change Password</button></Link>}
                {user && <button className={styles.white_btn} onClick={handleLogout}>Logout</button> }

                
            </div>
	);
};

export default Navbar;