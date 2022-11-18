const Notification = (props) => {
	const {data} = props
	return ( <div
		className={`form__label-alert ${
			data ? "" : "hidden"
		}`}
	>
		<i className="fa-solid fa-circle-exclamation"></i>
		<p className="form__label-alert-text">
			{typeof data !== 'object' ? data : `the username contains illegal characters`}
		</p>
	</div> );
}
 
export default Notification;