
/**
* Modules API class.
*
* This API allows for modules to communicate
* between themselves
* @namespace FM.APIS
*/
FM.APIS.moduleapi = new function(){
    this.channels = [];
    
    //creates a listener for a channel. Takes a channel ID and a function to be executed
    this.listen = function(channel, fn){
        if (!this.channels[channel]) this.channels[channel] = [];
        this.channels[channel].push({ context: this, callback: fn });
        return this;
    }

    //removes listener from a channel or clears all listeners for a channel
    this.unlisten = function(channel, fn){
        if (!this.channels[channel]) return false;
        if(fn){
            for (var i = 0, l = this.channels[channel].length; l > i; l--) {
                if(this.channels[channel][i].callback==fn){
                    this.channels[channel].splice(i,1);
                }
            }
        }else{
            delete this.channels[channel];
        }
        return this;
    }
 
    //broadcasts a channel
    this.broadcast = function(channel){
        if (!this.channels[channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };
 
    return this; 
};