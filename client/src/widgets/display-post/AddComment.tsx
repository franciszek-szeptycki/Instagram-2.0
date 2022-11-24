import { useState } from "react";
import reqServer from "../../utils/reqServer";

const AddComment = ({ id, refetchComments }) => {
    const [textareaValue, setTextareaValue] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { status } = await reqServer(
            "POST",
            { comment: textareaValue },
            `/api/comments/add/${id}`
        );
        if (status === 201) {
			refetchComments();
			setTextareaValue("")
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <textarea
                className="add-comment__textarea"
                cols={30}
                rows={3}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
            ></textarea>
            <input type="submit" />
        </form>
    );
};

export default AddComment;
