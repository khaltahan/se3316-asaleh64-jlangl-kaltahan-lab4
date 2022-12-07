//Map all the components that go into a user, this component will be rendered in users.component.js

import React from "react";
import styles from "./admin.module.css";


const Search= ({userName, userEmail, isAdmin, isActive, activateUser,deactivateUser,makeAdmin}) =>{
    
    return(
        <div className = {styles.track_row}>
            <div className = {styles.header}>
            <p>Username: {userName}</p>
            <p>User Email: {userEmail}</p>
            <p>Admin: {isAdmin? "True":"False"}</p>
            <p>Active: {isActive? "True":"False"}</p>
            {isActive ? <button  value = {userEmail} className = {styles.search_button} onClick = {deactivateUser}>Deactivate User</button> :
            <button  value = {userEmail} className = {styles.search_button} onClick = {activateUser}>Activate User</button>}

            <button  value = {userEmail} className = {styles.search_button} onClick = {makeAdmin}>Make User Admin</button>
            </div>
        </div>
    )
}
export default Search;