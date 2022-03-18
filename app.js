const express = require('express');
const cors = require('cors');
const dishesRouter = require('./routers/dishesRouter');
const ingredientsRouter = require('./routers/ingredientsRouter');
const loginRouter = require('./routers/admin');
const matchIngredientRouter = require('./routers/matchIngredientRouter');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 8000;

app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/dishes', dishesRouter);
app.use('/api/ingredients', ingredientsRouter);
app.use('/admin', loginRouter);
app.use('/api/matchIngredientRouter', matchIngredientRouter);

app.listen(port, () => {
  console.log(`Server run on ${port}`);
});
