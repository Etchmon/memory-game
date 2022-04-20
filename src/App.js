import React, { useState, useEffect } from "react"

// -----CSS Imports-----
import './styles/reset.css'
import './styles/App.css';
import Display from './components/Display';

// onClick, add 
// Game logic --> array of all cards state, array of cards clicked state, score state, best score state
// Make the Api call for default number of movie images, if player completes round increase the call number by 2 and restartGame
// onclick check if that cards key is in clicked array, if it is notify the player they lost, restart game at default api call --> check if their current score is higher than their best score --> if it is set bestscore to the currentscore --> reset currentScore
// If it is not in the array --> add it to the array, increase score by 1, shuffle the cards
// If clicked array length equals the length of the apiData array --> notifly player has won that round, clear the clicked and allcard arrays, increase currentApiCallNumber by 2 and make API request and add them to the allcard array

function App() {

  const [level, setLevel] = useState(10);
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);


  // Api Call
  useEffect(() => {
    fetch(`https://api.giphy.com/v1/gifs/search?q=puppy&api_key=7SufAUWSCErlvAp64NoituzCdcVwjAFJ&limit=${level}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        console.log(data.data);
        for (let i = 0; i < data.data.length; i++) {
          setAllCards(allCards => [...allCards, data.data[i].id]);
        }
        setApiData(data.data);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }, [level]);

  // On Clicks
  const clickCard = (id) => {
    if (clickedCards.includes(id)) return;
    setClickedCards(clickedCards => [...clickedCards, id]);
  }

  return (
    <div className="App">
      <Display apiData={apiData} cards={allCards} clicked={clickedCards} onClick={clickCard} />
    </div>
  );
}

export default App;
