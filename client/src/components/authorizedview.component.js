import styles from "../styles/authorizedview.module.css";
import { Link } from 'react-router-dom'; 
import DisplayTracks from '../components/LandingPage/displaytracks.component'
import Navbar from './navbar.component'

const Overview = () => {
	return (
		<div className={styles.main_container}>
			<Navbar/>
			{/* Components that are imported from landing page to be rendered in authorized view, may need to create different components
			to have the required functionalities when user is authenticated/isAdmin */}
			<DisplayTracks/>
		</div>
	);
};

export default Overview;