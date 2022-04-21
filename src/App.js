import React, { useState, useEffect } from "react"

// -----CSS Imports-----
import './styles/reset.css'
import './styles/App.css';
import Display from './components/Display';

// Game logic --> array of all cards state, array of cards clicked state, score state, best score state
// Make the Api call for default number of movie images, if player completes round increase the call number by 2 and restartGame
// onclick check if that cards key is in clicked array, if it is notify the player they lost, restart game at default api call --> check if their current score is higher than their best score --> if it is set bestscore to the currentscore --> reset currentScore
// If it is not in the array --> add it to the array, increase score by 1, shuffle the cards
// If clicked array length equals the length of the apiData array --> notifly player has won that round, clear the clicked and allcard arrays, increase currentApiCallNumber by 2 and make API request and add them to the allcard array

function App() {

  const [level, setLevel] = useState(8);
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);


  // Api Call
  useEffect(() => {
    fetch(`https://api.giphy.com/v1/gifs/search?q=meme&api_key=7SufAUWSCErlvAp64NoituzCdcVwjAFJ&limit=${level}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        setAllCards([]);
        for (let i = 0; i < data.data.length; i++) {
          setAllCards(allCards => [...allCards, data.data[i].id]);
        }
        setApiData(data.data);
        document.body.querySelector('.main').style.gridTemplateColumns = `repeat(${level / 2}, 1fr)`;
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }, [level]);

  // On Clicks
  const clickCard = (id) => {
    if (clickedCards.includes(id)) {
      setClickedCards([]);
      setLevel(8);
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      };
      setCurrentScore(0)
      shuffleCards();
    } else {
      setClickedCards(clickedCards => [...clickedCards, id]);
      shuffleCards();
      setCurrentScore(currentScore + 1);
    }

  }

  // Game Functions

  useEffect(() => {
    if (clickedCards.length === level) {
      setAllCards([]);
      setClickedCards([]);
      setLevel(level + 4);
    }
  }, [clickedCards]);

  const shuffleCards = () => {
    let currentIndex = apiData.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [apiData[currentIndex], apiData[randomIndex]] = [apiData[randomIndex], apiData[currentIndex]]
    }
  };

  // Returns
  let content = <p>Loading...</p>;

  if (!loading && apiData.length > 0) {
    content = (
      <div className="App">
        <Display apiData={apiData} cards={allCards} clicked={clickedCards} onClick={clickCard} currentScore={currentScore} bestScore={bestScore} />
      </div>
    )
  }
  return content;


  // <div className="App">
  //   <Display apiData={apiData} cards={allCards} clicked={clickedCards} onClick={clickCard} currentScore={currentScore} bestScore={bestScore} />
  // </div>

}

export default App;
