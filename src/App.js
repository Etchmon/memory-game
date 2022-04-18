import './App.css';

// App runs a Display component that gets passed the props its needs
// Header, Game, Card components
// Make Api call in Game component
// Map through the number of returned movies images, create new Card for each movie image returned
// Game logic --> array of all cards state, array of cards clicked state, score state, best score state
// Make the Api call for default number of movie images, if player completes round increase the call number by 2 and restartGame
// onclick check if that cards key is in clicked array, if it is notify the player they lost, restart game at default api call --> check if their current score is higher than their best score --> if it is set bestscore to the currentscore --> reset currentScore
// If it is not in the array --> add it to the array, increase score by 1, shuffle the cards
// If clicked array length equals the length of the allcards array --> notifly player has won that round, clear the clicked and allcard arrays, increase currentApiCallNumber by 2 and make API request and add them to the allcard array

function App() {
  return (
    <div className="App">

    </div>
  );
}

export default App;
