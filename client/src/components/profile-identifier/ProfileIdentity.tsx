import "./ProfileIdentity.sass";

const ProfileIdentity = (props) => {
	const { username, image } = props.data;

	console.log(props)

    return (
        <div className="profile-id">
            <div className="profile-id__photo">
                <img className="profile-id__photo-img"
                    src={image ? image : "/Users/admin/Desktop/Instagram-2.0/client/src/assets/template/user-small.png"}
                    alt=""
                />
            </div>
            <p className="profile-id__name">{username}</p>
        </div>
    );
};

export default ProfileIdentity;
