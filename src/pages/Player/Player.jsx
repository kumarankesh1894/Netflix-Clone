import React from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {

const[apiData,setApiData] = useState({
  name: "",
  key : "",
  published_at : "",
  type : ""
});

const {id} = useParams();
const navigate = useNavigate();
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDU1NjlmYzVkMWQyZWJiZGU5Mjg2ZmVlZGJiZmJkMyIsIm5iZiI6MTc1MDk0ODc5OC4yODcwMDAyLCJzdWIiOiI2ODVkNWJiZTY2OTdmYTQ0MjIzNGYwYTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.R1vuu_6m_3iRDwH98Euhfvp6bTEs0_KAQZMMTONjJQA'
  }
};
useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
},[]);


  return (
    <div className='player'>
      <img src={back_arrow_icon} className="player-back-arrow" onClick={()=>{navigate(-2)}}/>
      <iframe  width= '90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>

      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player