import { useEffect, useState } from "react";
import getHomeContent from "./getHomeContent";

const Home = () => {
	const [pages, setPages] = useState()
	console.log(pages)
	
	useEffect(() => {
		getHomeContent(setPages)
	}, [])

	return (<div className="home">
		home
	</div> );
}
 
export default Home;