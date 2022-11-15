import React from 'react';
import { useSelector } from 'react-redux';
import Nav from './layout/Nav';
import CreatePostPanel from './widgets/create-post/CreatePostPanel'
import allReducers from "./redux/reducers";
    
type RootState = ReturnType<typeof allReducers>

const Container = () => {

	const createPostPanel = useSelector<RootState>(state => state.createPostPanel)

	return (<div className="container">
		<Nav />

		{createPostPanel && <CreatePostPanel/>}
	</div> );
}
 
export default Container;