import { useEffect, useState } from "react";
import getHomeContent from "./getHomeContent";

const Home = () => {
	const [pages, setPages] = useState()
	
	useEffect(() => {
		getHomeContent(setPages)
	}, [])

	return (<div className="page page-home">
		<main className="main">main</main>		
		<aside className="aside"></aside>
	</div> );
}
 
export default Home;