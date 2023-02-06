import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_KEY = "twe7LqQPF7vF8r9MZc9PUreZCLte33yYdqTinx9rMIqpO2AOxCyKJPwN";
  const PEXELS_API_URL = `https://api.pexels.com/v1/search?query=nature&per_page=15&page=1`;

  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [style, setStyle] = useState({});

  const getNaturePhotos = async () => {
    try {
      const response = await axios.get(PEXELS_API_URL, {
        headers: {
          Authorization: API_KEY,
        },
      });
      setPhotos(response.data.photos);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(photos);

  useEffect(() => {
    getNaturePhotos();
  }, []);

  const element = document.querySelector(`.btn-${currentIndex}`);
  const elementPrec = document.querySelector(`.btn-${currentIndex - 1}`);
  const ElementNext = document.querySelector(`.btn-${currentIndex + 1}`);
  const dernierElement = document.querySelector(`.btn-${photos.length - 1}`);
  const PremElement = document.querySelector(`.btn-${0}`);
  const handleNextClick = () => {
    //setStyle(buttonPressed ? { background: "gray" } : { background: "red" });

    if (currentIndex === 0) {
      element.style.background = "red";
      PremElement.style.background = "red";
      dernierElement.style.background = "gray";
    }

    if (currentIndex === photos.length - 1) {
      setCurrentIndex(0);
      dernierElement.style.background = "red";
      elementPrec.style.background = "gray";
    } else {
      setCurrentIndex(currentIndex + 1);
      element.style.background = "red";
      elementPrec.style.background = "gray";
    }
  };

  const handlePrevClick = () => {
    if (currentIndex) {
      PremElement.style.background = "red";
    }
    if (currentIndex === 0) {
      element.style.background = "red";

      PremElement.style.background = "red";
      ElementNext.style.background = "gray";
      setCurrentIndex(photos.length - 1);
    } else if (currentIndex === photos.length - 1) {
      setCurrentIndex(currentIndex - 1);
      element.style.background = "red";
      PremElement.style.background = "gray";
      ElementNext.style.background = "gray";
    } else {
      setCurrentIndex(currentIndex - 1);
      element.style.background = "red";
      ElementNext.style.background = "gray";
      PremElement.style.background = "gray";
    }
  };
  return (
    <div className="App">
      {photos.length > 0 && (
        <div>
          <img
            src={photos[currentIndex].src.medium}
            alt={photos[currentIndex].alt_description}
          />
          <div className="btn">
            <h1 onClick={handlePrevClick} className="btn-prec">
              &#060;
            </h1>

            <h1 onClick={handleNextClick} className="btn-next">
              &#062;
            </h1>
          </div>
        </div>
      )}
      <div className="btn-defiler">
        {photos.map((photo, i) => (
          <button className={`btn-${i}`}>{` `}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
