// -----DISPLAY COMPONENT-----
const Display = props => {
    console.log(props.clicked)
    return (
        <div className="display">
            {props.apiData.map((card) => (
                <div className="card" key={card.id} id={card.id} onClick={() => props.onClick(card.id)}>
                    <img alt="photo" src={card.images.fixed_height_still.url}></img>
                </div>
            ))}
        </div>
    )
};

export default Display;