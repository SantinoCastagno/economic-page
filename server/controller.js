const express = require('express');
const router = express.Router();

const moment = require('moment');
const { query, validationResult } = require('express-validator');

const fs = require('fs');
const data = require('./data.json');

//Routes
// Get Value by ID
router.get('/get/value/:id',  (req, res) => {
  const found = data.historic.some(value => value.id === parseInt(req.params.id));

  if(found){
    res.json(data.historic.filter(value => value.id === parseInt(req.params.id)));
  } else {
    res.status(404).json({ msg: `No Value with the id of ${ req.params.id }` });
  }
});


// Get values with limit and from options
router.get('/get/values', [
  query('limit').isInt({ min: 0, max: data.historic.length }),
  query('from').isInt({ min: 0, max: data.historic.length })
], (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  limit = req.query.limit;
  from = req.query.from;

  res.json(data.historic.slice(from, limit));

});

// Create new Value
router.post('/load/value', [
  query('buy').isInt(),
  query('sell').isInt()
] , (req, res) => {

      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
      }

      const newHistoricValue = {
        "id": data.historic.length,
        "fecha": `${moment().format('DD-MM-YYYY')}`,
        "compra": req.query.buy,
        "venta": req.query.sell,
      };

      data.historic.push(newHistoricValue);

      fs.writeFile("./data.json", JSON.stringify(data), err => {
        if (err) console.log("Error updating file:",err)
      })

    res.json(data.historic);

});


module.exports = router;