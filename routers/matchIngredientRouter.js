const matchIngredientRouter = require('express').Router();
const matchIngredientModel = require('../models/matchIngredientModel');

matchIngredientRouter.get('/', async (req, res) => {
  const [matches] = await matchIngredientModel.findAllIngredientMatchedRecipie(req.query);
  res.json(matches);
});


matchIngredientRouter.post('/:id', async (req, res) => {
  await matchIngredientModel.createIngredientMatch(req.body, req.params.id);
  return res.status(201).json();
});

module.exports = matchIngredientRouter;
