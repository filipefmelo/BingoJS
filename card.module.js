
/**
* Card Module class.
*
* This is the Bingo card module
* It takes a DOM element ID as it's constructor's parameter
* @namespace FM.Modules
*/
FM.Modules.Card = function(id, numbers) {
    var _id = 0,
    _numbers = {};

    function _init(){
         //extend bingoServer with baseModule to make it communicable
        FM.Utils.extend(this, FM.Modules.baseModule);

        _id = id;
        _numbers = numbers;
    }

    function _getID(){
    	return _id;
    };

    function _setID(id){
        _id = id;
    };

    function _getNumbers(){
    	return _numbers;
    };

    function _markNumber(number){
        var nlength = _numbers.length,
        notFound = true,
        i = 0;
        do{
            if(_numbers[i].value == number){
                _numbers[i++].marked = true;
                notFound = false;
            }
        }while(notFound && i<nlength);
    }


    //initialy run method
    _init(id, numbers);

    return {
        getID: _getID,
        getNumbers: _getNumbers,
        setID: _setID,
        markNumber: _markNumber
    }
}