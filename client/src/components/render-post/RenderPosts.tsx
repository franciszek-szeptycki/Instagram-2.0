import ProfileIdentity from "../profile-identifier/ProfileIdentity";
import "./RenderPost.sass";

// interface postData {
//     id: number;
//     user_name: string;
//     description: string;
//     hashtags: string;
//     file: string;
//     date?: any;
// }

const object1 = {
    date: "Tue, 15 Nov 2022 22:16:04 GMT",
    description: `Ta wiadomość e-mail z zaproszeniem do napisania recenzji została wysłana przez firmę Recharge.com za pośrednictwem platformy Trustpilot. Recharge.com jest administratorem danych w zakresie Twoich danych osobowych zastosowanych do wysłania tej wiadomości e-mail, a Trustpilot jest podmiotem przetwarzającym. Nie wiesz, dlaczego otrzymujesz tę wiadomość lub masz pytania dotyczące swoich da`,
    file: "../components/JohnExample.png",
    hashtags: "1 2 3",
    id: 1,
    user_name: "admin",
};

const object2 = {
    date: "Tue, 15 Nov 2022 22:16:04 GMT",
    description: "TEST",
    file: "../components/JohnExample.png",
    hashtags: "1 2 3",
    id: 2,
    user_name: "admin",
};

const object3 = {
    date: "Tue, 15 Nov 2022 22:16:04 GMT",
    description: "TEST",
    file: "../components/JohnExample.png",
    hashtags: "1 2 3",
    id: 3,
    user_name: "admin",
};

const postsArr = [object1, object2, object3];

const RenderPosts = (props) => {
    console.log(props);

    const Post = ({ item }) => {
        return (
            <div className="post">
                <div className="post__header">
                    <ProfileIdentity />
                </div>
                <div className="post__main">
                    <div className="post__main-img"></div>
                </div>
                <div className="post__footer">
                    <div className="post__footer-top">
                        <div className="post__footer-top-interactions">
                            <button className="post__footer-top-interactions-btn">
                                <i className="fa-regular fa-comment"></i>
                            </button>
                            <button className="post__footer-top-interactions-btn">
                                <i className="fa-regular fa-heart"></i>
                            </button>
                            <button className="post__footer-top-interactions-btn">
                                <i className="fa-solid fa-eye"></i>
                            </button>
                            <button className="post__footer-top-interactions-btn">
                                <i className="fa-regular fa-envelope"></i>
                            </button>
                        </div>
                        <p className="post__footer-top-date">
                            {item.date.split(" ")[1]} {item.date.split(" ")[2]}{" "}
                            {item.date.split(" ")[3]}
                        </p>
                    </div>
                    <p className="post__footer-description">
                        {item.description}
                    </p>
                </div>
            </div>
        );
    };

    const posts = postsArr.map((item) => <Post key={item.id} item={item} />);

    return <>{posts ? posts : <></>}</>;
};

export default RenderPosts;
