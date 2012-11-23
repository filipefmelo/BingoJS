
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
    cardId = 0,
    generatedNumbers = []; 
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
    	return new Card(cardId++, numbers);
    },

    //generates a new and not existent number
    _generateNumber = function(){
    	var number = {};
    	do{
    		number = Math.round(1+(Math.random()*74));
    	}while(_numberNotNew(number));
    	return number;
    },

    //checks if a number has already been generated
    _numberNotNew = function(number){
    	var i = generatedNumbers.length;
    	do{
    		if(generatedNumbers[i] == number) return true;
    	}while(i!=0);

    	return false;
    };
 
 	//create public interface
    return {
        generateCard: _generateCard,
        generateNumber: _generateNumber
    };
 
}(Card));

//extend bingoServer with baseModule to make it communicable
FM.Services.bingoserver = FM.Utils.extend(FM.Services.bingoserver, FM.Modules.baseModule);