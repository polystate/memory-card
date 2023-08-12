import { useState, useEffect } from 'react';
import fetchImages from './fetch.js';
import shuffleImages from './utils/utils.js';
import ImageContainer from './components/ImageContainer';
import './App.css';



function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchUnsplashImages(){
      const fetchedImages = await fetchImages('animals', 8);
      const initializedImages = fetchedImages.map(image => ({image, selected: false}))
      const shuffledImages = shuffleImages(initializedImages); 
      setImages(shuffledImages);
    }
    fetchUnsplashImages();
  }, [])

  return (
    <>
    <header>
      <h1>Memory Game</h1>
    </header>
    <main>
    <div className="score">
        <h2>Current Score: <span className="score-val">{score}</span></h2>
        <h2>Best Score: <span className="score-val">{bestScore}</span></h2>
    </div>
      <ImageContainer images={images} setImages={setImages} score={score} setScore={setScore} bestScore={bestScore} setBestScore={setBestScore}/>
    </main>
    <footer>
      <p>Created by polystate</p>
      <a href="https://github.com/polystate/memory-card" target="_blank">polystate@github</a>
    </footer>
    </>
  )
}

export default App
