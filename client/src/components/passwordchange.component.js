// module dependencies 
import { useState, } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/passwordchange.module.css";

const ChangePassword = ({ userEmail }) => { 
    // redirect 
    const navigate = useNavigate();
    //  contexts/states 
    const [error, setError] = useState("");
    const [userData, setUserData] = useState({
        currentPass: "", 
        newPass:"", 
        confirmPass:"",
        email:userEmail
    })
    // gather data from form input to update state 
	const handleChange = ({ currentTarget: input }) => {
		setUserData({ ...userData, [input.name]: input.value });
	};
    // handle form submission 
    const handleSubmit = async (e) => {
        console.log(userData)
        e.preventDefault();
        try{
            let url = `http://localhost:${process.env.REACT_APP_API_PORT}/account/change-password`
            const {response} = await axios.post(url, userData)
            // remove token and user session 
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            // redirect user to login 
            navigate('/login')
        }
        catch(error){
            if (error.response && error.response != 200){
                setError(error.response.data.message);
            }
        }
    }
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
                    required 
                />
                <input 
                    type = "text" 
                    placeholder = "New Password"
                    name = "newPass"
                    onChange = {handleChange}
                    value = {userData.newPass}
                    required 
                />
                <input 
                    type = "text" 
                    placeholder = "Confirm Password"
                    name = "confirmPass"
                    onChange = {handleChange}
                    value = {userData.confirmPass}
                    required 
                />
                <input type="submit" value="Change Password"/>
            </form>
            {error && <div>{error}</div>}
        </div>
    );
}
export default ChangePassword;