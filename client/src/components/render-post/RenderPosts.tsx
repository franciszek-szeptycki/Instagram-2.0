import Post from './Post'
import "./RenderPost.sass";


const RenderPosts = (props) => {
    const data: any = props.data.data
    const owner: any = props.owner || false
    const posts = [];

    try {
        for (const element of data) {
            posts.push(<Post key={element.id} data={element} owner={owner}/>)
        }
    } finally {   
        return <>{posts ? posts.reverse() : <></>}</>;
    }
};

export default RenderPosts;
