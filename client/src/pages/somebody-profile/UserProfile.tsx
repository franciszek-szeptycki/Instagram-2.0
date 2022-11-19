import { useQuery } from "react-query";
import reqServer from "../../utils/reqServer";

const UserProfile = () => {
	const basicURL = "http://localhost:3000/users/"
	const userId = window.location.href.replace(basicURL, "")
	// console.log(userId)
	const { isLoading, data } = useQuery("users", () => reqServer("GET", null, `/api/user/${userId}`, true))

	console.log(data)

    return (
        <div className="page page-profile">
			<aside className="aside">aside</aside>
			<main className="main">main</main>
        </div>
    );
};

export default UserProfile;
