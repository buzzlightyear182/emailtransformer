function transform(text) {
  var initialText = text;
  if(hasMinimumRequiredLength(text)){
    text = normalizeEmail(text);
    if(!isValidEmail(text)){
      return initialText;
    }
  }
  return text;
}

  var rules = {
    "(AT)": "@",
    "-AT-": "@",
    "AT": "@",
    "(DOT)": ".",
    "-DOT-": ".",
    "DOT": "."
  };

var itHasDomain = function(text) {
  for(var i=0; i<text.length-2;i++) {
    if( text[i]+text[i+1]== "@." ){
      return false;
    }
  }
  return true;
}

var itHasDotAfterAt = function(text){
  var subText = text.substring(text.indexOf('@'),text.length)
  if (subText.indexOf('@') < subText.indexOf('.')){
    return true;
  }
  return false;
}

var itHasAtAndDot = function(text){
  if(text.indexOf("@") == -1 || text.indexOf(".") == -1) {
    return false;
  }
  return true;
}

var hasMinimumRequiredLength = function(text) {
  var theShortestPossibleEmailLength = 6;
  return text.length > theShortestPossibleEmailLength;
}

var isValidEmail= function(text){
  if(!itHasDomain(text) || !itHasDotAfterAt(text) || !itHasAtAndDot(text)){
      return false;
    }
  return true;
}

var normalizeEmail = function(text){
  for (var key in rules){
    while (text.indexOf(key) != -1) {
      text = text.replace(key,rules[key]);
    }
  }
  return text
}