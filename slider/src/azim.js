import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function azim() {
  const API_KEY = "twe7LqQPF7vF8r9MZc9PUreZCLte33yYdqTinx9rMIqpO2AOxCyKJPwN";
  const PEXELS_API_URL = `https://api.pexels.com/v1/search?query=nature&per_page=15&page=1`;

  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  console.log(photos[2]);

  useEffect(() => {
    getNaturePhotos();
  }, []);

  const handleNextClick = () => {
    if (currentIndex === photos.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(photos.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
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
          <button onClick={handlePrevClick}>Précédent</button>
          <button onClick={handleNextClick}>Suivant</button>
        </div>
      )}
    </div>
  );
}

export default azim;
