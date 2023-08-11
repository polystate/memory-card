import { useState } from 'react';

function ImageContainer({images, setImages, score, setScore, bestScore, setBestScore }) {
  const [gameStatus, setGameStatus] = useState("Ongoing game...");

  const imageHandler = (imageObj) =>{
    if(!imageObj.selected){
      setScore(score + 1);
      (score === 7) ? setGameStatus("You win!") : setGameStatus("Ongoing game...");
      imageObj.selected = true;
      const shuffledImages = [...images];
      for(let i = shuffledImages.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]]
      }
      setImages(shuffledImages);
    } else {
      if(score > bestScore){
        setBestScore(score);
      }
      setGameStatus('Game over!');
      const resetGame = images.map((image) => {
        return { ...image, selected: false}
      })
      setScore(0);
      setImages(resetGame);
    }
  }

  return (
    <>
      <div className="game-status">
      <span className="status-text" style={{color: gameStatus === 'Game over!' ? "red" : "green"}}>{gameStatus}</span>
      </div>
      <div className="gallery">
        {images.map((imageObj, index) => (
          <figure key={index} className="image-container">
          <img key={imageObj.image.id} src={imageObj.image.urls.small} alt={imageObj.image.alt_description} id={`image-${index}`} className="image" onClick={() => imageHandler(imageObj)}/>
          <figcaption><p className="caption">{imageObj.image.alt_description.split(' ').slice(0, 4).join(' ')}</p></figcaption>
          </figure>
        ))}
      </div>
    </>
  )
}
          

export default ImageContainer;
