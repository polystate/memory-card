import { useState } from 'react';
import shuffleImages from '../utils/utils';

function ImageContainer({ images, setImages, score, setScore, bestScore, setBestScore }) {
  const [gameStatus, setGameStatus] = useState("Ongoing game...");

  const handleWin = () => {
    setGameStatus("Congratulations!\nYou win!");
    setScore(0);
    setImages(images.map((image) => ({ ...image, selected: false })));

    setTimeout(() => {
      window.location.reload();
    }, 2500)
  };

  const handleGameOver = () => {
    if (score > bestScore) {
      setBestScore(score);
    }
    if (gameStatus !== "You win!") {
      setGameStatus("Game over!");
    }
    setScore(0);
    setImages(images.map((image) => ({ ...image, selected: false })));
  };

  const imageHandler = (imageObj) => {
    if (!imageObj.selected) {
      setScore(score + 1);

      if (score + 1 === images.length) {
        handleWin();
      } else {
        setGameStatus("Ongoing game...");
      }

      imageObj.selected = true;
      const imagesCopy = [...images];
      shuffleImages(imagesCopy);
      setImages(imagesCopy);
    } else {
      handleGameOver();
    }
  };

  const statusColor = gameStatus === 'Game over!' ? "red" : "green";

  return (
    <>
      <div className="game-status">
        <span className="status-text" style={{ color: statusColor }}>{gameStatus}</span>
      </div>
      <div className="gallery">
        {images.map((imageObj, index) => (
          <figure key={index} className="image-container">
            <img
              key={imageObj.image.id}
              src={imageObj.image.urls.small}
              alt={imageObj.image.alt_description}
              id={`image-${index}`}
              className="image"
              onClick={() => imageHandler(imageObj)}
            />
            <figcaption>
              <p className="caption">
                {imageObj.image.alt_description.split(' ').filter(word => word.toLowerCase() !== 'of').slice(0, 4).join(' ')}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

export default ImageContainer;
