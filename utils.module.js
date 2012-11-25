
/**
* Utils class.
*
* Various utilities
* @namespace FM.Utils
*/
FM.Utils.extend = function(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

FM.Utils.inArray = function(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
};

FM.Utils.addClass = function(node_id, class_name) {
    var element = document.getElementById(node_id);
    if(element.className!='') element.className += ' '+class_name;
    else element.className += class_name;
};

FM.Utils.removeClass = function(node_id, class_name) {
    var element = document.getElementById(node_id);
    element.className.replace(class_name, '');
}

FM.Utils.replaceClass = function(node_id, class_origin, class_destination) {
    var element = document.getElementById(node_id);
    element.className.replace(class_origin, class_destination);
}