const express = require('express');
const router = express.Router();

const moment = require('moment');
const { query, validationResult } = require('express-validator');

const fs = require('fs');
const data = require('../data/valueTest.json');

//Routes
// Get Value by ID
router.get('/value/:id',  (req, res) => {
  const found = data.historic.filter(value => value.id === parseInt(req.params.id));

  if(found.length > 0){
    res.json(found[0]);
  } else {
    res.status(404).json({ msg: `No Value with the id of ${ req.params.id }` });
  }
});

// Get values with limit and from options
router.get('/values', [
  // The rest api is limited to 100 values in each query.
  query('limit').isInt({ min: 0, max: 100 }),
  query('from').isInt({ min: 0, max: data.historic.length-1 })
], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const limit = req.query.limit;
  const from = req.query.from;
  
  res.status(200)
    .json(data.historic.slice(data.historic.length-(from+limit), data.historic.length-from).reverse());
});

// Create new Value
router.post('/value', [
  query('buy').isFloat(),
  query('sell').isFloat()
] , (req, res) => {

      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
      }

      const newHistoricValue = {
        "id": data.historic.length,
        "fecha": `${moment().format('DD-MM-YYYY')}`,
        "compra": `$${req.query.buy}`,
        "venta": `$${req.query.sell}`,
      };

      data.historic.push(newHistoricValue);

      try{
        fs.writeFileSync("./data.json", JSON.stringify(data));
      } catch(err) {
        console.log(err);
      }

    res.json(newHistoricValue);

});


module.exports = router;