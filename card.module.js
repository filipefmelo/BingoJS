
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
        i = 0;
        do{
            if(_numbers[i].value == number){
                _numbers[i].marked = !numbers[i++].marked;
                notFound = false;
            }
            i++;
        }while(notFound && i<nlength);
    }

    //checks if card is completely marked
    function _checkIfComplete(){
        var nnumbers = _numbers.length,
        nmarked = 0;
        for(var i = 0; i < nnumbers; i++){
            if(_numbers[i].marked) nmarked++;
        }
        if(nmarked == 25){
            _complete = true;
        }
        return _complete;
    }

    //draws DOM interface using a node's id to find the container
    function _drawInterface(dom_id){
        var element = document.getElementById(dom_id),
        fragment = document.createDocumentFragment(),
        nnumbers = _numbers.length;

        if(typeof element != 'undefined'){
            element.addEventListener('click', _checkEvents);
            for(var i = 0; i < nnumbers; i++){
                var div = fragment.appendChild(document.createElement('div'));
                div.setAttribute('data-card-button', 'true')
                div.appendChild(document.createTextNode(_numbers[i].value));
            }
            element.appendChild(fragment);
        }
    }

    //checks triggered events using bubbling
    function _checkEvents(e){
        if(e.target.getAttribute('data-card-button') == 'true'){
            if(e.target.className.indexOf(' marked')!=-1){
                e.target.className = e.target.className.replace(' marked', '');
            }else{
                e.target.className += ' marked';
            }
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
        drawInterface: _drawInterface
    }
}