//Load all the users in a container, similar to tracks, in a scrollable container

import {React,useState,useEffect} from 'react';
import DisplayUsers from './displayusers.component'
import styles from "./admin.module.css";

const Users = ()=>{
    const [users,setUsers]= useState([]);

    useEffect(()=>{ 
        getUsers();
    },[]) 

    const getUsers = async()=>{
        const res = await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/admin/users`);
        const data = await res.json();
        setUsers(data);
    }

    const activate = async(event)=>{
        const value = event.target.getAttribute('value');
        await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/admin/activate/${value}`,{method: 'POST'});
        window.location.reload();
    }
    const deactivate = async(event)=>{
        const value = event.target.getAttribute('value');
        await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/admin/deactivate/${value}`,{method: 'POST'});
        window.location.reload();
    }

    const admin = async(event)=>{
        const value = event.target.getAttribute('value');
        await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/admin/make-admin/${value}`,{method: 'POST'});
        window.location.reload()
    }
    

    return(
        <div className={styles.users}>
            <h1>Users</h1>
        {users.map(user =>(
            <DisplayUsers
            key = {user._id}
            userName = {user.name}
            userEmail = {user.email}
            isAdmin = {user.is_admin}
            isActive = {user.is_active}
            activateUser = {activate}
            deactivateUser = {deactivate}
            makeAdmin = {admin}
            />) 
        )}
        </div>
    )

}

export default Users;