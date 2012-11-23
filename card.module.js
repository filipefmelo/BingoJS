
/**
* Card Module class.
*
* This is the Bingo card module
* It takes a DOM element ID as it's constructor's parameter
* @namespace FM.Modules
*/
function Card(ID, numbers) {
    var _id = ID,
    _numbers = numbers;

    function _getID(){
    	return _id;
    };

    function _getNumbers(){
    	return _numbers;
    };

    return {
        getID: _getID,
        getNumbers: _getNumbers
    }
}