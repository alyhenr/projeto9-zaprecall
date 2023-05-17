import { useState } from 'react';

import GameBody from './components/GameBody';
import Footer from './components/Footer';
import sampleQuestions from './gameQuestions';
import RestartButton from './components/RestartButton';


let numberOfQuestions = 4;
const randomQuestions = sampleQuestions.sort(() => 0.5 - Math.random()).slice(0, numberOfQuestions);

const App = () => {
  const [results, setResults] = useState({
    total: numberOfQuestions,
    answered: 0,
    iconsType: []
  });

  return <>
    <GameBody questions={randomQuestions} setResults={setResults} />
    <Footer results={results} />
    <RestartButton />
  </>
}

export default App;
