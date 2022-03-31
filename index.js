require('dotenv').config();

const express = require('express');
const productsRoutes = require('./routes/productsRoutes');
const salesRoutes = require('./routes/salesRoutes');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
