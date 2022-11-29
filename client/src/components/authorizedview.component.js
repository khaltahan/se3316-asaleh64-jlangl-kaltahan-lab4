import styles from "../styles/authorizedview.module.css";
import { Link } from 'react-router-dom'; 

const Overview = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Home Page</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				<Link to = '/account/change-password'> Change Password </Link>
			</nav>
		</div>
	);
};

export default Overview;