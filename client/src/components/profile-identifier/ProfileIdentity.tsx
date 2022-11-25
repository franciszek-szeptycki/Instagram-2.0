import "./ProfileIdentity.sass";

const ProfileIdentity = (props) => {
    const { username, image, owner_id } = props.data;

    const handleRedirect = () => {
        window.location.pathname = `users/${owner_id}`
    }

    return (
        <div className="profile-id">
                <div className="profile-id__photo" onClick={handleRedirect} >
                    <img className="profile-id__photo-img" src={image} alt="" />
                </div>
                <p className="profile-id__name" onClick={handleRedirect} >{username}</p>
        </div>
    );
};

export default ProfileIdentity;
