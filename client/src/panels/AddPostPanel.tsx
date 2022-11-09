import { useDispatch } from "react-redux";
import { ADD_POST_OFF_FUNCTION } from "../redux/actions/addPostPanel";
import "./AddPostPanel.sass";

const AddPostPanel = () => {
    const dispatch = useDispatch();

	const handleClosePanel = (e) => {
		e.preventDefault()
        dispatch(ADD_POST_OFF_FUNCTION());
    };

    return (
        <div className="container-panel-bg">
            <div className="container-panel">
                <button
                    onClick={(e) => handleClosePanel(e)}
                    className="container-panel__close-btn"
                >
                    x
                </button>
            </div>
        </div>
    );
};

export default AddPostPanel;
