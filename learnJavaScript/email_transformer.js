function transform(text) {
  var initialText = text;
  if(itHasMinimumLength(text)){
    for (var key in Rules()){
      text = text.replace(key,Rules()[key]);
    }
    if(!isValidEmail(text)){
      return initialText;
    }
  }
  return text;
}

function Rules(){
  self = {
    "(AT)": "@",
    "-AT-": "@",
    "AT": "@",
    "(DOT)": ".",
    "-DOT-": ".",
    "DOT": "."
  };
  return self;
}

var itHaveDomain = function(text) {
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

var itHasMinimumLength = function(text) {
  return text.length > "aATa.a".length
}

var isValidEmail= function(text){
  if(!itHaveDomain(text) || !itHasDotAfterAt(text) || !itHasAtAndDot(text)){
      return false;
    }
  return true;
}

