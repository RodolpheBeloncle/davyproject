import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import fleche from '../../../assets/fleche-droite.png';
import './dishe.scss';

const Dishe = () => {
  const { id } = useParams();
  const [plat, setPlat] = useState([]);
  const [ingred, setIngred] = useState([]);
  const [inputIngredient, setInputIngredient] = useState([]);
  const [allIngredientAvailable, setAllIngredientAvailable] = useState([]);
  const [ingredientMatchedRecipie, setIngredientMatchedRecipie] = useState([]);

  const findAllIngredientMatchedRecipie = () => {
    axios
      .get(`http://localhost:8000/api/matchIngredientRouter`)
      .then((response) => setIngredientMatchedRecipie(response.data));
  };

  const getAllIngredientAvailable = () => {
    axios
      .get(`http://localhost:8000/api/ingredients`)
      .then((response) => setAllIngredientAvailable(response.data));
  };

  const getPlat = () => {
    axios
      .get(`http://localhost:8000/api/dishes/${id}`)
      .then((response) => setPlat(response.data));
  };

  const getIngred = () => {
    axios
      .get(`http://localhost:8000/api/dishes/liste/${id}`)
      .then((response) => setIngred(response.data));
  };

  const AddIngredientToSelectedRecipie = async (ingredName) => {
    // allIngredientAvailable.filter((element) => element.name === ingredName);
    // console.log(
    //   'solution',
    //   allIngredientAvailable.filter((element) => element.name === ingredName)
    // );

    const pickIdFromIngredientList = await allIngredientAvailable
      .filter((element) => element.name === ingredName)
      .map((ingredient) => ingredient.id);

    await axios.post(`http://localhost:8000/api/matchIngredientRouter/${id}`, {
      id_ingredients: pickIdFromIngredientList,
    });

    // if (
    //   allIngredientAvailable.filter((element) => element.name === ingredName)
    //     .lenght > 0
    // ) {
    //  axios.post(`http://localhost:8000/api/matchIngredientRouter/${id}`, {
    //     id_ingredients: pickIdFromIngredientList,
    //   });
    // }

    await getIngred();
    await getPlat();
    await findAllIngredientMatchedRecipie();
    alert('ingredient added to recipie!');
  };

  useEffect(() => {
    getPlat();
    getIngred();
    getAllIngredientAvailable();
    findAllIngredientMatchedRecipie();
  }, []);

  console.log('ingredients include in recipie', ingred);
  console.log('dish info', plat);
  console.log('allIngredientAvailable', allIngredientAvailable);
  console.log(
    'IngredientMatched with selected recipie',
    ingredientMatchedRecipie
  );
  console.log('setInputIngredient', inputIngredient);
  return (
    <div className="dishe">
      <div>
        <input
          className="form-control"
          id="ingredient input"
          type="text"
          onChange={(event) => setInputIngredient(event.target.value)}
        />
        <button
          type="button"
          className=""
          onClick={() => AddIngredientToSelectedRecipie(inputIngredient)}
        >
          addIngredient to recipie
        </button>
        <div className="ingredi">
          <div className="ingredilist">
            ingredients : <br />
            <br />
            {ingred.map((ingredientList) => (
              <li key={ingred}>{ingredientList.name}</li>
            ))}
          </div>
        </div>
      </div>
      <div className="plat">
        <div>{plat.name}</div>
        <div key={plat} className="image_plat">
          <img
            alt={plat.name}
            src={`http://localhost:8000/uploads/${plat.image}`}
          />
        </div>
      </div>
      <div className="lien_recette">
        <a href={plat.lien_recette} target="_blank" rel="noopener noreferrer">
          lien vers la recette
        </a>
        <img alt="flecheLien" src={fleche} />
      </div>
    </div>
  );
};

export default Dishe;
