import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './listDishes.scss';

const ListDishes = () => {
  const { id } = useParams();
  const [plats, setPlats] = useState([]);
  const [ingred, setIngred] = useState([]);

  const getIngred = () => {
    axios
      .get(`http://localhost:8000/api/ingredients/liste/${id}`)
      .then((response) => setIngred(response.data));
  };

  const getPlats = () => {
    axios
      .get(`http://localhost:8000/api/dishes`)
      .then((response) => setPlats(response.data));
  };

  useEffect(() => {
    getIngred();
    getPlats();
  }, []);

  return (
    <div className="list-dishes">
      <div>
        <div className="text">liste des plats : </div>
        {id
          ? ingred.map((Dishe) => (
            <div key={Dishe} className="mapping">
              <div className="orga">
                <div className="title">{Dishe.name}</div>
                <img
                  alt={Dishe.name}
                  src={`http://localhost:8000/uploads/${Dishe.image}`}
                />
              </div>
              <div className="lien">
                <Link to={`/dishes/${Dishe.id}`} className="buttonLink">
                  + Détails
                </Link>
              </div>
            </div>
          ))
          : plats.map((Dishe) => (
            <div key={Dishe} className="mapping">
              <div className="orga">
                <div className="title">{Dishe.name}</div>
                <img
                  alt={Dishe.name}
                  src={`http://localhost:8000/uploads/${Dishe.image}`}
                />
              </div>
              <div className="lien">
                <Link to={`/dishes/${Dishe.id}`} className="buttonLink">
                  + Détails
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListDishes;
