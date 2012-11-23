
/**
* Base Module class.
*
* All modules should extend this one
* This allows easier inheritance
* @namespace FM.Modules
*/
FM.Modules.baseModule = new function() {
    this.moduleapi = FM.APIS.moduleapi;
    return this;
};