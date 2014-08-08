function cleanEmailsIn(text) {
  var words = text.split(" ");
  var i;
  for (i = 0; i < words.length; i++) {
    words[i] = cleanWord(words[i]);
  }
  var finalText = words.join(" ");
  return finalText;
}

function cleanWord(word) {
  var initialword = word;
  if (hasMinimumRequiredLength(word)) {
    word = normalizeEmail(word);
    if (!isValidEmail(word)) {
      return initialword;
    }
  }
  return word;
}

var rules = {
  "(AT)": "@",
  "-AT-": "@",
  "AT": "@",
  "(DOT)": ".",
  "-DOT-": ".",
  "DOT": "."
};

function itHasDomain(text) {
  var i;
  for (i = 0; i < text.length - 2; i++) {
    if (text[i] + text[i + 1] === "@.") {
      return false;
    }
  }
  return true;
}

function itHasDotAfterAt(text) {
  var subText = text.substring(text.indexOf('@'), text.length);
  if (subText.indexOf('@') < subText.indexOf('.')) {
    return true;
  }
  return false;
}

function itHasAtAndDot(text) {
  if (text.indexOf("@") === -1 || text.indexOf(".") === -1) {
    return false;
  }
  return true;
}

function hasMinimumRequiredLength(text) {
  var theShortestPossibleEmailLength = 6;
  return text.length > theShortestPossibleEmailLength;
}

function hasMoreThanTwoDotAfterAT(){
  
}

function isValidEmail(text) {
  if (!itHasDomain(text) || !itHasDotAfterAt(text) || !itHasAtAndDot(text)) {
    return false;
  }
  return true;
}

function normalizeEmail(text) {
  var key;
  for (key in rules) {
    while (text.indexOf(key) !== -1) {
      text = text.replace(key, rules[key]);
    }
  }
  return text;
}