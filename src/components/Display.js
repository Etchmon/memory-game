// -----DISPLAY COMPONENT-----
const Display = props => {
    console.log(props.cards.length, props.clicked.length, props.clicked)
    return (
        <div className="display">
            <section className="header">
                <span>Memory Game</span>
            </section>
            <section className="score">
                <span>Current: {props.currentScore}</span>
                <span>Best: {props.bestScore}</span>
            </section>
            <section className="main">
                {props.apiData.map((card) => (
                    <div className="card" key={card.id} id={card.id} onClick={() => props.onClick(card.id)}>
                        <img alt="card" src={card.images.fixed_height_still.url}></img>
                    </div>
                ))}
            </section>
        </div>
    )
};

export default Display;