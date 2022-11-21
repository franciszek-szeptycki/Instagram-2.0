const Description = (props) => {
    const { description, setDescription } = props.data;

    return (
        <div className="create-post__label-item create-post__label-item-2">
            <div className="create-post__description">
                <textarea
                    className="create-post__description-textarea"
                    cols={30}
                    rows={10}
                    placeholder="Add post description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
        </div>
    );
};

export default Description;
