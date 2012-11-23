
/**
* Bingo Server class.
*
* This module will control the card and number generation for all modules
* This works as a service
* @namespace FM.Services
*/
FM.Services.bingoserver = new function(){
	//private declarations
    var
    _generatedNumbers = [],
    _numbersToBeGenerated = [],
    _maxGeneratedNumbers = 75,
    _generatedCards = [],
    _lastCardId = 0,


    //constructor
    _init = function(){
        //extend bingoServer with baseModule to make it communicable
        FM.Utils.extend(this, FM.Modules.baseModule);
        _resetGeneratedNumbers();
    },

    //generates a new card
    _generateCard = function(){
        var
        card = {}
        availableNumbers = [],
        i = 0,
        maxNumbers = 25,
        maxAvailableNumbers = 75,
        numbers = [];

        //generate sequencial available numbers
        do{
            availableNumbers.push(i+1);
            i++;
        }while(i<maxAvailableNumbers);

        i = 0;
        do{
            randomIndex = Math.round(Math.random()*(availableNumbers.length-1)), //get a random index for the elements left in _numbersToBeGenerated
            numbers.push({
                value: availableNumbers[randomIndex],
                marked: false
            });
            availableNumbers.splice(randomIndex,1); //delete the number from the left possible numbers
            i++;
        }while(i<maxNumbers);

        numbers.sort(function(a,b){
            return (a.value-b.value);
        });
        
        card = new FM.Modules.Card(++_lastCardId, numbers);
        _generatedCards.push(card);
        return card;
    },

    //checks for winning cards
    _checkForWinners = function(){
        var ncards = _generatedCards.length,
        n_winners = 0;
        for(var i = 0; i < ncards; i++){
           if(_generatedCards[i].checkIfComplete()){
                n_winners++;
           }
        }
        return n_winners;
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
    _init();

 
 	//create public interface
    return {
        generateNumber: _generateNumber,
        getGeneratedNumbers: _getGeneratedNumbers,
        resetGeneratedNumbers: _resetGeneratedNumbers,
        generateCard: _generateCard,
        checkForWinners: _checkForWinners
    };
 
};