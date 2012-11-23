var paypalModule = (function(moduleapi) {
    var basket = []; //privaté

    var addItem = function(values) {
        console.log("adding items to paypal")
        basket.push(values);
    }

    var addItem2 = function(values) {
        console.log("adding items to paypal")
        basket.push(values);
    }

    moduleapi.listen("itemAdded", addItem);
    moduleapi.listen("itemAdded", addItem2);
    moduleapi.unlisten("itemAdded");

    return { //exposed to public
        addItem: addItem,
        getItemCount: function() {
            return basket.length;
        },
        getTotal: function(){
           var q = this.getItemCount(),p=0;
            while(q--){
                p+= basket[q].price; 
            }
            return p;
        }
    }
}(moduleapi));