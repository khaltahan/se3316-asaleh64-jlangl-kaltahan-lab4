import React from 'react';
import { Link } from 'react-router-dom'; 
import navbarStyles from '../styles/authorizedview.module.css';
import styles from '../styles/login.module.css'

const Navbar = () => {
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const user = localStorage.getItem("token");
	return (    
            <div className = {navbarStyles.navbar}>
                <h1>
                    Home Page
                </h1>
                {!user && <Link to ='/login'><button className = {styles.white_btn}>Login</button></Link>} 
                {!user && <Link to = '/signup'><button className = {styles.white_btn}>Signup</button></Link>}
                {user && <button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button> }
                {
                    user && <Link to = "/account/change-password"><button className = {styles.white_btn}>Change Password</button></Link>
                }
            </div>
	);
};

export default Navbar;