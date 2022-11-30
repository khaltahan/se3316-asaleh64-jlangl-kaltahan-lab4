// module dependencies 
import { useState, } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/passwordchange.module.css";
// redirect 
import  { Redirect } from 'react-router-dom'

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
        <div className = {styles.container}>
            <div  className = {styles.form_container} onSubmit={handleSubmit}>
            <form>
                <h1>Change Password</h1>
                <input 
                    type = "password" 
                    placeholder = "Old Password"
                    name = "currentPass"
                    onChange = {handleChange}
                    value = {userData.currentPass}
                    required 
                    className = {styles.input}
                />
                <input 
                    type = "text" 
                    placeholder = "New Password"
                    name = "newPass"
                    onChange = {handleChange}
                    value = {userData.newPass}
                    required 
                    className = {styles.input}
                />
                <input 
                    type = "text" 
                    placeholder = "Confirm Password"
                    name = "confirmPass"
                    onChange = {handleChange}
                    value = {userData.confirmPass}
                    required 
                    className = {styles.input}
                />
                {error && 
                <div className = {styles.error_msg}> 
                    <p>{error}</p> 
                </div>} 
                <div> 
                    <input className = {styles.green_btn} type="submit" value="Change Password"/>      
                </div>
                
                </form>
                <Link to = '/'>
					<button className={styles.green_btn}>
							Back to Home Page
					</button>
					</Link>
                </div>
        </div>
    );
}
export default ChangePassword;