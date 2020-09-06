const MutantModel = require('../models/mutant');

const valid = ['A', 'T', 'C', 'G'];

const Mutant = {
    isMutant: async (splittedDNA) => {
        try {
            let count = 0;
            for (let x = 0; x < splittedDNA.length; x++) {
                const row = splittedDNA[x];
                for (let y = 0; y < row.length; y++) {
                    if( valid.indexOf(splittedDNA[x][y]) === -1 ) {
                        throw Error('Invalid character');
                    } else {
                        count += Mutant.validatePosition(splittedDNA, x , y);
                        if (count >= 2) {
                            await Mutant.createMutant(true);
                            return true;
                        }
                    }
                }
            }
            await Mutant.createMutant(false);
            return false;
        } catch (error) {
            throw error;
        }
    },
    createMutant: async (is_mutant) => {
        const mutant = new MutantModel( { is_mutant } );
        return mutant.save();
    },
    validatePosition: (splittedDNA, x, y) => {
        const arrayLength = splittedDNA.length;
        let horizontal = true, vertical = true, diagonalLeft = true, diagonalRight = true;
        //generates an array of 4 characters in all direction to validate if all of them are equal
        for (let i = 1; i <= 3; i++) {
            //validates horizontal
            if( y < arrayLength - 3 ) {
                horizontal = horizontal && (splittedDNA[x][y] === splittedDNA[x][y + i]);
            } else {
                horizontal = false;
            }
            //validates vertical
            if( x < arrayLength - 3 ) {
                vertical = vertical && (splittedDNA[x][y] === splittedDNA[x + i][y]);
            } else {
                vertical = false;
            }
            //validates diagonal right
            if( x < arrayLength - 3 &&  y < arrayLength - 3 ) {
                diagonalRight = diagonalRight && (splittedDNA[x][y] === splittedDNA[x + i][y + i]);
            } else {
                diagonalRight = false;
            }
            //validates diagonal left
            if( x< arrayLength - 3 &&  y >= 3 ) {
                diagonalLeft = diagonalLeft && (splittedDNA[x][y] === splittedDNA[x + i][y - i]);
            } else {
                diagonalLeft = false;
            }
            
            //Validate if all directions are wrong and stop validating
            if(!horizontal && !vertical && !diagonalRight && !diagonalLeft) {
               break; 
            }
        }
        return (+horizontal) + (+vertical) + (+diagonalLeft) + (+diagonalRight);
    }
}

module.exports = Mutant;