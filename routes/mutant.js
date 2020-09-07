var express = require('express');
const { isMutant } = require('../utils/mutant');
var router = express.Router();


/* Validates if a DNA is from a mutant. */
router.post('/', async function(req, res, next) {
  const dna = req.body && req.body.dna;
  
  try {
    if (dna && Array.isArray(dna) && dna.length === 6) {
      const elements = 0;
      const splittedDNA = dna.map((element) => {
        elements += element.length();
        return element.split('')
      });
      if(elements = 36) {
        if(await isMutant(splittedDNA)) {
          res.send('OK');
        } else {
          res.sendStatus(403);
        }
      } else {
        res.status(400).send('Invalid body');
      }
    } else {
      res.status(400).send('Invalid body');
    } 
  } catch (error) {
    res.status(500).send(error.message);
  }

});

module.exports = router;
