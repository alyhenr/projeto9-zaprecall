import { useState } from 'react';

import GameBody from './components/GameBody';
import Footer from './components/Footer';
import RestartButton from './components/RestartButton';
import WelcomeScreen from './components/WelcomeScreen';
import sampleQuestions from './gameQuestions';


let numberOfQuestions = 4;
const randomQuestions = sampleQuestions.sort(() => 0.5 - Math.random()).slice(0, numberOfQuestions);

const App = () => {
  const [gameOn, setGameOn] = useState(false);
  const [results, setResults] = useState({
    total: numberOfQuestions,
    answered: 0,
    iconsType: []
  });

  return <>
    {gameOn ? <>
      <GameBody questions={randomQuestions} setResults={setResults} />
      <Footer results={results} />
      <RestartButton />
    </>
      :
      <WelcomeScreen setGameOn={setGameOn} />
    }

  </>
}

export default App;
