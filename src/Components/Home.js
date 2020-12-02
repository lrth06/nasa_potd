import React, { useEffect, useState } from "react";
import Loader from "./Loader.js";
import axios from "axios";

require("dotenv").config();

function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [year, setYear] = useState("0");
  const [month, setMonth] = useState("0");
  const [day, setDay] = useState("0");
  const [date, setDate] = useState("");
  function getRandomNumber(start, range) {
    let getRandom = Math.floor(Math.random() * range + start);
    while (getRandom > range) {
      getRandom = Math.floor(Math.random() * range + start);
    }

    return getRandom;
  }
  function minTwoDigits(n) {
    return (n < 10 ? "0" : "") + n;
  }
  const setRandomDate = () => {
    setYear(getRandomNumber(1996, 2020));
    setMonth(minTwoDigits(getRandomNumber(1, 12)));
    setDay(minTwoDigits(getRandomNumber(1, 28)));
    setDate(`${year}-${month}-${day}`);
  };

  const getRandomImage = () => {
    setRandomDate();
    fetchData();
  };

  const NASA_KEY = process.env.NASA_KEY;
  const fetchData = () => {
    setLoading(true);
    try {
      axios
        .get(
          `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${date}`
        )
        .then((res) => {
          console.log(res);
          setLoading(false);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (error) {
      console.log("there was an error!");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="container">
      {loading && <Loader />}
      {!loading && !data && (
        <div>
          <h1 className="bg">NASA Picture of the Day</h1>

          <div className="bg">
            <p>
              This application makes Calls to the NASA APOD API, providing an
              Astonomy related image with information every single day, all the
              way back to 1995. To get started, just click the link below and
              this application will select a random date and show you the
              information for that date.{" "}
            </p>
            <button onClick={() => getRandomImage()}>Get Random Image</button>
          </div>
        </div>
      )}
      {!loading && data && (
        <div className="nasa">
          <h2>{data.title}</h2>
          {data.media_type === "video" && (
            <iframe
              title={data.title}
              id="player"
              type="text/html"
              width="640"
              height="390"
              src={data.url}
              frameborder="0"
            ></iframe>
          )}
          <br />
          <img className="potd" src={data.url} alt={data.title} />
          <p>{data.explanation}</p>
          <h3>POTD for: {data.date}</h3>

          <button onClick={() => getRandomImage()}>Get Random Image</button>
          <button onClick={() => setData(null)}>Clear</button>
        </div>
      )}
    </div>
  );
}

export default Home;
