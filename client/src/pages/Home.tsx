import { useEffect, useState } from "react";
import RenderPosts from "../components/render-post/RenderPosts";
import getHomeContent from "./getHomeContent";

const Home = () => {
	const [pages, setPages] = useState([])

	// console.log(pages)
	
	useEffect(() => {
		getHomeContent(setPages)
	}, [])

	return (<div className="page page-home">
		<main className="main"><RenderPosts data={pages}/></main>		
		{/* <main className="main"></main>		 */}
		<aside className="aside"></aside>
	</div> );
}
 
export default Home;