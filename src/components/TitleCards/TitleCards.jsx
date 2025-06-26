import React, { useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const TitleCards = ({ title, category }) => {
  //here i am using useRef to directly access the card-list and use eventListener to listen the scroll event and change the scrollLeft accordingly
  // also i am using useEffect to add the eventListener and remove it when the component unmounts
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDU1NjlmYzVkMWQyZWJiZGU5Mjg2ZmVlZGJiZmJkMyIsIm5iZiI6MTc1MDk0ODc5OC4yODcwMDAyLCJzdWIiOiI2ODVkNWJiZTY2OTdmYTQ0MjIzNGYwYTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.R1vuu_6m_3iRDwH98Euhfvp6bTEs0_KAQZMMTONjJQA",
    },
  };

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);
  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
