// module dependencies 
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/passwordchange.modules.css";
// redirect 
import  { Redirect } from 'react-router-dom'
// component 

const ChangePassword = ({user}) => { 
    //  contexts/states 
    const [error, setError] = useState("");
    const [userData, setUserData] = useState({
        currentPass: "", 
        newPass:"", 
        confirmPass:"",
        user:user,
    })
    // gather data from form input to update state 
	const handleChange = ({ currentTarget: input }) => {
		setUserData({ ...userData, [input.name]: input.value });
	};
    // handle form submission 
    const handleSubmit = async (event) => {
        alert("Changin Password");
        event.preventDefault();
        try{
            let url = `http://localhost:${process.env.REACT_APP_API_PORT}/account/change-password`
           await axios.post(url,userData)
        }
        catch(error){
            // display errors for invalid user input 
            if (error.response && error.response != 200){
                setError(error.response.data.message);
            }
        }
    }
    // jsx to display component 
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Change Password</h1>
                <input 
                type = "password" 
                placeholder = "Current Password"
                name = "currentPass"
                onChange = {handleChange}
                value = {userData.currentPass}
                />
                <input 
                type="password"
                placeholder = "New Password"
                name = "newPass"
                onChange = {handleChange}
                value = {userData.newPass}
                />
                <input 
                type="password"
                placeholder = "Confirm Password"
                name = "confirmPass"
                onChange = {handleChange}
                value = {userData.confirmPass}
                />
            </form>
            {error && <div>{error}</div>}
        </div>
    );
}

export default ChangePassword;