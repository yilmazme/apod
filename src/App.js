import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [image, setImage] = useState("");
  const [hd, setHd] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=E4afWhPlSTYPAwdSxlEW3E7f23eyFZAue8sxN5FN"
    )
      .then((result) => result.json())
      .then((data) => {
        setImage(data);
        setLoaded(true);
        console.log(data);
      })
      .catch((error) => {
        setLoaded(true);
        setError(error);
      });
  }, []); //empty for mimic cdm

  if (error) {
    return (
      <div>There is a problem with source or your internet connection.</div>
    );
  } else if (!loaded) {
    return <h3>Loading...</h3>;
  } else {
    return (
      <div>
        <h4> Astronomy Picture of the Day: {image.date}</h4>
        <h3>{image.title}</h3>
        <button
          onClick={() => {
            setHd(!hd);
          }}
        >
          {hd ? "Normal" : "For HD"}
        </button>
        <img src={hd ? image.hdurl : image.url} alt="lualua" />
        <p>
          <b>About: </b>
          {image.explanation}
        </p>
      </div>
    );
  }
}

export default App;
