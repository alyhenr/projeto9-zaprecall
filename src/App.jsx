import { useState } from 'react';

import GameBody from './components/GameBody';
import Footer from './components/Footer';
import RestartButton from './components/RestartButton';
import WelcomeScreen from './components/WelcomeScreen';
import sampleQuestions from './gameQuestions';

const numberOfQuestionsDefault = 8;
const shuffledQuestions = sampleQuestions.sort(() => 0.5 - Math.random());
let randomQuestions;

const App = () => {
  const [gameOn, setGameOn] = useState(false);
  // Shared state between the flashcards and the footer:
  const [results, setResults] = useState({
    total: numberOfQuestionsDefault,
    answered: 0,
    iconsType: []
  });

  const generateQuestions = n => {
    setResults(prevState => ({
      ...prevState,
      total: Math.floor(n),
    }));
    randomQuestions = shuffledQuestions.slice(0, n);
  };

  return <>
    {gameOn ? <>
      <GameBody
        questions={randomQuestions
          || shuffledQuestions.slice(0, numberOfQuestionsDefault)}
        setResults={setResults}
      />
      <Footer results={results} />
      <RestartButton />
    </>
      :
      <WelcomeScreen
        setGameOn={setGameOn}
        generateQuestions={generateQuestions}
      />
    }

  </>
}

export default App;
