import "./Error.sass";

const Error404 = ({ data }) => {
    return (
        <div className="page page-error">
            {/* <h1 className="error">{data ? data : "site"}</h1> */}
            <h1 className="error">error 404</h1>
        </div>
    );
};

export default Error404;
