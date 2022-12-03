import styles from "../styles/authorizedview.module.css";
import { Link } from 'react-router-dom'; 
import DisplayTracks from '../components/LandingPage/displaytracks.component'
import GeneralSearch from '../components/LandingPage/generalsearch.component'
import Navbar from './navbar.component'
import AllLists from './AuthorizedView/lists.component'

// import creating list component 
import CreatePlayList from "./AuthorizedView/createlist.component";

const Overview = () => {
	const user = localStorage.getItem("user")
	return (
		<div className={styles.main_container}>
			<Navbar/>
			{/* Components that are imported from landing page to be rendered in authorized view, may need to create different components
			to have the required functionalities when user is authenticated/isAdmin */}
			<GeneralSearch/>
			<DisplayTracks/>
			<AllLists user = {user} />
			<CreatePlayList user = {user}/>
		</div>
	);
};

export default Overview;