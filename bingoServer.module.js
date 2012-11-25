
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
    _drawTimer = {},
    _lastNumber = -1,


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
           if(_generatedCards[i].checkIfComplete(_generatedNumbers)){
                n_winners++;
           }
        }
        return n_winners;
    },

    //generates a new and not existent number
    _generateNumber = function(){
        if(_numbersToBeGenerated.length == 0) return -1;
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
    },

    //draw the game table interface
    _drawInterface = function(node_id){
        
        if(node_id){
            //cache node_id
            if(typeof _drawInterface.cache=='undefined') _drawInterface.cache = [];
            _drawInterface.cache['node_id'] = node_id;
        }else{
            if(_drawInterface.cache['node_id']){
                node_id = _drawInterface.cache['node_id'];
            }else{
                return;
            }
        }
        

        var element = document.getElementById(node_id),
        fragment = document.createDocumentFragment();

        element.innerHTML = '';
        if(typeof element != 'undefined'){
            for(var i = 0; i < 75; i++){
                var div = fragment.appendChild(document.createElement('div'));
                div.setAttribute('data-table-number', 'true');
                div.setAttribute('class', 'bingo-table-number');
                div.setAttribute('id', 'bingo-table-number-'+(i+1));
                div.appendChild(document.createTextNode(i+1));
            }
            element.appendChild(fragment);
        }
    },

    //selects a number on the table interface
    _selectNumber = function(number){
        var element = document.getElementById('bingo-table-number-'+number);
        element.className += ' lastMarked';

        if(_lastNumber>-1){
            var lastElement = document.getElementById('bingo-table-number-'+_lastNumber);
            if(typeof lastElement!='undefined') lastElement.className = lastElement.className.replace(' lastMarked', ' marked');
        }
        _lastNumber = number;
    }

    //starts timer for numbers draw
    _startDraw = function(){
        var number = _generateNumber(),
        element = document.getElementById('draw-progress-bar'),
        timesRan = 0;

        element.setAttribute('value', ++timesRan);

        _drawTimer = setInterval(function(){
            element.setAttribute('value', ++timesRan);
            if(timesRan%1000==0){
                number = _generateNumber();
                _selectNumber(number);
                if(_numbersToBeGenerated.length == 0) _stopDraw();
                timesRan = 0;
                _checkForWinners();
            }
        }, 10);
    },

    //stops timer for numbers draw
    _stopDraw = function(){
        clearInterval(_drawTimer);
        var element = document.getElementById('draw-progress-bar');
        element.setAttribute('value', 0);
    },

    //resets draw state
    _resetDraw = function(){
        _resetGeneratedNumbers();
        _drawInterface();
    };

    //first run method
    _init();

 
 	//create public interface
    return {
        generateNumber: _generateNumber,
        getGeneratedNumbers: _getGeneratedNumbers,
        resetGeneratedNumbers: _resetGeneratedNumbers,
        generateCard: _generateCard,
        checkForWinners: _checkForWinners,
        drawInterface: _drawInterface,
        startDraw: _startDraw,
        stopDraw: _stopDraw,
        resetDraw: _resetDraw
    };
 
};