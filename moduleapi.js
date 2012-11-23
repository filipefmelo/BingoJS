
/**
* Modules API class.
*
* This API allows for modules to communicate
* between themselves
* @namespace FM.APIS
*/
FM.APIS.moduleapi = (function(){
    //creates a listener for a channel. Takes a channel ID and a function to be executed
    var listen = function(channel, fn){
        if (!moduleapi.channels[channel]) moduleapi.channels[channel] = [];
        moduleapi.channels[channel].push({ context: this, callback: fn });
        return this;
    },

    //removes listener from a channel or clears all listeners for a channel
    unlisten = function(channel, fn){
        if (!moduleapi.channels[channel]) return false;
        if(fn){
            for (var i = 0, l = moduleapi.channels[channel].length; l > i; l--) {
                if(moduleapi.channels[channel][i].callback==fn){
                    moduleapi.channels[channel].splice(i,1);
                }
            }
        }else{
            delete moduleapi.channels[channel];
        }
        return this;
    },
 
    //broadcasts a channel
    broadcast = function(channel){
        if (!moduleapi.channels[channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = moduleapi.channels[channel].length; i < l; i++) {
            var subscription = moduleapi.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };
 
    return {
        channels: {},
        broadcast: broadcast,
        listen: listen,
        unlisten: unlisten,
        installTo: function(obj){
            obj.listen = listen;
            obj.broadcast = broadcast;
        }
    };
 
}());