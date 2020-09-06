var express = require('express');
const { isMutant } = require('../utils/mutant');
var router = express.Router();


/* Validates if a DNA is from a mutant. */
router.post('/', async function(req, res, next) {
  const dna = req.body && req.body.dna;
  
  try {
    if (dna && Array.isArray(dna)) {
      const splittedDNA = dna.map((element) => element.split(''));
      console.log(splittedDNA);
      if(await isMutant(splittedDNA)) {
        res.send('OK');
      } else {
        res.sendStatus(403);
      }
    } else {
      res.status(400).send('Invalid body');
    } 
  } catch (error) {
    res.status(500).send(error.message);
  }

});

module.exports = router;
