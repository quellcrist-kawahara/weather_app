import './App.css';
import React, { useState, useMemo, useCallback } from "react";
import {REACT_APP_API_URL, REACT_APP_API_KEY} from './consts';
import GameStatus from './GameStatus';
import ResultItems from './ResultItems';

export default function App() {
  const cities = useMemo(() => ['Tokyo', 'Seoul', 'Beijing', 'Ottawa', 'Oslo'], []);

  const [gameResults, setGameResults] = useState(Array.from({length: 5}, () => ({userInp: ''})));
  const [cityIndex, setCityIndex] = useState(0);
  const [gameRes, setGameRes] = useState(null);

  const fillResultField = useCallback((key, val) => {
    let newArr = [...gameResults];
    newArr[cityIndex][key] = val;
    setGameResults(newArr);
  }, [gameResults, cityIndex]);

  const onInputChange = useCallback(val => {
    fillResultField('userInp', val);
  }, [fillResultField]);

  const checkTemp = useCallback(() => {
    const fetchData = async () => {

      await fetch(`${REACT_APP_API_URL}/weather?q=${cities[cityIndex]}&appid=${REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        fillResultField('temp', result.main.temp - 273.15)
        fillResultField('result', Math.abs(result.main.temp - 273.15 - gameResults[cityIndex].userInp)<=5);
      });
    }

    const checkIndex = () => {
      cityIndex < 4 ? setCityIndex(() => cityIndex + 1) : setGameRes('Game over');
    }

    fetchData();
    checkIndex();
  }, [cities, cityIndex, fillResultField, gameResults])

  return (
    <div className="App">
      {
        !gameRes ? (
          <>
            <h1>{cities[cityIndex]}</h1>
            <input type="number" value={gameResults[cityIndex].userInp} onChange={(e) => onInputChange(e.target.value)} placeholder="Your guess text box"/>
            <button onClick={checkTemp}> Check </button>
          </>
        ) : <GameStatus results={gameResults}/>
      }
      <hr/>
      <ResultItems results={gameResults} cities={cities}/>
    </div>
  );
}
