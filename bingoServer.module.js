
/**
* Bingo Server class.
*
* This module will control the card and number generation for all modules
* This works as a service
* @namespace FM.Services
*/
FM.Services.bingoserver = (function(Card){
	//private declarations
    var
    _cardId = 0,
    _generatedNumbers = [],
    _numbersToBeGenerated = [],
    _maxGeneratedNumbers = 75,

    //generates a bingo card and returns it to the callee
    _generateCard = function(){
    	var numbers = [], i = 25;
    	do{
    		numbers.push({
    			value: Math.round(1+(Math.random()*74)),
    			marked: false
    		});
    		i--;
    	}while(i!=0)
    	return new Card(_cardId++, numbers);
    },

    //generates a new and not existent number
    _generateNumber = function(){
    	var number = {},
        randomIndex = Math.round(Math.random()*(_numbersToBeGenerated.length-1)), //get a random index for the elements left in _numbersToBeGenerated
    	generatedNumber = _numbersToBeGenerated[randomIndex];
        _generatedNumbers.push(generatedNumber);
        _numbersToBeGenerated.splice(randomIndex,1); //delete the number from the left possible numbers

        return generatedNumber;
    },

    //reset the generated numbers list
    _resetGeneratedNumbers = function(){
        var i = 0;
        _generatedNumbers = [];
        _numbersToBeGenerated = [];

         //generate a list of possible numbers to be withdrawn. Performance fix.
        do{
            _numbersToBeGenerated.push(i+1);
            i++;
        }while(i<_maxGeneratedNumbers);
    },

    //get the generated numbers list
    _getGeneratedNumbers = function(){
        return _generatedNumbers;
    };

    //first run method
    _resetGeneratedNumbers();
 
 	//create public interface
    return {
        generateCard: _generateCard,
        generateNumber: _generateNumber,
        getGeneratedNumbers: _getGeneratedNumbers,
        resetGeneratedNumbers: _resetGeneratedNumbers,
    };
 
}(Card));

//extend bingoServer with baseModule to make it communicable
FM.Services.bingoserver = FM.Utils.extend(FM.Services.bingoserver, FM.Modules.baseModule);