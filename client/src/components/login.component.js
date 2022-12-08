import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../styles/login.module.css";

const Login = () => {
	// state/context variables
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	// event handler set state using user input field data 
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	// event handler to request API when form is submitted 
	const handleSubmit = async (e) => {
		e.preventDefault();
		// fetch the API request 
		try {
			const url = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_API_PORT}/login`;
			const { data: res } = await axios.post(url, data);
			// store token for access in payload 
			localStorage.setItem("token", res.data.token);
			// store user for permission reference
			localStorage.setItem("user", res.data.user._id)
			// redirect user to landing page 
			window.location = "/";
		} catch (error) {
			if (error.response.status === 500) {
				setError("Invalid Email and/or password");
			}
			else if(error.response.status === 403){
				setError(error.response.data.message)
				
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
					<Link to = '/general'>
					<button className={styles.white_btn}>
							Back to Home Page
					</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
