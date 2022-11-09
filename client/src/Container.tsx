import React from 'react';
import { useSelector } from 'react-redux';
import Nav from './layout/Nav';
import AddPostPanel from './panels/AddPostPanel'
import allReducers from "./redux/reducers";
    
type RootState = ReturnType<typeof allReducers>

const Container = () => {

	const addPostPanel = useSelector<RootState>(state => state.addPostPanel)

	return (<div className="container">
		<Nav />

		{addPostPanel && <AddPostPanel/>}
	</div> );
}
 
export default Container;