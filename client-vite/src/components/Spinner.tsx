import './Spinner.sass'


export default ({x, y}: {x: number, y: number}) => {
    return (
        <div className="spinner-wrapper" >
            <div className="spinner" style={{width: `${x}px`, height: `${y}px`}} ></div>
        </div>
    )
}