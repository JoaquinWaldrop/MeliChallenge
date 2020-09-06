const mongoose = require('mongoose');
const Mutant = mongoose.model('Mutant', { is_mutant: Boolean });

module.exports = Mutant;