const Mutant = require('../utils/mutant');
const mongoose = require('mongoose');
const config = require('./config/config.json');

const noMutantDNA = [
    ['A', 'T', 'G', 'C', 'A', 'A'],
    ['C', 'A', 'G', 'T', 'A', 'C'],
    ['T', 'T', 'A', 'T', 'G', 'T'],
    ['A', 'A', 'A', 'T', 'G', 'G'],
    ['C', 'T', 'C', 'C', 'T', 'A'],
    ['T', 'C', 'A', 'C', 'T', 'G']
];

const MutantDNA = [
    ['A', 'T', 'G', 'C', 'A', 'A'],
    ['C', 'A', 'G', 'T', 'A', 'C'],
    ['T', 'T', 'A', 'T', 'A', 'T'],
    ['A', 'A', 'A', 'T', 'A', 'G'],
    ['C', 'C', 'C', 'C', 'T', 'A'],
    ['T', 'C', 'A', 'C', 'T', 'G']
];

beforeAll(async () => {
    //static connection's string because there are not multiple environments
    await mongoose.connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
});

afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    done();
});


test('testing the isMutant function (No mutant)', async (done) => {
    const data = await Mutant.isMutant(noMutantDNA);
    expect(data).toBe(false);
    done();
});

test('testing the isMutant function (mutant)', async (done) => {
    const data = await Mutant.isMutant(MutantDNA);
    expect(data).toBe(true);
    done();
});