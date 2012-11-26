
/**
* Card Module class.
*
* This is the Bingo card module
* It takes a DOM element ID as it's constructor's parameter
* @namespace FM.Modules
*/
FM.Modules.Card = function(id, numbers) {
    var _id = 0,
    _numbers = {},
    _complete = false;

    //constructor
    function _init(){
         //extend bingoServer with baseModule to make it communicable
        FM.Utils.extend(this, FM.Modules.baseModule);

        _id = id;
        _numbers = numbers;

        //define communication channels
        moduleapi.listen("generatedNumber", _checkIfComplete);
    }

    //get id for this card
    function _getID(){
    	return _id;
    };

    //sets id for this card
    function _setID(id){
        _id = id;
    };

    //get array with card's numbers
    function _getNumbers(){
    	return _numbers;
    };

    //marks a number in the card's array
    function _markNumber(number){
        var nlength = _numbers.length,
        notFound = true,
        i = 0,
        bnt = document.getElementById('data-card-button-'+_id+'-'+number);

        do{
            if(_numbers[i].value == number){
                _numbers[i].marked = !numbers[i++].marked;
                if(bnt.className.indexOf(' marked')!=-1){
                    bnt.className = bnt.className.replace(' marked', '');
                }else{
                    bnt.className += ' marked';
                }
                notFound = false;
            }
            i++;
        }while(notFound && i<nlength);
    }

    //checks if card is completely marked
    //TODO: check if the numbers marked match all the numbers added by the bingoServer class
    //mark card as winner
    function _checkIfComplete(game_numbers){
        console.log('cars._checkIfComplete');
        var nmarked = 0,
        nnumbers = _numbers.length,
        element = document.getElementById('bingo-card-'+_id);
        for(var i = 0; i < nnumbers; i++){
            if(_numbers[i].marked && FM.Utils.inArray(_numbers[i].value, game_numbers)) nmarked++;
        }
        if(nmarked == 25){
            _complete = true;
            element.className += ' winner';
            //define communication channels
            moduleapi.broadcast("winnerFound", _id);
        }

        _markNumber(game_numbers[game_numbers.length-1]);
        return _complete;
    }

    //draws DOM interface using a node's id to find the container
    function _drawInterface(node_id){
        var element = document.getElementById(node_id),
        fragment = document.createDocumentFragment(),
        nnumbers = _numbers.length;

        if(typeof element != 'undefined'){
            var container = fragment.appendChild(document.createElement('div'));
            container.setAttribute('id', 'bingo-card-'+_id);
            container.setAttribute('class', 'bingo-card');
            container.addEventListener('click', _checkEvents);
            for(var i = 0; i < nnumbers; i++){
                var div = container.appendChild(document.createElement('div'));
                div.setAttribute('id', 'data-card-button-'+_id+'-'+_numbers[i].value);
                div.setAttribute('data-card-button', 'true');
                div.setAttribute('class', 'bingo-card-button');
                div.appendChild(document.createTextNode(_numbers[i].value));
            }
            element.appendChild(fragment);
        }
    }

    //destructor
    function _removeInterface(){
       var  element = document.getElementById('bingo-card-'+_id);
        element.parentNode.removeChild(element);
        //define communication channels
        moduleapi.unlisten("generatedNumber", _checkIfComplete);
    }

    //checks triggered events using bubbling
    function _checkEvents(e){
        if(e.target.getAttribute('data-card-button') == 'true'){
            _markNumber(e.target.innerHTML);
        }
    }

    //initialy run method
    _init(id, numbers);

    return {
        getID: _getID,
        getNumbers: _getNumbers,
        setID: _setID,
        markNumber: _markNumber,
        checkIfComplete: _checkIfComplete,
        complete: _complete,
        drawInterface: _drawInterface,
        removeInterface: _removeInterface
    }
}