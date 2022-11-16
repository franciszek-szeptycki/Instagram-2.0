import { useState } from 'react';
import reqServer from '../../utils/reqServer';
import './Profile.sass'

const Profile = () => {
	
	const [file, setFile] = useState<File>()

	const handleSaveButton = async () => {

        const reader = new FileReader();

        reader.readAsDataURL(file)

        reader.addEventListener("load", () => {

            const data = {
                img: reader.result,
            };
            reqServer("POST", data, "/api/posts/add", true);
        })
    };

	return <div className="page page-profile">
		<aside className="aside">
		<div className="profile">
				<div className="profile__photo">
					<label className="profile__upload">
                        {file && (
                            <img
                                className="profile__upload-show"
                                src={URL.createObjectURL(file)}
                            />
                        )}
                        <input
                            className="profile__upload-input"
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>
				</div>
				<div className="profile__data"></div>
			</div>
		</aside>
		<main className="main">
		</main>
	</div>;
};

export default Profile;
