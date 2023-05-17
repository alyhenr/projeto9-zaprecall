import { useState } from 'react';

import GameBody from './components/GameBody';
import Footer from './components/Footer';
import sampleQuestions from './gameQuestions';


let numberOfQuestions = 4;
let gameQuestions = sampleQuestions.sort(() => 0.5 - Math.random()).slice(0, numberOfQuestions);

const App = () => {
  const [questions, setQuestions] = useState(gameQuestions);
  const [results, setResults] = useState({
    total: numberOfQuestions,
    answered: 0,
    iconsType: []
  });
  console.log(results);
  return <>
    <GameBody questions={questions} setResults={setResults} />
    <Footer results={results} />
  </>
}

export default App;
