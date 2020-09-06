const express = require('express');
const router = express.Router();
const MutantModel = require('../models/mutant');


/* GET stats. */
router.get('/', async function(req, res, next) {
  try {
    const count_mutant_dna = await MutantModel.where({is_mutant: true}).count();
    const count_human_dna = await MutantModel.where().count();
    res.json(
      {
        count_mutant_dna,
        count_human_dna,
        ratio: count_mutant_dna / count_human_dna
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
