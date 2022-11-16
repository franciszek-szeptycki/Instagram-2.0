import reqServer, {reqType} from "../../utils/reqServer"


const getHomeContent = async (setPages) => {
	const { data } = await reqServer("GET", null, "/api/posts/get/page=1", true)
	// console.log(data)
	setPages(data)
}

export default getHomeContent