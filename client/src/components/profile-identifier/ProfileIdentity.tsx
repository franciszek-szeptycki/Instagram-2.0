import "./ProfileIdentity.sass";

const ProfileIdentity = (props) => {
	const { username, image } = props.data;

    return (
        <div className="profile-id">
            <div className="profile-id__photo">
                <img loading="lazy" className="profile-id__photo-img"
                    src={image}
                    alt=""
                />
            </div>
            <p className="profile-id__name">{username}</p>
        </div>
    );
};

export default ProfileIdentity;
