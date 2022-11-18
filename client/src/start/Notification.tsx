const Notification = (props) => {
	return ( <div
		className={`form__label-alert ${
			props.data ? "" : "hidden"
		}`}
	>
		<i className="fa-solid fa-circle-exclamation"></i>
		<p className="form__label-alert-text">
			{props.data}
		</p>
	</div> );
}
 
export default Notification;