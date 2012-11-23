
/**
* Base Module class.
*
* All modules should extend this one
* This allows easier inheritance
* @namespace FM.Modules
*/
FM.Modules.baseModule = (function(moduleapi) {
    var moduleapi = moduleapi;

    return {
        moduleapi: moduleapi
    }
}(FM.APIS.moduleapi));