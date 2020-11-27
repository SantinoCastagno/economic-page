const express = require('express');
const router = express.Router();

const moment = require('moment');
const { query, validationResult } = require('express-validator');

const fs = require('fs');
const data = require('./data.json');

//Routes
// Get Value by ID
router.get('/value/:id',  (req, res) => {
  const found = data.historic.some(value => value.id === parseInt(req.params.id));

  if(found){
    res.json(data.historic.filter(value => value.id === parseInt(req.params.id)));
  } else {
    res.status(404).json({ msg: `No Value with the id of ${ req.params.id }` });
  }
});

// Get all the values
router.get('/getAll/values',(req, res) => {

  if(data.historic.length > 10) {
    res.json(data.historic.slice(data.historic.length-10, data.historic.length));
  } else {
    res.json(data.historic);
  }

});

// Get values with limit and from options
router.get('/values', [
  query('limit').isInt({ min: 0, max: data.historic.length }),
  query('from').isInt({ min: 0, max: data.historic.length })
], (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const limit = req.query.limit;
  const from = req.query.from;

  res.json(data.historic.slice(from, limit));

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

      //corregir
      fs.writeFile("./data.json", JSON.stringify(data), err => {
        if (err) console.log("Error updating file:",err)
      })

    res.json(newHistoricValue);

});


module.exports = router;