const express = require('express');

const ProductController = require('./controllers/productController');
const SaleController = require('./controllers/saleController');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getById);
app.post('/products', ProductController.create);

app.post('/sales', SaleController.create);
app.get('/sales', SaleController.getAll);
app.get('/sales/:id', SaleController.getAll);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;