import Post from './Post'
import "./RenderPost.sass";


const RenderPosts = ({data, owner = false, reverse = true }) => {
    const postsData: any = data.data
    const isOwner: any = owner
    const posts = [];
    console.log(postsData)

    try {
        for (const item of postsData) {
            posts.push(<Post key={item.id} data={item} owner={isOwner}/>)
        }
    } finally {   
        if (reverse) return <>{posts ? posts.reverse() : <></>}</>;
        else return <>{posts ? posts : <></>}</>;
    }
};

export default RenderPosts;
