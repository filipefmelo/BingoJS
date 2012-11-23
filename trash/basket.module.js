var basketModule = (function(moduleapi) {
    var basket = []; //private
    return { //exposed to public
        addItem: function(values) {
            basket.push(values);
            //moduleapi.broadcast("itemAdded", values);
        },
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