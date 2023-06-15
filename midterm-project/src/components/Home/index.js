import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomNav from "../CustomNav";
import { userData } from "../../helpers";
import "./Home.css";
import backgroundMusic from "../music/vermilion_town.mp3";

const Home = () => {
  const { username } = userData();
  const [catImages, setCatImages] = useState([]);

  useEffect(() => {
    fetchCatImages();
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const fetchCatImages = () => {
    axios
      .get("https://api.thecatapi.com/v1/images/search?limit=9")
      .then((response) => {
        const catImageUrls = response.data.map((image) => image.url);
        setCatImages(catImageUrls);
      })
      .catch((error) => {
        console.error("Error fetching cat images:", error);
      });
  };

  return (
    <div>
      <CustomNav />
      <div className="home">
        <h1>Welcome to Cat Moments, {username}</h1>
        <div className="header">
          <h2>Random Cat Generator!</h2>
          <p>Here's your Randomly Generated Cats using Cat API!</p>
        </div>
        <div className="button-container">
          <button onClick={fetchCatImages}>Generate More Cat Images</button>
        </div>
        <div className="cat-images">
          {catImages.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Cat ${index + 1}`}
              className="cat-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
